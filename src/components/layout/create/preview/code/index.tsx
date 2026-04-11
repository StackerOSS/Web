import { type ReactElement, useEffect, useMemo, useRef, useState } from "react";
import {
	FiCheck,
	FiChevronDown,
	FiChevronRight,
	FiCopy,
	FiFileText,
	FiFolder,
} from "react-icons/fi";
import {
	type BundledLanguage,
	type BundledTheme,
	createHighlighter,
	type ThemedToken,
} from "shiki";
import { useStackerManifest } from "@/hooks/use-stacker-manifest";
import type {
	PreviewVirtualDirectory,
	PreviewVirtualFile,
} from "@/types/preview-tree";

type PreviewResponse = {
	success: boolean;
	tree?: {
		root: PreviewVirtualDirectory;
		fileCount: number;
		directoryCount: number;
	};
	error?: string;
};

const SHIKI_THEME: BundledTheme = "github-dark";
const SHIKI_LANGS: BundledLanguage[] = [
	"typescript",
	"tsx",
	"javascript",
	"json",
	"css",
	"html",
	"markdown",
	"yaml",
	"toml",
	"bash",
	"astro",
	"php",
];

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: [SHIKI_THEME],
			langs: SHIKI_LANGS,
		});
	}
	return highlighterPromise;
}

function normalizeLanguage(input: string): BundledLanguage {
	const normalized = input.toLowerCase();
	if (normalized === "tsx") return "tsx";
	if (normalized === "typescript" || normalized === "ts") return "typescript";
	if (normalized === "json") return "json";
	if (normalized === "css") return "css";
	if (normalized === "html") return "html";
	if (normalized === "markdown" || normalized === "md") return "markdown";
	if (normalized === "yaml" || normalized === "yml") return "yaml";
	if (normalized === "toml") return "toml";
	if (normalized === "bash" || normalized === "shell" || normalized === "sh")
		return "bash";
	if (normalized === "astro") return "astro";
	if (normalized === "php") return "php";
	if (normalized === "javascript" || normalized === "js") return "javascript";
	return "typescript";
}

function collectInitialExpanded(
	node: PreviewVirtualDirectory,
	depth = 0,
): string[] {
	const values: string[] = [];
	if (depth < 2) values.push(node.path);
	for (const child of node.children) {
		if (child.type === "directory") {
			values.push(...collectInitialExpanded(child, depth + 1));
		}
	}
	return values;
}

function findFileByPath(
	node: PreviewVirtualDirectory,
	path: string,
): PreviewVirtualFile | null {
	for (const child of node.children) {
		if (child.type === "file" && child.path === path) return child;
		if (child.type === "directory") {
			const nested = findFileByPath(child, path);
			if (nested) return nested;
		}
	}
	return null;
}

export function CodeView() {
	const manifest = useStackerManifest();
	const [tree, setTree] = useState<PreviewVirtualDirectory | null>(null);
	const [fileCount, setFileCount] = useState(0);
	const [directoryCount, setDirectoryCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [copiedFile, setCopiedFile] = useState(false);
	const [selectedPath, setSelectedPath] = useState<string>("");
	const [expandedFolders, setExpandedFolders] = useState<
		Record<string, boolean>
	>({});
	const [tokenLines, setTokenLines] = useState<ThemedToken[][]>([]);
	const copyFileTimerRef = useRef<number | null>(null);

	const selectedFile = useMemo(() => {
		if (!tree || !selectedPath) return null;
		return findFileByPath(tree, selectedPath);
	}, [tree, selectedPath]);

	useEffect(() => {
		const controller = new AbortController();
		const timeout = window.setTimeout(async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch("/api/preview", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(manifest),
					signal: controller.signal,
				});
				const data = (await response.json()) as PreviewResponse;
				if (!data.success || !data.tree) {
					throw new Error(data.error ?? "Failed to generate preview");
				}
				const treeData = data.tree;
				setTree(treeData.root);
				setFileCount(treeData.fileCount);
				setDirectoryCount(treeData.directoryCount);
				setExpandedFolders((prev) => {
					const root = treeData.root;
					const expanded = Object.fromEntries(
						collectInitialExpanded(root).map((path) => [path, true]),
					);
					return { ...expanded, ...prev };
				});

				const selected = findFileByPath(treeData.root, selectedPath);
				if (!selected) {
					const fallback =
						findFileByPath(treeData.root, `${treeData.root.path}/README.md`) ??
						findFileByPath(treeData.root, `${treeData.root.path}/package.json`);
					if (fallback) setSelectedPath(fallback.path);
				}
			} catch (err) {
				if (controller.signal.aborted) return;
				setError(
					err instanceof Error ? err.message : "Failed to generate preview",
				);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}, 250);

		return () => {
			controller.abort();
			window.clearTimeout(timeout);
		};
	}, [manifest, selectedPath]);

	useEffect(() => {
		const render = async () => {
			if (!selectedFile) {
				setTokenLines([]);
				return;
			}
			try {
				const highlighter = await getHighlighter();
				const tokens = highlighter.codeToTokens(selectedFile.contents, {
					lang: normalizeLanguage(selectedFile.language),
					theme: SHIKI_THEME,
				});
				setTokenLines(tokens.tokens);
			} catch {
				setTokenLines(
					selectedFile.contents
						.split("\n")
						.map((line) => [{ content: line, offset: 0, color: "#e6edf3" }]),
				);
			}
		};
		void render();
	}, [selectedFile]);

	const handleCopyFile = async () => {
		if (!selectedFile) return;
		await navigator.clipboard.writeText(selectedFile.contents);
		setCopiedFile(true);
		if (copyFileTimerRef.current) {
			window.clearTimeout(copyFileTimerRef.current);
		}
		copyFileTimerRef.current = window.setTimeout(
			() => setCopiedFile(false),
			1400,
		);
	};

	const toggleFolder = (path: string) => {
		setExpandedFolders((current) => ({ ...current, [path]: !current[path] }));
	};

	const renderNode = (
		current: PreviewVirtualDirectory | PreviewVirtualFile,
		depth: number,
	): ReactElement => {
		if (current.type === "directory") {
			const isOpen = expandedFolders[current.path] ?? true;
			return (
				<div key={current.path}>
					<button
						type="button"
						onClick={() => toggleFolder(current.path)}
						className="mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-foreground hover:bg-muted"
						style={{ paddingLeft: `${8 + depth * 14}px` }}
					>
						{isOpen ? (
							<FiChevronDown className="h-3.5 w-3.5 shrink-0" />
						) : (
							<FiChevronRight className="h-3.5 w-3.5 shrink-0" />
						)}
						<FiFolder className="h-3.5 w-3.5 shrink-0" />
						<span className="truncate">{current.name}</span>
					</button>
					{isOpen
						? current.children.map((child) => renderNode(child, depth + 1))
						: null}
				</div>
			);
		}

		return (
			<button
				key={current.path}
				type="button"
				onClick={() => setSelectedPath(current.path)}
				className={`mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition ${
					selectedFile?.path === current.path
						? "bg-primary text-primary-foreground"
						: "text-foreground hover:bg-muted"
				}`}
				style={{ paddingLeft: `${22 + depth * 14}px` }}
			>
				<FiFileText className="h-3.5 w-3.5 shrink-0" />
				<span className="truncate">{current.name}</span>
			</button>
		);
	};

	const renderedLines = useMemo(() => {
		const lineSeen = new Map<string, number>();
		return tokenLines.map((lineTokens) => {
			const signature = lineTokens
				.map((token) => `${token.content}|${token.color}|${token.offset}`)
				.join("||");
			const lineCount = (lineSeen.get(signature) ?? 0) + 1;
			lineSeen.set(signature, lineCount);

			const tokenSeen = new Map<string, number>();
			const renderedTokens = lineTokens.map((token) => {
				const tokenSignature = `${token.content}|${token.color}|${token.offset}`;
				const tokenCount = (tokenSeen.get(tokenSignature) ?? 0) + 1;
				tokenSeen.set(tokenSignature, tokenCount);
				return {
					token,
					key: `${tokenSignature}:${tokenCount}`,
				};
			});

			return {
				key: `${selectedFile?.path ?? "empty"}:${signature}:${lineCount}`,
				tokens: renderedTokens,
			};
		});
	}, [tokenLines, selectedFile?.path]);

	if (error && !tree) {
		return (
			<div className="h-full rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
				{error}
			</div>
		);
	}

	return (
		<div className="h-full animate-in fade-in duration-300">
			<div className="grid h-full gap-3 rounded-xl border border-border bg-muted/20 p-2 lg:grid-cols-[280px_1fr]">
				<div className="min-h-0 overflow-auto rounded-lg border border-border bg-background/60 p-1">
					{loading && !tree ? (
						<div className="p-3 text-xs text-muted-foreground">
							Generating preview...
						</div>
					) : null}
					{tree ? renderNode(tree, 0) : null}
				</div>

				<div className="min-h-0 overflow-hidden rounded-lg border border-border bg-background/60">
					<div className="flex items-center justify-between border-b border-border px-3 py-2">
						<div className="min-w-0">
							<div className="truncate font-mono text-xs font-medium">
								{selectedFile?.path ?? "Select a file"}
							</div>
							<div className="truncate text-[11px] text-muted-foreground">
								{directoryCount} folders • {fileCount} files
							</div>
						</div>
						<div className="ml-3 flex items-center gap-2">
							<button
								type="button"
								onClick={handleCopyFile}
								disabled={!selectedFile}
								className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition ${
									copiedFile
										? "bg-primary text-primary-foreground"
										: "bg-muted hover:bg-secondary text-muted-foreground hover:text-primary"
								}`}
							>
								{copiedFile ? (
									<FiCheck className="h-3.5 w-3.5" />
								) : (
									<FiCopy className="h-3.5 w-3.5" />
								)}
								{copiedFile ? "Copied" : "Copy"}
							</button>
						</div>
					</div>
					<div
						className="h-[calc(100%-41px)] overflow-auto font-mono text-xs leading-5"
						style={{ backgroundColor: "#0d1117", color: "#e6edf3" }}
					>
						<table className="w-full border-collapse">
							<tbody>
								{renderedLines.map((line, lineIndex) => (
									<tr key={line.key}>
										<td
											className="select-none border-r px-3 align-top"
											style={{
												color: "#7d8590",
												borderColor: "rgba(255,255,255,0.08)",
											}}
										>
											{lineIndex + 1}
										</td>
										<td className="px-3">
											<pre className="whitespace-pre-wrap break-words">
												<code>
													{line.tokens.length > 0
														? line.tokens.map(({ token, key }) => (
																<span
																	key={key}
																	style={{
																		color: token.color ?? "#e6edf3",
																		fontStyle:
																			(token.fontStyle ?? 0) & 1
																				? "italic"
																				: "normal",
																		fontWeight:
																			(token.fontStyle ?? 0) & 2 ? 700 : 400,
																	}}
																>
																	{token.content}
																</span>
															))
														: " "}
												</code>
											</pre>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

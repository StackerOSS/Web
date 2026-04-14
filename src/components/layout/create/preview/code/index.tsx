import {
	type ReactElement,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	FiCheck,
	FiChevronDown,
	FiChevronRight,
	FiCopy,
	FiDownload,
	FiFolder,
	FiSearch,
	FiX,
} from "react-icons/fi";
import { VscFolderOpened } from "react-icons/vsc";
import {
	type BundledLanguage,
	type BundledTheme,
	createHighlighter,
	type ThemedToken,
} from "shiki";
import JSZip from "jszip";
import { useStackerManifest } from "@/hooks/use-stacker-manifest";
import {
	collectInitialExpanded,
	findFileByPath,
	flattenFiles,
	usePreviewTree,
} from "@/hooks/use-preview-tree";
import { getFileIcon } from "@/lib/file-icons";
import type {
	PreviewVirtualDirectory,
	PreviewVirtualFile,
} from "@/types/preview-tree";

// ─── Shiki setup ─────────────────────────────────────────────────────────────

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
	"sql",
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
	const n = input.toLowerCase();
	if (n === "tsx") return "tsx";
	if (n === "typescript" || n === "ts") return "typescript";
	if (n === "json") return "json";
	if (n === "css") return "css";
	if (n === "html") return "html";
	if (n === "markdown" || n === "md") return "markdown";
	if (n === "yaml" || n === "yml") return "yaml";
	if (n === "toml") return "toml";
	if (n === "bash" || n === "shell" || n === "sh") return "bash";
	if (n === "astro") return "astro";
	if (n === "php") return "php";
	if (n === "sql" || n === "prisma") return "sql";
	if (n === "javascript" || n === "js" || n === "mjs") return "javascript";
	return "typescript";
}

// ─── File Explorer ────────────────────────────────────────────────────────────

interface FileExplorerProps {
	root: PreviewVirtualDirectory;
	selectedPath: string;
	onSelect: (file: PreviewVirtualFile) => void;
	search: string;
}

function matchesSearch(
	node: PreviewVirtualDirectory | PreviewVirtualFile,
	query: string,
): boolean {
	const q = query.toLowerCase();
	if (node.type === "file") return node.name.toLowerCase().includes(q);
	return node.children.some((c) => matchesSearch(c, query));
}

function ExplorerNode({
	node,
	depth,
	selectedPath,
	onSelect,
	search,
	expandedFolders,
	setExpandedFolders,
}: {
	node: PreviewVirtualDirectory | PreviewVirtualFile;
	depth: number;
	selectedPath: string;
	onSelect: (file: PreviewVirtualFile) => void;
	search: string;
	expandedFolders: Record<string, boolean>;
	setExpandedFolders: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>;
}): ReactElement | null {
	const indent = 8 + depth * 14;

	if (node.type === "file") {
		if (search && !node.name.toLowerCase().includes(search.toLowerCase())) {
			return null;
		}
		const { icon: FileIcon, color } = getFileIcon(node.name);
		const isSelected = selectedPath === node.path;

		return (
			<button
				type="button"
				onClick={() => onSelect(node)}
				title={node.path}
				className={`mb-0.5 flex w-full items-center gap-1.5 rounded-md py-1 text-left text-xs transition-colors cursor-pointer ${
					isSelected
						? "bg-primary/15 border border-primary/25 text-primary"
						: "text-foreground/75 hover:bg-muted/60 hover:text-foreground"
				}`}
				style={{ paddingLeft: `${indent + 18}px`, paddingRight: "8px" }}
			>
				<FileIcon
					className="h-3.5 w-3.5 shrink-0 flex-none"
					style={{ color }}
				/>
				<span className="truncate font-medium">{node.name}</span>
			</button>
		);
	}

	// Directory
	if (search && !matchesSearch(node, search)) return null;

	const isOpen = expandedFolders[node.path] ?? false;
	const toggle = () =>
		setExpandedFolders((cur) => ({ ...cur, [node.path]: !cur[node.path] }));
	const FolderIcon = isOpen ? VscFolderOpened : FiFolder;

	return (
		<div>
			<button
				type="button"
				onClick={toggle}
				className="mb-0.5 flex w-full items-center gap-1.5 rounded-md py-1 text-left text-xs text-foreground/65 transition-colors hover:bg-muted/60 hover:text-foreground cursor-pointer"
				style={{ paddingLeft: `${indent}px`, paddingRight: "8px" }}
			>
				{isOpen ? (
					<FiChevronDown className="h-3 w-3 shrink-0 flex-none text-muted-foreground" />
				) : (
					<FiChevronRight className="h-3 w-3 shrink-0 flex-none text-muted-foreground" />
				)}
				<FolderIcon className="h-3.5 w-3.5 shrink-0 flex-none text-sky-400" />
				<span className="font-semibold truncate">{node.name}</span>
			</button>
			{isOpen
				? node.children.map((child) => (
						<ExplorerNode
							key={child.path}
							node={child}
							depth={depth + 1}
							selectedPath={selectedPath}
							onSelect={onSelect}
							search={search}
							expandedFolders={expandedFolders}
							setExpandedFolders={setExpandedFolders}
						/>
					))
				: null}
		</div>
	);
}

function FileExplorer({
	root,
	selectedPath,
	onSelect,
	search,
}: FileExplorerProps) {
	const initialExpanded = useMemo(() => collectInitialExpanded(root), [root]);
	const [expandedFolders, setExpandedFolders] = useState<
		Record<string, boolean>
	>(() => Object.fromEntries(initialExpanded.map((p) => [p, true])));

	// Expand all on search
	useEffect(() => {
		if (!search) return;
		const allDirs: string[] = [];
		const walkDirs = (node: PreviewVirtualDirectory) => {
			allDirs.push(node.path);
			for (const child of node.children) {
				if (child.type === "directory") walkDirs(child);
			}
		};
		walkDirs(root);
		setExpandedFolders(Object.fromEntries(allDirs.map((p) => [p, true])));
	}, [search, root]);

	return (
		<div className="relative h-full overflow-auto pb-4 pr-1 text-xs">
			{root.children.map((child) => (
				<ExplorerNode
					key={child.path}
					node={child}
					depth={0}
					selectedPath={selectedPath}
					onSelect={onSelect}
					search={search}
					expandedFolders={expandedFolders}
					setExpandedFolders={setExpandedFolders}
				/>
			))}
		</div>
	);
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ path }: { path: string }) {
	const parts = path.split("/").filter(Boolean);
	return (
		<div className="flex min-w-0 items-center gap-0.5 font-mono text-xs">
			{parts.map((part, i) => (
				<span key={`${part}-${i}`} className="flex items-center gap-0.5">
					{i > 0 && (
						<span className="text-muted-foreground/50 select-none">/</span>
					)}
					<span
						className={
							i === parts.length - 1
								? "font-semibold text-foreground"
								: "text-muted-foreground"
						}
					>
						{part}
					</span>
				</span>
			))}
		</div>
	);
}

// ─── Code Panel ───────────────────────────────────────────────────────────────

interface CodePanelProps {
	file: PreviewVirtualFile | null;
	allFiles: PreviewVirtualFile[];
	fileCount: number;
	directoryCount: number;
	loading: boolean;
}

function SkeletonLines() {
	const widths = [
		45, 72, 58, 91, 63, 85, 49, 77, 60, 88, 52, 75, 68, 94, 56, 82, 71, 59,
	];
	return (
		<div className="animate-pulse p-4 space-y-2">
			{widths.map((w, i) => (
				<div
					key={i}
					className="h-3.5 rounded bg-white/5"
					style={{ width: `${w}%` }}
				/>
			))}
		</div>
	);
}

function CodePanel({
	file,
	allFiles,
	fileCount,
	directoryCount,
	loading,
}: CodePanelProps) {
	const [copied, setCopied] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [tokenLines, setTokenLines] = useState<ThemedToken[][]>([]);
	const [highlightLoading, setHighlightLoading] = useState(false);
	const copyTimerRef = useRef<number | null>(null);

	// Highlight selected file
	useEffect(() => {
		if (!file) {
			setTokenLines([]);
			return;
		}
		let cancelled = false;
		setHighlightLoading(true);
		const run = async () => {
			try {
				const hl = await getHighlighter();
				const result = hl.codeToTokens(file.contents, {
					lang: normalizeLanguage(file.language),
					theme: SHIKI_THEME,
				});
				if (!cancelled) {
					setTokenLines(result.tokens);
					setHighlightLoading(false);
				}
			} catch {
				if (!cancelled) {
					setTokenLines(
						file.contents
							.split("\n")
							.map((line) => [{ content: line, offset: 0, color: "#e6edf3" }]),
					);
					setHighlightLoading(false);
				}
			}
		};
		void run();
		return () => {
			cancelled = true;
		};
	}, [file]);

	const handleCopy = async () => {
		if (!file) return;
		await navigator.clipboard.writeText(file.contents);
		setCopied(true);
		if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
		copyTimerRef.current = window.setTimeout(() => setCopied(false), 1500);
	};

	const handleDownload = async () => {
		if (allFiles.length === 0) return;
		setDownloading(true);
		try {
			const zip = new JSZip();
			for (const f of allFiles) {
				// Strip the root folder name from path
				const zipPath = f.path.split("/").slice(1).join("/");
				zip.file(zipPath, f.contents);
			}
			const blob = await zip.generateAsync({ type: "blob" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${allFiles[0]?.path.split("/")[0] ?? "project"}.zip`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} finally {
			setDownloading(false);
		}
	};

	const renderedLines = useMemo(() => {
		const lineSeen = new Map<string, number>();
		return tokenLines.map((lineTokens) => {
			const signature = lineTokens
				.map((t) => `${t.content}|${t.color}|${t.offset}`)
				.join("||");
			const lineCount = (lineSeen.get(signature) ?? 0) + 1;
			lineSeen.set(signature, lineCount);

			const tokenSeen = new Map<string, number>();
			const renderedTokens = lineTokens.map((token) => {
				const sig = `${token.content}|${token.color}|${token.offset}`;
				const tc = (tokenSeen.get(sig) ?? 0) + 1;
				tokenSeen.set(sig, tc);
				return { token, key: `${sig}:${tc}` };
			});

			return {
				key: `${file?.path ?? "empty"}:${signature}:${lineCount}`,
				tokens: renderedTokens,
			};
		});
	}, [tokenLines, file?.path]);

	const isEmpty = !loading && !file;

	return (
		<div className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-border bg-background/60">
			{/* Header */}
			<div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2 gap-3">
				<div className="min-w-0 flex-1">
					{file ? (
						<Breadcrumb path={file.path} />
					) : (
						<span className="text-xs text-muted-foreground font-mono">
							Select a file
						</span>
					)}
					<div className="mt-0.5 flex items-center gap-2">
						<span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
							{directoryCount} folder{directoryCount !== 1 ? "s" : ""} ·{" "}
							{fileCount} file{fileCount !== 1 ? "s" : ""}
						</span>
						<span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-500/80">
							Static preview
						</span>
					</div>
				</div>
				<div className="flex shrink-0 items-center gap-1.5">
					<button
						type="button"
						onClick={handleCopy}
						disabled={!file}
						title="Copy file contents"
						className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${
							copied
								? "border-primary/40 bg-primary/10 text-primary"
								: "border-border bg-muted/40 text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
						} disabled:opacity-40 disabled:cursor-not-allowed`}
					>
						{copied ? (
							<FiCheck className="h-3.5 w-3.5" />
						) : (
							<FiCopy className="h-3.5 w-3.5" />
						)}
						{copied ? "Copied" : "Copy"}
					</button>
					<button
						type="button"
						onClick={handleDownload}
						disabled={allFiles.length === 0 || downloading}
						title="Download all files as .zip"
						className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:bg-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
					>
						<FiDownload
							className={`h-3.5 w-3.5 ${downloading ? "animate-bounce" : ""}`}
						/>
						{downloading ? "Zipping..." : "Download"}
					</button>
				</div>
			</div>

			{/* Code area */}
			<div
				className="min-h-0 flex-1 overflow-auto font-mono text-xs leading-5"
				style={{ backgroundColor: "#0d1117", color: "#e6edf3" }}
			>
				{isEmpty ? (
					<div className="flex h-full items-center justify-center">
						<p className="text-xs text-muted-foreground">
							Select a file from the explorer
						</p>
					</div>
				) : loading || highlightLoading ? (
					<SkeletonLines />
				) : (
					<table
						className="w-full border-collapse"
						style={{ tableLayout: "fixed" }}
					>
						<colgroup>
							<col style={{ width: "3rem" }} />
							<col />
						</colgroup>
						<tbody>
							{renderedLines.map((line, lineIndex) => (
								<tr key={line.key}>
									<td
										className="select-none border-r px-3 align-top text-right"
										style={{
											color: "#7d8590",
											borderColor: "rgba(255,255,255,0.06)",
										}}
									>
										{lineIndex + 1}
									</td>
									<td className="pl-4 pr-6">
										<pre className="whitespace-pre">
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
				)}
			</div>
		</div>
	);
}

// ─── Root CodeView ────────────────────────────────────────────────────────────

export function CodeView() {
	const manifest = useStackerManifest();
	const { tree, fileCount, directoryCount, loading, error } =
		usePreviewTree(manifest);

	const [selectedPath, setSelectedPath] = useState<string>("");
	const [search, setSearch] = useState("");
	const searchRef = useRef<HTMLInputElement>(null);

	const selectedFile = useMemo(() => {
		if (!tree || !selectedPath) return null;
		return findFileByPath(tree, selectedPath);
	}, [tree, selectedPath]);

	const allFiles = useMemo(() => (tree ? flattenFiles(tree) : []), [tree]);

	// Auto-select first meaningful file on tree load
	useEffect(() => {
		if (!tree || selectedPath) return;
		const readme = findFileByPath(tree, `${tree.path}/README.md`);
		const pkg = findFileByPath(tree, `${tree.path}/package.json`);
		const first = allFiles[0] ?? null;
		const target = readme ?? pkg ?? first;
		if (target) setSelectedPath(target.path);
	}, [tree, selectedPath, allFiles]);

	const handleSelectFile = useCallback((file: PreviewVirtualFile) => {
		setSelectedPath(file.path);
	}, []);

	// Keyboard shortcut: Ctrl+K to focus search
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				searchRef.current?.focus();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	if (error && !tree) {
		return (
			<div className="flex h-full items-center justify-center rounded-xl border border-destructive/40 bg-destructive/5 p-8">
				<div className="text-center">
					<p className="text-sm font-medium text-destructive">Preview error</p>
					<p className="mt-1 text-xs text-muted-foreground">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full animate-in fade-in duration-300">
			<div className="grid h-full gap-2 rounded-xl border border-border bg-[#0d1117]/30 p-2 lg:grid-cols-[260px_1fr]">
				{/* Left: File explorer */}
				<div className="flex min-h-0 flex-col gap-1.5 overflow-hidden rounded-lg border border-border bg-background/50">
					{/* Search bar */}
					<div className="shrink-0 border-b border-border px-2 py-2">
						<div className="relative flex items-center">
							<FiSearch className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
							<input
								ref={searchRef}
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search files…"
								className="w-full rounded-md border border-transparent bg-muted/50 py-1.5 pl-8 pr-7 text-xs placeholder:text-muted-foreground focus:border-primary/40 focus:bg-background focus:outline-none transition-colors"
							/>
							<AnimatePresence>
								{search && (
									<motion.button
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.8 }}
										type="button"
										onClick={() => setSearch("")}
										className="absolute right-2 text-muted-foreground hover:text-foreground transition-colors"
									>
										<FiX className="h-3 w-3" />
									</motion.button>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Tree */}
					<div className="min-h-0 flex-1 overflow-auto px-1 pb-2">
						{loading && !tree ? (
							<div className="space-y-1.5 p-2 animate-pulse">
								{Array.from({ length: 12 }).map((_, i) => (
									<div
										key={i}
										className="h-5 rounded bg-muted/40"
										style={{
											width: `${40 + Math.sin(i * 1.7) * 30 + 20}%`,
											marginLeft:
												i % 3 === 0 ? "0" : i % 3 === 1 ? "14px" : "28px",
										}}
									/>
								))}
							</div>
						) : tree ? (
							<FileExplorer
								root={tree}
								selectedPath={selectedPath}
								onSelect={handleSelectFile}
								search={search}
							/>
						) : null}
					</div>
				</div>

				{/* Right: Code panel */}
				<CodePanel
					file={selectedFile}
					allFiles={allFiles}
					fileCount={fileCount}
					directoryCount={directoryCount}
					loading={loading && !tree}
				/>
			</div>
		</div>
	);
}

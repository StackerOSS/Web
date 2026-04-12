import { useEffect, useRef, useState } from "react";
import type { StackerManifest } from "@/lib/stacker";
import type {
	PreviewVirtualDirectory,
	PreviewVirtualFile,
} from "@/types/preview-tree";

export interface PreviewTreeState {
	tree: PreviewVirtualDirectory | null;
	fileCount: number;
	directoryCount: number;
	loading: boolean;
	error: string | null;
}

type PreviewResponse = {
	success: boolean;
	tree?: {
		root: PreviewVirtualDirectory;
		fileCount: number;
		directoryCount: number;
	};
	error?: string;
};

export function collectInitialExpanded(
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

export function findFileByPath(
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

export function flattenFiles(
	node: PreviewVirtualDirectory,
): PreviewVirtualFile[] {
	const result: PreviewVirtualFile[] = [];
	for (const child of node.children) {
		if (child.type === "file") {
			result.push(child);
		} else {
			result.push(...flattenFiles(child));
		}
	}
	return result;
}

/** Debounced fetch of the preview tree from /api/preview */
export function usePreviewTree(
	manifest: StackerManifest,
	debounceMs = 300,
): PreviewTreeState {
	const [tree, setTree] = useState<PreviewVirtualDirectory | null>(null);
	const [fileCount, setFileCount] = useState(0);
	const [directoryCount, setDirectoryCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Stable JSON key to detect changes
	const manifestJson = JSON.stringify(manifest);
	const lastFetchedRef = useRef<string>("");

	useEffect(() => {
		if (lastFetchedRef.current === manifestJson && tree !== null) return;

		const controller = new AbortController();
		const timer = window.setTimeout(async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch("/api/preview", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: manifestJson,
					signal: controller.signal,
				});
				const data = (await res.json()) as PreviewResponse;
				if (!data.success || !data.tree) {
					throw new Error(data.error ?? "Failed to generate preview");
				}
				lastFetchedRef.current = manifestJson;
				setTree(data.tree.root);
				setFileCount(data.tree.fileCount);
				setDirectoryCount(data.tree.directoryCount);
			} catch (err) {
				if (controller.signal.aborted) return;
				setError(
					err instanceof Error ? err.message : "Failed to generate preview",
				);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}, debounceMs);

		return () => {
			clearTimeout(timer);
			controller.abort();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [manifestJson, debounceMs]);

	return { tree, fileCount, directoryCount, loading, error };
}

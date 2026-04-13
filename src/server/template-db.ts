import { put, list } from "@vercel/blob";
import { createHash } from "node:crypto";

const PREFIX = "templates";

export function generateTemplateId(manifest: unknown): string {
	const hash = createHash("sha256")
		.update(JSON.stringify(manifest))
		.digest("base64url");
	return hash.slice(0, 6);
}

/**
 * Persist a manifest to Vercel Blob.
 * Uses addRandomSuffix: false so the path is deterministic by ID.
 */
export async function saveTemplate(
	id: string,
	manifest: unknown,
): Promise<void> {
	await put(`${PREFIX}/${id}.json`, JSON.stringify(manifest), {
		access: "private",
		contentType: "application/json",
		addRandomSuffix: false,
	});
}

/**
 * Retrieve a manifest by its short ID.
 * Uses list() to resolve the full blob URL, then fetches the JSON.
 */
export async function fetchTemplate(id: string): Promise<unknown | null> {
	try {
		const { blobs } = await list({
			prefix: `${PREFIX}/${id}.json`,
			limit: 1,
		});
		const blob = blobs[0];
		if (!blob) return null;
		const res = await fetch(blob.url);
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}

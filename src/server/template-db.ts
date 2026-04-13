import { put, list, head, download } from "@vercel/blob";
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
 *
 * Private blobs cannot be fetched via the raw blob.url from list() —
 * that URL is unsigned and will return 401/403.
 *
 * Strategy:
 *  1. Use list() to confirm the blob exists and get the canonical pathname.
 *  2. Use download() to get an authenticated, server-side stream.
 *  3. Parse and return the JSON.
 */
export async function fetchTemplate(id: string): Promise<unknown | null> {
  try {
    // Step 1 — resolve the full pathname from the short ID
    const { blobs } = await list({
      prefix: `${PREFIX}/${id}.json`,
      limit: 1,
    });

    const blob = blobs[0];
    if (!blob) return null;

    // Step 2 — download() returns a Response-like object with a signed URL
    // that is valid server-side. This is the correct API for private blobs.
    const { body } = await download(blob.url, {
      token: process.env.BLOB_READ_WRITE_TOKEN, // explicit token avoids env lookup surprises
    });

    if (!body) return null;

    // Step 3 — stream to text, then parse
    const reader = body.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const text = new TextDecoder().decode(
      chunks.reduce((acc, chunk) => {
        const merged = new Uint8Array(acc.length + chunk.length);
        merged.set(acc, 0);
        merged.set(chunk, acc.length);
        return merged;
      }, new Uint8Array(0)),
    );

    return JSON.parse(text);
  } catch (err) {
    console.error("[fetchTemplate] Failed to fetch blob:", err);
    return null;
  }
}

/**
 * Alternative: use head() to get a short-lived signed URL,
 * then fetch it. Cleaner if you just want a URL to pass around.
 *
 * Note: downloadUrl expires after ~1 hour by default.
 */
export async function fetchTemplateViaSignedUrl(
  id: string,
): Promise<unknown | null> {
  try {
    const { blobs } = await list({
      prefix: `${PREFIX}/${id}.json`,
      limit: 1,
    });

    const blob = blobs[0];
    if (!blob) return null;

    // head() returns blob metadata + a short-lived signed downloadUrl
    const { downloadUrl } = await head(blob.url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const res = await fetch(downloadUrl);
    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("[fetchTemplateViaSignedUrl] Failed:", err);
    return null;
  }
}
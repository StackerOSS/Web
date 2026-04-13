import { put, list, head } from "@vercel/blob";
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
    // Step 1 — confirm the blob exists and get its canonical URL
    const { blobs } = await list({
      prefix: `${PREFIX}/${id}.json`,
      limit: 1,
    });

    const blob = blobs[0];
    if (!blob) return null;

    // Step 2 — head() returns a short-lived signed downloadUrl for private blobs
    const { downloadUrl } = await head(blob.url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Step 3 — fetch the signed URL (no auth header needed — signature is in the URL)
    const res = await fetch(downloadUrl);
    if (!res.ok) {
      console.error(`[fetchTemplate] Signed fetch failed: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("[fetchTemplate] Failed to fetch blob:", err);
    return null;
  }
}

// fetchTemplateViaSignedUrl is now the same as fetchTemplate above.
// Kept as a named alias for call-site clarity if needed.
export const fetchTemplateViaSignedUrl = fetchTemplate;
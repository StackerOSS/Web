import { put, list, get } from "@vercel/blob";
import { createHash } from "node:crypto";

const PREFIX = "templates";

export function generateTemplateId(manifest: unknown): string {
  const hash = createHash("sha256")
    .update(JSON.stringify(manifest))
    .digest("base64url");
  return hash.slice(0, 6);
}

export async function saveTemplate(
  id: string,
  manifest: unknown,
): Promise<void> {
  await put(`${PREFIX}/${id}.json`, JSON.stringify(manifest), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function fetchTemplate(id: string): Promise<unknown | null> {
  const pathname = `${PREFIX}/${id}.json`;

  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 });
    if (!blobs.length) return null;

    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const reader = result.stream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.length;
    }

    return JSON.parse(new TextDecoder().decode(merged));
  } catch (err) {
    console.error(`[fetchTemplate] Failed for id="${id}":`, err);
    return null;
  }
}
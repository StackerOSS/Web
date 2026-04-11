import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import type { StackerManifest } from "@/lib/stacker";
import { buildPreviewTree, countTree } from "@/server/preview-tree";

export const Route = createFileRoute("/api/preview")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const manifest = (await request.json()) as StackerManifest;
					const root = buildPreviewTree(manifest);
					const { fileCount, directoryCount } = countTree(root);
					return json({
						success: true,
						tree: { root, fileCount, directoryCount },
					});
				} catch (error) {
					return json(
						{
							success: false,
							error:
								error instanceof Error
									? error.message
									: "Failed to generate preview",
						},
						{ status: 500 },
					);
				}
			},
		},
	},
});

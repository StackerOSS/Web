import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createHash } from "node:crypto";
import { saveTemplate } from "@/server/template-db";

export const Route = createFileRoute("/api/templates/")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = await request.json();

					const id = createHash("sha256")
						.update(JSON.stringify(body))
						.digest("base64url")
						.slice(0, 6);

					console.log(`[Template] Saving template with ID: ${id}`);
					await saveTemplate(id, body);
					console.log(`[Template] Successfully saved template: ${id}`);

					return json({ id });
				} catch (error) {
					console.error("[Template] Error saving template:", error);
					return json(
						{ error: "Failed to save template", details: String(error) },
						{ status: 500 }
					);
				}
			},
		},
	},
});

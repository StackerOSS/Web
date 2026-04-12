import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createHash } from "node:crypto";
import { saveTemplate } from "@/server/template-db";

export const Route = createFileRoute("/api/templates/")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.json();

				const id = createHash("sha256")
					.update(JSON.stringify(body))
					.digest("base64url")
					.slice(0, 6);

				await saveTemplate(id, body);

				return json({ id });
			},
		},
	},
});

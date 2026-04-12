import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { fetchTemplate } from "@/server/template-db";

export const Route = createFileRoute("/api/templates/$id")({
	server: {
		handlers: {
			GET: async ({ params }: { params: { id: string } }) => {
				const config = await fetchTemplate(params.id);

				if (config) {
					return json(config);
				}

				return new Response(JSON.stringify({ error: "Template not found" }), {
					status: 404,
					headers: { "content-type": "application/json" },
				});
			},
		},
	},
});

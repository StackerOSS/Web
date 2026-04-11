import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { readTemplateDb } from "@/server/template-db";

export const Route = createFileRoute("/api/templates/$id")({
	server: {
		handlers: {
			GET: async ({ params }: { params: { id: string } }) => {
				const db = readTemplateDb();
				const config = db[params.id];

				if (config) {
					return json(config);
				}

				return new Response(JSON.stringify({ error: "Not found" }), {
					status: 404,
					headers: { "content-type": "application/json" },
				});
			},
		},
	},
});

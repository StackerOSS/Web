import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { createHash } from "crypto";
import { readTemplateDb, writeTemplateDb } from "@/server/template-db";

export const Route = createFileRoute("/api/templates/")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const body = await request.json();
				const db = readTemplateDb();

				const hash = createHash("sha256")
					.update(JSON.stringify(body))
					.digest("base64url");
				const id = hash.slice(0, 6);
				db[id] = body;
				writeTemplateDb(db);

				return json({ id });
			},
		},
	},
});

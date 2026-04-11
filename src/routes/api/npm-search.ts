import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/npm-search")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const url = new URL(request.url);
				const q = url.searchParams.get("q")?.trim() ?? "";

				if (q.length < 2) {
					return json({ packages: [] });
				}

				const response = await fetch(
					`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q)}&size=8`,
				);

				if (!response.ok) {
					return json({ packages: [] }, { status: 502 });
				}

				const data = (await response.json()) as {
					objects?: Array<{
						package?: {
							name?: string;
							description?: string;
						};
					}>;
				};

				return json({
					packages: (data.objects ?? [])
						.map((entry) => ({
							name: entry.package?.name ?? "",
							description: entry.package?.description ?? "",
						}))
						.filter((entry) => entry.name),
				});
			},
		},
	},
});

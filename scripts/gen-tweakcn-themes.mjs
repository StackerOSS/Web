import fs from "node:fs";

const src =
	process.argv[2] ||
	"C:/Users/Ranve/.cursor/projects/v-stacker/agent-tools/51df963f-3551-4e11-94c1-ca583c184590.txt";
const dest = new URL("../src/lib/tweakcn-registry-themes.ts", import.meta.url);

const j = JSON.parse(fs.readFileSync(src, "utf8"));
const keys = [
	"background",
	"foreground",
	"card",
	"card-foreground",
	"popover",
	"popover-foreground",
	"primary",
	"primary-foreground",
	"secondary",
	"secondary-foreground",
	"muted",
	"muted-foreground",
	"accent",
	"accent-foreground",
	"destructive",
	"destructive-foreground",
	"border",
	"input",
	"ring",
];

const items = j.items
	.filter((i) => i.type === "registry:style")
	.map((i) => {
		const L = i.cssVars?.light ?? {};
		const palette = {};
		for (const k of keys) {
			palette[k] = L[k] ?? "#888888";
		}
		return {
			id: i.name,
			label: i.title,
			description: i.description,
			palette,
		};
	});

const header = `// Derived from tweakcn registry (registry:style items).
// Source: https://github.com/jnsahaj/tweakcn/blob/main/public/r/registry.json
`;

const body = `export const TWEAKCN_REGISTRY_THEMES = ${JSON.stringify(items, null, "\t")} as const;

export type TweakcnRegistryThemeId = (typeof TWEAKCN_REGISTRY_THEMES)[number]["id"];
`;

fs.writeFileSync(dest, header + body);
console.log("Wrote", items.length, "themes to", dest.pathname);

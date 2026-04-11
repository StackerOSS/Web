import type { StackerManifest } from "@/lib/stacker";
import type {
	PreviewVirtualDirectory,
	PreviewVirtualFile,
} from "@/types/preview-tree";

type FileInput = {
	path: string;
	contents: string;
	language: string;
};

function toLanguage(path: string): string {
	if (path.endsWith(".tsx")) return "tsx";
	if (path.endsWith(".ts")) return "typescript";
	if (path.endsWith(".json")) return "json";
	if (path.endsWith(".css")) return "css";
	if (path.endsWith(".md")) return "markdown";
	if (path.endsWith(".mjs")) return "javascript";
	if (path.endsWith(".js")) return "javascript";
	if (path.endsWith(".astro")) return "astro";
	if (path.endsWith(".php")) return "php";
	if (path.endsWith(".blade.php")) return "html";
	if (path.endsWith(".html")) return "html";
	if (path.endsWith(".toml")) return "toml";
	if (path.endsWith(".yml") || path.endsWith(".yaml")) return "yaml";
	return "plaintext";
}

function makePackageJson(manifest: StackerManifest): string {
	const deps = new Map<string, string>();
	const devDeps = new Map<string, string>();

	deps.set("react", "^19.2.0");
	deps.set("react-dom", "^19.2.0");
	devDeps.set("typescript", "^5.7.2");

	if (manifest.frontend.uiSystem === "shadcn/ui") {
		deps.set("class-variance-authority", "^0.7.1");
		deps.set("clsx", "^2.1.1");
		deps.set("tailwind-merge", "^3.5.0");
	}
	for (const addon of manifest.frontend.tanstackAddons) {
		if (addon === "query") deps.set("@tanstack/react-query", "latest");
		if (addon === "router") deps.set("@tanstack/react-router", "latest");
		if (addon === "form") deps.set("@tanstack/react-form", "latest");
		if (addon === "table") deps.set("@tanstack/react-table", "latest");
		if (addon === "store") deps.set("@tanstack/react-store", "latest");
		if (addon === "devtools")
			deps.set("@tanstack/react-query-devtools", "latest");
	}
	for (const pkg of manifest.addons.packages) {
		deps.set(pkg, "latest");
	}

	const scriptDev =
		manifest.starter.framework === "Next.js"
			? "next dev"
			: manifest.starter.framework === "Astro"
				? "astro dev"
				: manifest.starter.framework === "Laravel"
					? "php artisan serve"
					: "vite";

	return JSON.stringify(
		{
			name: manifest.project.name,
			private: true,
			type: "module",
			scripts: {
				dev: scriptDev,
				build: "tsc --noEmit",
			},
			dependencies: Object.fromEntries([...deps.entries()].sort()),
			devDependencies: Object.fromEntries([...devDeps.entries()].sort()),
		},
		null,
		2,
	);
}

function addShadcnFiles(files: FileInput[], manifest: StackerManifest) {
	if (manifest.frontend.uiSystem !== "shadcn/ui" || !manifest.frontend.shadcn) {
		return;
	}
	files.push({
		path: "components.json",
		language: "json",
		contents: JSON.stringify(
			{
				$schema: "https://ui.shadcn.com/schema.json",
				style: manifest.frontend.shadcn.style,
				rsc: true,
				tsx: true,
				tailwind: {
					config: "",
					css: "src/styles.css",
					baseColor: manifest.frontend.shadcn.baseColor,
					cssVariables: true,
				},
			},
			null,
			2,
		),
	});
	files.push({
		path: "src/lib/utils.ts",
		language: "typescript",
		contents: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
	});
	for (const component of manifest.frontend.shadcn.components) {
		files.push({
			path: `src/components/ui/${component}.tsx`,
			language: "tsx",
			contents: `export function ${component
				.split("-")
				.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
				.join("")}() {
  return <div>${component} component</div>;
}
`,
		});
	}
}

function frameworkFiles(manifest: StackerManifest): FileInput[] {
	const framework = manifest.starter.framework;
	if (framework === "Next.js") {
		return [
			{
				path: "next.config.ts",
				language: "typescript",
				contents: `import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
`,
			},
			{
				path: "app/layout.tsx",
				language: "tsx",
				contents: `import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,
			},
			{
				path: "app/page.tsx",
				language: "tsx",
				contents: `export default function Page() {
  return <main>${manifest.project.name}</main>;
}
`,
			},
			{
				path: "app/globals.css",
				language: "css",
				contents: `@import "tailwindcss";
`,
			},
		];
	}
	if (framework === "TanStack Start") {
		return [
			{
				path: "app/routes/__root.tsx",
				language: "tsx",
				contents: `import { createRootRoute, Outlet } from "@tanstack/react-router";
export const Route = createRootRoute({ component: () => <Outlet /> });
`,
			},
			{
				path: "app/routes/index.tsx",
				language: "tsx",
				contents: `import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
  component: () => <div>${manifest.project.name}</div>,
});
`,
			},
			{
				path: "app/client.tsx",
				language: "tsx",
				contents: `import { createStart } from "@tanstack/react-start";
export const start = createStart(() => {});
`,
			},
			{
				path: "vite.config.ts",
				language: "typescript",
				contents: `import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
export default defineConfig({ plugins: [tanstackStart()] });
`,
			},
		];
	}
	if (framework === "React Router") {
		return [
			{
				path: "app/root.tsx",
				language: "tsx",
				contents: `import { Outlet } from "react-router";
export default function Root() {
  return <Outlet />;
}
`,
			},
			{
				path: "app/routes.ts",
				language: "typescript",
				contents: `import { type RouteConfig, index } from "@react-router/dev/routes";
export default [index("routes/home.tsx")] satisfies RouteConfig;
`,
			},
			{
				path: "app/routes/home.tsx",
				language: "tsx",
				contents: `export default function Home() {
  return <main>${manifest.project.name}</main>;
}
`,
			},
		];
	}
	if (framework === "Astro") {
		return [
			{
				path: "astro.config.mjs",
				language: "javascript",
				contents: `import { defineConfig } from "astro/config";
export default defineConfig({});
`,
			},
			{
				path: "src/pages/index.astro",
				language: "astro",
				contents: `---
const title = "${manifest.project.name}";
---
<html lang="en">
  <head><title>{title}</title></head>
  <body><h1>{title}</h1></body>
</html>
`,
			},
		];
	}
	if (framework === "Laravel") {
		return [
			{
				path: "routes/web.php",
				language: "php",
				contents: `<?php
use Illuminate\\Support\\Facades\\Route;
Route::get('/', function () { return view('welcome'); });
`,
			},
			{
				path: "resources/views/welcome.blade.php",
				language: "html",
				contents: `<!doctype html>
<html lang="en">
  <body>
    <h1>${manifest.project.name}</h1>
  </body>
</html>
`,
			},
		];
	}
	return [
		{
			path: "index.html",
			language: "html",
			contents: `<!doctype html>
<html lang="en">
  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
		},
		{
			path: "src/main.tsx",
			language: "tsx",
			contents: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
		},
		{
			path: "src/App.tsx",
			language: "tsx",
			contents: `export default function App() {
  return <main>${manifest.project.name}</main>;
}
`,
		},
		{
			path: "src/styles.css",
			language: "css",
			contents: `:root { color-scheme: light dark; }`,
		},
	];
}

function addBackendFiles(files: FileInput[], manifest: StackerManifest) {
	if (manifest.backend.database === "Convex") {
		files.push({
			path: "convex/schema.ts",
			language: "typescript",
			contents: `import { defineSchema, defineTable } from "convex/server";
export default defineSchema({ users: defineTable({ name: "string" }) });
`,
		});
	}
	if (manifest.backend.orm === "Prisma") {
		files.push({
			path: "prisma/schema.prisma",
			language: "prisma",
			contents: `generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }
model User { id String @id @default(cuid()) email String @unique }
`,
		});
	}
}

function addCommonFiles(files: FileInput[], manifest: StackerManifest) {
	files.push(
		{
			path: "README.md",
			language: "markdown",
			contents: `# ${manifest.project.name}

Generated with Stacker.

- Framework: ${manifest.starter.framework} (${manifest.starter.runtime})
- UI: ${manifest.frontend.uiSystem || "none"}
- Package manager: ${manifest.project.packageManager}
`,
		},
		{
			path: ".gitignore",
			language: "plaintext",
			contents: `node_modules
dist
build
.env
.env.local
`,
		},
		{
			path: ".env.example",
			language: "dotenv",
			contents: `NODE_ENV=development
`,
		},
		{
			path: "package.json",
			language: "json",
			contents: makePackageJson(manifest),
		},
		{
			path: "tsconfig.json",
			language: "json",
			contents: JSON.stringify(
				{
					compilerOptions: {
						target: "ES2022",
						module: "ESNext",
						moduleResolution: "Bundler",
						jsx: "react-jsx",
						strict: true,
						noEmit: true,
					},
					include: ["src", "app", "routes"],
				},
				null,
				2,
			),
		},
	);
}

export function buildPreviewTree(
	manifest: StackerManifest,
): PreviewVirtualDirectory {
	const files: FileInput[] = [];
	addCommonFiles(files, manifest);
	files.push(...frameworkFiles(manifest));
	addShadcnFiles(files, manifest);
	addBackendFiles(files, manifest);

	const root: PreviewVirtualDirectory = {
		type: "directory",
		name: manifest.project.name,
		path: manifest.project.name,
		children: [],
	};

	for (const input of files) {
		const normalized = input.path.replaceAll("\\", "/");
		const parts = normalized.split("/").filter(Boolean);
		let current = root;

		for (let i = 0; i < parts.length; i++) {
			const name = parts[i] ?? "";
			const nodePath = `${current.path}/${name}`;
			const isLeaf = i === parts.length - 1;

			if (isLeaf) {
				const fileNode: PreviewVirtualFile = {
					type: "file",
					name,
					path: nodePath,
					contents: input.contents,
					language: input.language || toLanguage(name),
				};
				current.children.push(fileNode);
			} else {
				let next = current.children.find(
					(node) => node.type === "directory" && node.name === name,
				) as PreviewVirtualDirectory | undefined;
				if (!next) {
					next = {
						type: "directory",
						name,
						path: nodePath,
						children: [],
					};
					current.children.push(next);
				}
				current = next;
			}
		}
	}

	const sortTree = (node: PreviewVirtualDirectory) => {
		node.children.sort((a, b) => {
			if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
			return a.name.localeCompare(b.name);
		});
		for (const child of node.children) {
			if (child.type === "directory") sortTree(child);
		}
	};
	sortTree(root);
	return root;
}

export function countTree(node: PreviewVirtualDirectory) {
	let files = 0;
	let directories = 1;
	const walk = (dir: PreviewVirtualDirectory) => {
		for (const child of dir.children) {
			if (child.type === "file") {
				files += 1;
			} else {
				directories += 1;
				walk(child);
			}
		}
	};
	walk(node);
	return { fileCount: files, directoryCount: directories };
}

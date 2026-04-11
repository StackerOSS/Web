import type { TweakcnRegistryThemeId } from "./tweakcn-registry-themes";
import { TWEAKCN_REGISTRY_THEMES } from "./tweakcn-registry-themes";

export type PackageManager = "bun" | "pnpm" | "npm" | "yarn";
export type SidebarTab = "General" | "Frontend" | "Backend" | "Addons";
export type PreviewTab = "Code" | "Preview";
export type Framework =
	| "Next.js"
	| "Vite"
	| "TanStack Start"
	| "React Router"
	| "Astro"
	| "Laravel";
export type Runtime = "React" | "Solid";
export type UiSystem = "shadcn/ui" | "Base UI" | "Radix primitives" | "";
export type ShadcnBase = "radix" | "base";
export type ShadcnCliStyle = "new-york" | "default";
export type ShadcnStyle =
	| ShadcnCliStyle
	| "vega"
	| "nova"
	| "maia"
	| "lyra"
	| "mira"
	| "luma";

export const SHADCN_STYLE_OPTIONS: Array<{
	value: ShadcnStyle;
	label: string;
}> = [
	{ value: "vega", label: "Vega" },
	{ value: "nova", label: "Nova" },
	{ value: "maia", label: "Maia" },
	{ value: "lyra", label: "Lyra" },
	{ value: "mira", label: "Mira" },
	{ value: "luma", label: "Luma" },
	{ value: "new-york", label: "New York" },
	{ value: "default", label: "Default" },
];

/** Matches shadcn/ui docs: Border Radius → Default/None/Small/Medium/Large */
export type ShadcnBorderRadius = "default" | "none" | "sm" | "md" | "lg";
export const SHADCN_BORDER_RADIUS_OPTIONS: Array<{
	value: ShadcnBorderRadius;
	label: string;
}> = [
	{ value: "default", label: "Default" },
	{ value: "none", label: "None" },
	{ value: "sm", label: "Small" },
	{ value: "md", label: "Medium" },
	{ value: "lg", label: "Large" },
];

export function resolveShadcnCliStyle(style: ShadcnStyle): ShadcnCliStyle {
	if (style === "default") {
		return "default";
	}
	return "new-york";
}

/** tweakcn registry id, plus legacy ids still accepted in saved manifests */
export type TweakcnTheme = TweakcnRegistryThemeId | "default" | "darkmatter";

export interface StackerManifest {
	version: 1;
	project: {
		name: string;
		packageManager: PackageManager;
		git: boolean;
		install: boolean;
	};
	starter: {
		framework: Framework;
		runtime: Runtime;
		id: string;
	};
	frontend: {
		uiSystem: UiSystem;
		shadcn: {
			base: ShadcnBase;
			style: string;
			baseColor: string;
			borderRadius: string;
			iconLibrary: string;
			font: string;
			tweakcnTheme: TweakcnTheme;
			components: string[];
		} | null;
		tanstackAddons: string[];
	};
	backend: {
		database: "Neon" | "Convex" | "";
		orm: "Prisma" | "Drizzle" | "";
		auth: "WorkOS" | "Clerk" | "BetterAuth" | "";
		apiLayer: "MCP" | "ORPC" | "tRPC" | "Apollo Client" | "";
	};
	addons: {
		integrations: string[];
		deployment: string;
		monitoring: string;
		i18n: string;
		devTooling: string[];
		typings: "Zod" | "ArkType" | "";
		animations: "Framer Motion" | "Motion" | "AutoAnimate" | "GSAP" | "";
		packages: string[];
	};
}

export interface GeneratedFile {
	path: string;
	language: string;
	contents: string;
	description: string;
}

export interface GeneratedDiff {
	path: string;
	oldContents: string;
	newContents: string;
}

export const FRAMEWORKS: Array<{
	value: Framework;
	label: string;
	description: string;
	runtimes: Runtime[];
	starterId: string;
	shadcnTemplate:
		| "next"
		| "vite"
		| "start"
		| "react-router"
		| "astro"
		| "laravel";
}> = [
	{
		value: "Next.js",
		label: "Next.js",
		description: "App Router, SSR, and a batteries-included React stack.",
		runtimes: ["React"],
		starterId: "next-default",
		shadcnTemplate: "next",
	},
	{
		value: "Vite",
		label: "Vite",
		description: "Fast client-first app scaffolding for React or Solid.",
		runtimes: ["React", "Solid"],
		starterId: "vite-default",
		shadcnTemplate: "vite",
	},
	{
		value: "TanStack Start",
		label: "TanStack Start",
		description: "TanStack CLI with add-ons, SSR, and Start defaults.",
		runtimes: ["React", "Solid"],
		starterId: "tanstack-start",
		shadcnTemplate: "start",
	},
	{
		value: "React Router",
		label: "React Router",
		description:
			"Framework mode with the official create-react-router scaffolder.",
		runtimes: ["React"],
		starterId: "react-router-framework",
		shadcnTemplate: "react-router",
	},
	{
		value: "Astro",
		label: "Astro",
		description:
			"Content and island architecture with React component support.",
		runtimes: ["React"],
		starterId: "astro-minimal",
		shadcnTemplate: "astro",
	},
	{
		value: "Laravel",
		label: "Laravel",
		description: "Laravel starter flow with JS frontend integration.",
		runtimes: ["React"],
		starterId: "laravel-react",
		shadcnTemplate: "laravel",
	},
];

/** Matches shadcn new-york `registry:ui` items (add via `npx shadcn@latest add …`). */
export const SHADCN_COMPONENTS = [
	"accordion",
	"alert",
	"alert-dialog",
	"aspect-ratio",
	"avatar",
	"badge",
	"breadcrumb",
	"button",
	"button-group",
	"calendar",
	"card",
	"carousel",
	"chart",
	"checkbox",
	"collapsible",
	"command",
	"context-menu",
	"dialog",
	"drawer",
	"dropdown-menu",
	"empty",
	"field",
	"form",
	"hover-card",
	"input",
	"input-group",
	"input-otp",
	"item",
	"kbd",
	"label",
	"menubar",
	"navigation-menu",
	"pagination",
	"popover",
	"progress",
	"radio-group",
	"resizable",
	"scroll-area",
	"select",
	"separator",
	"sheet",
	"sidebar",
	"skeleton",
	"slider",
	"sonner",
	"spinner",
	"switch",
	"table",
	"tabs",
	"textarea",
	"toast",
	"toggle",
	"toggle-group",
	"tooltip",
] as const;

/** Avoid shell length limits when adding many components at once. */
export const SHADCN_CLI_ADD_BATCH_SIZE = 12;

export const OFFICIAL_TWEAKCN_THEMES: Array<{
	id: TweakcnRegistryThemeId;
	label: string;
	description: string;
}> = TWEAKCN_REGISTRY_THEMES.map((entry) => ({
	id: entry.id,
	label: entry.label,
	description: entry.description,
}));

/** Neutral scales shown in the builder (shadcn base color names). */
export const SHADCN_BASE_COLOR_NAMES = [
	"zinc",
	"neutral",
	"stone",
	"slate",
	"gray",
	"red",
	"rose",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"emerald",
	"teal",
	"cyan",
	"sky",
	"blue",
	"indigo",
	"violet",
	"purple",
	"fuchsia",
] as const;

export const TANSTACK_ADDONS = [
	{
		id: "query",
		label: "TanStack Query",
		description: "Server state, caching, and mutations.",
	},
	{
		id: "router",
		label: "TanStack Router",
		description: "Type-safe routing and route modules.",
	},
	{
		id: "form",
		label: "TanStack Form",
		description: "Composable forms without form boilerplate.",
	},
	{
		id: "table",
		label: "TanStack Table",
		description: "Headless tables and data grids.",
	},
	{
		id: "store",
		label: "TanStack Store",
		description: "Lightweight app state primitives.",
	},
	{
		id: "db",
		label: "TanStack DB",
		description: "Local-first querying where supported.",
	},
	{
		id: "devtools",
		label: "TanStack Devtools",
		description: "Devtools panels for TanStack libraries.",
	},
] as const;

export function pickDefaultRuntime(framework: Framework): Runtime {
	return (
		FRAMEWORKS.find((item) => item.value === framework)?.runtimes[0] ?? "React"
	);
}

export function getFrameworkMeta(framework: Framework) {
	return FRAMEWORKS.find((item) => item.value === framework) ?? FRAMEWORKS[0];
}

export function normalizeProjectName(value: string) {
	const fallback = "my-stacker-app";
	const normalized = value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9-_]+/g, "-")
		.replace(/-{2,}/g, "-")
		.replace(/^-|-$/g, "");

	return normalized || fallback;
}

export function buildManifest(input: {
	name: string;
	packageManager: PackageManager;
	git: boolean;
	install: boolean;
	framework: Framework;
	runtime: Runtime;
	uiSystem: UiSystem;
	shadcnBase: ShadcnBase;
	shadcnComponents: string[];
	tweakcnTheme: TweakcnTheme;
	themeStyle: ShadcnStyle;
	baseColor: string;
	borderRadius: string;
	iconLibrary: string;
	font: string;
	tanstackPackages: string[];
	database: "Neon" | "Convex" | "";
	orm: "Prisma" | "Drizzle" | "";
	auth: "WorkOS" | "Clerk" | "BetterAuth" | "";
	apiLayer: "MCP" | "ORPC" | "tRPC" | "Apollo Client" | "";
	integrations: string[];
	deployment: string;
	monitoring: string;
	i18n: string;
	devTooling: string[];
	typings: "Zod" | "ArkType" | "";
	animations: "Framer Motion" | "Motion" | "AutoAnimate" | "GSAP" | "";
	packages: string[];
}): StackerManifest {
	const frameworkMeta = getFrameworkMeta(input.framework);

	return {
		version: 1,
		project: {
			name: normalizeProjectName(input.name),
			packageManager: input.packageManager,
			git: input.git,
			install: input.install,
		},
		starter: {
			framework: input.framework,
			runtime: frameworkMeta.runtimes.includes(input.runtime)
				? input.runtime
				: frameworkMeta.runtimes[0],
			id: frameworkMeta.starterId,
		},
		frontend: {
			uiSystem: input.uiSystem,
			shadcn:
				input.uiSystem === "shadcn/ui"
					? {
							base: input.shadcnBase,
							style: input.themeStyle,
							baseColor: input.baseColor,
							borderRadius: input.borderRadius,
							iconLibrary: input.iconLibrary,
							font: input.font,
							tweakcnTheme: input.tweakcnTheme,
							components: [...input.shadcnComponents].sort(),
						}
					: null,
			tanstackAddons: [...input.tanstackPackages],
		},
		backend: {
			database: input.database,
			orm: input.orm,
			auth: input.auth,
			apiLayer: input.apiLayer,
		},
		addons: {
			integrations: [...input.integrations],
			deployment: input.deployment,
			monitoring: input.monitoring,
			i18n: input.i18n,
			devTooling: [...input.devTooling],
			typings: input.typings,
			animations: input.animations,
			packages: [...input.packages].sort(),
		},
	};
}

export function getManifestJson(manifest: StackerManifest) {
	return JSON.stringify(manifest, null, 2);
}

export function getInitCommand(templateId?: string) {
	return templateId
		? `bunx @stacker/cli ${templateId}`
		: "bunx @stacker/cli <id>";
}

export function summarizeManifest(manifest: StackerManifest) {
	return [
		`${manifest.starter.framework} (${manifest.starter.runtime})`,
		manifest.frontend.uiSystem ? `UI: ${manifest.frontend.uiSystem}` : null,
		manifest.frontend.shadcn
			? `${manifest.frontend.shadcn.base === "base" ? "Base UI" : "Radix"} + ${manifest.frontend.shadcn.components.length} shadcn components`
			: null,
		manifest.frontend.tanstackAddons.length > 0
			? `${manifest.frontend.tanstackAddons.length} TanStack add-ons`
			: null,
		manifest.addons.packages.length > 0
			? `${manifest.addons.packages.length} extra packages`
			: null,
	]
		.filter(Boolean)
		.join(" • ");
}

function getPackageRunner(packageManager: PackageManager) {
	switch (packageManager) {
		case "bun":
			return "bunx";
		case "pnpm":
			return "pnpm dlx";
		case "yarn":
			return "yarn dlx";
		default:
			return "npx";
	}
}

export function buildCommandPlan(manifest: StackerManifest) {
	const runner = getPackageRunner(manifest.project.packageManager);
	const commands: string[] = [];
	const targetDir = manifest.project.name;
	const installFlag = manifest.project.install ? "" : " --skip-install";
	const gitFlag = manifest.project.git ? "" : " --disable-git";

	switch (manifest.starter.framework) {
		case "Next.js":
			commands.push(
				`${runner} create-next-app@latest ${targetDir} --ts --tailwind --app --eslint --yes${installFlag}${gitFlag}`,
			);
			break;
		case "Vite":
			commands.push(
				`${runner} create-vite@latest ${targetDir} --template ${manifest.starter.runtime === "Solid" ? "solid-ts" : "react-ts"}`,
			);
			if (!manifest.project.install) {
				commands.push(`# install skipped by Stacker preference`);
			}
			break;
		case "TanStack Start":
			commands.push(
				`${runner} @tanstack/cli@latest create ${targetDir} --framework ${manifest.starter.runtime.toLowerCase()} --package-manager ${manifest.project.packageManager}${manifest.frontend.tanstackAddons.length > 0 ? ` --add-ons ${manifest.frontend.tanstackAddons.join(",")}` : ""}${manifest.project.install ? "" : " --no-install"}${manifest.project.git ? "" : " --no-git"} --yes`,
			);
			break;
		case "React Router":
			commands.push(
				`${runner} create-react-router@latest ${targetDir}${manifest.project.install ? "" : " --no-install"}`,
			);
			break;
		case "Astro":
			commands.push(`${runner} create astro@latest ${targetDir}`);
			break;
		case "Laravel":
			commands.push(`laravel new ${targetDir}`);
			break;
	}

	if (manifest.frontend.uiSystem === "shadcn/ui") {
		const template = getFrameworkMeta(
			manifest.starter.framework,
		).shadcnTemplate;
		commands.push(
			`cd ${targetDir} && ${runner} shadcn@latest init -t ${template} -b ${manifest.frontend.shadcn?.base ?? "radix"} -d`,
		);
		if (
			manifest.frontend.shadcn &&
			manifest.frontend.shadcn.components.length > 0
		) {
			const { components } = manifest.frontend.shadcn;
			for (let i = 0; i < components.length; i += SHADCN_CLI_ADD_BATCH_SIZE) {
				const batch = components.slice(i, i + SHADCN_CLI_ADD_BATCH_SIZE);
				commands.push(
					`cd ${targetDir} && ${runner} shadcn@latest add ${batch.join(" ")}`,
				);
			}
		}
	}

	if (manifest.addons.packages.length > 0) {
		const installCommand =
			manifest.project.packageManager === "bun"
				? "bun add"
				: manifest.project.packageManager === "pnpm"
					? "pnpm add"
					: manifest.project.packageManager === "yarn"
						? "yarn add"
						: "npm install";
		commands.push(
			`cd ${targetDir} && ${installCommand} ${manifest.addons.packages.join(" ")}`,
		);
	}

	return commands;
}

export function buildGeneratedFiles(
	manifest: StackerManifest,
): GeneratedFile[] {
	const stackerJson = getManifestJson(manifest);
	const files: GeneratedFile[] = [
		{
			path: "stacker.json",
			language: "json",
			contents: stackerJson,
			description:
				"Configuration consumed by the Stacker CLI when scaffolding.",
		},
	];

	const packageEntries = new Map<string, string>();
	const tanstackPackageMap: Record<string, string> = {
		query: "@tanstack/react-query",
		router: "@tanstack/react-router",
		form: "@tanstack/react-form",
		table: "@tanstack/react-table",
		store: "@tanstack/react-store",
		db: "@tanstack/react-db",
		devtools: "@tanstack/react-query-devtools",
	};
	for (const id of manifest.frontend.tanstackAddons) {
		const pkg = tanstackPackageMap[id];
		if (pkg) packageEntries.set(pkg, "latest");
	}
	for (const pkg of manifest.addons.packages) {
		packageEntries.set(pkg, "latest");
	}
	if (packageEntries.size > 0) {
		files.push({
			path: "package.json",
			language: "json",
			contents: JSON.stringify(
				{
					name: manifest.project.name,
					private: true,
					dependencies: Object.fromEntries(
						Array.from(packageEntries.entries()).sort((a, b) =>
							a[0].localeCompare(b[0]),
						),
					),
				},
				null,
				2,
			),
			description:
				"Dependency snapshot based on selected add-ons and packages.",
		});
	}

	files.push(
		{
			path: "README.md",
			language: "markdown",
			contents: `# ${manifest.project.name}

Generated by Stacker.

- Framework: ${manifest.starter.framework} (${manifest.starter.runtime})
- UI: ${manifest.frontend.uiSystem || "none"}
- Package manager: ${manifest.project.packageManager}
`,
			description: "Project readme scaffold.",
		},
		{
			path: ".gitignore",
			language: "plaintext",
			contents: `node_modules
.env
.env.local
dist
build
.turbo
`,
			description: "Common ignore rules for generated project.",
		},
		{
			path: ".env.example",
			language: "dotenv",
			contents: `# Example environment variables
NODE_ENV=development
`,
			description: "Environment variable template.",
		},
	);

	const baseScaffoldFiles: GeneratedFile[] = [
		{
			path: "src/main.tsx",
			language: "typescript",
			contents: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
			description: "Application entry point.",
		},
		{
			path: "src/app.tsx",
			language: "typescript",
			contents: `export function App() {
  return (
    <main>
      <h1>${manifest.project.name}</h1>
      <p>Generated with Stacker</p>
    </main>
  );
}
`,
			description: "Main app shell.",
		},
		{
			path: "src/lib/utils.ts",
			language: "typescript",
			contents: `export function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}
`,
			description: "Shared utility helpers.",
		},
		{
			path: "src/styles.css",
			language: "css",
			contents: `:root {
  color-scheme: light dark;
}

body {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
}
`,
			description: "Global styles.",
		},
	];
	files.push(...baseScaffoldFiles);

	if (manifest.frontend.uiSystem === "shadcn/ui") {
		files.push(
			{
				path: "src/components/ui/button.tsx",
				language: "typescript",
				contents: `import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} />;
}
`,
				description: "Sample shadcn/ui component stub.",
			},
			{
				path: "src/components/ui/card.tsx",
				language: "typescript",
				contents: `import type { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
`,
				description: "Sample shadcn/ui card component stub.",
			},
		);
	}

	if (manifest.starter.framework === "TanStack Start") {
		files.push(
			{
				path: "app/routes/__root.tsx",
				language: "typescript",
				contents: `import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <Outlet />,
});
`,
				description: "TanStack Start root route.",
			},
			{
				path: "app/routes/index.tsx",
				language: "typescript",
				contents: `import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <div>Hello from Stacker</div>,
});
`,
				description: "TanStack Start index route.",
			},
		);
	}

	return files;
}

export function buildGeneratedDiffs(
	manifest: StackerManifest,
): GeneratedDiff[] {
	const diffs: GeneratedDiff[] = [
		{
			path: "stacker.json",
			oldContents: "",
			newContents: getManifestJson(manifest),
		},
	];

	if (manifest.addons.packages.length > 0) {
		diffs.push({
			path: "package.json",
			oldContents: JSON.stringify({ dependencies: {} }, null, 2),
			newContents: JSON.stringify(
				{
					dependencies: Object.fromEntries(
						manifest.addons.packages.map((pkg) => [pkg, "latest"]),
					),
				},
				null,
				2,
			),
		});
	}

	return diffs;
}

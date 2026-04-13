import type { StackerManifest } from "@/lib/stacker";
import type {
	PreviewVirtualDirectory,
	PreviewVirtualFile,
} from "@/types/preview-tree";

type FileInput = {
	path: string;
	contents: string;
	language?: string;
};

function toLanguage(path: string): string {
	const name = path.split("/").pop() ?? path;
	if (name.endsWith(".tsx")) return "tsx";
	if (name.endsWith(".ts")) return "typescript";
	if (name.endsWith(".json")) return "json";
	if (name.endsWith(".css")) return "css";
	if (name.endsWith(".md")) return "markdown";
	if (name.endsWith(".mjs")) return "javascript";
	if (name.endsWith(".js") || name.endsWith(".jsx")) return "javascript";
	if (name.endsWith(".astro")) return "astro";
	if (name.endsWith(".php")) return "php";
	if (name.endsWith(".blade.php")) return "html";
	if (name.endsWith(".html")) return "html";
	if (name.endsWith(".toml")) return "toml";
	if (name.endsWith(".yml") || name.endsWith(".yaml")) return "yaml";
	if (name.endsWith(".prisma")) return "sql";
	if (name.startsWith(".env")) return "bash";
	return "plaintext";
}

// ─── Common files ────────────────────────────────────────────────────────────

function makeReadme(manifest: StackerManifest): string {
	const techLines: string[] = [];
	techLines.push(
		`- **Framework:** ${manifest.starter.framework} (${manifest.starter.runtime})`,
	);
	if (manifest.frontend.uiSystem)
		techLines.push(`- **UI System:** ${manifest.frontend.uiSystem}`);
	if (manifest.frontend.shadcn) {
		techLines.push(
			`- **Theme:** ${manifest.frontend.shadcn.tweakcnTheme} · ${manifest.frontend.shadcn.style}`,
		);
		if (manifest.frontend.shadcn.components.length > 0)
			techLines.push(
				`- **shadcn/ui components:** ${manifest.frontend.shadcn.components.join(", ")}`,
			);
	}
	if (manifest.frontend.tanstackAddons.length > 0)
		techLines.push(
			`- **TanStack add-ons:** ${manifest.frontend.tanstackAddons.join(", ")}`,
		);
	if (manifest.backend.database)
		techLines.push(`- **Database:** ${manifest.backend.database}`);
	if (manifest.backend.orm)
		techLines.push(`- **ORM:** ${manifest.backend.orm}`);
	if (manifest.backend.auth)
		techLines.push(`- **Auth:** ${manifest.backend.auth}`);
	if (manifest.backend.apiLayer)
		techLines.push(`- **API Layer:** ${manifest.backend.apiLayer}`);
	if (manifest.addons.animations)
		techLines.push(`- **Animations:** ${manifest.addons.animations}`);
	if (manifest.addons.typings)
		techLines.push(`- **Typings:** ${manifest.addons.typings}`);
	if (manifest.addons.packages.length > 0)
		techLines.push(
			`- **Extra packages:** ${manifest.addons.packages.join(", ")}`,
		);
	techLines.push(
		`- **Package manager:** ${manifest.project.packageManager}`,
	);

	return `# ${manifest.project.name}

> Generated with [Stacker](https://stacker.ranveersoni.me) — Build your stack. Instantly.

## Tech Stack

${techLines.join("\n")}

## Getting Started

\`\`\`bash
# Install dependencies
${manifest.project.packageManager} install

# Start development server
${manifest.project.packageManager} run dev
\`\`\`

## Project Structure

This project was scaffolded by Stacker. Refer to the documentation of each
library for detailed usage instructions.
`;
}

function makeGitignore(): string {
	return `# Dependencies
node_modules
.pnp
.pnp.js

# Build output
dist
build
.next
.turbo
out

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor
.vscode
.idea
*.suo
*.ntvs*
*.njsproj
*.sln

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
`;
}

function makePackageJson(manifest: StackerManifest): string {
	const deps = new Map<string, string>();
	const devDeps = new Map<string, string>();

	deps.set("react", "^19.2.0");
	deps.set("react-dom", "^19.2.0");
	devDeps.set("typescript", "^5.7.2");
	devDeps.set("@types/react", "^19.2.0");
	devDeps.set("@types/react-dom", "^19.2.0");
	devDeps.set("@types/node", "^22.10.2");

	// Framework deps
	const fw = manifest.starter.framework;
	if (fw === "Next.js") {
		deps.set("next", "latest");
	} else if (fw === "TanStack Start") {
		deps.set("@tanstack/react-start", "latest");
		devDeps.set("vite", "^7.0.0");
		devDeps.set("@tanstack/router-plugin", "latest");
	} else if (fw === "React Router") {
		deps.set("react-router", "latest");
		devDeps.set("@react-router/dev", "latest");
	} else if (fw === "Astro") {
		devDeps.set("astro", "latest");
	} else if (fw === "Vite") {
		devDeps.set("vite", "^7.0.0");
		devDeps.set("@vitejs/plugin-react", "^5.1.4");
	}

	// UI System
	if (manifest.frontend.uiSystem === "shadcn/ui") {
		deps.set("class-variance-authority", "^0.7.1");
		deps.set("clsx", "^2.1.1");
		deps.set("tailwind-merge", "^3.5.0");
		devDeps.set("tailwindcss", "^4.0.0");
		devDeps.set("@tailwindcss/vite", "^4.0.0");
	} else if (manifest.frontend.uiSystem === "Base UI") {
		deps.set("@base-ui/react", "latest");
	} else if (manifest.frontend.uiSystem === "Radix primitives") {
		deps.set("radix-ui", "latest");
	}

	// TanStack add-ons
	const pkgMap: Record<string, string> = {
		query: "@tanstack/react-query",
		router: "@tanstack/react-router",
		form: "@tanstack/react-form",
		table: "@tanstack/react-table",
		store: "@tanstack/react-store",
		db: "@tanstack/react-db",
		devtools: "@tanstack/react-query-devtools",
	};
	for (const id of manifest.frontend.tanstackAddons) {
		const pkg = pkgMap[id];
		if (pkg) deps.set(pkg, "latest");
	}
	if (manifest.frontend.tanstackAddons.includes("devtools")) {
		devDeps.set("@tanstack/router-devtools", "latest");
	}

	// Auth
	if (manifest.backend.auth === "WorkOS") deps.set("@workos-inc/authkit-nextjs", "latest");
	else if (manifest.backend.auth === "Clerk") deps.set("@clerk/nextjs", "latest");
	else if (manifest.backend.auth === "BetterAuth") deps.set("better-auth", "latest");

	// Database
	if (manifest.backend.database === "Neon") deps.set("@neondatabase/serverless", "latest");
	else if (manifest.backend.database === "Convex") deps.set("convex", "latest");

	// ORM
	if (manifest.backend.orm === "Prisma") {
		deps.set("@prisma/client", "latest");
		devDeps.set("prisma", "latest");
	} else if (manifest.backend.orm === "Drizzle") {
		deps.set("drizzle-orm", "latest");
		devDeps.set("drizzle-kit", "latest");
	}

	// API layer
	if (manifest.backend.apiLayer === "tRPC") {
		deps.set("@trpc/server", "latest");
		deps.set("@trpc/client", "latest");
	} else if (manifest.backend.apiLayer === "ORPC") {
		deps.set("@orpc/server", "latest");
		deps.set("@orpc/client", "latest");
	} else if (manifest.backend.apiLayer === "Apollo Client") {
		deps.set("@apollo/client", "latest");
		deps.set("graphql", "latest");
	}

	// Typings
	if (manifest.addons.typings === "Zod") deps.set("zod", "^4.0.0");
	else if (manifest.addons.typings === "ArkType") deps.set("arktype", "latest");

	// Animations
	if (manifest.addons.animations === "Framer Motion") deps.set("framer-motion", "^12.0.0");
	else if (manifest.addons.animations === "Motion") deps.set("motion", "latest");
	else if (manifest.addons.animations === "AutoAnimate") deps.set("@formkit/auto-animate", "latest");
	else if (manifest.addons.animations === "GSAP") deps.set("gsap", "latest");

	// Integrations
	if (manifest.addons.integrations.includes("Sentry")) deps.set("@sentry/nextjs", "latest");
	if (manifest.addons.integrations.includes("PostHog")) deps.set("posthog-js", "latest");
	if (manifest.addons.integrations.includes("Stripe")) deps.set("stripe", "latest");

	// Extra packages
	for (const pkg of manifest.addons.packages) {
		deps.set(pkg, "latest");
	}

	const devScript =
		fw === "Next.js" ? "next dev" :
		fw === "Astro" ? "astro dev" :
		fw === "Laravel" ? "php artisan serve" :
		"vite";

	const buildScript =
		fw === "Next.js" ? "next build" :
		fw === "Astro" ? "astro build" :
		"tsc -b && vite build";

	return JSON.stringify(
		{
			name: manifest.project.name,
			private: true,
			type: "module",
			scripts: {
				dev: devScript,
				build: buildScript,
				preview: "vite preview",
				typecheck: "tsc --noEmit",
			},
			dependencies: Object.fromEntries([...deps.entries()].sort()),
			devDependencies: Object.fromEntries([...devDeps.entries()].sort()),
		},
		null,
		2,
	);
}

function makeTsConfig(manifest: StackerManifest): string {
	const fw = manifest.starter.framework;
	const baseConfig = {
		compilerOptions: {
			target: "ES2022",
			lib: ["ES2022", "DOM", "DOM.Iterable"],
			module: "ESNext",
			moduleResolution: "Bundler",
			jsx: "react-jsx",
			strict: true,
			noEmit: true,
			skipLibCheck: true,
			esModuleInterop: true,
			allowSyntheticDefaultImports: true,
			resolveJsonModule: true,
			baseUrl: ".",
			paths: {
				"@/*": ["./src/*"],
			},
		} as Record<string, unknown>,
		include: ["src", "app"],
		exclude: ["node_modules", "dist"],
	};

	if (fw === "Next.js") {
		baseConfig.compilerOptions.plugins = [{ name: "next" }];
		baseConfig.include = ["next-env.d.ts", "**/*.ts", "**/*.tsx"];
	} else if (fw === "Astro") {
		baseConfig.compilerOptions.module = "Preserve";
		baseConfig.compilerOptions.noEmit = false;
	}

	return JSON.stringify(baseConfig, null, 2);
}

function makeEnvExample(manifest: StackerManifest): string {
	const lines: string[] = ["# Environment variables for " + manifest.project.name, "NODE_ENV=development", ""];

	if (manifest.backend.database === "Neon") {
		lines.push("# Neon PostgreSQL");
		lines.push("DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require");
		lines.push("");
	}
	if (manifest.backend.database === "Convex") {
		lines.push("# Convex");
		lines.push("NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud");
		lines.push("");
	}
	if (manifest.backend.auth === "WorkOS") {
		lines.push("# WorkOS AuthKit");
		lines.push("WORKOS_API_KEY=sk_live_...");
		lines.push("WORKOS_CLIENT_ID=client_...");
		lines.push("NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/callback");
		lines.push("");
	}
	if (manifest.backend.auth === "Clerk") {
		lines.push("# Clerk");
		lines.push("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...");
		lines.push("CLERK_SECRET_KEY=sk_live_...");
		lines.push("NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in");
		lines.push("NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up");
		lines.push("");
	}
	if (manifest.backend.auth === "BetterAuth") {
		lines.push("# BetterAuth");
		lines.push("BETTER_AUTH_SECRET=your-secret-here");
		lines.push("BETTER_AUTH_URL=http://localhost:3000");
		lines.push("");
	}
	if (manifest.addons.integrations.includes("Sentry")) {
		lines.push("# Sentry");
		lines.push("SENTRY_DSN=https://xxx@sentry.io/xxx");
		lines.push("NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx");
		lines.push("");
	}
	if (manifest.addons.integrations.includes("PostHog")) {
		lines.push("# PostHog");
		lines.push("NEXT_PUBLIC_POSTHOG_KEY=phc_xxx");
		lines.push("NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com");
		lines.push("");
	}
	if (manifest.addons.integrations.includes("Stripe")) {
		lines.push("# Stripe");
		lines.push("STRIPE_SECRET_KEY=sk_live_...");
		lines.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...");
		lines.push("STRIPE_WEBHOOK_SECRET=whsec_...");
		lines.push("");
	}

	return lines.join("\n");
}

// ─── Framework-specific files ─────────────────────────────────────────────────

function frameworkFiles(manifest: StackerManifest): FileInput[] {
	const fw = manifest.starter.framework;
	const name = manifest.project.name;

	if (fw === "Next.js") {
		return [
			{
				path: "next.config.ts",
				contents: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
`,
			},
			{
				path: "app/layout.tsx",
				contents: `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "${name}",
  description: "Generated with Stacker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
`,
			},
			{
				path: "app/page.tsx",
				contents: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">${name}</h1>
      <p className="mt-4 text-muted-foreground">Get started by editing app/page.tsx</p>
    </main>
  );
}
`,
			},
			{
				path: "app/globals.css",
				contents: `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
`,
			},
		];
	}

	if (fw === "TanStack Start") {
		return [
			{
				path: "vite.config.ts",
				contents: `import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTscPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    viteTscPaths(),
    tanstackStart(),
  ],
});
`,
			},
			{
				path: "app/routes/__root.tsx",
				contents: `import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "${name}" },
    ],
  }),
  component: () => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});
`,
			},
			{
				path: "app/routes/index.tsx",
				contents: `import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>${name}</h1>
      <p>Built with TanStack Start + Stacker</p>
    </main>
  );
}
`,
			},
			{
				path: "app/router.tsx",
				contents: `import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
`,
			},
			{
				path: "app/client.tsx",
				contents: `import { StartClient } from "@tanstack/react-start";
import { hydrateRoot } from "react-dom/client";
import { router } from "./router";

hydrateRoot(document, <StartClient router={router} />);
`,
			},
		];
	}

	if (fw === "React Router") {
		return [
			{
				path: "react-router.config.ts",
				contents: `import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render by default, to enable SPA mode set this to false
  ssr: true,
} satisfies Config;
`,
			},
			{
				path: "app/root.tsx",
				contents: `import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
`,
			},
			{
				path: "app/routes.ts",
				contents: `import { type RouteConfig, index } from "@react-router/dev/routes";
export default [index("routes/home.tsx")] satisfies RouteConfig;
`,
			},
			{
				path: "app/routes/home.tsx",
				contents: `import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "${name}" },
    { name: "description", content: "Generated with Stacker" },
  ];
}

export default function Home() {
  return (
    <main>
      <h1>${name}</h1>
      <p>Built with React Router + Stacker</p>
    </main>
  );
}
`,
			},
		];
	}

	if (fw === "Astro") {
		return [
			{
				path: "astro.config.mjs",
				contents: `import { defineConfig } from "astro/config";
import react from "@astrojs/react";
${manifest.frontend.uiSystem === "shadcn/ui" ? 'import tailwind from "@astrojs/tailwind";\n' : ""}
export default defineConfig({
  integrations: [
    react(),${manifest.frontend.uiSystem === "shadcn/ui" ? "\n    tailwind()," : ""}
  ],
});
`,
			},
			{
				path: "src/pages/index.astro",
				contents: `---
const title = "${name}";
const description = "Generated with Stacker";
---

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  </body>
</html>

<style>
  main {
    margin: auto;
    padding: 1rem;
    width: 800px;
    max-width: calc(100% - 2rem);
    font-size: 20px;
    line-height: 1.6;
  }
  h1 {
    font-size: 4rem;
    font-weight: 700;
  }
</style>
`,
			},
			{
				path: "src/layouts/Layout.astro",
				contents: `---
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
`,
			},
		];
	}

	if (fw === "Laravel") {
		return [
			{
				path: "routes/web.php",
				contents: `<?php

use Illuminate\\Support\\Facades\\Route;

Route::get('/', function () {
    return view('welcome');
});
`,
			},
			{
				path: "resources/views/welcome.blade.php",
				contents: `<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${name}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
  </head>
  <body>
    <div id="app">
      <h1>${name}</h1>
      <p>Generated with Stacker</p>
    </div>
  </body>
</html>
`,
			},
			{
				path: "resources/js/app.js",
				contents: `import './bootstrap';
import { createApp } from 'vue';

// Or for React:
// import React from 'react';
// import ReactDOM from 'react-dom/client';
`,
			},
			{
				path: "resources/css/app.css",
				contents: `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
`,
			},
			{
				path: "vite.config.js",
				contents: `import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
  ],
});
`,
			},
		];
	}

	// Vite (default)
	return [
		{
			path: "vite.config.ts",
			contents: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
${manifest.frontend.uiSystem === "shadcn/ui" ? 'import tailwindcss from "@tailwindcss/vite";\n' : ""}
export default defineConfig({
  plugins: [
    react(),${manifest.frontend.uiSystem === "shadcn/ui" ? "\n    tailwindcss()," : ""}
  ],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
`,
		},
		{
			path: "index.html",
			contents: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
		},
		{
			path: "src/main.tsx",
			contents: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`,
		},
		{
			path: "src/App.tsx",
			contents: `import "./App.css";

function App() {
  return (
    <main>
      <h1>${name}</h1>
      <p>Built with Vite + React + Stacker</p>
    </main>
  );
}

export default App;
`,
		},
		{
			path: "src/index.css",
			contents: `@import "tailwindcss";

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}
`,
		},
	];
}

// ─── UI System files ──────────────────────────────────────────────────────────

function shadcnFiles(manifest: StackerManifest): FileInput[] {
	if (manifest.frontend.uiSystem !== "shadcn/ui" || !manifest.frontend.shadcn) return [];
	const { shadcn, uiSystem: _ } = manifest.frontend;
	const files: FileInput[] = [];

	files.push({
		path: "components.json",
		contents: JSON.stringify(
			{
				$schema: "https://ui.shadcn.com/schema.json",
				style: shadcn.style,
				rsc: manifest.starter.framework === "Next.js",
				tsx: true,
				tailwind: {
					config: "",
					css: "src/styles.css",
					baseColor: shadcn.baseColor,
					cssVariables: true,
				},
				aliases: {
					components: "@/components",
					utils: "@/lib/utils",
					ui: "@/components/ui",
					lib: "@/lib",
					hooks: "@/hooks",
				},
			},
			null,
			2,
		),
	});

	files.push({
		path: "src/lib/utils.ts",
		contents: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
	});

	// Generate component stubs for selected components
	for (const component of shadcn.components) {
		const pascal = component
			.split("-")
			.map((p) => p.charAt(0).toUpperCase() + p.slice(1))
			.join("");
		files.push({
			path: `src/components/ui/${component}.tsx`,
			contents: `// Auto-generated stub — run \`bunx shadcn@latest add ${component}\` to get the real component
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ${pascal}Props extends React.HTMLAttributes<HTMLDivElement> {}

export function ${pascal}({ className, ...props }: ${pascal}Props) {
  return (
    <div
      className={cn("${component}-root", className)}
      {...props}
    />
  );
}
`,
		});
	}

	return files;
}

// ─── Auth files ────────────────────────────────────────────────────────────────

function authFiles(manifest: StackerManifest): FileInput[] {
	const files: FileInput[] = [];
	const auth = manifest.backend.auth;
	if (!auth) return files;

	if (auth === "BetterAuth") {
		files.push({
			path: "src/lib/auth.ts",
			contents: `import { betterAuth } from "better-auth";
${manifest.backend.database === "Neon" ? 'import { Pool } from "@neondatabase/serverless";\n\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\n' : ""}
export const auth = betterAuth({
  database: ${manifest.backend.database === "Neon" ? "pool" : `{\n    provider: "sqlite",\n    url: "./local.db",\n  }`},
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
`,
		});

		files.push({
			path: "src/lib/auth-client.ts",
			contents: `import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
});

export const { signIn, signOut, signUp, useSession } = authClient;
`,
		});
	}

	if (auth === "Clerk") {
		files.push({
			path: "src/middleware.ts",
			contents: `import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
`,
		});

		files.push({
			path: "src/components/auth/sign-in.tsx",
			contents: `import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
`,
		});
	}

	if (auth === "WorkOS") {
		files.push({
			path: "src/lib/auth.ts",
			contents: `import { WorkOS } from "@workos-inc/node";

export const workos = new WorkOS(process.env.WORKOS_API_KEY!);
export const clientId = process.env.WORKOS_CLIENT_ID!;
`,
		});
	}

	return files;
}

// ─── ORM files ────────────────────────────────────────────────────────────────

function ormFiles(manifest: StackerManifest): FileInput[] {
	const files: FileInput[] = [];

	if (manifest.backend.orm === "Prisma") {
		const provider =
			manifest.backend.database === "Neon" ? "postgresql" :
			manifest.backend.database === "Convex" ? "postgresql" :
			"sqlite";

		files.push({
			path: "prisma/schema.prisma",
			contents: `// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${provider}"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  posts Post[]

  @@map("users")
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  authorId String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@map("posts")
}
`,
		});

		files.push({
			path: "src/lib/db.ts",
			contents: `import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
`,
		});
	}

	if (manifest.backend.orm === "Drizzle") {
		const dialect =
			manifest.backend.database === "Neon" ? "postgresql" : "sqlite";

		if (dialect === "postgresql") {
			files.push({
				path: "src/db/schema.ts",
				contents: `import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
`,
			});

			files.push({
				path: "src/db/index.ts",
				contents: `import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
`,
			});

			files.push({
				path: "drizzle.config.ts",
				contents: `import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
`,
			});
		} else {
			files.push({
				path: "src/db/schema.ts",
				contents: `import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
`,
			});

			files.push({
				path: "src/db/index.ts",
				contents: `import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const client = createClient({
  url: process.env.DATABASE_URL ?? "file:local.db",
});

export const db = drizzle(client, { schema });
`,
			});
		}
	}

	if (manifest.backend.database === "Convex") {
		files.push({
			path: "convex/schema.ts",
			contents: `import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.optional(v.string()),
  }).index("by_email", ["email"]),

  posts: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    published: v.boolean(),
    authorId: v.id("users"),
  }).index("by_author", ["authorId"]),
});
`,
		});

		files.push({
			path: "convex/users.ts",
			contents: `import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const create = mutation({
  args: { name: v.string(), email: v.string() },
  handler: async (ctx, { name, email }) => {
    return await ctx.db.insert("users", { name, email });
  },
});
`,
		});
	}

	return files;
}

// ─── API layer files ──────────────────────────────────────────────────────────

function apiLayerFiles(manifest: StackerManifest): FileInput[] {
	const files: FileInput[] = [];
	const api = manifest.backend.apiLayer;
	if (!api) return files;

	if (api === "tRPC") {
		files.push({
			path: "src/server/trpc.ts",
			contents: `import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});
`,
		});

		files.push({
			path: "src/server/context.ts",
			contents: `import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createContext({ req, res }: CreateNextContextOptions) {
  // Add your session/auth here
  return {
    req,
    res,
    session: null as null | { user: { id: string } },
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
`,
		});

		files.push({
			path: "src/server/routers/_app.ts",
			contents: `import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: \`Hello \${input.name ?? "World"}!\`,
      };
    }),
});

export type AppRouter = typeof appRouter;
`,
		});

		files.push({
			path: "src/lib/trpc.ts",
			contents: `import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/routers/_app";

export const trpc = createTRPCReact<AppRouter>();
`,
		});
	}

	if (api === "ORPC") {
		files.push({
			path: "src/server/router.ts",
			contents: `import { os } from "@orpc/server";
import { z } from "zod";

export const pub = os;

export const appRouter = pub.router({
  hello: pub
    .input(z.object({ name: z.string().optional() }))
    .handler(async ({ input }) => {
      return { greeting: \`Hello \${input.name ?? "World"}!\` };
    }),
});

export type AppRouter = typeof appRouter;
`,
		});

		files.push({
			path: "src/lib/orpc.ts",
			contents: `import { createORPCReactQueryUtils } from "@orpc/react-query";
import type { AppRouter } from "@/server/router";

export const orpc = createORPCReactQueryUtils<AppRouter>();
`,
		});
	}

	if (api === "Apollo Client") {
		files.push({
			path: "src/lib/apollo.ts",
			contents: `import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? \`Bearer \${token}\` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
`,
		});

		files.push({
			path: "src/graphql/queries.ts",
			contents: `import { gql } from "@apollo/client";

export const GET_USERS = gql\`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
\`;

export const CREATE_USER = gql\`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
\`;
`,
		});
	}

	return files;
}

// ─── Addons files ─────────────────────────────────────────────────────────────

function addonsFiles(manifest: StackerManifest): FileInput[] {
	const files: FileInput[] = [];
	const { addons } = manifest;

	// Typings
	if (addons.typings === "Zod") {
		files.push({
			path: "src/lib/validations.ts",
			contents: `import { z } from "zod";

export const userSchema = z.object({
  id: z.string().cuid2(),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100).optional(),
  createdAt: z.date(),
});

export const createUserSchema = userSchema.omit({ id: true, createdAt: true });
export const updateUserSchema = createUserSchema.partial();

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
`,
		});
	}

	if (addons.typings === "ArkType") {
		files.push({
			path: "src/lib/validations.ts",
			contents: `import { type } from "arktype";

export const userSchema = type({
  id: "string",
  email: "string.email",
  "name?": "string | undefined",
  createdAt: "Date",
});

export const createUserSchema = userSchema.omit("id", "createdAt");

export type User = typeof userSchema.infer;
export type CreateUser = typeof createUserSchema.infer;
`,
		});
	}

	// Animations setup
	if (addons.animations === "Framer Motion") {
		files.push({
			path: "src/components/animated.tsx",
			contents: `import { motion, AnimatePresence } from "framer-motion";

export const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    transition={{ duration: 0.3, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export { AnimatePresence };
`,
		});
	}

	if (addons.animations === "GSAP") {
		files.push({
			path: "src/hooks/use-gsap.ts",
			contents: `import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFadeIn(delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay,
      ease: "power2.out",
    });
  }, [delay]);

  return ref;
}
`,
		});
	}

	// Integrations
	if (addons.integrations.includes("Sentry")) {
		files.push({
			path: "sentry.client.config.ts",
			contents: `import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    Sentry.replayIntegration(),
  ],
});
`,
		});
		files.push({
			path: "sentry.server.config.ts",
			contents: `import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === "development",
});
`,
		});
	}

	if (addons.integrations.includes("PostHog")) {
		files.push({
			path: "src/lib/posthog.ts",
			contents: `import posthog from "posthog-js";

export function initPostHog() {
  if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
    });
  }
}

export { posthog };
`,
		});
	}

	if (addons.integrations.includes("Stripe")) {
		files.push({
			path: "src/lib/stripe.ts",
			contents: `import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export type StripePriceId = string;
`,
		});
	}

	// Deployment
	if (addons.deployment === "Vercel") {
		files.push({
			path: "vercel.json",
			contents: JSON.stringify(
				{
					$schema: "https://openapi.vercel.sh/vercel.json",
					framework: manifest.starter.framework === "Next.js" ? "nextjs" : null,
					buildCommand: manifest.starter.framework === "Astro" ? "astro build" : undefined,
					outputDirectory: manifest.starter.framework === "Astro" ? "dist" : undefined,
				},
				null,
				2,
			),
		});
	}

	if (addons.deployment === "Netlify") {
		files.push({
			path: "netlify.toml",
			contents: `[build]
  command = "${manifest.starter.framework === "Next.js" ? "next build" : manifest.starter.framework === "Astro" ? "astro build" : "vite build"}"
  publish = "${manifest.starter.framework === "Astro" ? "dist" : ".next"}"

[dev]
  command = "${manifest.starter.framework === "Next.js" ? "next dev" : "vite"}"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`,
		});
	}

	return files;
}

// ─── Tree builder ─────────────────────────────────────────────────────────────

export function buildPreviewTree(
	manifest: StackerManifest,
): PreviewVirtualDirectory {
	const files: FileInput[] = [];

	// Core files first (README, .gitignore, package.json, tsconfig)
	files.push({ path: "README.md", contents: makeReadme(manifest) });
	files.push({ path: ".gitignore", contents: makeGitignore() });
	files.push({ path: "package.json", contents: makePackageJson(manifest) });
	files.push({ path: "tsconfig.json", contents: makeTsConfig(manifest) });
	files.push({ path: ".env.example", contents: makeEnvExample(manifest) });

	// Framework files
	files.push(...frameworkFiles(manifest));

	// UI system
	files.push(...shadcnFiles(manifest));

	// Backend
	files.push(...ormFiles(manifest));
	files.push(...authFiles(manifest));
	files.push(...apiLayerFiles(manifest));

	// Addons
	files.push(...addonsFiles(manifest));

	// Build tree
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
					language: input.language ?? toLanguage(name),
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

	// Sort: directories first, then alphabetical
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

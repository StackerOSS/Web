import { type } from "arktype";

export const StackSchema = type({
	name: "string",
	packageManager: "'bun' | 'pnpm' | 'npm' | 'yarn'",
	git: "boolean",
	install: "boolean",

	framework: "'Next.js' | 'Vite' | 'TanStack Start' | 'React Router' | 'Astro' | 'Laravel' | ''",
	uiSystem: "'shadcn/ui' | 'Base UI' | 'Radix primitives' | ''",
	themeStyle: "string",
	baseColor: "string",
	borderRadius: "string",
	iconLibrary: "string",
	font: "string",

	runtime: "'React' | 'Solid' | ''",
	tanstackPackages: "string[]",
	
	database: "'Neon' | 'Convex' | ''",
	orm: "'Prisma' | 'Drizzle' | ''",
	auth: "'WorkOS' | 'Clerk' | 'BetterAuth' | ''",
	apiLayer: "'MCP' | 'ORPC' | 'tRPC' | 'Apollo Client' | ''",

	integrations: "string[]",
	deployment: "string",
	monitoring: "string",
	i18n: "string",
	devTooling: "string[]",

	typings: "'Zod' | 'ArkType' | ''",
	animations: "'Framer Motion' | 'Motion' | 'AutoAnimate' | 'GSAP' | ''"
});

export type StackConfig = typeof StackSchema.infer;

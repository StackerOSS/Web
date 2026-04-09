import { create } from "zustand";

export type PackageManager = "bun" | "pnpm" | "npm" | "yarn";
export type Framework =
	| "Next.js"
	| "Vite"
	| "TanStack Start"
	| "React Router"
	| "Astro"
	| "Laravel"
	| "";
export type UiSystem = "shadcn/ui" | "Base UI" | "Radix primitives" | "";

// Base state
interface StackState {
	// General
	name: string;
	packageManager: PackageManager;
	git: boolean;
	install: boolean;

	// Frontend
	framework: Framework;
	uiSystem: UiSystem;
	themeStyle: string;
	baseColor: string;
	borderRadius: string;
	iconLibrary: string;
	font: string;

	runtime: "React" | "Solid" | "";
	tanstackPackages: string[];

	// Backend
	database: "Neon" | "Convex" | "";
	orm: "Prisma" | "Drizzle" | "";
	auth: "WorkOS" | "Clerk" | "BetterAuth" | "";
	apiLayer: "MCP" | "ORPC" | "tRPC" | "Apollo Client" | "";

	// Addons
	integrations: string[];
	deployment: string;
	monitoring: string;
	i18n: string;
	devTooling: string[];
	typings: "Zod" | "ArkType" | "";
	animations: "Framer Motion" | "Motion" | "AutoAnimate" | "GSAP" | "";

	// Actions
	setName: (name: string) => void;
	setPackageManager: (pm: PackageManager) => void;
	setGit: (git: boolean) => void;
	setInstall: (install: boolean) => void;
	setFramework: (framework: Framework) => void;
	setUiSystem: (ui: UiSystem) => void;
	setDatabase: (db: StackState["database"]) => void;
	setOrm: (orm: StackState["orm"]) => void;
	setAuth: (auth: StackState["auth"]) => void;
	setThemeStyle: (style: string) => void;
	setBaseColor: (color: string) => void;
	setBorderRadius: (radius: string) => void;
	setIconLibrary: (lib: string) => void;
	setFont: (font: string) => void;
	setRuntime: (runtime: StackState["runtime"]) => void;
	toggleTanstackPackage: (pkg: string) => void;
	setApiLayer: (api: StackState["apiLayer"]) => void;
	toggleIntegration: (integration: string) => void;
	setDeployment: (dep: string) => void;
	setMonitoring: (mon: string) => void;
	setI18n: (i18n: string) => void;
	toggleDevTooling: (tool: string) => void;
	setTypings: (typings: StackState["typings"]) => void;
	setAnimations: (animations: StackState["animations"]) => void;
}

export const useStackStore = create<StackState>((set) => ({
	name: "my-app",
	packageManager: "bun",
	git: true,
	install: true,

	framework: "",
	uiSystem: "",
	themeStyle: "Vega",
	baseColor: "Zinc",
	borderRadius: "Default",
	iconLibrary: "Lucide",
	font: "Inter",

	runtime: "",
	tanstackPackages: [],

	database: "",
	orm: "",
	auth: "",
	apiLayer: "",

	integrations: [],
	deployment: "",
	monitoring: "",
	i18n: "",
	devTooling: [],
	typings: "",
	animations: "",

	setName: (name) => set({ name }),
	setPackageManager: (pm) => set({ packageManager: pm }),
	setGit: (git) => set({ git }),
	setInstall: (install) => set({ install }),

	setFramework: (framework) =>
		set((state) => {
			// Solid cannot be used with Next.js rule
			if (framework === "Next.js" && state.runtime === "Solid") {
				return { framework, runtime: "React" };
			}
			return { framework };
		}),
	setUiSystem: (ui) => set({ uiSystem: ui }),
	setDatabase: (database) => set({ database }),
	setOrm: (orm) =>
		set((state) => {
			return { orm };
		}),
	setAuth: (auth) => set({ auth }),
	setThemeStyle: (themeStyle) => set({ themeStyle }),
	setBaseColor: (baseColor) => set({ baseColor }),
	setBorderRadius: (borderRadius) => set({ borderRadius }),
	setIconLibrary: (iconLibrary) => set({ iconLibrary }),
	setFont: (font) => set({ font }),
	setRuntime: (runtime) => set({ runtime }),
	toggleTanstackPackage: (pkg) =>
		set((state) => ({
			tanstackPackages: state.tanstackPackages.includes(pkg)
				? state.tanstackPackages.filter((p) => p !== pkg)
				: [...state.tanstackPackages, pkg],
		})),
	setApiLayer: (apiLayer) => set({ apiLayer }),
	toggleIntegration: (integration) =>
		set((state) => ({
			integrations: state.integrations.includes(integration)
				? state.integrations.filter((i) => i !== integration)
				: [...state.integrations, integration],
		})),
	setDeployment: (deployment) => set({ deployment }),
	setMonitoring: (monitoring) => set({ monitoring }),
	setI18n: (i18n) => set({ i18n }),
	toggleDevTooling: (tool) =>
		set((state) => ({
			devTooling: state.devTooling.includes(tool)
				? state.devTooling.filter((t) => t !== tool)
				: [...state.devTooling, tool],
		})),
	setTypings: (typings) => set({ typings }),
	setAnimations: (animations) => set({ animations }),
}));

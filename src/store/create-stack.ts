import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import {
	createContext,
	createElement,
	type PropsWithChildren,
	useContext,
	useMemo,
} from "react";
import {
	type Framework,
	type PackageManager,
	type PreviewTab,
	pickDefaultRuntime,
	type Runtime,
	type ShadcnBase,
	type ShadcnBorderRadius,
	type ShadcnStyle,
	type SidebarTab,
	type TweakcnTheme,
	type UiSystem,
} from "@/lib/stacker";

export type PreviewMode = "light" | "dark";

interface StackStateData {
	name: string;
	packageManager: PackageManager;
	git: boolean;
	install: boolean;
	framework: Framework;
	uiSystem: UiSystem;
	themeStyle: ShadcnStyle;
	baseColor: string;
	borderRadius: ShadcnBorderRadius;
	iconLibrary: string;
	font: string;
	previewMode: PreviewMode;
	runtime: Runtime;
	shadcnBase: ShadcnBase;
	tweakcnTheme: TweakcnTheme;
	shadcnComponents: string[];
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
	templateId: string;
	sidebarTab: SidebarTab;
	previewTab: PreviewTab;
	shadcnAdvancedOpen: boolean;
}

interface StackActions {
	setName: (name: string) => void;
	setPackageManager: (pm: PackageManager) => void;
	setGit: (git: boolean) => void;
	setInstall: (install: boolean) => void;
	setFramework: (framework: Framework) => void;
	setUiSystem: (ui: UiSystem) => void;
	setDatabase: (db: StackState["database"]) => void;
	setOrm: (orm: StackState["orm"]) => void;
	setAuth: (auth: StackState["auth"]) => void;
	setThemeStyle: (style: ShadcnStyle) => void;
	setBaseColor: (color: string) => void;
	setBorderRadius: (radius: ShadcnBorderRadius) => void;
	setIconLibrary: (lib: string) => void;
	setFont: (font: string) => void;
	setPreviewMode: (mode: PreviewMode) => void;
	setRuntime: (runtime: Runtime) => void;
	setShadcnBase: (base: ShadcnBase) => void;
	setTweakcnTheme: (theme: TweakcnTheme) => void;
	toggleShadcnComponent: (component: string) => void;
	toggleTanstackPackage: (pkg: string) => void;
	setApiLayer: (api: StackState["apiLayer"]) => void;
	toggleIntegration: (integration: string) => void;
	setDeployment: (dep: string) => void;
	setMonitoring: (mon: string) => void;
	setI18n: (i18n: string) => void;
	toggleDevTooling: (tool: string) => void;
	setTypings: (typings: StackState["typings"]) => void;
	setAnimations: (animations: StackState["animations"]) => void;
	addPackage: (pkg: string) => void;
	removePackage: (pkg: string) => void;
	setTemplateId: (id: string) => void;
	setSidebarTab: (tab: SidebarTab) => void;
	setPreviewTab: (tab: PreviewTab) => void;
	setShadcnAdvancedOpen: (open: boolean) => void;
}

export type StackState = StackStateData & StackActions;

const defaultStackState: StackStateData = {
	name: "my-stacker-app",
	packageManager: "bun",
	git: true,
	install: true,
	framework: "TanStack Start",
	uiSystem: "shadcn/ui",
	themeStyle: "nova",
	baseColor: "zinc",
	borderRadius: "default",
	iconLibrary: "Lucide",
	font: "Geist",
	previewMode: "dark",
	runtime: "React",
	shadcnBase: "radix",
	tweakcnTheme: "modern-minimal",
	shadcnComponents: ["button", "card", "input", "form"],
	tanstackPackages: ["query", "router", "devtools"],
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
	packages: [],
	templateId: "...",
	sidebarTab: "General",
	previewTab: "Code",
	shadcnAdvancedOpen: false,
};

function createStackActions(store: Store<StackStateData>): StackActions {
	return {
		setName: (name) => store.setState((current) => ({ ...current, name })),
		setPackageManager: (packageManager) =>
			store.setState((current) => ({ ...current, packageManager })),
		setGit: (git) => store.setState((current) => ({ ...current, git })),
		setInstall: (install) =>
			store.setState((current) => ({ ...current, install })),
		setFramework: (framework) =>
			store.setState((current) => {
				const runtime = pickDefaultRuntime(framework);
				return {
					...current,
					framework,
					runtime,
					uiSystem:
						framework === "Laravel" && current.uiSystem === "Base UI"
							? ""
							: current.uiSystem,
				};
			}),
		setUiSystem: (uiSystem) =>
			store.setState((current) => ({
				...current,
				uiSystem,
				shadcnComponents:
					uiSystem === "shadcn/ui" ? ["button", "card", "input", "form"] : [],
				shadcnAdvancedOpen: uiSystem === "shadcn/ui",
			})),
		setDatabase: (database) =>
			store.setState((current) => ({ ...current, database })),
		setOrm: (orm) => store.setState((current) => ({ ...current, orm })),
		setAuth: (auth) => store.setState((current) => ({ ...current, auth })),
		setThemeStyle: (themeStyle) =>
			store.setState((current) => ({ ...current, themeStyle })),
		setBaseColor: (baseColor) =>
			store.setState((current) => ({ ...current, baseColor })),
		setBorderRadius: (borderRadius) =>
			store.setState((current) => ({ ...current, borderRadius })),
		setIconLibrary: (iconLibrary) =>
			store.setState((current) => ({ ...current, iconLibrary })),
		setFont: (font) => store.setState((current) => ({ ...current, font })),
		setPreviewMode: (previewMode) =>
			store.setState((current) => ({ ...current, previewMode })),
		setRuntime: (runtime) =>
			store.setState((current) => ({ ...current, runtime })),
		setShadcnBase: (shadcnBase) =>
			store.setState((current) => ({ ...current, shadcnBase })),
		setTweakcnTheme: (tweakcnTheme) =>
			store.setState((current) => ({ ...current, tweakcnTheme })),
		toggleShadcnComponent: (component) =>
			store.setState((current) => ({
				...current,
				shadcnComponents: current.shadcnComponents.includes(component)
					? current.shadcnComponents.filter((item) => item !== component)
					: [...current.shadcnComponents, component],
			})),
		toggleTanstackPackage: (pkg) =>
			store.setState((current) => ({
				...current,
				tanstackPackages: current.tanstackPackages.includes(pkg)
					? current.tanstackPackages.filter((item) => item !== pkg)
					: [...current.tanstackPackages, pkg],
			})),
		setApiLayer: (apiLayer) =>
			store.setState((current) => ({ ...current, apiLayer })),
		toggleIntegration: (integration) =>
			store.setState((current) => ({
				...current,
				integrations: current.integrations.includes(integration)
					? current.integrations.filter((item) => item !== integration)
					: [...current.integrations, integration],
			})),
		setDeployment: (deployment) =>
			store.setState((current) => ({ ...current, deployment })),
		setMonitoring: (monitoring) =>
			store.setState((current) => ({ ...current, monitoring })),
		setI18n: (i18n) => store.setState((current) => ({ ...current, i18n })),
		toggleDevTooling: (tool) =>
			store.setState((current) => ({
				...current,
				devTooling: current.devTooling.includes(tool)
					? current.devTooling.filter((item) => item !== tool)
					: [...current.devTooling, tool],
			})),
		setTypings: (typings) =>
			store.setState((current) => ({ ...current, typings })),
		setAnimations: (animations) =>
			store.setState((current) => ({ ...current, animations })),
		addPackage: (pkg) =>
			store.setState((current) => ({
				...current,
				packages: current.packages.includes(pkg)
					? current.packages
					: [...current.packages, pkg],
			})),
		removePackage: (pkg) =>
			store.setState((current) => ({
				...current,
				packages: current.packages.filter((item) => item !== pkg),
			})),
		setTemplateId: (templateId) =>
			store.setState((current) => {
				if (current.templateId === templateId) {
					return current;
				}
				try {
					window.localStorage.setItem("stacker.templateId", templateId);
				} catch {}
				return { ...current, templateId };
			}),
		setSidebarTab: (sidebarTab) =>
			store.setState((current) => ({ ...current, sidebarTab })),
		setPreviewTab: (previewTab) =>
			store.setState((current) => ({ ...current, previewTab })),
		setShadcnAdvancedOpen: (shadcnAdvancedOpen) =>
			store.setState((current) => ({ ...current, shadcnAdvancedOpen })),
	};
}

const StackStoreContext = createContext<{
	store: Store<StackStateData>;
	actions: StackActions;
} | null>(null);

export function StackStoreProvider({ children }: PropsWithChildren) {
	const store = useMemo(() => {
		const initialState = structuredClone(defaultStackState);
		try {
			const cachedTemplateId =
				window.localStorage.getItem("stacker.templateId");
			if (cachedTemplateId) {
				initialState.templateId = cachedTemplateId;
			}
		} catch {}
		return new Store(initialState);
	}, []);
	const actions = useMemo(() => createStackActions(store), [store]);
	const value = useMemo(() => ({ store, actions }), [store, actions]);

	return createElement(StackStoreContext.Provider, { value }, children);
}

export function useStackStore<T>(selector: (state: StackState) => T) {
	const ctx = useContext(StackStoreContext);

	if (!ctx) {
		throw new Error("useStackStore must be used within a StackStoreProvider");
	}

	const { store, actions } = ctx;
	return useStore(store, (s) => selector({ ...s, ...actions }));
}

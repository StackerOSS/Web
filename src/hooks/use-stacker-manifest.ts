import { useMemo } from "react";
import { buildManifest } from "@/lib/stacker";
import { useStackStore } from "@/store/create-stack";

export function useStackerManifest() {
	const name = useStackStore((state) => state.name);
	const packageManager = useStackStore((state) => state.packageManager);
	const git = useStackStore((state) => state.git);
	const install = useStackStore((state) => state.install);
	const framework = useStackStore((state) => state.framework);
	const runtime = useStackStore((state) => state.runtime);
	const uiSystem = useStackStore((state) => state.uiSystem);
	const shadcnBase = useStackStore((state) => state.shadcnBase);
	const shadcnComponents = useStackStore((state) => state.shadcnComponents);
	const tweakcnTheme = useStackStore((state) => state.tweakcnTheme);
	const themeStyle = useStackStore((state) => state.themeStyle);
	const baseColor = useStackStore((state) => state.baseColor);
	const borderRadius = useStackStore((state) => state.borderRadius);
	const iconLibrary = useStackStore((state) => state.iconLibrary);
	const font = useStackStore((state) => state.font);
	const tanstackPackages = useStackStore((state) => state.tanstackPackages);
	const database = useStackStore((state) => state.database);
	const orm = useStackStore((state) => state.orm);
	const auth = useStackStore((state) => state.auth);
	const apiLayer = useStackStore((state) => state.apiLayer);
	const integrations = useStackStore((state) => state.integrations);
	const deployment = useStackStore((state) => state.deployment);
	const monitoring = useStackStore((state) => state.monitoring);
	const i18n = useStackStore((state) => state.i18n);
	const devTooling = useStackStore((state) => state.devTooling);
	const typings = useStackStore((state) => state.typings);
	const animations = useStackStore((state) => state.animations);
	const packages = useStackStore((state) => state.packages);

	return useMemo(
		() =>
			buildManifest({
				name,
				packageManager,
				git,
				install,
				framework,
				runtime,
				uiSystem,
				shadcnBase,
				shadcnComponents,
				tweakcnTheme,
				themeStyle,
				baseColor,
				borderRadius,
				iconLibrary,
				font,
				tanstackPackages,
				database,
				orm,
				auth,
				apiLayer,
				integrations,
				deployment,
				monitoring,
				i18n,
				devTooling,
				typings,
				animations,
				packages,
			}),
		[
			name,
			packageManager,
			git,
			install,
			framework,
			runtime,
			uiSystem,
			shadcnBase,
			shadcnComponents,
			tweakcnTheme,
			themeStyle,
			baseColor,
			borderRadius,
			iconLibrary,
			font,
			tanstackPackages,
			database,
			orm,
			auth,
			apiLayer,
			integrations,
			deployment,
			monitoring,
			i18n,
			devTooling,
			typings,
			animations,
			packages,
		],
	);
}

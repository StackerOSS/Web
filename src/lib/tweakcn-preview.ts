import { TWEAKCN_REGISTRY_THEMES } from "./tweakcn-registry-themes";

/** Old Stacker ids → tweakcn registry `name` */
const LEGACY_TWEAKCN_ID: Record<string, string> = {
	default: "modern-minimal",
	darkmatter: "cosmic-night",
};

export function resolveTweakcnRegistryId(themeId: string): string {
	return LEGACY_TWEAKCN_ID[themeId] ?? themeId;
}

export type PreviewCssPalette = {
	background: string;
	foreground: string;
	card: string;
	cardForeground: string;
	popover: string;
	popoverForeground: string;
	primary: string;
	primaryForeground: string;
	secondary: string;
	secondaryForeground: string;
	muted: string;
	mutedForeground: string;
	accent: string;
	accentForeground: string;
	destructive: string;
	destructiveForeground: string;
	border: string;
	input: string;
	ring: string;
};

type RegistryPalette = (typeof TWEAKCN_REGISTRY_THEMES)[number]["palette"];

function registryPaletteToPreview(p: RegistryPalette): PreviewCssPalette {
	return {
		background: p.background,
		foreground: p.foreground,
		card: p.card,
		cardForeground: p["card-foreground"],
		popover: p.popover,
		popoverForeground: p["popover-foreground"],
		primary: p.primary,
		primaryForeground: p["primary-foreground"],
		secondary: p.secondary,
		secondaryForeground: p["secondary-foreground"],
		muted: p.muted,
		mutedForeground: p["muted-foreground"],
		accent: p.accent,
		accentForeground: p["accent-foreground"],
		destructive: p.destructive,
		destructiveForeground: p["destructive-foreground"],
		border: p.border,
		input: p.input,
		ring: p.ring,
	};
}

export function getTweakcnPreviewPalette(
	themeId: string,
): PreviewCssPalette | undefined {
	const rid = resolveTweakcnRegistryId(themeId);
	const theme = TWEAKCN_REGISTRY_THEMES.find((t) => t.id === rid);
	if (!theme) {
		return undefined;
	}
	return registryPaletteToPreview(theme.palette);
}

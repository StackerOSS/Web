/** Fonts surfaced in the builder + preview (Google Fonts where noted). */
export const PREVIEW_FONT_OPTIONS = [
	"Geist",
	"Inter",
	"Manrope",
	"Plus Jakarta Sans",
	"DM Sans",
	"Outfit",
	"Nunito Sans",
	"Source Serif 4",
	"JetBrains Mono",
	"Space Grotesk",
	"Lexend",
	"Sora",
	"IBM Plex Sans",
	"Figtree",
	"Geist Mono",
	"Fira Code",
	"Playfair Display",
] as const;

export type PreviewFontOption = (typeof PREVIEW_FONT_OPTIONS)[number];

/** CSS `font-family` stacks (Geist falls back to system UI). */
export const PREVIEW_FONT_STACK: Record<PreviewFontOption, string> = {
	Geist: "Geist, ui-sans-serif, system-ui, sans-serif",
	Inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
	Manrope: '"Manrope", ui-sans-serif, system-ui, sans-serif',
	"Plus Jakarta Sans":
		'"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
	"DM Sans": '"DM Sans", ui-sans-serif, system-ui, sans-serif',
	Outfit: '"Outfit", ui-sans-serif, system-ui, sans-serif',
	"Nunito Sans": '"Nunito Sans", ui-sans-serif, system-ui, sans-serif',
	"Source Serif 4": '"Source Serif 4", ui-serif, Georgia, serif',
	"JetBrains Mono": '"JetBrains Mono", ui-monospace, monospace',
	"Space Grotesk": '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
	Lexend: '"Lexend", ui-sans-serif, system-ui, sans-serif',
	Sora: '"Sora", ui-sans-serif, system-ui, sans-serif',
	"IBM Plex Sans": '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
	Figtree: '"Figtree", ui-sans-serif, system-ui, sans-serif',
	"Geist Mono": '"Geist Mono", ui-monospace, monospace',
	"Fira Code": '"Fira Code", ui-monospace, monospace',
	"Playfair Display": '"Playfair Display", ui-serif, Georgia, serif',
};

/** Google Fonts families for preview (weights used in UI). */
const GOOGLE_FONT_SPEC: Partial<Record<PreviewFontOption, string>> = {
	Inter: "Inter:wght@400;500;600;700",
	Manrope: "Manrope:wght@400;500;600;700",
	"Plus Jakarta Sans": "Plus+Jakarta+Sans:wght@400;500;600;700",
	"DM Sans": "DM+Sans:wght@400;500;600;700",
	Outfit: "Outfit:wght@400;500;600;700",
	"Nunito Sans": "Nunito+Sans:wght@400;500;600;700",
	"Source Serif 4": "Source+Serif+4:wght@400;600;700",
	"JetBrains Mono": "JetBrains+Mono:wght@400;500;600",
	"Space Grotesk": "Space+Grotesk:wght@400;500;600;700",
	Lexend: "Lexend:wght@400;500;600;700",
	Sora: "Sora:wght@400;500;600;700",
	"IBM Plex Sans": "IBM+Plex+Sans:wght@400;500;600;700",
	Figtree: "Figtree:wght@400;500;600;700",
	"Fira Code": "Fira+Code:wght@400;500;600",
	"Playfair Display": "Playfair+Display:wght@400;600;700",
};

export function getPreviewGoogleFontsHref(): string {
	const specs = PREVIEW_FONT_OPTIONS.map(
		(name) => GOOGLE_FONT_SPEC[name],
	).filter(Boolean);
	const q = specs.map((s) => `family=${s}`).join("&");
	return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

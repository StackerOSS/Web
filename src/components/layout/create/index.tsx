import { type CSSProperties, useEffect, useMemo } from "react";
import {
	PREVIEW_FONT_STACK,
	type PreviewFontOption,
} from "@/lib/preview-fonts";
import { getFallbackPreviewPalette } from "@/lib/stack-preview-fallback-palettes";
import {
	getTweakcnPreviewPalette,
	type PreviewCssPalette,
} from "@/lib/tweakcn-preview";
import { useStackStore } from "@/store/create-stack";
import { PreviewArea } from "./preview/index";
import { Sidebar } from "./sidebar/index";

function darkenPalette(p: PreviewCssPalette): PreviewCssPalette {
	return {
		...p,
		background: "#0a0a0b",
		foreground: "rgba(255,255,255,0.92)",
		card: "rgba(255,255,255,0.04)",
		cardForeground: "rgba(255,255,255,0.92)",
		popover: "rgba(14,14,16,0.96)",
		popoverForeground: "rgba(255,255,255,0.92)",
		secondary: "rgba(255,255,255,0.08)",
		secondaryForeground: "rgba(255,255,255,0.9)",
		muted: "rgba(255,255,255,0.06)",
		mutedForeground: "rgba(255,255,255,0.52)",
		accent: "rgba(255,255,255,0.08)",
		accentForeground: "rgba(255,255,255,0.92)",
		border: "rgba(255,255,255,0.10)",
		input: "rgba(255,255,255,0.08)",
		ring: p.primary,
	};
}

function isDarkColor(input: string): boolean {
	const s = input.trim().toLowerCase();
	const hex = s.startsWith("#") ? s.slice(1) : "";
	if (hex.length === 6 || hex.length === 3) {
		const full =
			hex.length === 3
				? hex
						.split("")
						.map((c) => c + c)
						.join("")
				: hex;
		const r = Number.parseInt(full.slice(0, 2), 16);
		const g = Number.parseInt(full.slice(2, 4), 16);
		const b = Number.parseInt(full.slice(4, 6), 16);
		const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
		return luminance < 0.45;
	}
	const rgbMatch =
		s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/) ??
		null;
	if (rgbMatch) {
		const r = Number(rgbMatch[1] ?? 0);
		const g = Number(rgbMatch[2] ?? 0);
		const b = Number(rgbMatch[3] ?? 0);
		const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
		return luminance < 0.45;
	}
	return false;
}

function fontStack(name: string): string {
	const key = name as PreviewFontOption;
	return PREVIEW_FONT_STACK[key] ?? PREVIEW_FONT_STACK.Geist;
}

function buildExtendedThemeVars(p: PreviewCssPalette): CSSProperties {
	// Our app CSS expects additional shadcn tokens beyond the tweakcn palette.
	// Derive them from the palette so components (sidebar/chart/etc.) reflect the theme.
	return {
		"--chart-1": p.primary,
		"--chart-2": p.accent,
		"--chart-3": p.secondary,
		"--chart-4": p.ring,
		"--chart-5": p.destructive,

		"--sidebar": p.card,
		"--sidebar-foreground": p.cardForeground,
		"--sidebar-primary": p.primary,
		"--sidebar-primary-foreground": p.primaryForeground,
		"--sidebar-accent": p.accent,
		"--sidebar-accent-foreground": p.accentForeground,
		"--sidebar-border": p.border,
		"--sidebar-ring": p.ring,
	} as CSSProperties;
}

export function CreatePage() {
	const baseColor = useStackStore((state) => state.baseColor);
	const tweakcnTheme = useStackStore((state) => state.tweakcnTheme);
	const previewMode = useStackStore((state) => state.previewMode);
	const font = useStackStore((state) => state.font);

	const themedPalette = useMemo<PreviewCssPalette>(() => {
		const palette =
			getTweakcnPreviewPalette(tweakcnTheme) ??
			getFallbackPreviewPalette(baseColor);
		const shouldDarken =
			previewMode === "dark" && !isDarkColor(palette.background);
		return shouldDarken ? darkenPalette(palette) : palette;
	}, [baseColor, tweakcnTheme, previewMode]);

	const pageThemeStyle = useMemo(() => {
		const p = themedPalette;
		return {
			fontFamily: fontStack(font),
			"--background": p.background,
			"--foreground": p.foreground,
			"--card": p.card,
			"--card-foreground": p.cardForeground,
			"--popover": p.popover,
			"--popover-foreground": p.popoverForeground,
			"--primary": p.primary,
			"--primary-foreground": p.primaryForeground,
			"--secondary": p.secondary,
			"--secondary-foreground": p.secondaryForeground,
			"--muted": p.muted,
			"--muted-foreground": p.mutedForeground,
			"--accent": p.accent,
			"--accent-foreground": p.accentForeground,
			"--destructive": p.destructive,
			"--destructive-foreground": p.destructiveForeground,
			"--border": p.border,
			"--input": p.input,
			"--ring": p.ring,
			...buildExtendedThemeVars(p),
			colorScheme: previewMode,
		} as CSSProperties;
	}, [themedPalette, font, previewMode]);

	// Apply theme to the whole document so header, sidebar, everything changes
	useEffect(() => {
		const root = document.documentElement;
		const p = themedPalette;
		const ext = buildExtendedThemeVars(p);
		const vars: Record<string, string> = {
			"--background": p.background,
			"--foreground": p.foreground,
			"--card": p.card,
			"--card-foreground": p.cardForeground,
			"--popover": p.popover,
			"--popover-foreground": p.popoverForeground,
			"--primary": p.primary,
			"--primary-foreground": p.primaryForeground,
			"--secondary": p.secondary,
			"--secondary-foreground": p.secondaryForeground,
			"--muted": p.muted,
			"--muted-foreground": p.mutedForeground,
			"--accent": p.accent,
			"--accent-foreground": p.accentForeground,
			"--destructive": p.destructive,
			"--destructive-foreground": p.destructiveForeground,
			"--border": p.border,
			"--input": p.input,
			"--ring": p.ring,
			...(ext as Record<string, string>),
		};
		for (const [k, v] of Object.entries(vars)) {
			if (v) root.style.setProperty(k, v);
		}
		root.style.fontFamily = fontStack(font);
		root.classList.remove("dark", "light");
		root.classList.add(previewMode === "dark" ? "dark" : "light");
	}, [themedPalette, previewMode, font]);

	return (
		<div
			className={`flex flex-col h-screen overflow-hidden bg-background text-foreground ${previewMode === "dark" ? "dark" : "light"}`}
			style={pageThemeStyle}
		>
			{/* Header */}
			<header className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b bg-background z-20">
				<div className="flex items-center gap-3">
					<img
						src="/logo.png"
						alt="Stacker Logo"
						className="w-8 h-8 object-contain"
					/>
					<div>
						<h1 className="text-xl font-bold tracking-tight">Stacker</h1>
						<p className="text-sm text-muted-foreground font-medium hidden sm:block">
							Build your stack. Instantly.
						</p>
					</div>
				</div>
			</header>

			{/* Main Builder Layout */}
			<main className="flex-1 flex overflow-hidden">
				<Sidebar />
				<PreviewArea />
			</main>
		</div>
	);
}

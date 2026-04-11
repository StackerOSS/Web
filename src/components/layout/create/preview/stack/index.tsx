import { Calendar, Github, Search, Star, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import {
	PiCalendarBlank,
	PiGithubLogo,
	PiMagnifyingGlass,
	PiSparkle,
	PiStar,
} from "react-icons/pi";
import {
	TbBolt,
	TbBrandGithub,
	TbCalendar,
	TbSearch,
	TbStar,
} from "react-icons/tb";
import {
	PREVIEW_FONT_STACK,
	type PreviewFontOption,
} from "@/lib/preview-fonts";
import { getFallbackPreviewPalette } from "@/lib/stack-preview-fallback-palettes";
import type { ShadcnStyle } from "@/lib/stacker";
import {
	getTweakcnPreviewPalette,
	type PreviewCssPalette,
} from "@/lib/tweakcn-preview";
import { useStackStore } from "@/store/create-stack";

const radiusMap = {
	default: "0.75rem",
	none: "0",
	sm: "0.375rem",
	md: "0.625rem",
	lg: "0.9rem",
} as const satisfies Record<string, string>;

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

function pickPalette(
	baseColor: string,
	tweakcnTheme: string,
	mode: "light" | "dark",
): PreviewCssPalette {
	const tweakPalette = getTweakcnPreviewPalette(tweakcnTheme);
	const palette = tweakPalette ?? getFallbackPreviewPalette(baseColor);
	return mode === "dark" ? darkenPalette(palette) : palette;
}

const STYLE_LABEL: Record<ShadcnStyle, string> = {
	vega: "Vega",
	nova: "Nova",
	maia: "Maia",
	lyra: "Lyra",
	mira: "Mira",
	luma: "Luma",
	"new-york": "New York",
	default: "Default",
};

const STYLE_ACCENT_PROFILE: Record<
	ShadcnStyle,
	{ intensity: number; spread: string; shadow: number; radial: boolean }
> = {
	vega: { intensity: 0.24, spread: "34%", shadow: 0.55, radial: true },
	nova: { intensity: 0.28, spread: "36%", shadow: 0.6, radial: true },
	maia: { intensity: 0.2, spread: "30%", shadow: 0.42, radial: false },
	lyra: { intensity: 0.22, spread: "31%", shadow: 0.46, radial: true },
	mira: { intensity: 0.17, spread: "28%", shadow: 0.34, radial: false },
	luma: { intensity: 0.3, spread: "38%", shadow: 0.62, radial: true },
	"new-york": { intensity: 0.18, spread: "30%", shadow: 0.4, radial: true },
	default: { intensity: 0.12, spread: "24%", shadow: 0.28, radial: false },
};

function getIcons(iconLibrary: string) {
	switch (iconLibrary) {
		case "Tabler Icons":
			return {
				SearchIcon: TbSearch,
				StarIcon: TbStar,
				CalendarIcon: TbCalendar,
				GithubIcon: TbBrandGithub,
				ZapIcon: TbBolt,
			};
		case "Phosphor":
			return {
				SearchIcon: PiMagnifyingGlass,
				StarIcon: PiStar,
				CalendarIcon: PiCalendarBlank,
				GithubIcon: PiGithubLogo,
				ZapIcon: PiSparkle,
			};
		default:
			return {
				SearchIcon: Search,
				StarIcon: Star,
				CalendarIcon: Calendar,
				GithubIcon: Github,
				ZapIcon: Zap,
			};
	}
}

function fontStack(name: string): string {
	const key = name as PreviewFontOption;
	return PREVIEW_FONT_STACK[key] ?? PREVIEW_FONT_STACK.Geist;
}

export function StackPreview() {
	const borderRadius = useStackStore((state) => state.borderRadius);
	const font = useStackStore((state) => state.font);
	const baseColor = useStackStore((state) => state.baseColor);
	const tweakcnTheme = useStackStore((state) => state.tweakcnTheme);
	const iconLibrary = useStackStore((state) => state.iconLibrary);
	const themeStyle = useStackStore((state) => state.themeStyle);
	const shadcnBase = useStackStore((state) => state.shadcnBase);
	const shadcnComponents = useStackStore((state) => state.shadcnComponents);
	const packageManager = useStackStore((state) => state.packageManager);
	const install = useStackStore((state) => state.install);
	const previewMode = useStackStore((state) => state.previewMode);

	const currentRadius = radiusMap[borderRadius] ?? radiusMap.default;
	const fontFamily = fontStack(font);
	const palette = pickPalette(baseColor, tweakcnTheme, previewMode);

	const { SearchIcon, StarIcon, CalendarIcon, GithubIcon, ZapIcon } =
		getIcons(iconLibrary);

	const rootStyle = {
		fontFamily,
		"--background": palette.background,
		"--foreground": palette.foreground,
		"--card": palette.card,
		"--card-foreground": palette.cardForeground,
		"--popover": palette.popover,
		"--popover-foreground": palette.popoverForeground,
		"--primary": palette.primary,
		"--primary-foreground": palette.primaryForeground,
		"--secondary": palette.secondary,
		"--secondary-foreground": palette.secondaryForeground,
		"--muted": palette.muted,
		"--muted-foreground": palette.mutedForeground,
		"--accent": palette.accent,
		"--accent-foreground": palette.accentForeground,
		"--destructive": palette.destructive,
		"--destructive-foreground": palette.destructiveForeground,
		"--border": palette.border,
		"--input": palette.input,
		"--ring": palette.ring,
		"--chart-1": palette.primary,
		"--chart-2": palette.accent,
		"--chart-3": palette.secondary,
		"--chart-4": palette.ring,
		"--chart-5": palette.destructive,
		"--sidebar": palette.card,
		"--sidebar-foreground": palette.cardForeground,
		"--sidebar-primary": palette.primary,
		"--sidebar-primary-foreground": palette.primaryForeground,
		"--sidebar-accent": palette.accent,
		"--sidebar-accent-foreground": palette.accentForeground,
		"--sidebar-border": palette.border,
		"--sidebar-ring": palette.ring,
	} as CSSProperties;

	const styleAccent = (() => {
		const profile =
			STYLE_ACCENT_PROFILE[themeStyle] ?? STYLE_ACCENT_PROFILE.default;
		const tint =
			previewMode === "dark" ? profile.intensity + 0.08 : profile.intensity;
		const shadowBase = previewMode === "dark" ? 0.22 : 0.08;
		return {
			backgroundImage: profile.radial
				? `radial-gradient(circle at top right, color-mix(in srgb, var(--primary) ${Math.round(tint * 100)}%, transparent), transparent ${profile.spread})`
				: "none",
			boxShadow: `0 22px 70px rgba(0,0,0,${(shadowBase + profile.shadow * (previewMode === "dark" ? 0.5 : 0.12)).toFixed(2)})`,
		};
	})();

	const chip = (label: string) => (
		<div
			key={label}
			className="rounded-full border px-3 py-1"
			style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
		>
			{label}
		</div>
	);

	const radiusSamples = ["none", "sm", "md", "lg", "default"] as const;

	return (
		<div
			className="animate-in fade-in duration-300 w-full h-full pb-3"
			style={{
				...rootStyle,
				backgroundColor: "var(--background)",
				color: "var(--foreground)",
			}}
		>
			<div className="mx-auto w-full max-w-none space-y-4 px-0">
				<div
					className="grid gap-3 lg:grid-cols-[1.4fr_1fr]"
					style={styleAccent}
				>
					<div
						className="overflow-hidden border p-6"
						style={{
							borderRadius: currentRadius,
							borderColor: "var(--border)",
							backgroundColor: "var(--card)",
							color: "var(--card-foreground)",
						}}
					>
						<div className="flex flex-wrap items-start justify-between gap-4">
							<div className="min-w-0">
								<div
									className="text-sm uppercase tracking-[0.2em]"
									style={{ color: "var(--muted-foreground)" }}
								>
									{STYLE_LABEL[themeStyle] ?? themeStyle} · {font}
								</div>
								<h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
									Live theme preview
								</h2>
							</div>
							<div
								className="flex h-12 w-12 shrink-0 items-center justify-center"
								style={{
									borderRadius: currentRadius,
									backgroundColor: "var(--accent)",
									color: "var(--accent-foreground)",
								}}
							>
								<ZapIcon className="h-5 w-5" />
							</div>
						</div>
						<p
							className="mt-4 max-w-xl text-sm leading-6"
							style={{ color: "var(--muted-foreground)" }}
						>
							Uses tweakcn registry tokens when a preset is selected; otherwise
							approximates your base color. Radius, icons, and component list
							reflect your builder choices.
						</p>
						<div className="mt-6 flex flex-wrap gap-2">
							{[
								shadcnBase === "base" ? "Base UI" : "Radix UI",
								iconLibrary,
								baseColor,
								tweakcnTheme,
								`radius: ${borderRadius}`,
							].map(chip)}
						</div>
					</div>

					<div
						className="border p-5"
						style={{
							borderRadius: currentRadius,
							borderColor: "var(--border)",
							backgroundColor: "var(--card)",
							color: "var(--card-foreground)",
						}}
					>
						<div className="flex items-center justify-between gap-2">
							<div className="min-w-0">
								<div className="text-sm font-medium">Selected components</div>
								<div
									className="text-sm"
									style={{ color: "var(--muted-foreground)" }}
								>
									{shadcnComponents.length} in install plan
								</div>
							</div>
							<StarIcon className="h-5 w-5 shrink-0" />
						</div>
						<div className="mt-4 flex max-h-40 flex-wrap gap-2 overflow-y-auto">
							{shadcnComponents.map((component) => (
								<div
									key={component}
									className="rounded-full px-3 py-1 text-xs"
									style={{
										borderRadius: "999px",
										backgroundColor: "var(--accent)",
										color: "var(--accent-foreground)",
									}}
								>
									{component}
								</div>
							))}
						</div>
					</div>
				</div>

				<section>
					<h3
						className="mb-3 text-sm font-semibold"
						style={{ color: "var(--foreground)" }}
					>
						Border radius scale
					</h3>
					<div className="flex flex-wrap gap-3">
						{radiusSamples.map((r) => (
							<div
								key={r}
								className="flex flex-col items-center gap-2 border px-3 py-2"
								style={{
									borderRadius: radiusMap[r],
									borderColor: "var(--border)",
									backgroundColor: "var(--muted)",
								}}
							>
								<div
									className="h-10 w-14 border-2"
									style={{
										borderRadius: radiusMap[r],
										borderColor: "var(--primary)",
										backgroundColor: "var(--card)",
									}}
								/>
								<span
									className="text-[10px] font-medium uppercase"
									style={{ color: "var(--muted-foreground)" }}
								>
									{r}
								</span>
							</div>
						))}
					</div>
				</section>

				<section>
					<h3 className="mb-3 text-sm font-semibold">Buttons</h3>
					<div className="flex flex-wrap gap-2">
						{(
							[
								["Primary", "var(--primary)", "var(--primary-foreground)"],
								[
									"Secondary",
									"var(--secondary)",
									"var(--secondary-foreground)",
								],
								["Outline", "transparent", "var(--foreground)"],
								["Ghost", "transparent", "var(--foreground)"],
								[
									"Destructive",
									"var(--destructive)",
									"var(--destructive-foreground)",
								],
							] as const
						).map(([label, bg, fg]) => (
							<button
								key={label}
								type="button"
								className="inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium"
								style={{
									borderRadius: currentRadius,
									backgroundColor: bg,
									color: fg,
									borderColor:
										label === "Outline" ? "var(--border)" : "transparent",
								}}
							>
								{label === "Primary" && <StarIcon className="h-4 w-4" />}
								{label}
							</button>
						))}
					</div>
				</section>

				<section className="grid gap-6 lg:grid-cols-2">
					<div
						className="border p-5"
						style={{
							borderRadius: currentRadius,
							borderColor: "var(--border)",
							backgroundColor: "var(--card)",
						}}
					>
						<h3
							className="mb-4 text-sm font-semibold"
							style={{ color: "var(--card-foreground)" }}
						>
							Form controls
						</h3>
						<label
							htmlFor="stacker-preview-email"
							className="block text-xs font-medium"
							style={{ color: "var(--muted-foreground)" }}
						>
							Email
						</label>
						<input
							id="stacker-preview-email"
							type="text"
							readOnly
							placeholder="you@example.com"
							className="mt-1 w-full border px-3 py-2 text-sm outline-none"
							style={{
								borderRadius: currentRadius,
								borderColor: "var(--border)",
								backgroundColor: "var(--input)",
								color: "var(--foreground)",
							}}
						/>
						<label
							htmlFor="stacker-preview-message"
							className="mt-4 block text-xs font-medium"
							style={{ color: "var(--muted-foreground)" }}
						>
							Message
						</label>
						<textarea
							id="stacker-preview-message"
							readOnly
							rows={3}
							placeholder="Write something…"
							className="mt-1 w-full resize-none border px-3 py-2 text-sm outline-none"
							style={{
								borderRadius: currentRadius,
								borderColor: "var(--border)",
								backgroundColor: "var(--input)",
								color: "var(--foreground)",
							}}
						/>
						<div className="mt-4 flex flex-wrap items-center gap-4">
							<div
								className="flex items-center gap-2 text-sm"
								style={{ color: "var(--foreground)" }}
							>
								<span
									className="inline-flex h-4 w-4 items-center justify-center border"
									style={{
										borderRadius: radiusMap.sm,
										borderColor: "var(--primary)",
										backgroundColor: "var(--primary)",
									}}
									aria-hidden
								>
									<span
										className="h-2 w-2"
										style={{ backgroundColor: "var(--primary-foreground)" }}
									/>
								</span>
								<span>Remember me</span>
							</div>
							<div
								className="relative h-7 w-12 rounded-full"
								style={{ backgroundColor: "var(--primary)" }}
							>
								<div
									className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow"
									style={{ right: "2px" }}
								/>
							</div>
						</div>
					</div>

					<div
						className="border p-5"
						style={{
							borderRadius: currentRadius,
							borderColor: "var(--border)",
							backgroundColor: "var(--card)",
						}}
					>
						<h3
							className="mb-4 text-sm font-semibold"
							style={{ color: "var(--card-foreground)" }}
						>
							Badges & alerts
						</h3>
						<div className="flex flex-wrap gap-2">
							{["Default", "Secondary", "Outline", "Destructive"].map((b) => (
								<span
									key={b}
									className="inline-flex border px-2.5 py-0.5 text-xs font-medium"
									style={{
										borderRadius: currentRadius,
										backgroundColor:
											b === "Secondary"
												? "var(--secondary)"
												: b === "Outline"
													? "transparent"
													: b === "Destructive"
														? "var(--destructive)"
														: "var(--primary)",
										color:
											b === "Secondary"
												? "var(--secondary-foreground)"
												: b === "Outline"
													? "var(--foreground)"
													: b === "Destructive"
														? "var(--destructive-foreground)"
														: "var(--primary-foreground)",
										borderColor:
											b === "Outline" ? "var(--border)" : "transparent",
									}}
								>
									{b}
								</span>
							))}
						</div>
						<div
							className="mt-4 border px-3 py-2 text-sm"
							style={{
								borderRadius: currentRadius,
								borderColor: "var(--border)",
								backgroundColor: "var(--muted)",
								color: "var(--foreground)",
							}}
						>
							Neutral alert — uses muted surface and border tokens.
						</div>
						<div
							className="mt-2 border px-3 py-2 text-sm"
							style={{
								borderRadius: currentRadius,
								borderColor:
									"color-mix(in srgb, var(--destructive) 35%, var(--border))",
								backgroundColor:
									"color-mix(in srgb, var(--destructive) 12%, var(--background))",
								color: "var(--destructive)",
							}}
						>
							Destructive alert — error or irreversible action.
						</div>
					</div>
				</section>

				<section
					className="border p-5"
					style={{
						borderRadius: currentRadius,
						borderColor: "var(--border)",
						backgroundColor: "var(--card)",
					}}
				>
					<h3
						className="mb-4 text-sm font-semibold"
						style={{ color: "var(--card-foreground)" }}
					>
						Tabs & progress
					</h3>
					<div
						className="inline-flex gap-1 border p-1"
						style={{
							borderRadius: currentRadius,
							borderColor: "var(--border)",
							backgroundColor: "var(--muted)",
						}}
					>
						{["Overview", "Billing", "Settings"].map((tab, i) => (
							<button
								key={tab}
								type="button"
								className="px-3 py-1.5 text-xs font-medium"
								style={{
									borderRadius: radiusMap.sm,
									backgroundColor: i === 0 ? "var(--card)" : "transparent",
									color:
										i === 0 ? "var(--foreground)" : "var(--muted-foreground)",
									boxShadow: i === 0 ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
								}}
							>
								{tab}
							</button>
						))}
					</div>
					<div className="mt-4">
						<div
							className="flex justify-between text-xs"
							style={{ color: "var(--muted-foreground)" }}
						>
							<span>Progress</span>
							<span>72%</span>
						</div>
						<div
							className="mt-1 h-2 overflow-hidden"
							style={{
								borderRadius: "999px",
								backgroundColor: "var(--muted)",
							}}
						>
							<div
								className="h-full w-[72%]"
								style={{
									borderRadius: "999px",
									backgroundColor: "var(--primary)",
								}}
							/>
						</div>
					</div>
				</section>

				<section
					className="border overflow-hidden"
					style={{
						borderRadius: currentRadius,
						borderColor: "var(--border)",
						backgroundColor: "var(--card)",
					}}
				>
					<div
						className="border-b px-4 py-3 text-sm font-medium"
						style={{
							borderColor: "var(--border)",
							color: "var(--card-foreground)",
						}}
					>
						Sample data table
					</div>
					<table className="w-full text-left text-sm">
						<thead>
							<tr
								style={{
									backgroundColor: "var(--muted)",
									color: "var(--muted-foreground)",
								}}
							>
								<th className="px-4 py-2 font-medium">Name</th>
								<th className="px-4 py-2 font-medium">Role</th>
								<th className="px-4 py-2 font-medium text-right">Status</th>
							</tr>
						</thead>
						<tbody style={{ color: "var(--card-foreground)" }}>
							{[
								["Ada Lovelace", "Engineer", "Active"],
								["Grace Hopper", "Admin", "Active"],
								["Margaret Hamilton", "Lead", "Away"],
							].map(([a, b, c]) => (
								<tr
									key={a}
									className="border-t"
									style={{ borderColor: "var(--border)" }}
								>
									<td className="px-4 py-2">{a}</td>
									<td
										className="px-4 py-2"
										style={{ color: "var(--muted-foreground)" }}
									>
										{b}
									</td>
									<td className="px-4 py-2 text-right">
										<span
											className="inline-block rounded-full px-2 py-0.5 text-xs"
											style={{
												backgroundColor: "var(--accent)",
												color: "var(--accent-foreground)",
											}}
										>
											{c}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>

				<div className="grid gap-6 lg:grid-cols-3">
					{[
						{
							title: "Search",
							Icon: SearchIcon,
							body: "Search components, blocks, and templates",
						},
						{
							title: "Repository",
							Icon: GithubIcon,
							body: "stacker",
							sub: "Short ID in, real scaffold out.",
						},
						{
							title: "Launch",
							Icon: CalendarIcon,
							body: packageManager,
							sub: install ? "Install enabled" : "Code only",
						},
					].map(({ title, Icon, body, sub }) => (
						<div
							key={title}
							className="border p-6"
							style={{
								borderRadius: currentRadius,
								borderColor: "var(--border)",
								backgroundColor: "var(--card)",
							}}
						>
							<div
								className="flex items-center justify-between"
								style={{ color: "var(--card-foreground)" }}
							>
								<div className="text-sm font-medium">{title}</div>
								<Icon className="h-4 w-4" />
							</div>
							<div className="mt-4 text-sm font-semibold">
								{title === "Repository" ? (
									<span
										className="text-2xl font-semibold"
										style={{ color: "var(--card-foreground)" }}
									>
										{body}
									</span>
								) : title === "Launch" ? (
									<span
										className="text-xl font-semibold"
										style={{ color: "var(--card-foreground)" }}
									>
										{body}
									</span>
								) : (
									<span style={{ color: "var(--muted-foreground)" }}>
										{body}
									</span>
								)}
							</div>
							{sub ? (
								<div
									className="mt-2 text-sm"
									style={{ color: "var(--muted-foreground)" }}
								>
									{sub}
								</div>
							) : null}
							{title === "Search" ? (
								<div
									className="mt-4 flex items-center gap-3 border px-4 py-3 text-sm"
									style={{
										borderRadius: currentRadius,
										borderColor: "var(--border)",
										color: "var(--muted-foreground)",
									}}
								>
									<SearchIcon className="h-4 w-4 shrink-0" />
									{body}
								</div>
							) : null}
							{title === "Repository" ? (
								<button
									type="button"
									className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
									style={{
										borderRadius: currentRadius,
										backgroundColor: "var(--primary)",
										color: "var(--primary-foreground)",
									}}
								>
									<StarIcon className="h-4 w-4" />
									Star project
								</button>
							) : null}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

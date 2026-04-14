import { useState } from "react";
import { Calendar, ChevronDown, Github, MoreHorizontal, Search, Settings, Star, Trash2, User, Zap } from "lucide-react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
	TbTrash,
	TbUser,
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
				DeleteIcon: TbTrash,
				UserIcon: TbUser,
			};
		case "Phosphor":
			return {
				SearchIcon: PiMagnifyingGlass,
				StarIcon: PiStar,
				CalendarIcon: PiCalendarBlank,
				GithubIcon: PiGithubLogo,
				ZapIcon: PiSparkle,
				DeleteIcon: Trash2,
				UserIcon: User,
			};
		default:
			return {
				SearchIcon: Search,
				StarIcon: Star,
				CalendarIcon: Calendar,
				GithubIcon: Github,
				ZapIcon: Zap,
				DeleteIcon: Trash2,
				UserIcon: User,
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

	const [showDialog, setShowDialog] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [sliderValue, setSliderValue] = useState(65);
	const [showToast, setShowToast] = useState(false);

	const currentRadius = radiusMap[borderRadius] ?? radiusMap.default;
	const fontFamily = fontStack(font);
	const palette = pickPalette(baseColor, tweakcnTheme, previewMode);

	const { SearchIcon, StarIcon, CalendarIcon, GithubIcon, ZapIcon, DeleteIcon, UserIcon } =
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
			className="animate-in fade-in duration-300 w-full h-full pb-3 overflow-y-auto"
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
					<h3 className="mb-3 text-sm font-semibold">Buttons & Actions</h3>
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
								className="inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
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
						<button
							type="button"
							className="inline-flex items-center gap-2 border border-dashed px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
							style={{
								borderRadius: currentRadius,
								borderColor: "var(--border)",
								backgroundColor: "transparent",
								color: "var(--muted-foreground)",
							}}
						>
							<Settings className="h-4 w-4" />
							Settings
						</button>
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
							rows={2}
							placeholder="Write something…"
							className="mt-1 w-full resize-none border px-3 py-2 text-sm outline-none"
							style={{
								borderRadius: currentRadius,
								borderColor: "var(--border)",
								backgroundColor: "var(--input)",
								color: "var(--foreground)",
							}}
						/>
						<div className="mt-4 flex items-center gap-4">
							<div
								className="flex items-center gap-2 text-sm"
								style={{ color: "var(--foreground)" }}
							>
								<input
									type="checkbox"
									className="h-4 w-4"
									style={{ accentColor: "var(--primary)" }}
								/>
								<span>Remember me</span>
							</div>
							<div
								className="flex items-center gap-2 text-sm"
								style={{ color: "var(--muted-foreground)" }}
							>
								<input
									type="radio"
									name="plan"
									className="h-4 w-4"
									style={{ accentColor: "var(--primary)" }}
								/>
								<span>Pro</span>
							</div>
						</div>
						<div className="mt-4">
							<div
								className="flex justify-between text-xs mb-2"
								style={{ color: "var(--muted-foreground)" }}
							>
								<span>Volume</span>
								<span>{sliderValue}%</span>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								value={sliderValue}
								onChange={(e) => setSliderValue(Number(e.target.value))}
								className="w-full h-2 appearance-none cursor-pointer"
								style={{
									borderRadius: "999px",
									backgroundColor: "var(--muted)",
								}}
							/>
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
							Badges, avatars & states
						</h3>
						<div className="flex flex-wrap gap-2 mb-4">
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
						<div className="flex items-center gap-3">
							<div
								className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium"
								style={{
									backgroundColor: "var(--primary)",
									color: "var(--primary-foreground)",
								}}
							>
								<UserIcon className="h-5 w-5" />
							</div>
							<div
								className="h-10 w-10 rounded-full"
								style={{ backgroundColor: "var(--accent)" }}
							/>
							<div
								className="h-10 w-10 rounded-full"
								style={{ backgroundColor: "var(--muted)" }}
							/>
							<span
								className="inline-flex h-2 w-2 rounded-full"
								style={{ backgroundColor: "var(--primary)" }}
							/>
						</div>
						<div className="mt-4 flex gap-2">
							<span
								className="inline-flex items-center gap-1 border px-2 py-1 text-xs"
								style={{
									borderRadius: currentRadius,
									borderColor: "var(--border)",
									backgroundColor: "var(--muted)",
									color: "var(--muted-foreground)",
								}}
							>
								<span
									className="h-1.5 w-1.5 rounded-full"
									style={{ backgroundColor: "#22c55e" }}
								/>
								Active
							</span>
							<span
								className="inline-flex items-center gap-1 border px-2 py-1 text-xs"
								style={{
									borderRadius: currentRadius,
									borderColor: "var(--border)",
									backgroundColor: "var(--muted)",
									color: "var(--muted-foreground)",
								}}
							>
								<span
									className="h-1.5 w-1.5 rounded-full"
									style={{ backgroundColor: "#eab308" }}
								/>
								Pending
							</span>
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
						Interactive components
					</h3>
					<div className="flex flex-wrap gap-3">
						<button
							type="button"
							className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
							style={{
								borderRadius: currentRadius,
								backgroundColor: "var(--primary)",
								color: "var(--primary-foreground)",
							}}
							onClick={() => setShowDialog(true)}
						>
							Open Dialog
						</button>
						<div className="relative">
							<button
								type="button"
								className="inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium"
								style={{
									borderRadius: currentRadius,
									borderColor: "var(--border)",
									backgroundColor: "var(--card)",
									color: "var(--foreground)",
								}}
								onClick={() => setShowDropdown(!showDropdown)}
							>
								Dropdown <ChevronDown className="h-4 w-4" />
							</button>
							<AnimatePresence>
								{showDropdown && (
									<motion.div
										initial={{ opacity: 0, y: -4 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -4 }}
										className="absolute top-full left-0 mt-2 w-48 border shadow-lg z-50"
										style={{
											borderRadius: currentRadius,
											borderColor: "var(--border)",
											backgroundColor: "var(--popover)",
											color: "var(--popover-foreground)",
										}}
									>
										<div className="p-1">
											{[
												{ icon: UserIcon, label: "Profile" },
												{ icon: Settings, label: "Settings" },
												{ icon: DeleteIcon, label: "Delete", destructive: true },
											].map(({ icon: Icon, label, destructive }) => (
												<button
													key={label}
													type="button"
													className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-opacity-10"
													style={{
														borderRadius: radiusMap.sm,
														color: destructive ? "var(--destructive)" : "inherit",
													}}
												>
													<Icon className="h-4 w-4" />
													{label}
												</button>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<button
							type="button"
							className="inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium"
							style={{
								borderRadius: currentRadius,
								borderColor: "var(--border)",
								backgroundColor: "var(--card)",
								color: "var(--foreground)",
							}}
							onClick={() => {
								setShowToast(true);
								setTimeout(() => setShowToast(false), 3000);
							}}
						>
							Show Toast
						</button>
					</div>
					<AnimatePresence>
						{showToast && (
							<motion.div
								initial={{ opacity: 0, y: 20, x: 0 }}
								animate={{ opacity: 1, y: 0, x: 0 }}
								exit={{ opacity: 0, y: 20, x: 0 }}
								className="mt-4 flex items-center gap-3 border px-4 py-3 shadow-lg"
								style={{
									borderRadius: currentRadius,
									borderColor: "var(--border)",
									backgroundColor: "var(--accent)",
									color: "var(--accent-foreground)",
								}}
							>
								<StarIcon className="h-4 w-4" />
								<span className="text-sm font-medium">
									Saved successfully!
								</span>
							</motion.div>
						)}
					</AnimatePresence>
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
								className="px-3 py-1.5 text-xs font-medium transition-all"
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
					<div className="mt-4 grid gap-4 sm:grid-cols-3">
						<div>
							<div
								className="flex justify-between text-xs mb-1"
								style={{ color: "var(--muted-foreground)" }}
							>
								<span>Progress</span>
								<span>72%</span>
							</div>
							<div
								className="h-2 overflow-hidden"
								style={{
									borderRadius: "999px",
									backgroundColor: "var(--muted)",
								}}
							>
								<div
									className="h-full transition-all"
									style={{
										width: "72%",
										borderRadius: "999px",
										backgroundColor: "var(--primary)",
									}}
								/>
							</div>
						</div>
						<div>
							<div
								className="flex justify-between text-xs mb-1"
								style={{ color: "var(--muted-foreground)" }}
							>
								<span>Storage</span>
								<span>45%</span>
							</div>
							<div
								className="h-2 overflow-hidden"
								style={{
									borderRadius: "999px",
									backgroundColor: "var(--muted)",
								}}
							>
								<div
									className="h-full"
									style={{
										width: "45%",
										borderRadius: "999px",
										backgroundColor: "var(--accent)",
									}}
								/>
							</div>
						</div>
						<div>
							<div
								className="flex justify-between text-xs mb-1"
								style={{ color: "var(--muted-foreground)" }}
							>
								<span>CPU</span>
								<span>23%</span>
							</div>
							<div
								className="h-2 overflow-hidden"
								style={{
									borderRadius: "999px",
									backgroundColor: "var(--muted)",
								}}
							>
								<div
									className="h-full"
									style={{
										width: "23%",
										borderRadius: "999px",
										backgroundColor: "var(--secondary)",
									}}
								/>
							</div>
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
						className="border-b px-4 py-3 text-sm font-medium flex items-center justify-between"
						style={{
							borderColor: "var(--border)",
							color: "var(--card-foreground)",
						}}
					>
						<span>Sample data table</span>
						<button
							type="button"
							className="p-1.5"
							style={{
								borderRadius: radiusMap.sm,
								backgroundColor: "var(--muted)",
							}}
						>
							<MoreHorizontal className="h-4 w-4" />
						</button>
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
									<td className="px-4 py-3">
										<div className="flex items-center gap-3">
											<div
												className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium"
												style={{
													backgroundColor: "var(--primary)",
													color: "var(--primary-foreground)",
												}}
											>
												{a.split(" ").map((n) => n[0]).join("")}
											</div>
											<span>{a}</span>
										</div>
									</td>
									<td
										className="px-4 py-3"
										style={{ color: "var(--muted-foreground)" }}
									>
										{b}
									</td>
									<td className="px-4 py-3 text-right">
										<span
											className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
											style={{
												backgroundColor: "var(--accent)",
												color: "var(--accent-foreground)",
											}}
										>
											<span
												className="h-1.5 w-1.5 rounded-full"
												style={{
													backgroundColor:
														c === "Active" ? "#22c55e" : "#eab308",
												}}
											/>
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

				<AnimatePresence>
					{showDialog && (
						<>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="fixed inset-0 bg-black/50 z-50"
								onClick={() => setShowDialog(false)}
							/>
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: 20 }}
								className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md border shadow-2xl z-50"
								style={{
									borderRadius: currentRadius,
									borderColor: "var(--border)",
									backgroundColor: "var(--popover)",
									color: "var(--popover-foreground)",
								}}
							>
								<div
									className="border-b px-6 py-4 flex items-center justify-between"
									style={{ borderColor: "var(--border)" }}
								>
									<h2 className="text-lg font-semibold">Dialog Title</h2>
									<button
										type="button"
										className="p-1 hover:bg-opacity-10"
										onClick={() => setShowDialog(false)}
									>
										×
									</button>
								</div>
								<div className="px-6 py-4">
									<p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
										This is a dialog component. Dialogs display important
										information that requires the user's attention or input.
									</p>
								</div>
								<div
									className="border-t px-6 py-4 flex justify-end gap-3"
									style={{ borderColor: "var(--border)" }}
								>
									<button
										type="button"
										className="px-4 py-2 text-sm font-medium border"
										style={{
											borderRadius: currentRadius,
											borderColor: "var(--border)",
											backgroundColor: "transparent",
											color: "var(--foreground)",
										}}
										onClick={() => setShowDialog(false)}
									>
										Cancel
									</button>
									<button
										type="button"
										className="px-4 py-2 text-sm font-medium"
										style={{
											borderRadius: currentRadius,
											backgroundColor: "var(--primary)",
											color: "var(--primary-foreground)",
										}}
										onClick={() => setShowDialog(false)}
									>
										Confirm
									</button>
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

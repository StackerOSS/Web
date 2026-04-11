import {
	FiChevronDown,
	FiCircle,
	FiDroplet,
	FiLayers,
	FiLayout,
	FiPackage,
	FiSidebar,
	FiStar,
	FiType,
	FiZap,
} from "react-icons/fi";
import {
	SiAstro,
	SiLaravel,
	SiNextdotjs,
	SiReact,
	SiReactrouter,
	SiSolid,
	SiVite,
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PREVIEW_FONT_OPTIONS } from "@/lib/preview-fonts";
import {
	FRAMEWORKS,
	OFFICIAL_TWEAKCN_THEMES,
	SHADCN_BASE_COLOR_NAMES,
	SHADCN_BORDER_RADIUS_OPTIONS,
	SHADCN_COMPONENTS,
	SHADCN_STYLE_OPTIONS,
	TANSTACK_ADDONS,
} from "@/lib/stacker";
import { useStackStore } from "@/store/create-stack";

const FW_ICONS: Record<string, React.ElementType> = {
	"Next.js": SiNextdotjs,
	Vite: SiVite,
	"TanStack Start": FiZap,
	"React Router": SiReactrouter,
	Astro: SiAstro,
	Laravel: SiLaravel,
};

const RT_ICONS: Record<string, React.ElementType> = {
	React: SiReact,
	Solid: SiSolid,
};

export function FrontendConfig() {
	const framework = useStackStore((state) => state.framework);
	const setFramework = useStackStore((state) => state.setFramework);
	const selectedRuntime = useStackStore((state) => state.runtime);
	const setRuntime = useStackStore((state) => state.setRuntime);
	const uiSystem = useStackStore((state) => state.uiSystem);
	const setUiSystem = useStackStore((state) => state.setUiSystem);
	const shadcnAdvancedOpen = useStackStore((state) => state.shadcnAdvancedOpen);
	const setShadcnAdvancedOpen = useStackStore(
		(state) => state.setShadcnAdvancedOpen,
	);
	const shadcnBase = useStackStore((state) => state.shadcnBase);
	const setShadcnBase = useStackStore((state) => state.setShadcnBase);
	const tweakcnTheme = useStackStore((state) => state.tweakcnTheme);
	const setTweakcnTheme = useStackStore((state) => state.setTweakcnTheme);
	const themeStyle = useStackStore((state) => state.themeStyle);
	const setThemeStyle = useStackStore((state) => state.setThemeStyle);
	const baseColor = useStackStore((state) => state.baseColor);
	const setBaseColor = useStackStore((state) => state.setBaseColor);
	const borderRadius = useStackStore((state) => state.borderRadius);
	const setBorderRadius = useStackStore((state) => state.setBorderRadius);
	const iconLibrary = useStackStore((state) => state.iconLibrary);
	const setIconLibrary = useStackStore((state) => state.setIconLibrary);
	const font = useStackStore((state) => state.font);
	const setFont = useStackStore((state) => state.setFont);
	const shadcnComponents = useStackStore((state) => state.shadcnComponents);
	const toggleShadcnComponent = useStackStore(
		(state) => state.toggleShadcnComponent,
	);
	const tanstackPackages = useStackStore((state) => state.tanstackPackages);
	const toggleTanstackPackage = useStackStore(
		(state) => state.toggleTanstackPackage,
	);
	const frameworkMeta =
		FRAMEWORKS.find((item) => item.value === framework) ?? FRAMEWORKS[0];

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiLayout className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Starter</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Choose the actual CLI starter Stacker will run.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{FRAMEWORKS.map((frameworkOption) => {
						const Icon = FW_ICONS[frameworkOption.value] || FiPackage;
						return (
							<Button
								key={frameworkOption.value}
								variant={
									framework === frameworkOption.value ? "default" : "outline"
								}
								onClick={() => setFramework(frameworkOption.value)}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									framework === frameworkOption.value
										? "ring-2 ring-primary/20 shadow-md"
										: "hover:bg-muted/50"
								}`}
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="font-medium text-sm">
									{frameworkOption.label}
								</span>
							</Button>
						);
					})}
				</div>
				<div className="ml-12 rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground">
					<div className="font-medium text-foreground">
						{frameworkMeta.label}
					</div>
					<div className="mt-1">{frameworkMeta.description}</div>
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiZap className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Runtime</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Unavailable runtimes are disabled automatically.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{(["React", "Solid"] as const).map((runtime) => {
						const Icon = RT_ICONS[runtime];
						const disabled = !frameworkMeta.runtimes.includes(runtime);
						return (
							<Button
								key={runtime}
								variant={selectedRuntime === runtime ? "default" : "outline"}
								disabled={disabled}
								onClick={() => setRuntime(runtime)}
								className="justify-start gap-3 h-12 rounded-xl transition-all border"
							>
								<Icon className="w-4 h-4 shrink-0" />
								<span className="font-medium text-sm">{runtime}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiSidebar className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">UI System</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Base UI and Radix only exist inside shadcn advanced settings.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					<Button
						variant={uiSystem === "shadcn/ui" ? "default" : "outline"}
						onClick={() => setUiSystem("shadcn/ui")}
						className="justify-start gap-3 h-12 rounded-xl transition-all border"
					>
						<FiLayout className="w-4 h-4 shrink-0" />
						<span className="font-medium text-sm">shadcn/ui</span>
					</Button>
					<Button
						variant={uiSystem === "" ? "default" : "outline"}
						onClick={() => setUiSystem("")}
						className="justify-start gap-3 h-12 rounded-xl transition-all border"
					>
						<FiSidebar className="w-4 h-4 shrink-0" />
						<span className="font-medium text-sm">None</span>
					</Button>
				</div>

				{uiSystem === "shadcn/ui" && (
					<div className="ml-12 w-[calc(100%-3rem)]">
						<Collapsible
							open={shadcnAdvancedOpen}
							onOpenChange={setShadcnAdvancedOpen}
							className="rounded-2xl border bg-muted/20"
						>
							<CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left">
								<div>
									<div className="font-medium">Advanced shadcn settings</div>
									<div className="text-sm text-muted-foreground">
										Base, style, color, radius, icons, fonts, and components.
									</div>
								</div>
								<FiChevronDown
									className={`h-4 w-4 transition-transform ${
										shadcnAdvancedOpen ? "rotate-180" : ""
									}`}
								/>
							</CollapsibleTrigger>
							<CollapsibleContent className="border-t p-4 pt-5">
								<div className="space-y-6">
									<div className="space-y-3">
										<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Primitive base
										</div>
										<div className="grid grid-cols-2 gap-3">
											<Button
												variant={shadcnBase === "base" ? "default" : "outline"}
												onClick={() => setShadcnBase("base")}
												className="justify-start gap-3 rounded-xl"
											>
												<FiLayout className="h-4 w-4" />
												Base UI
											</Button>
											<Button
												variant={shadcnBase === "radix" ? "default" : "outline"}
												onClick={() => setShadcnBase("radix")}
												className="justify-start gap-3 rounded-xl"
											>
												<FiLayers className="h-4 w-4" />
												Radix UI
											</Button>
										</div>
									</div>

									<div className="space-y-3">
										<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											tweakcn registry themes
										</div>
										<p className="text-[11px] text-muted-foreground leading-snug">
											Same{" "}
											<code className="rounded bg-muted px-1">
												registry:style
											</code>{" "}
											themes as{" "}
											<a
												href="https://github.com/jnsahaj/tweakcn/blob/main/public/r/registry.json"
												target="_blank"
												rel="noreferrer"
												className="underline underline-offset-2 hover:text-foreground"
											>
												tweakcn&apos;s public registry
											</a>
											. Tile text is clamped so long descriptions stay visible.
										</p>
										<div className="max-h-[min(26rem,50vh)] overflow-y-auto overflow-x-hidden rounded-xl border border-border/60 bg-muted/10 p-2">
											<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
												{OFFICIAL_TWEAKCN_THEMES.map((theme) => (
													<Button
														key={theme.id}
														size="sm"
														variant={
															tweakcnTheme === theme.id ? "default" : "outline"
														}
														onClick={() => setTweakcnTheme(theme.id)}
														className="h-auto min-h-0 w-full min-w-0 items-start justify-start whitespace-normal rounded-xl px-3 py-3 text-left"
													>
														<div className="min-w-0 w-full text-left">
															<div className="truncate text-sm font-medium">
																{theme.label}
															</div>
															<div className="mt-1 line-clamp-3 break-words text-[11px] leading-snug text-muted-foreground">
																{theme.description}
															</div>
														</div>
													</Button>
												))}
											</div>
										</div>
									</div>

									<div className="space-y-3">
										<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Style
										</div>
										<div className="flex flex-wrap gap-2">
											{SHADCN_STYLE_OPTIONS.map((theme) => (
												<Button
													key={theme.value}
													size="sm"
													variant={
														themeStyle === theme.value ? "default" : "outline"
													}
													onClick={() => setThemeStyle(theme.value)}
													className="rounded-lg"
												>
													{theme.label}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-3">
										<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Base color
										</div>
										<div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto pr-1">
											{SHADCN_BASE_COLOR_NAMES.map((color) => (
												<Button
													key={color}
													size="sm"
													variant={baseColor === color ? "default" : "outline"}
													onClick={() => setBaseColor(color)}
													className="rounded-lg gap-2 capitalize"
												>
													<FiDroplet className="h-3 w-3" />
													{color}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-3">
										<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Border radius
										</div>
										<div className="flex flex-wrap gap-2">
											{SHADCN_BORDER_RADIUS_OPTIONS.map((radius) => (
												<Button
													key={radius.value}
													size="sm"
													variant={
														borderRadius === radius.value
															? "default"
															: "outline"
													}
													onClick={() => setBorderRadius(radius.value)}
													className="rounded-lg gap-2"
												>
													<FiCircle className="h-3 w-3" />
													{radius.label}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-3">
										<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Icon library
										</div>
										<div className="flex flex-wrap gap-2">
											{["Lucide", "Tabler Icons", "Phosphor"].map((icon) => (
												<Button
													key={icon}
													size="sm"
													variant={iconLibrary === icon ? "default" : "outline"}
													onClick={() => setIconLibrary(icon)}
													className="rounded-lg gap-2"
												>
													<FiStar className="h-3 w-3" />
													{icon}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-3">
										<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Font
										</div>
										<div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto pr-1">
											{PREVIEW_FONT_OPTIONS.map((fontOption) => (
												<Button
													key={fontOption}
													size="sm"
													variant={font === fontOption ? "default" : "outline"}
													onClick={() => setFont(fontOption)}
													className="rounded-lg gap-2"
												>
													<FiType className="h-3 w-3" />
													{fontOption}
												</Button>
											))}
										</div>
									</div>

									<div className="space-y-3">
										<div className="flex items-center justify-between">
											<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
												Components to add
											</div>
											<Badge variant="secondary">
												{shadcnComponents.length} selected
											</Badge>
										</div>
										<div className="max-h-72 overflow-y-auto overflow-x-hidden rounded-lg border border-border/50 bg-muted/10 p-2">
											<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
												{SHADCN_COMPONENTS.map((component) => (
													<Button
														key={component}
														size="sm"
														variant={
															shadcnComponents.includes(component)
																? "default"
																: "outline"
														}
														onClick={() => toggleShadcnComponent(component)}
														className={`justify-start rounded-lg text-xs ${
															shadcnComponents.includes(component)
																? "bg-primary/10 text-primary hover:bg-primary/20"
																: "bg-background"
														}`}
													>
														<FiPackage className="mr-2 h-3.5 w-3.5 shrink-0" />
														<span className="truncate">{component}</span>
													</Button>
												))}
											</div>
										</div>
									</div>
								</div>
							</CollapsibleContent>
						</Collapsible>
					</div>
				)}
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiPackage className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">TanStack Add-ons</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Add-ons feed into the generated scaffold commands.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{TANSTACK_ADDONS.map((addon) => (
						<Button
							key={addon.id}
							variant={
								tanstackPackages.includes(addon.id) ? "default" : "outline"
							}
							onClick={() => toggleTanstackPackage(addon.id)}
							className={`justify-start gap-2 h-10 rounded-lg transition-all border text-xs ${
								tanstackPackages.includes(addon.id)
									? "ring-1 ring-primary/20 shadow-sm bg-primary/10 text-primary hover:bg-primary/20"
									: "bg-muted/30 hover:bg-muted/50"
							}`}
						>
							<FiPackage className="w-3 h-3 shrink-0" />
							<span className="font-medium">{addon.label}</span>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

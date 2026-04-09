import { useStackStore } from "@/store/create-stack";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SiNextdotjs, SiVite, SiReactrouter, SiAstro, SiLaravel } from "react-icons/si";
import { FiLayout, FiSidebar, FiDroplet, FiZap, FiPackage } from "react-icons/fi";

const FW_ICONS: Record<string, React.ElementType> = {
	"Next.js": SiNextdotjs,
	Vite: SiVite,
	"React Router": SiReactrouter,
	Astro: SiAstro,
	Laravel: SiLaravel,
};

export function FrontendConfig() {
	const store = useStackStore();

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
			{/* Framework */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiLayout className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Framework</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Select the core meta-framework for your frontend.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{[
						"Next.js",
						"Vite",
						"TanStack Start",
						"React Router",
						"Astro",
						"Laravel",
					].map((fw) => {
						const Icon = FW_ICONS[fw];
						return (
							<Button
								key={fw}
								variant={store.framework === fw ? "default" : "outline"}
								onClick={() => store.setFramework(fw as any)}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									store.framework === fw
										? "ring-2 ring-primary/20 shadow-md"
										: "hover:bg-muted/50"
								}`}
							>
								{Icon && <Icon className="w-5 h-5 shrink-0" />}
								<span className="font-medium text-sm">{fw}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* UI System */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiSidebar className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">UI System</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Choose the component library or primitive foundation.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["shadcn/ui", "Base UI", "Radix primitives"].map((ui) => (
						<Button
							key={ui}
							variant={store.uiSystem === ui ? "default" : "outline"}
							onClick={() => store.setUiSystem(ui as any)}
							className={`justify-start h-12 rounded-xl transition-all border ${
								store.uiSystem === ui
									? "ring-2 ring-primary/20 shadow-md"
									: "hover:bg-muted/50"
							}`}
						>
							<span className="font-medium text-sm">{ui}</span>
						</Button>
					))}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Styling & Design System */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiDroplet className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Design System (tweakcn)</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Granularly configure your visual styling and base tokens.
						</div>
					</div>
				</div>
				<div className="space-y-6 ml-12 w-[calc(100%-3rem)] mt-4">
					<div className="space-y-3">
						<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme Style</div>
						<div className="flex flex-wrap gap-2">
							{["Vega", "Nova", "Mala", "Lyra", "Mira", "Luma"].map((theme) => (
								<Button
									key={theme}
									size="sm"
									variant={store.themeStyle === theme ? "default" : "secondary"}
									onClick={() => store.setThemeStyle(theme)}
									className={`rounded-lg ${store.themeStyle === theme ? "shadow-sm" : "bg-muted/60"}`}
								>
									{theme}
								</Button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Base Colors</div>
						<div className="flex flex-wrap gap-2">
							{["Neutral", "Stone", "Zinc", "Mauve", "Mist", "Olive", "Taupe"].map(
								(color) => (
									<Button
										key={color}
										size="sm"
										variant={store.baseColor === color ? "default" : "secondary"}
										onClick={() => store.setBaseColor(color)}
										className={`rounded-lg ${store.baseColor === color ? "shadow-sm" : "bg-muted/60"}`}
									>
										{color}
									</Button>
								),
							)}
						</div>
					</div>

					<div className="space-y-3">
						<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Border Radius</div>
						<div className="flex flex-wrap gap-2">
							{["Default", "None", "Small", "Medium", "Large"].map((radius) => (
								<Button
									key={radius}
									size="sm"
									variant={store.borderRadius === radius ? "default" : "secondary"}
									onClick={() => store.setBorderRadius(radius)}
									className={`rounded-lg ${store.borderRadius === radius ? "shadow-sm" : "bg-muted/60"}`}
								>
									{radius}
								</Button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Icon Library</div>
						<div className="flex flex-wrap gap-2">
							{[
								"Lucide",
								"Tabler Icons",
								"Huge Icons",
								"Phosphor",
								"Remix Icons",
							].map((icon) => (
								<Button
									key={icon}
									size="sm"
									variant={store.iconLibrary === icon ? "default" : "secondary"}
									onClick={() => store.setIconLibrary(icon)}
									className={`rounded-lg ${store.iconLibrary === icon ? "shadow-sm" : "bg-muted/60"}`}
								>
									{icon}
								</Button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fonts</div>
						<div className="flex flex-wrap gap-2">
							{["Inter", "Geist", "Manrope", "Satoshi", "Plus Jakarta Sans"].map(
								(font) => (
									<Button
										key={font}
										size="sm"
										variant={store.font === font ? "default" : "secondary"}
										onClick={() => store.setFont(font)}
										className={`rounded-lg ${store.font === font ? "shadow-sm" : "bg-muted/60"}`}
									>
										{font}
									</Button>
								),
							)}
						</div>
					</div>
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* TanStack Runtime */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiZap className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">TanStack Runtime</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Select between React or Solid bindings.
						</div>
					</div>
				</div>
				<div className="ml-12 w-[calc(100%-3rem)] space-y-2">
					<div className="grid grid-cols-2 gap-3">
						{["React", "Solid"].map((rt) => {
							const disabled = rt === "Solid" && store.framework === "Next.js";
							return (
								<Button
									key={rt}
									variant={store.runtime === rt ? "default" : "outline"}
									disabled={disabled}
									onClick={() => store.setRuntime(rt as any)}
									title={disabled ? "Solid cannot be used with Next.js" : ""}
									className={`justify-start h-12 rounded-xl transition-all border ${
										store.runtime === rt
											? "ring-2 ring-primary/20 shadow-md"
											: "hover:bg-muted/50"
									}`}
								>
									<span className="font-medium text-sm">{rt}</span>
								</Button>
							);
						})}
					</div>
					{store.framework === "Next.js" && store.runtime === "Solid" && (
						<div className="text-xs text-destructive mt-1 font-medium bg-destructive/10 p-2 rounded-md">
							Solid runtime is currently not compatible with Next.js
						</div>
					)}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* TanStack Packages */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiPackage className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">TanStack Packages</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Toggle the powerful unopinionated TanStack libraries.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{[
						"TanStack Query",
						"TanStack Router",
						"TanStack Form",
						"TanStack Table",
						"TanStack Store",
						"TanStack DB",
						"TanStack AI",
					].map((pkg) => (
						<Button
							key={pkg}
							variant={
								store.tanstackPackages.includes(pkg) ? "default" : "outline"
							}
							onClick={() => store.toggleTanstackPackage(pkg)}
							className={`justify-start h-10 rounded-lg transition-all border text-xs ${
								store.tanstackPackages.includes(pkg)
									? "ring-1 ring-primary/20 shadow-sm bg-primary/10 text-primary hover:bg-primary/20"
									: "bg-muted/30"
							}`}
						>
							<span className="font-medium">{pkg}</span>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

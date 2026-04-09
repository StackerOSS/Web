import { useStackStore } from "@/store/create-stack";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SiNextdotjs, SiVite, SiReactrouter, SiAstro, SiLaravel } from "react-icons/si";

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
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
			<div className="space-y-2">
				<Label>Framework</Label>
				<div className="grid grid-cols-2 gap-2">
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
								className="justify-start gap-2"
							>
								{Icon && <Icon className="w-4 h-4" />}
								{fw}
							</Button>
						);
					})}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>UI System</Label>
				<div className="grid grid-cols-2 gap-2">
					{["shadcn/ui", "Base UI", "Radix primitives"].map((ui) => (
						<Button
							key={ui}
							variant={store.uiSystem === ui ? "default" : "outline"}
							onClick={() => store.setUiSystem(ui as any)}
						>
							{ui}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Styling & Design System (tweakcn)</Label>
				<div className="text-xs font-semibold mt-2">Theme Style</div>
				<div className="flex flex-wrap gap-2">
					{["Vega", "Nova", "Mala", "Lyra", "Mira", "Luma"].map((theme) => (
						<Button
							key={theme}
							size="sm"
							variant={store.themeStyle === theme ? "default" : "outline"}
							onClick={() => store.setThemeStyle(theme)}
						>
							{theme}
						</Button>
					))}
				</div>

				<div className="text-xs font-semibold mt-4">Base Colors</div>
				<div className="flex flex-wrap gap-2">
					{["Neutral", "Stone", "Zinc", "Mauve", "Mist", "Olive", "Taupe"].map(
						(color) => (
							<Button
								key={color}
								size="sm"
								variant={store.baseColor === color ? "default" : "outline"}
								onClick={() => store.setBaseColor(color)}
							>
								{color}
							</Button>
						),
					)}
				</div>

				<div className="text-xs font-semibold mt-4">Border Radius</div>
				<div className="flex flex-wrap gap-2">
					{["Default", "None", "Small", "Medium", "Large"].map((radius) => (
						<Button
							key={radius}
							size="sm"
							variant={store.borderRadius === radius ? "default" : "outline"}
							onClick={() => store.setBorderRadius(radius)}
						>
							{radius}
						</Button>
					))}
				</div>

				<div className="text-xs font-semibold mt-4">Icon Library</div>
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
							variant={store.iconLibrary === icon ? "default" : "outline"}
							onClick={() => store.setIconLibrary(icon)}
						>
							{icon}
						</Button>
					))}
				</div>

				<div className="text-xs font-semibold mt-4">Fonts</div>
				<div className="flex flex-wrap gap-2">
					{["Inter", "Geist", "Manrope", "Satoshi", "Plus Jakarta Sans"].map(
						(font) => (
							<Button
								key={font}
								size="sm"
								variant={store.font === font ? "default" : "outline"}
								onClick={() => store.setFont(font)}
							>
								{font}
							</Button>
						),
					)}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>TanStack Runtime</Label>
				<div className="grid grid-cols-2 gap-2">
					{["React", "Solid"].map((rt) => {
						const disabled = rt === "Solid" && store.framework === "Next.js";
						return (
							<Button
								key={rt}
								variant={store.runtime === rt ? "default" : "outline"}
								disabled={disabled}
								onClick={() => store.setRuntime(rt as any)}
								title={disabled ? "Solid cannot be used with Next.js" : ""}
							>
								{rt}
							</Button>
						);
					})}
				</div>
				{store.framework === "Next.js" && store.runtime === "Solid" && (
					<div className="text-xs text-destructive">
						Solid is disabled with Next.js
					</div>
				)}
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>TanStack Packages</Label>
				<div className="grid grid-cols-2 gap-2">
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
							className="justify-start text-xs"
						>
							{pkg}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

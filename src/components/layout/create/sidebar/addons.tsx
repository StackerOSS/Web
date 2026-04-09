import { useStackStore } from "@/store/create-stack";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FiGrid, FiSend, FiActivity, FiGlobe, FiTool } from "react-icons/fi";

export function AddonsConfig() {
	const store = useStackStore();

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
			{/* Integrations */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiGrid className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Integrations</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Select third-party tools to pre-configure and wire into your stack.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{[
						"Cloudflare",
						"Netlify",
						"Railway",
						"Sentry",
						"WorkOS",
						"Clerk",
						"Neon",
						"Prisma",
						"Strapi",
					].map((item) => (
						<Button
							key={item}
							size="sm"
							variant={
								store.integrations.includes(item) ? "default" : "outline"
							}
							onClick={() => store.toggleIntegration(item)}
							className={`justify-start h-10 rounded-lg transition-all border text-xs ${
								store.integrations.includes(item)
									? "ring-1 ring-primary/20 shadow-sm bg-primary/10 text-primary hover:bg-primary/20"
									: "bg-muted/30 hover:bg-muted/50"
							}`}
						>
							<span className="font-medium">{item}</span>
						</Button>
					))}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Deployment */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiSend className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Deployment</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Target your infrastructure and configure build targets.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Cloudflare", "Netlify", "Railway", "Nitro"].map((dep) => (
						<Button
							key={dep}
							variant={store.deployment === dep ? "default" : "outline"}
							onClick={() => store.setDeployment(dep as any)}
							className={`justify-start h-12 rounded-xl transition-all border ${
								store.deployment === dep
									? "ring-2 ring-primary/20 shadow-md"
									: "hover:bg-muted/50"
							}`}
						>
							<span className="font-medium text-sm">{dep}</span>
						</Button>
					))}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Monitoring */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiActivity className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Observability</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Analytics, error tracking, and performance monitoring tools.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Sentry"].map((mon) => (
						<Button
							key={mon}
							variant={store.monitoring === mon ? "default" : "outline"}
							onClick={() => store.setMonitoring(mon as any)}
							className={`justify-start h-12 rounded-xl transition-all border ${
								store.monitoring === mon
									? "ring-2 ring-primary/20 shadow-md"
									: "hover:bg-muted/50"
							}`}
						>
							<span className="font-medium text-sm">{mon}</span>
						</Button>
					))}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* i18n */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiGlobe className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Internationalization (i18n)</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Ensure your application is globally accessible and translated.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Paraglide"].map((i1) => (
						<Button
							key={i1}
							variant={store.i18n === i1 ? "default" : "outline"}
							onClick={() => store.setI18n(i1 as any)}
							className={`justify-start h-12 rounded-xl transition-all border ${
								store.i18n === i1
									? "ring-2 ring-primary/20 shadow-md"
									: "hover:bg-muted/50"
							}`}
						>
							<span className="font-medium text-sm">{i1}</span>
						</Button>
					))}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Dev Tooling */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiTool className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Dev Tooling</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Additional linting, formatting, mapping, and core workflow tools.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Storybook", "Biome", "ESLint", "T3Env", "Compiler"].map((tool) => (
						<Button
							key={tool}
							size="sm"
							variant={store.devTooling.includes(tool) ? "default" : "outline"}
							onClick={() => store.toggleDevTooling(tool)}
							className={`justify-start h-10 rounded-lg transition-all border text-xs ${
								store.devTooling.includes(tool)
									? "ring-1 ring-primary/20 shadow-sm bg-primary/10 text-primary hover:bg-primary/20"
									: "bg-muted/30 hover:bg-muted/50"
							}`}
						>
							<span className="font-medium">{tool}</span>
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

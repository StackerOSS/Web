import { useStackStore } from "@/store/create-stack";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function AddonsConfig() {
	const store = useStackStore();
	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
			<div className="space-y-2">
				<Label>Integrations</Label>
				<div className="grid grid-cols-2 gap-2">
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
							className="justify-start text-xs"
						>
							{item}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Deployment</Label>
				<div className="grid grid-cols-2 gap-2">
					{["Cloudflare", "Netlify", "Railway", "Nitro"].map((dep) => (
						<Button
							key={dep}
							variant={store.deployment === dep ? "default" : "outline"}
							onClick={() => store.setDeployment(dep as any)}
						>
							{dep}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Monitoring</Label>
				<div className="grid grid-cols-2 gap-2">
					{["Sentry"].map((mon) => (
						<Button
							key={mon}
							variant={store.monitoring === mon ? "default" : "outline"}
							onClick={() => store.setMonitoring(mon as any)}
						>
							{mon}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>i18n</Label>
				<div className="grid grid-cols-2 gap-2">
					{["Paraglide"].map((i1) => (
						<Button
							key={i1}
							variant={store.i18n === i1 ? "default" : "outline"}
							onClick={() => store.setI18n(i1 as any)}
						>
							{i1}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Dev Tooling</Label>
				<div className="grid grid-cols-2 gap-2">
					{["Storybook", "Biome", "ESLint", "T3Env", "Compiler"].map((tool) => (
						<Button
							key={tool}
							size="sm"
							variant={store.devTooling.includes(tool) ? "default" : "outline"}
							onClick={() => store.toggleDevTooling(tool)}
							className="justify-start text-xs"
						>
							{tool}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

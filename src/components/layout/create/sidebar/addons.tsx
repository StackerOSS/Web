import { useEffect, useState } from "react";
import {
	FiActivity,
	FiDatabase,
	FiFramer,
	FiGlobe,
	FiGrid,
	FiMessageCircle,
	FiPackage,
	FiSend,
	FiSettings,
	FiTerminal,
	FiTool,
	FiType,
	FiUserCheck,
	FiVideo,
	FiWind,
	FiX,
	FiZap,
} from "react-icons/fi";
import {
	SiClerk,
	SiCloudflare,
	SiEslint,
	SiGreensock,
	SiNetlify,
	SiPrisma,
	SiRailway,
	SiSentry,
	SiStorybook,
	SiStrapi,
} from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getInitCommand } from "@/lib/stacker";
import { type StackState, useStackStore } from "@/store/create-stack";

const INT_ICONS: Record<string, React.ElementType> = {
	Cloudflare: SiCloudflare,
	Netlify: SiNetlify,
	Railway: SiRailway,
	Sentry: SiSentry,
	WorkOS: FiUserCheck,
	Clerk: SiClerk,
	Neon: FiDatabase,
	Prisma: SiPrisma,
	Strapi: SiStrapi,
};

const DEP_ICONS: Record<string, React.ElementType> = {
	Cloudflare: SiCloudflare,
	Netlify: SiNetlify,
	Railway: SiRailway,
	Nitro: FiZap,
};

const TOOL_ICONS: Record<string, React.ElementType> = {
	Storybook: SiStorybook,
	Biome: FiZap,
	ESLint: SiEslint,
	T3Env: FiSettings,
	Compiler: FiTerminal,
};

export function AddonsConfig() {
	const addPackage = useStackStore((state) => state.addPackage);
	const packages = useStackStore((state) => state.packages);
	const removePackage = useStackStore((state) => state.removePackage);
	const integrations = useStackStore((state) => state.integrations);
	const toggleIntegration = useStackStore((state) => state.toggleIntegration);
	const deployment = useStackStore((state) => state.deployment);
	const setDeployment = useStackStore((state) => state.setDeployment);
	const monitoring = useStackStore((state) => state.monitoring);
	const setMonitoring = useStackStore((state) => state.setMonitoring);
	const i18n = useStackStore((state) => state.i18n);
	const setI18n = useStackStore((state) => state.setI18n);
	const devTooling = useStackStore((state) => state.devTooling);
	const toggleDevTooling = useStackStore((state) => state.toggleDevTooling);
	const typings = useStackStore((state) => state.typings);
	const setTypings = useStackStore((state) => state.setTypings);
	const animations = useStackStore((state) => state.animations);
	const setAnimations = useStackStore((state) => state.setAnimations);
	const templateId = useStackStore((state) => state.templateId);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<
		Array<{ name: string; description: string }>
	>([]);
	const [loading, setLoading] = useState(false);

	const copyInitCommand = () => {
		void navigator.clipboard.writeText(getInitCommand(templateId));
	};

	const addPackageFromSearch = (name: string) => {
		addPackage(name);
		copyInitCommand();
		setQuery("");
		setResults([]);
		setLoading(false);
	};

	useEffect(() => {
		if (query.trim().length < 2) {
			setResults([]);
			return;
		}

		const controller = new AbortController();
		const timeout = setTimeout(async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/npm-search?q=${encodeURIComponent(query)}`,
					{
						signal: controller.signal,
					},
				);
				const data = await response.json();
				setResults(data.packages ?? []);
			} catch {
				setResults([]);
			} finally {
				setLoading(false);
			}
		}, 250);

		return () => {
			controller.abort();
			clearTimeout(timeout);
		};
	}, [query]);

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiPackage className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Extra Packages</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Search npm packages and add them directly to the generated install
							plan.
						</div>
					</div>
				</div>
				<div className="ml-12 w-[calc(100%-3rem)] space-y-3">
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search npm packages"
						className="h-11"
					/>
					<div className="rounded-xl border bg-muted/20">
						{loading ? (
							<div className="p-3 text-sm text-muted-foreground">
								Searching npm...
							</div>
						) : results.length > 0 ? (
							<div className="divide-y">
								{results.map((item) => (
									<button
										type="button"
										key={item.name}
										onClick={() => addPackageFromSearch(item.name)}
										className="flex w-full items-start justify-between gap-4 p-3 text-left hover:bg-muted/40"
									>
										<div>
											<div className="font-medium">{item.name}</div>
											<div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
												{item.description || "No package description provided."}
											</div>
										</div>
										<Badge variant="outline">Add</Badge>
									</button>
								))}
							</div>
						) : (
							<div className="p-3 text-sm text-muted-foreground">
								Type at least two characters to search the npm registry.
							</div>
						)}
					</div>
					<div className="flex flex-wrap gap-2">
						{packages.map((pkg) => (
							<div
								key={pkg}
								className="group inline-flex max-w-full min-w-0 items-center rounded-full border bg-background text-xs font-medium shadow-sm transition-[border-color,box-shadow] hover:border-border/80 hover:bg-muted/30"
							>
								<span className="truncate py-1 pl-3 pr-3 transition-[padding] duration-200 ease-out group-hover:pr-1 group-focus-within:pr-1">
									{pkg}
								</span>
								<button
									type="button"
									onClick={() => removePackage(pkg)}
									className="inline-flex h-7 w-0 shrink-0 items-center justify-center overflow-hidden rounded-r-full text-muted-foreground opacity-0 transition-[width,opacity] duration-200 ease-out hover:bg-destructive/15 hover:text-destructive focus-visible:w-7 focus-visible:opacity-100 group-hover:w-7 group-hover:opacity-100"
									aria-label={`Remove ${pkg}`}
								>
									<FiX className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiGrid className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Integrations</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Third-party services you want baked into the scaffold plan.
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
					].map((item) => {
						const Icon = INT_ICONS[item] || FiGrid;
						return (
							<Button
								key={item}
								size="sm"
								variant={integrations.includes(item) ? "default" : "outline"}
								onClick={() => {
									toggleIntegration(item);
									copyInitCommand();
								}}
								className={`justify-start gap-2 h-10 rounded-lg transition-all border text-xs ${
									integrations.includes(item)
										? "ring-1 ring-primary/20 shadow-sm bg-primary/10 text-primary hover:bg-primary/20"
										: "bg-muted/30 hover:bg-muted/50"
								}`}
							>
								<Icon className="w-3 h-3 shrink-0" />
								<span className="font-medium">{item}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiSend className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Deployment</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Target infrastructure for the scaffolded project.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Cloudflare", "Netlify", "Railway", "Nitro"].map((dep) => {
						const Icon = DEP_ICONS[dep] || FiSend;
						return (
							<Button
								key={dep}
								variant={deployment === dep ? "default" : "outline"}
								onClick={() => {
									setDeployment(deployment === dep ? "" : dep);
									copyInitCommand();
								}}
								className="justify-start gap-3 h-12 rounded-xl transition-all border"
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="font-medium text-sm">{dep}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiActivity className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Observability</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Error tracking and monitoring.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					<Button
						variant={monitoring === "Sentry" ? "default" : "outline"}
						onClick={() => {
							setMonitoring(monitoring === "Sentry" ? "" : "Sentry");
							copyInitCommand();
						}}
						className="justify-start gap-3 h-12 rounded-xl transition-all border"
					>
						<SiSentry className="w-5 h-5 shrink-0" />
						<span className="font-medium text-sm">Sentry</span>
					</Button>
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiGlobe className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">
							Internationalization
						</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Add translation support to the plan.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					<Button
						variant={i18n === "Paraglide" ? "default" : "outline"}
						onClick={() => {
							setI18n(i18n === "Paraglide" ? "" : "Paraglide");
							copyInitCommand();
						}}
						className="justify-start gap-3 h-12 rounded-xl transition-all border"
					>
						<FiMessageCircle className="w-5 h-5 shrink-0" />
						<span className="font-medium text-sm">Paraglide</span>
					</Button>
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiTool className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Dev Tooling</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Extra tooling to wire into the generated setup.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Storybook", "Biome", "ESLint", "T3Env", "Compiler"].map((tool) => {
						const Icon = TOOL_ICONS[tool] || FiTool;
						return (
							<Button
								key={tool}
								size="sm"
								variant={devTooling.includes(tool) ? "default" : "outline"}
								onClick={() => {
									toggleDevTooling(tool);
									copyInitCommand();
								}}
								className={`justify-start gap-2 h-10 rounded-lg transition-all border text-xs ${
									devTooling.includes(tool)
										? "ring-1 ring-primary/20 shadow-sm bg-primary/10 text-primary hover:bg-primary/20"
										: "bg-muted/30 hover:bg-muted/50"
								}`}
							>
								<Icon className="w-3 h-3 shrink-0" />
								<span className="font-medium">{tool}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiType className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">
							Validation & Typings
						</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Choose the schema library to add.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Zod", "ArkType"].map((typ) => (
						<Button
							key={typ}
							variant={typings === typ ? "default" : "outline"}
							onClick={() => {
								setTypings(
									typings === typ
										? ""
										: (typ as Exclude<StackState["typings"], "">),
								);
								copyInitCommand();
							}}
							className="justify-start gap-3 h-12 rounded-xl transition-all border"
						>
							<FiType className="w-5 h-5 shrink-0" />
							<span className="font-medium text-sm">{typ}</span>
						</Button>
					))}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiVideo className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Animations</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Add a motion library to the install plan.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Framer Motion", "Motion", "AutoAnimate", "GSAP"].map((anim) => {
						const Icon =
							anim === "Framer Motion"
								? FiFramer
								: anim === "GSAP"
									? SiGreensock
									: anim === "AutoAnimate"
										? FiZap
										: FiWind;
						return (
							<Button
								key={anim}
								variant={animations === anim ? "default" : "outline"}
								onClick={() => {
									setAnimations(
										animations === anim
											? ""
											: (anim as Exclude<StackState["animations"], "">),
									);
									copyInitCommand();
								}}
								className="justify-start gap-3 h-12 rounded-xl transition-all border"
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="font-medium text-sm">{anim}</span>
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

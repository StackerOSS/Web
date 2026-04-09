import { useStackStore } from "@/store/create-stack";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
	SiPrisma,
	SiDrizzle,
	SiClerk,
	SiApollographql,
	SiTrpc,
} from "react-icons/si";
import {
	FiDatabase,
	FiLayers,
	FiLock,
	FiCloud,
	FiZap,
	FiShield,
	FiRepeat,
	FiCode,
	FiUserCheck,
} from "react-icons/fi";

const DB_ICONS: Record<string, React.ElementType> = {
	Neon: FiDatabase, // SiNeon doesn't always exist, fallback to FiDatabase
	Convex: FiZap,
};

const ORM_ICONS: Record<string, React.ElementType> = {
	Prisma: SiPrisma,
	Drizzle: SiDrizzle,
};

const AUTH_ICONS: Record<string, React.ElementType> = {
	WorkOS: FiUserCheck,
	Clerk: SiClerk,
	BetterAuth: FiShield,
};

const API_ICONS: Record<string, React.ElementType> = {
	MCP: FiCode,
	ORPC: FiRepeat,
	tRPC: SiTrpc,
	"Apollo Client": SiApollographql,
};

export function BackendConfig() {
	const store = useStackStore();
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
			{/* Database */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiDatabase className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Database</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Select the primary database solution for your application.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Neon", "Convex"].map((db) => {
						const Icon = DB_ICONS[db] || FiDatabase;
						return (
							<Button
								key={db}
								variant={store.database === db ? "default" : "outline"}
								onClick={() => store.setDatabase(db as any)}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									store.database === db
										? "ring-2 ring-primary/20 shadow-md"
										: "hover:bg-muted/50"
								}`}
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="font-medium text-sm">{db}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* ORM */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiLayers className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Database ORM</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Define and query your data seamlessly with a modern ORM.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["Prisma", "Drizzle"].map((orm) => {
						const Icon = ORM_ICONS[orm] || FiLayers;
						return (
							<Button
								key={orm}
								variant={store.orm === orm ? "default" : "outline"}
								onClick={() => store.setOrm(orm as any)}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									store.orm === orm
										? "ring-2 ring-primary/20 shadow-md"
										: "hover:bg-muted/50"
								}`}
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="font-medium text-sm">{orm}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Authentication */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiLock className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Authentication</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Integrate powerful and secure user identity management.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["WorkOS", "Clerk", "BetterAuth"].map((auth) => {
						const Icon = AUTH_ICONS[auth] || FiLock;
						return (
							<Button
								key={auth}
								variant={store.auth === auth ? "default" : "outline"}
								onClick={() => store.setAuth(auth as any)}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									store.auth === auth
										? "ring-2 ring-primary/20 shadow-md"
										: "hover:bg-muted/50"
								}`}
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="font-medium text-sm">{auth}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* API Layer */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiCloud className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">API Layer</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							The communication layer bridging frontend and backend.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["MCP", "ORPC", "tRPC", "Apollo Client"].map((api) => {
						const Icon = API_ICONS[api] || FiCloud;
						return (
							<Button
								key={api}
								variant={store.apiLayer === api ? "default" : "outline"}
								onClick={() => store.setApiLayer(api as any)}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									store.apiLayer === api
										? "ring-2 ring-primary/20 shadow-md"
										: "hover:bg-muted/50"
								}`}
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="font-medium text-sm">{api}</span>
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

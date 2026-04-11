import {
	FiCloud,
	FiCode,
	FiDatabase,
	FiLayers,
	FiLock,
	FiRepeat,
	FiShield,
	FiUserCheck,
	FiZap,
} from "react-icons/fi";
import {
	SiApollographql,
	SiClerk,
	SiDrizzle,
	SiPrisma,
	SiTrpc,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { type StackState, useStackStore } from "@/store/create-stack";

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
	const database = useStackStore((state) => state.database);
	const setDatabase = useStackStore((state) => state.setDatabase);
	const selectedOrm = useStackStore((state) => state.orm);
	const setOrm = useStackStore((state) => state.setOrm);
	const selectedAuth = useStackStore((state) => state.auth);
	const setAuth = useStackStore((state) => state.setAuth);
	const apiLayer = useStackStore((state) => state.apiLayer);
	const setApiLayer = useStackStore((state) => state.setApiLayer);
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
								variant={database === db ? "default" : "outline"}
								onClick={() =>
									setDatabase(
										database === db
											? ""
											: (db as Exclude<StackState["database"], "">),
									)
								}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									database === db
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
								variant={selectedOrm === orm ? "default" : "outline"}
								onClick={() =>
									setOrm(
										selectedOrm === orm
											? ""
											: (orm as Exclude<StackState["orm"], "">),
									)
								}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									selectedOrm === orm
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
								variant={selectedAuth === auth ? "default" : "outline"}
								onClick={() =>
									setAuth(
										selectedAuth === auth
											? ""
											: (auth as Exclude<StackState["auth"], "">),
									)
								}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									selectedAuth === auth
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
								variant={apiLayer === api ? "default" : "outline"}
								onClick={() =>
									setApiLayer(
										apiLayer === api
											? ""
											: (api as Exclude<StackState["apiLayer"], "">),
									)
								}
								className={`justify-start gap-3 h-12 rounded-xl transition-all border ${
									apiLayer === api
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

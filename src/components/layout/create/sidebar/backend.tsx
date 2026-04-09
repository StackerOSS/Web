import { useStackStore } from "@/store/create-stack";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function BackendConfig() {
	const store = useStackStore();
	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
			<div className="space-y-2">
				<Label>Database</Label>
				<div className="grid grid-cols-2 gap-2">
					{["Neon", "Convex"].map((db) => (
						<Button
							key={db}
							variant={store.database === db ? "default" : "outline"}
							onClick={() => store.setDatabase(db as any)}
						>
							{db}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>ORM</Label>
				<div className="grid grid-cols-2 gap-2">
					{["Prisma", "Drizzle"].map((orm) => (
						<Button
							key={orm}
							variant={store.orm === orm ? "default" : "outline"}
							onClick={() => store.setOrm(orm as any)}
						>
							{orm}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Authentication</Label>
				<div className="grid grid-cols-2 gap-2">
					{["WorkOS", "Clerk", "BetterAuth"].map((auth) => (
						<Button
							key={auth}
							variant={store.auth === auth ? "default" : "outline"}
							onClick={() => store.setAuth(auth as any)}
						>
							{auth}
						</Button>
					))}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>API Layer</Label>
				<div className="grid grid-cols-2 gap-2">
					{["MCP", "ORPC", "tRPC", "Apollo Client"].map((api) => (
						<Button
							key={api}
							variant={store.apiLayer === api ? "default" : "outline"}
							onClick={() => store.setApiLayer(api as any)}
						>
							{api}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

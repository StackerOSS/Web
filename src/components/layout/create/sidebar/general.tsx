import { useStackStore } from "@/store/create-stack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaGitAlt } from "react-icons/fa";
import { SiBun, SiNpm, SiPnpm, SiYarn } from "react-icons/si";

const PM_ICONS: Record<string, React.ElementType> = {
	bun: SiBun,
	npm: SiNpm,
	pnpm: SiPnpm,
	yarn: SiYarn,
};

export function GeneralConfig() {
	const store = useStackStore();

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
			<div className="space-y-2">
				<Label>Name</Label>
				<div className="text-sm text-muted-foreground mb-2">
					Name of the project
				</div>
				<Input
					value={store.name}
					onChange={(e) => store.setName(e.target.value)}
					placeholder="my-awesome-app"
				/>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>CLI command</Label>
				<Input
					value={`bunx @stacker/cli xCjNK`}
					readOnly
					className="bg-muted font-mono"
				/>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Package Manager</Label>
				<div className="text-sm text-muted-foreground mb-2">
					Choose the package manager of your choice
				</div>
				<div className="grid grid-cols-2 gap-2">
					{["bun", "npm", "pnpm", "yarn"].map((pm) => {
						const Icon = PM_ICONS[pm];
						return (
							<Button
								key={pm}
								variant={store.packageManager === pm ? "default" : "outline"}
								onClick={() => store.setPackageManager(pm as any)}
								className="justify-start gap-2"
							>
								{Icon && <Icon className="w-4 h-4" />}
								<span className="capitalize">{pm}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Git</Label>
				<div className="text-sm text-muted-foreground mb-2">
					Initialize git or not?
				</div>
				<div className="grid grid-cols-2 gap-2">
					<Button
						variant={store.git ? "default" : "outline"}
						onClick={() => store.setGit(true)}
						className="justify-start gap-2"
					>
						<FaGitAlt className="w-4 h-4" />
						git
					</Button>
					<Button
						variant={!store.git ? "default" : "outline"}
						onClick={() => store.setGit(false)}
					>
						No git
					</Button>
				</div>
			</div>

			<Separator />

			<div className="space-y-2">
				<Label>Install</Label>
				<div className="text-sm text-muted-foreground mb-2">
					Install packages or code only?
				</div>
				<div className="grid grid-cols-1 gap-2">
					<Button
						variant={!store.install ? "default" : "outline"}
						onClick={() => store.setInstall(false)}
						className="justify-start"
					>
						Initialize with code only
					</Button>
					<Button
						variant={store.install ? "default" : "outline"}
						onClick={() => store.setInstall(true)}
						className="justify-start"
					>
						Initialize with code and install the packages for me
					</Button>
				</div>
			</div>
		</div>
	);
}

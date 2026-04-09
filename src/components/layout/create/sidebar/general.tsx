import { useStackStore } from "@/store/create-stack";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaGitAlt } from "react-icons/fa";
import { SiBun, SiNpm, SiPnpm, SiYarn } from "react-icons/si";
import { 
	FiCode, 
	FiDownloadCloud, 
	FiXCircle,
	FiTerminal,
	FiBox,
	FiGitBranch,
	FiType,
	FiHardDrive
} from "react-icons/fi";

const PM_ICONS: Record<string, React.ElementType> = {
	bun: SiBun,
	npm: SiNpm,
	pnpm: SiPnpm,
	yarn: SiYarn,
};

export function GeneralConfig() {
	const store = useStackStore();

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-8">
			{/* Project Name */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiType className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Project Name</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							The identifier for your new repository. This will be the folder name.
						</div>
					</div>
				</div>
				<Input
					value={store.name}
					onChange={(e) => store.setName(e.target.value)}
					placeholder="my-awesome-app"
					className="h-11 text-base ml-12 w-[calc(100%-3rem)]"
				/>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* CLI Command */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiTerminal className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">CLI Command</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Run this command in your terminal to build the exact stack below.
						</div>
					</div>
				</div>
				<Input
					value={`bunx @stacker/cli xCjNK`}
					readOnly
					className="bg-muted/50 font-mono text-primary h-11 border-primary/20 ml-12 w-[calc(100%-3rem)]"
				/>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Package Manager */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiBox className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Package Manager</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Choose your preferred package manager to run your project.
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					{["bun", "npm", "pnpm", "yarn"].map((pm) => {
						const Icon = PM_ICONS[pm];
						return (
							<Button
								key={pm}
								variant={store.packageManager === pm ? "default" : "outline"}
								onClick={() => store.setPackageManager(pm as any)}
								className={`justify-start gap-3 h-12 rounded-xl border transition-all ${
									store.packageManager === pm
										? "ring-2 ring-primary/20 shadow-md"
										: "hover:bg-muted/50"
								}`}
							>
								{Icon && <Icon className="w-5 h-5 shrink-0" />}
								<span className="capitalize text-sm font-medium">{pm}</span>
							</Button>
						);
					})}
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Git Version Control */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiGitBranch className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Version Control</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Initialize a new git repository automatically?
						</div>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-3 ml-12 w-[calc(100%-3rem)]">
					<Button
						variant={store.git ? "default" : "outline"}
						onClick={() => store.setGit(true)}
						className={`justify-start gap-3 h-12 rounded-xl transition-all ${
							store.git ? "ring-2 ring-primary/20 shadow-md" : "hover:bg-muted/50"
						}`}
					>
						<FaGitAlt className="w-5 h-5" />
						<span className="font-medium">Initialize Git</span>
					</Button>
					<Button
						variant={!store.git ? "default" : "outline"}
						onClick={() => store.setGit(false)}
						className={`justify-start gap-3 h-12 rounded-xl transition-all ${
							!store.git ? "ring-2 ring-primary/20 shadow-md" : "hover:bg-muted/50"
						}`}
					>
						<FiXCircle className="w-5 h-5" />
						<span className="font-medium">No Git</span>
					</Button>
				</div>
			</div>

			<Separator className="ml-12 w-[calc(100%-3rem)]" />

			{/* Installation Mode */}
			<div className="space-y-4">
				<div className="flex gap-3">
					<div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<FiHardDrive className="h-5 w-5" />
					</div>
					<div className="space-y-1">
						<Label className="text-base font-semibold">Installation Mode</Label>
						<div className="text-sm text-muted-foreground leading-snug">
							Should Stacker run the install commands for you?
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-3 ml-12 w-[calc(100%-3rem)]">
					<Button
						variant={!store.install ? "default" : "outline"}
						onClick={() => store.setInstall(false)}
						className={`justify-start gap-4 h-auto py-3 px-4 rounded-xl transition-all ${
							!store.install ? "ring-2 ring-primary/20 shadow-md" : "hover:bg-muted/50"
						}`}
					>
						<FiCode className="w-6 h-6 shrink-0 opacity-80" />
						<div className="flex flex-col items-start whitespace-normal text-left">
							<span className="font-medium text-sm">Code Only</span>
							<span className="text-xs opacity-70">
								Download configuration files without running the massive registry installation
							</span>
						</div>
					</Button>
					<Button
						variant={store.install ? "default" : "outline"}
						onClick={() => store.setInstall(true)}
						className={`justify-start gap-4 h-auto py-3 px-4 rounded-xl transition-all ${
							store.install ? "ring-2 ring-primary/20 shadow-md" : "hover:bg-muted/50"
						}`}
					>
						<FiDownloadCloud className="w-6 h-6 shrink-0 opacity-80" />
						<div className="flex flex-col items-start whitespace-normal text-left">
							<span className="font-medium text-sm">Code & Install</span>
							<span className="text-xs opacity-70">
								Automatically run package installs to have the app ready immediately
							</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

import { useRef, useState } from "react";
import { FaGitAlt } from "react-icons/fa";
import {
	FiBox,
	FiCheck,
	FiCode,
	FiCopy,
	FiDownloadCloud,
	FiGitBranch,
	FiHardDrive,
	FiTerminal,
	FiType,
	FiXCircle,
} from "react-icons/fi";
import { SiBun, SiNpm, SiPnpm, SiYarn } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getInitCommand, type PackageManager } from "@/lib/stacker";
import { useStackStore } from "@/store/create-stack";

const PACKAGE_MANAGERS: PackageManager[] = ["bun", "npm", "pnpm", "yarn"];

const PM_ICONS: Record<PackageManager, React.ElementType> = {
	bun: SiBun,
	npm: SiNpm,
	pnpm: SiPnpm,
	yarn: SiYarn,
};

export function GeneralConfig() {
	const name = useStackStore((state) => state.name);
	const setName = useStackStore((state) => state.setName);
	const templateId = useStackStore((state) => state.templateId);
	const packageManager = useStackStore((state) => state.packageManager);
	const setPackageManager = useStackStore((state) => state.setPackageManager);
	const git = useStackStore((state) => state.git);
	const setGit = useStackStore((state) => state.setGit);
	const install = useStackStore((state) => state.install);
	const setInstall = useStackStore((state) => state.setInstall);
	const [copied, setCopied] = useState(false);
	const copyTimerRef = useRef<number | null>(null);

	const handleCopyCommand = async () => {
		await navigator.clipboard.writeText(getInitCommand(templateId));
		setCopied(true);
		if (copyTimerRef.current) {
			window.clearTimeout(copyTimerRef.current);
		}
		copyTimerRef.current = window.setTimeout(() => setCopied(false), 1400);
	};

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
							The identifier for your new repository. This will be the folder
							name.
						</div>
					</div>
				</div>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
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
				<div className="relative group ml-12 w-[calc(100%-3rem)]">
					<Input
						value={getInitCommand(templateId)}
						readOnly
						className="bg-muted/50 font-mono text-primary h-11 border-primary/20 w-full pr-12 focus-visible:ring-1"
					/>
					<button
						type="button"
						onClick={handleCopyCommand}
						className={`absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md transition ${
							copied
								? "bg-primary text-primary-foreground"
								: "bg-secondary/80 hover:bg-secondary text-secondary-foreground hover:text-primary"
						}`}
					>
						{copied ? (
							<FiCheck className="w-3.5 h-3.5" />
						) : (
							<FiCopy className="w-3.5 h-3.5" />
						)}
					</button>
				</div>
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
					{PACKAGE_MANAGERS.map((pm) => {
						const Icon = PM_ICONS[pm];
						return (
							<Button
								key={pm}
								variant={packageManager === pm ? "default" : "outline"}
								onClick={() => setPackageManager(pm)}
								className={`justify-start gap-3 h-12 rounded-xl border transition-all ${
									packageManager === pm
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
						variant={git ? "default" : "outline"}
						onClick={() => setGit(true)}
						className={`justify-start gap-3 h-12 rounded-xl transition-all ${
							git ? "ring-2 ring-primary/20 shadow-md" : "hover:bg-muted/50"
						}`}
					>
						<FaGitAlt className="w-5 h-5" />
						<span className="font-medium">Initialize Git</span>
					</Button>
					<Button
						variant={!git ? "default" : "outline"}
						onClick={() => setGit(false)}
						className={`justify-start gap-3 h-12 rounded-xl transition-all ${
							!git ? "ring-2 ring-primary/20 shadow-md" : "hover:bg-muted/50"
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
						variant={!install ? "default" : "outline"}
						onClick={() => setInstall(false)}
						className={`justify-start gap-4 h-auto py-3 px-4 rounded-xl transition-all ${
							!install
								? "ring-2 ring-primary/20 shadow-md"
								: "hover:bg-muted/50"
						}`}
					>
						<FiCode className="w-6 h-6 shrink-0 opacity-80" />
						<div className="flex flex-col items-start whitespace-normal text-left">
							<span className="font-medium text-sm">Code Only</span>
							<span className="text-xs opacity-70">
								Preview commands in the CLI, save config only, skip installs
							</span>
						</div>
					</Button>
					<Button
						variant={install ? "default" : "outline"}
						onClick={() => setInstall(true)}
						className={`justify-start gap-4 h-auto py-3 px-4 rounded-xl transition-all ${
							install ? "ring-2 ring-primary/20 shadow-md" : "hover:bg-muted/50"
						}`}
					>
						<FiDownloadCloud className="w-6 h-6 shrink-0 opacity-80" />
						<div className="flex flex-col items-start whitespace-normal text-left">
							<span className="font-medium text-sm">Code & Install</span>
							<span className="text-xs opacity-70">
								Review what will run, confirm, then scaffold and install
							</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

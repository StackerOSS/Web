import { Sidebar } from "./sidebar/index";
import { PreviewArea } from "./preview/index";
import { Button } from "@/components/ui/button";

export function CreatePage() {
	return (
		<div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
			{/* Header */}
			<header className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b bg-background z-20">
				<div>
					<h1 className="text-xl font-bold tracking-tight">Stacker</h1>
					<p className="text-sm text-muted-foreground font-medium">
						Build your stack. Instantly.
					</p>
				</div>
				<div>
					<Button className="font-semibold shadow-sm">Generate Template</Button>
				</div>
			</header>

			{/* Main Builder Layout */}
			<main className="flex-1 flex overflow-hidden">
				<Sidebar />
				<PreviewArea />
			</main>
		</div>
	);
}

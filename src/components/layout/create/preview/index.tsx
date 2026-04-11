import { motion } from "framer-motion";
import { FiCode, FiEye, FiMoon, FiSun } from "react-icons/fi";
import type { PreviewTab } from "@/lib/stacker";
import { useStackStore } from "@/store/create-stack";
import { CodeView } from "./code";
import { StackPreview } from "./stack";

const TABS: PreviewTab[] = ["Code", "Preview"];

const TAB_ICONS: Record<PreviewTab, React.ElementType> = {
	Code: FiCode,
	Preview: FiEye,
};

export function PreviewArea() {
	const activeTab = useStackStore((state) => state.previewTab);
	const setActiveTab = useStackStore((state) => state.setPreviewTab);
	const previewMode = useStackStore((state) => state.previewMode);
	const setPreviewMode = useStackStore((state) => state.setPreviewMode);

	return (
		<div className="flex-1 flex flex-col h-full bg-muted/20">
			<div className="p-4 border-b flex justify-between items-center bg-background">
				<div className="flex p-1 space-x-1 bg-muted/50 rounded-lg w-fit">
					{TABS.map((tab) => {
						const Icon = TAB_ICONS[tab];
						return (
							<button
								key={tab}
								type="button"
								onClick={() => setActiveTab(tab)}
								className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
									activeTab === tab
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								{activeTab === tab && (
									<motion.div
										layoutId="preview-tab-active"
										className="absolute inset-0 bg-background rounded-md shadow-sm border"
										transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
									/>
								)}
								<span className="relative z-10 flex items-center justify-center gap-2">
									<Icon className="w-4 h-4" />
									{tab}
								</span>
							</button>
						);
					})}
				</div>
				{activeTab === "Preview" ? (
					<div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-1">
						<button
							type="button"
							onClick={() => setPreviewMode("light")}
							className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
								previewMode === "light"
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<span className="flex items-center gap-1.5">
								<FiSun className="h-3.5 w-3.5" />
								Light
							</span>
						</button>
						<button
							type="button"
							onClick={() => setPreviewMode("dark")}
							className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
								previewMode === "dark"
									? "bg-background text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<span className="flex items-center gap-1.5">
								<FiMoon className="h-3.5 w-3.5" />
								Dark
							</span>
						</button>
					</div>
				) : (
					<div />
				)}
			</div>
			<div
				className={`flex-1 p-2 ${activeTab === "Code" ? "overflow-hidden" : "overflow-auto"}`}
			>
				{activeTab === "Code" ? <CodeView /> : <StackPreview />}
			</div>
		</div>
	);
}

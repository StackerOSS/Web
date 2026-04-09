import { useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiEye } from "react-icons/fi";
import { CodeView } from "./code";
import { StackPreview } from "./stack";

const TABS = ["Code", "Preview"] as const;
type Tab = (typeof TABS)[number];

const TAB_ICONS: Record<Tab, React.ElementType> = {
	Code: FiCode,
	Preview: FiEye,
};

export function PreviewArea() {
	const [activeTab, setActiveTab] = useState<Tab>("Code");

	return (
		<div className="flex-1 flex flex-col h-full bg-muted/20">
			<div className="p-4 border-b flex justify-between items-center bg-background">
				<div className="flex p-1 space-x-1 bg-muted/50 rounded-lg w-fit">
					{TABS.map((tab) => {
						const Icon = TAB_ICONS[tab];
						return (
							<button
								key={tab}
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
			</div>
			<div className="flex-1 overflow-auto p-6">
				{activeTab === "Code" ? <CodeView /> : <StackPreview />}
			</div>
		</div>
	);
}

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiMonitor, FiServer, FiBox, FiChevronRight, FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import { GeneralConfig } from "./general";
import { FrontendConfig } from "./frontend";
import { BackendConfig } from "./backend";
import { AddonsConfig } from "./addons";

const CATEGORIES = ["General", "Frontend", "Backend", "Addons"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
	General: FiSettings,
	Frontend: FiMonitor,
	Backend: FiServer,
	Addons: FiBox,
};

export function Sidebar() {
	const [activeTab, setActiveTab] = useState<Category>("General");

	const activeIndex = CATEGORIES.indexOf(activeTab);
	const hasNext = activeIndex < CATEGORIES.length - 1;

	return (
		<div className="w-[450px] flex-shrink-0 flex flex-col h-full bg-background border-r">
			{/* Tabs */}
			<div className="p-4 bg-background z-10 sticky top-0">
				<div className="flex p-1 space-x-1 bg-muted/50 rounded-lg">
					{CATEGORIES.map((cat) => {
						const Icon = CATEGORY_ICONS[cat];
						return (
							<button
								key={cat}
								onClick={() => setActiveTab(cat)}
								className={`relative flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
									activeTab === cat
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								{activeTab === cat && (
									<motion.div
										layoutId="sidebar-tab-active"
										className="absolute inset-0 bg-background rounded-md shadow-sm border"
										transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
									/>
								)}
								<span className="relative z-10 flex items-center justify-center gap-2">
									<Icon className="w-4 h-4" />
									{cat}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Content Scrollable Area */}
			<div className="flex-1 overflow-y-auto p-4 pt-0 custom-scrollbar relative">
				<div className="min-h-full flex flex-col">
					<div className="flex-1">
						{activeTab === "General" && <GeneralConfig />}
						{activeTab === "Frontend" && <FrontendConfig />}
						{activeTab === "Backend" && <BackendConfig />}
						{activeTab === "Addons" && <AddonsConfig />}
					</div>
					
					{/* Footer Navigation */}
					<div className="mt-8 pt-4 pb-4 border-t flex justify-end">
						{hasNext ? (
							<Button
								onClick={() => setActiveTab(CATEGORIES[activeIndex + 1])}
								className="gap-2 rounded-xl shadow-sm px-6 h-11"
							>
								Next: {CATEGORIES[activeIndex + 1]} <FiChevronRight className="w-4 h-4" />
							</Button>
						) : (
							<Button className="gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm px-6 h-11">
								Generate Template <FiCheck className="w-4 h-4" />
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiMonitor, FiServer, FiBox } from "react-icons/fi";

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
			<div className="flex-1 overflow-y-auto p-4 pt-0 custom-scrollbar">
				{activeTab === "General" && <GeneralConfig />}
				{activeTab === "Frontend" && <FrontendConfig />}
				{activeTab === "Backend" && <BackendConfig />}
				{activeTab === "Addons" && <AddonsConfig />}
			</div>
		</div>
	);
}

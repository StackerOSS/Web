import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiMonitor, FiServer, FiBox, FiChevronRight, FiCheck, FiCopy } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useStackerManifest } from "@/hooks/use-stacker-manifest";
import { useStackStore } from "@/store/create-stack";
import type { SidebarTab } from "@/lib/stacker";
import { getInitCommand } from "@/lib/stacker";

import { GeneralConfig } from "./general";
import { FrontendConfig } from "./frontend";
import { BackendConfig } from "./backend";
import { AddonsConfig } from "./addons";

const CATEGORIES: SidebarTab[] = ["General", "Frontend", "Backend", "Addons"];

const CATEGORY_ICONS: Record<SidebarTab, React.ElementType> = {
	General: FiSettings,
	Frontend: FiMonitor,
	Backend: FiServer,
	Addons: FiBox,
};

export function Sidebar() {
	const activeTab = useStackStore((state) => state.sidebarTab);
	const setActiveTab = useStackStore((state) => state.setSidebarTab);
	const setTemplateId = useStackStore((state) => state.setTemplateId);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0;
		}
	}, [activeTab]);

	const manifest = useStackerManifest();
	const manifestJson = useMemo(() => JSON.stringify(manifest), [manifest]);
	const activeIndex = CATEGORIES.indexOf(activeTab);
	const hasNext = activeIndex < CATEGORIES.length - 1;
	const [isSaving, setIsSaving] = useState(false);
	const [saveError, setSaveError] = useState<string | null>(null);

	const handleGenerateTemplate = async () => {
		if (isSaving) return;
		setIsSaving(true);
		setSaveError(null);

		try {
			const res = await fetch("/api/templates/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: manifestJson,
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				const message = errorData?.details || `Save failed with status ${res.status}`;
				setSaveError(message);
				console.error("[Sidebar] Template save failed:", message);
				return;
			}

			const data = await res.json();
			if (!data.id) {
				setSaveError("No template ID returned from server.");
				return;
			}

			setTemplateId(data.id);
			await navigator.clipboard.writeText(getInitCommand(data.id));
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("[Sidebar] Error generating template:", err);
			setSaveError(String(err));
		} finally {
			setIsSaving(false);
		}
	};

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
			<div ref={scrollRef} className="flex-1 overflow-y-auto p-4 pt-0 custom-scrollbar relative scroll-smooth">
				<div className="min-h-full flex flex-col">
					<div className="flex-1">
						{activeTab === "General" && <GeneralConfig />}
						{activeTab === "Frontend" && <FrontendConfig />}
						{activeTab === "Backend" && <BackendConfig />}
						{activeTab === "Addons" && <AddonsConfig />}
					</div>
					
					{/* Footer Navigation */}
					<div className="mt-8 pt-4 pb-4 border-t flex flex-col items-end gap-2">
						{hasNext ? (
							<Button
								onClick={() => setActiveTab(CATEGORIES[activeIndex + 1])}
								className="gap-2 rounded-xl shadow-sm px-6 h-11"
							>
								Next: {CATEGORIES[activeIndex + 1]} <FiChevronRight className="w-4 h-4" />
							</Button>
						) : (
							<Button
								onClick={handleGenerateTemplate}
								disabled={isSaving}
								className="gap-2 rounded-xl shadow-sm px-6 h-11"
							>
								{isSaving ? (
									"Saving..."
								) : isCopied ? (
									<>Copied to clipboard! <FiCheck className="w-4 h-4" /></>
								) : (
									<>Generate Template <FiCopy className="w-4 h-4" /></>
								)}
							</Button>
						)}
						{saveError ? (
							<div className="text-sm text-destructive/90">Failed to save template: {saveError}</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

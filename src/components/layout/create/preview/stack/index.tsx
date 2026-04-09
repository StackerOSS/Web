import { useStackStore } from "@/store/create-stack";

export function StackPreview() {
	const store = useStackStore();

	const items = [
		{ label: "Framework", value: store.framework },
		{ label: "Runtime", value: store.runtime },
		{ label: "UI", value: store.uiSystem },
		{ label: "Styling", value: `${store.themeStyle} (${store.baseColor})` },
		{ label: "Database", value: store.database },
		{ label: "ORM", value: store.orm },
		{ label: "Auth", value: store.auth },
		{ label: "API Layer", value: store.apiLayer },
		{ label: "Deployment", value: store.deployment },
	].filter((item) => item.value);

	return (
		<div className="animate-in fade-in duration-300">
			<div className="bg-card border rounded-xl p-6 shadow-sm">
				<h3 className="text-xl font-bold mb-4 font-mono">
					{store.name || "MyApp"}
				</h3>
				<ul className="font-mono text-sm space-y-2">
					{items.map((item, index) => {
						const isLast = index === items.length - 1;
						const prefix = isLast ? "└ " : "├ ";
						return (
							<li key={item.label} className="text-muted-foreground flex">
								<span className="text-muted-foreground/60 mr-2">{prefix}</span>
								<span className="font-semibold text-foreground mr-2">
									{item.label}:
								</span>
								<span className="text-primary">{item.value}</span>
							</li>
						);
					})}
					{items.length === 0 && (
						<li className="text-muted-foreground">
							Select options to see stack preview
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}

import { useStackStore } from "@/store/create-stack";

export function CodeView() {
	const store = useStackStore();
	const config = {
		name: store.name,
		packageManager: store.packageManager,
		git: store.git,
		install: store.install,
		framework: store.framework,
		ui: store.uiSystem,
		themeStyle: store.themeStyle,
		baseColor: store.baseColor,
		borderRadius: store.borderRadius,
		iconLibrary: store.iconLibrary,
		font: store.font,
		runtime: store.runtime,
		tanstackPackages: store.tanstackPackages,
		database: store.database,
		orm: store.orm,
		auth: store.auth,
		apiLayer: store.apiLayer,
		integrations: store.integrations,
		deployment: store.deployment,
		monitoring: store.monitoring,
		i18n: store.i18n,
		devTooling: store.devTooling,
	};

	return (
		<div className="space-y-4 animate-in fade-in duration-300">
			<div>
				<h3 className="text-lg font-semibold tracking-tight mb-2">
					CLI Command
				</h3>
				<pre className="bg-zinc-950 text-zinc-50 p-4 rounded-xl font-mono text-sm shadow-sm overflow-x-auto border border-zinc-800">
					<code>bunx @stacker/cli xCjNK</code>
				</pre>
			</div>

			<div>
				<h3 className="text-lg font-semibold tracking-tight mb-2">
					Stack Configuration (JSON)
				</h3>
				<pre className="bg-zinc-950 text-zinc-50 p-4 pt-4 rounded-xl font-mono text-sm shadow-sm overflow-x-auto border border-zinc-800">
					<code>{JSON.stringify(config, null, 2)}</code>
				</pre>
			</div>
		</div>
	);
}

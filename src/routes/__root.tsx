import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Stacker — Visually Build & Ship Your Full-Stack in Seconds" },
			{
				name: "description",
				content:
					"Stacker is an open-source stack builder that lets you visually configure your entire web stack — framework, UI, database, auth, ORM & more — then scaffold it instantly with a single CLI command.",
			},
			{
				name: "keywords",
				content:
					"stacker, stack builder, web stack generator, full-stack scaffold, Next.js, Vite, TanStack, shadcn, CLI, project generator, ranveer soni",
			},
			{ name: "author", content: "Ranveer Soni" },
			{ name: "robots", content: "index, follow" },
			{ name: "theme-color", content: "#0a0a0a" },

			/* Open Graph */
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: "https://stacker.ranveersoni.me" },
			{ property: "og:site_name", content: "Stacker" },
			{
				property: "og:title",
				content: "Stacker — Visually Build & Ship Your Full-Stack in Seconds",
			},
			{
				property: "og:description",
				content:
					"Configure your entire web stack visually — framework, UI, database, auth & more — then scaffold it with one CLI command.",
			},
			{ property: "og:image", content: "https://stacker.ranveersoni.me/og.png" },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:locale", content: "en_US" },

			/* Twitter */
			{ name: "twitter:card", content: "summary_large_image" },
			{
				name: "twitter:title",
				content: "Stacker — Visually Build & Ship Your Full-Stack in Seconds",
			},
			{
				name: "twitter:description",
				content:
					"Configure your entire web stack visually and scaffold it with a single CLI command.",
			},
			{ name: "twitter:image", content: "https://stacker.ranveersoni.me/og.png" },
		],
		links: [
			{ rel: "icon", href: "/logo.png" },
			{ rel: "apple-touch-icon", href: "/logo.png" },
			{ rel: "canonical", href: "https://stacker.ranveersoni.me" },
			{ rel: "stylesheet", href: appCss },
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: () => (
		<div className="p-4 grid place-items-center h-screen">
			<p className="text-xl">Page Not Found</p>
		</div>
	),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body
				suppressHydrationWarning
				className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]"
			>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import appCss from "../styles.css?url";
import type { QueryClient } from "@tanstack/react-query";
import ErrorComponent from "../components/layout/ErrorComponent";
import NotFound from "../components/layout/NotFound";

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
					"stacker, stack builder, web stack generator, full-stack scaffold, Next.js, Vite, TanStack, shadcn, CLI, project generator",
			},
			{ name: "author", content: "Ranveer Soni" },
			{ name: "robots", content: "index, follow" },
			{ name: "theme-color", content: "#0a0a0a" },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: "https://stacker.ranveersoni.me" },
			{ property: "og:site_name", content: "Stacker" },
			{ property: "og:title", content: "Stacker — Visually Build & Ship Your Full-Stack in Seconds" },
			{ property: "og:description", content: "Configure your entire web stack visually — framework, UI, database, auth & more — then scaffold it with one CLI command." },
			{ property: "og:image", content: "https://stacker.ranveersoni.me/og.png" },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:locale", content: "en_US" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "Stacker — Visually Build & Ship Your Full-Stack in Seconds" },
			{ name: "twitter:description", content: "Configure your entire web stack visually and scaffold it with a single CLI command." },
			{ name: "twitter:image", content: "https://stacker.ranveersoni.me/og.png" },
		],
		links: [
			{ rel: "icon", href: "/logo.png" },
			{ rel: "apple-touch-icon", href: "/logo.png" },
			{ rel: "canonical", href: "https://stacker.ranveersoni.me" },
			{ rel: "stylesheet", href: appCss },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{ rel: "preconnect", href: "https://fonts.gstatic.com" },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
	errorComponent: ErrorComponent,
	notFoundComponent: NotFound,
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
				className="font-sans antialiased wrap-anywhere selection:bg-primary/20 selection:text-primary-foreground"
			>
				{children}
				{import.meta.env.DEV && (
					<TanStackDevtools
						config={{ position: "bottom-right" }}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}

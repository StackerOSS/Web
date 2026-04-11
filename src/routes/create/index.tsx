import { createFileRoute } from "@tanstack/react-router";
import { CreatePage } from "@/components/layout/create/index";
import { getPreviewGoogleFontsHref } from "@/lib/preview-fonts";
import { StackStoreProvider } from "@/store/create-stack";

export const Route = createFileRoute("/create/")({
	component: CreateRoute,
	head: () => ({
		links: [
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{ rel: "stylesheet", href: getPreviewGoogleFontsHref() },
		],
	}),
});

function CreateRoute() {
	return (
		<StackStoreProvider>
			<CreatePage />
		</StackStoreProvider>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import { CreatePage } from "@/components/layout/create/index";

export const Route = createFileRoute("/create/")({
	component: CreatePage,
});

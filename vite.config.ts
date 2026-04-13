import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenvExpand from "dotenv-expand";
import { loadEnv } from "vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { nitro } from "nitro/vite";


const config = defineConfig(({ mode }) => {
	// Load and expand environment variables for @vercel/blob
	if (mode === "development") {
		const env = loadEnv(mode, process.cwd(), "");
		dotenvExpand.expand({ parsed: env });
	}

	return {
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				"#": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		plugins: [
			devtools(),
			nitro(),
			tsconfigPaths({ projects: ["./tsconfig.json"] }),
			tailwindcss(),
			tanstackStart(),
			viteReact(),
		],
		environments: {
			ssr: { build: { rollupOptions: { input: "./server.ts" } } },
		},
	};
});

export default config;

import type { ElementType } from "react";
import {
	VscFile,
	VscJson,
	VscMarkdown,
	VscSymbolNamespace,
	VscCode,
	VscTerminal,
	VscGear,
	VscDatabase,
	VscKey,
	VscDiffIgnored,
	VscLock,
	VscPackage,
	VscFileCode,
} from "react-icons/vsc";
import { SiTypescript, SiCss, SiHtml5 } from "react-icons/si";

export interface FileIconEntry {
	icon: ElementType;
	color: string;
}

const DEFAULT_ICON: FileIconEntry = { icon: VscFile, color: "#9ca3af" };

const EXTENSION_MAP: Record<string, FileIconEntry> = {
	// TypeScript / TSX
	ts: { icon: SiTypescript, color: "#3178c6" },
	tsx: { icon: SiTypescript, color: "#3178c6" },
	// JavaScript / JSX
	js: { icon: VscFileCode, color: "#f7df1e" },
	jsx: { icon: VscFileCode, color: "#f7df1e" },
	mjs: { icon: VscFileCode, color: "#f7df1e" },
	// CSS / styling
	css: { icon: SiCss, color: "#38bdf8" },
	scss: { icon: SiCss, color: "#c084fc" },
	// HTML
	html: { icon: SiHtml5, color: "#f97316" },
	// Astro
	astro: { icon: VscCode, color: "#f43f5e" },
	// PHP
	php: { icon: VscCode, color: "#818cf8" },
	// JSON
	json: { icon: VscJson, color: "#fbbf24" },
	// Markdown
	md: { icon: VscMarkdown, color: "#94a3b8" },
	mdx: { icon: VscMarkdown, color: "#94a3b8" },
	// Config formats
	yaml: { icon: VscGear, color: "#a3e635" },
	yml: { icon: VscGear, color: "#a3e635" },
	toml: { icon: VscGear, color: "#fb923c" },
	// DB / schema
	prisma: { icon: VscDatabase, color: "#34d399" },
	sql: { icon: VscDatabase, color: "#34d399" },
	// Shell/bash
	sh: { icon: VscTerminal, color: "#a3e635" },
	bash: { icon: VscTerminal, color: "#a3e635" },
	// Env
	env: { icon: VscKey, color: "#fbbf24" },
};

const FILENAME_MAP: Record<string, FileIconEntry> = {
	"package.json": { icon: VscPackage, color: "#f87171" },
	"package-lock.json": { icon: VscLock, color: "#9ca3af" },
	"bun.lock": { icon: VscLock, color: "#9ca3af" },
	"bun.lockb": { icon: VscLock, color: "#9ca3af" },
	"pnpm-lock.yaml": { icon: VscLock, color: "#9ca3af" },
	"yarn.lock": { icon: VscLock, color: "#9ca3af" },
	".gitignore": { icon: VscDiffIgnored, color: "#f87171" },
	".env": { icon: VscKey, color: "#fbbf24" },
	".env.example": { icon: VscKey, color: "#fbbf24" },
	".env.local": { icon: VscKey, color: "#fbbf24" },
	"tsconfig.json": { icon: SiTypescript, color: "#3178c6" },
	"biome.json": { icon: VscSymbolNamespace, color: "#60a5fa" },
	".eslintrc": { icon: VscGear, color: "#818cf8" },
	"prettier.config.js": { icon: VscGear, color: "#34d399" },
	"README.md": { icon: VscMarkdown, color: "#94a3b8" },
};

export function getFileIcon(filename: string): FileIconEntry {
	// Check by exact name first
	const name = filename.split("/").pop() ?? filename;
	if (FILENAME_MAP[name]) return FILENAME_MAP[name]!;

	// Check by extension
	const dotIdx = name.lastIndexOf(".");
	if (dotIdx !== -1) {
		const ext = name.slice(dotIdx + 1).toLowerCase();
		if (EXTENSION_MAP[ext]) return EXTENSION_MAP[ext]!;
	}

	// .env.example etc — check if name starts with .env
	if (name.startsWith(".env")) return { icon: VscKey, color: "#fbbf24" };

	return DEFAULT_ICON;
}

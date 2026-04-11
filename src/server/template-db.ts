import * as fs from "fs";
import * as path from "path";

const WORKSPACE_ROOT = path.resolve(process.cwd(), "..");
const DB_DIR = path.join(WORKSPACE_ROOT, ".stacker");
const DB_PATH = path.join(DB_DIR, "templates.json");

function ensureDb() {
	fs.mkdirSync(DB_DIR, { recursive: true });

	try {
		fs.accessSync(DB_PATH);
	} catch {
		fs.writeFileSync(DB_PATH, JSON.stringify({}));
	}
}

export function readTemplateDb() {
	ensureDb();

	try {
		return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as Record<string, unknown>;
	} catch {
		return {};
	}
}

export function writeTemplateDb(db: Record<string, unknown>) {
	ensureDb();
	fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function getTemplateDbPath() {
	return DB_PATH;
}

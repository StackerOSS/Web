export interface PreviewVirtualFile {
	type: "file";
	name: string;
	path: string;
	contents: string;
	language: string;
}

export interface PreviewVirtualDirectory {
	type: "directory";
	name: string;
	path: string;
	children: Array<PreviewVirtualDirectory | PreviewVirtualFile>;
}

export type PreviewVirtualNode = PreviewVirtualDirectory | PreviewVirtualFile;

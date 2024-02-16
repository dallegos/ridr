export interface BaseSource<Content = unknown> {
	name: string;
	url: string;
	content: Content;
}

export interface BaseContentItem {
	title: string;
	description: string;
	link: string;
	thumbnail?: string;
	date?: Date;
}

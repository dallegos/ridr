import type { PluginConfiguration, Plugin } from "@/ridr/types";

export class WebScrapperPlugin {
	constructor(private readonly configuration: PluginConfiguration) {}

	async get(): Promise<Plugin> {
		try {
			const htmlText = await (await fetch(this.configuration.url)).text();
			return this.getFeedContent(htmlText);
		} catch (error: any) {
			throw new Error(`Error while scraping URL: ${this.configuration.url}`);
		}
	}

	protected getFeedContent(htmlText: string): Promise<Plugin> {
		throw new Error("getFeedContent was not implemented");
	}
}

import { fetch, ResponseType } from "@tauri-apps/api/http";
import type { PluginConfiguration, Plugin } from "@/ridr/types";

export class WebScrapperPlugin {
	constructor(private readonly configuration: PluginConfiguration) {}

	async get(): Promise<Plugin> {
		try {
			const response = await await fetch<string>(this.configuration.url, {
				method: "GET",
				responseType: ResponseType.Text,
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
				},
			});

			return this.getFeedContent(response.data);
		} catch (error: any) {
			throw new Error(`Error while scraping URL: ${this.configuration.url}`);
		}
	}

	protected getFeedContent(htmlText: string): Promise<Plugin> {
		throw new Error("getFeedContent was not implemented");
	}
}

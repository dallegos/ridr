import { load } from "cheerio";
import { WebScrapperPlugin } from "./web-scrapper";
import type { PluginConfiguration, Plugin, PluginItem } from "../../types";

export class LaCapitalPlugin extends WebScrapperPlugin {
	private readonly name: string;

	private readonly url: string;

	constructor(configuration: PluginConfiguration) {
		super(configuration);

		this.name = configuration.name;
		this.url = configuration.url;
	}

	protected getFeedContent(htmlText: string): Promise<Plugin> {
		return new Promise((resolve, reject) => {
			try {
				const $ = load(htmlText);

				resolve({
					name: this.name,
					url: this.url,
					content: $("article").map((_i, article) => {
						const $article = $(article);

						return {
							title: $article.find(".entry-title").text(),
							description: "",
							link: $article.find("a").attr("href") ?? "",
							thumbnail: $article.find("img").attr("data-td-src-property"),
						};
					}) as unknown as PluginItem[],
				});
			} catch (error: any) {
				reject(error);
			}
		});
	}
}

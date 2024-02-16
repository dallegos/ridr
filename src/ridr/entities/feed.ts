import { Parser } from "xml2js";
import { addZero } from "@/utilities/helpers";
import type { Feed as TFeed, FeedConfiguration, FeedItem } from "../types";

export class Feed {
	private readonly parser: Parser;

	constructor(private readonly configuration: FeedConfiguration) {
		this.parser = new Parser({
			explicitArray: false,
			mergeAttrs: true,
			...this.configuration.parserOptions,
		});
	}

	async get(archiveDate?: Date): Promise<TFeed> {
		if (!this.configuration.url) {
			throw new Error("Feed URL must be provided");
		}

		try {
			const response = await fetch(archiveDate ? this.getArchivedFeedUrl(archiveDate) : this.configuration.url);

			if (!response.ok) {
				throw new Error(`Failed to fetch feed. Status: ${response.status} ${response.statusText}`);
			}

			const xmlString = await response.text();

			return {
				name: this.configuration.name,
				url: this.configuration.url,
				content: await this.mapXmlToContent(xmlString),
			};
		} catch (error: any) {
			throw new Error(`Error while fetching or processing feed: ${error.message}`);
		}
	}

	private getArchivedFeedUrl(date: Date): string {
		const baseUrl =
			"https://web.archive.org/web/" +
			addZero(date.getFullYear().toString()) /* YYYY */ +
			addZero(date.getMonth().toString()) /* MM */ +
			addZero(date.getDate().toString()) /* DD */ +
			addZero(date.getHours().toString()) /* HH */ +
			addZero(date.getMinutes().toString()) /* MM */ +
			addZero(date.getSeconds().toString()); /* SS */

		return `${baseUrl}/${this.configuration.url}`;
	}

	private mapXmlToContent(xmlString: string): Promise<FeedItem[]> {
		return new Promise((resolve, reject) => {
			this.parser.parseString(xmlString, (error, result) => {
				if (error) {
					reject(error);
					return;
				}

				interface RssItem {
					title: string;
					description: string;
					link: string;
					pubDate: string;
					enclosure?: {
						url: string;
					};
				}

				const titles = result.rss.channel.item.map((item: RssItem) => item.title);

				resolve(
					result.rss.channel.item
						.filter((item: RssItem, i: number) => !titles.includes(item.title, i + 1))
						.map((item: RssItem) => {
							// DEBUG
							// console.log(item);

							return {
								title: item.title,
								description: item.description,
								link: item.link,
								date: new Date(item.pubDate),
								thumbnail: item.enclosure?.url ?? "",
							};
						})
				);
			});
		});
	}
}

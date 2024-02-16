import type { RIDRConfiguration, FeedBasicData, Feed as TFeed, Plugin as TPlugin } from "./types";
import { Feed, type AvailablePlugins } from "./entities";

export default class RIDR {
	private readonly feedsSet: Set<Feed> = new Set();

	private readonly pluginsSet: Set<AvailablePlugins> = new Set();

	get feeds(): Feed[] {
		return [...this.feedsSet.values()];
	}

	get plugins(): AvailablePlugins[] {
		return [...this.pluginsSet.values()];
	}

	constructor(private readonly configuration: RIDRConfiguration) {
		// Initial feeds configuration
		this.configuration.feeds?.forEach(this.setFeed.bind(this));

		// Initial plugins configuration
		this.configuration.plugins?.forEach(this.setPlugin.bind(this));
	}

	async getFeedsData(archiveDate?: Date): Promise<(TFeed | TPlugin)[]> {
		return await Promise.all([...this.feeds, ...this.plugins].map((feed) => feed.get(archiveDate)));
	}

	private setFeed(feed: FeedBasicData): void {
		this.feedsSet.add(new Feed(feed));
	}

	private setPlugin(plugin: AvailablePlugins): void {
		this.pluginsSet.add(plugin);
	}
}

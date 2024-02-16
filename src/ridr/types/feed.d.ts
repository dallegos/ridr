import type { ParserOptions } from "xml2js";
import type { BaseSource, BaseContentItem } from "./shared";

export interface Feed extends BaseSource<FeedItem[]> {}

export interface FeedBasicData extends Omit<BaseSource, "content"> {}

export interface FeedConfiguration extends FeedBasicData {
	parserOptions?: ParserOptions;
}

export interface FeedItem extends BaseContentItem {}

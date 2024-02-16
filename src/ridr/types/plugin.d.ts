import type { BaseSource, BaseContentItem } from "./shared";

export interface Plugin extends BaseSource<PluginItem[]> {}

export interface PluginBasicData extends Omit<BaseSource, "content"> {}

export interface PluginConfiguration extends PluginBasicData {}

export interface PluginItem extends BaseContentItem {}

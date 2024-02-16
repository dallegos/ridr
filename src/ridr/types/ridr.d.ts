import type { Feed, Plugin } from ".";
import type { AvailablePlugins } from "../entities";

interface RIDRConfiguration {
	feeds?: Omit<Feed, "content">[];
	plugins?: AvailablePlugins[];
}

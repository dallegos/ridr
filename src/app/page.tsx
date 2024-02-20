"use client";

import { useEffect, useState } from "react";
import RIDR from "@/ridr";
import { Feed } from "@/components/feed";
import { LaCapitalPlugin } from "@/ridr/entities";
import type { Feed as TFeed, Plugin as TPlugin } from "@/ridr/types";

const ridr = new RIDR({
	feeds: [
		{ name: "Stack Overflow Blog", url: "https://stackoverflow.blog/feed/" },
		{ name: "Dev Community", url: "https://dev.to/feed" },
		{ name: "freeCodeCamp.org", url: "https://www.freecodecamp.org/news/rss" },
	],
	plugins: [
		new LaCapitalPlugin({
			name: "La Capital | Ultimo momento",
			url: "https://www.lacapital.com.ar/secciones/ultimo-momento.html",
		}),
	],
});

export default function Home() {
	const [feeds, setFeeds] = useState<(TFeed | TPlugin)[]>([]);

	useEffect(() => {
		ridr.getFeedsData().then((_feeds) => setFeeds(_feeds));
	}, []);

	return (
		<main>
			{/* <RickAndMorty /> */}
			{feeds.map((feed) => (
				<Feed key={feed.name} {...feed} />
			))}
		</main>
	);
}

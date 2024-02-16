/* import RickAndMorty from "./rickandmorty"; */
import RIDR from "@/ridr";
import { Feed } from "@/components/feed";
import { LaCapitalPlugin } from "@/ridr/entities";

export default async function Home() {
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

	const feeds = await ridr.getFeedsData(new Date(new Date().setDate(new Date().getDate() - 365)));

	return (
		<main>
			{/* <RickAndMorty /> */}
			{feeds.map((feed) => (
				<Feed key={feed.name} {...feed} />
			))}
		</main>
	);
}

"use client";

import { useState } from "react";
import Image from "next/image";
import type { Feed as TFeed } from "@/ridr/types";

export function Feed(props: TFeed): JSX.Element {
	const [entriesVisible, setEntriesVisible] = useState<boolean>(false);

	return (
		<>
			<h2>{props.name}</h2>

			<button onClick={() => setEntriesVisible(!entriesVisible)}>{entriesVisible ? "Hide" : "Show"} entries</button>

			{entriesVisible && (
				<ul>
					{props.content.map((item) => (
						<li key={item.title}>
							<a href={item.link} target="blank">
								{item.title}
							</a>

							<div dangerouslySetInnerHTML={{ __html: item.description }} />

							{item.thumbnail && (
								<Image
									src={item.thumbnail}
									alt=""
									width={640}
									height={480}
									style={{ aspectRatio: "16 / 9", objectFit: "cover", objectPosition: "center" }}
								/>
							)}
						</li>
					))}
				</ul>
			)}
		</>
	);
}

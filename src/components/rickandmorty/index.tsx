"use client";

import { useCallback, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { fetch } from "@tauri-apps/api/http";
import type { Character, FetchResponse } from "../../ridr/types/fetch-response";
import styles from "./rickandmorty.module.css";

export default function RickAndMorty() {
	const [title, setTitle] = useState("");
	const [characters, setCharacters] = useState<Character[]>();
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const search = useCallback(() => {
		setIsLoading(true);
		fetch<FetchResponse>(`https://rickandmortyapi.com/api/character?page=${page}`)
			.then((result) => setCharacters(result.data.results))
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}, [page]);

	useEffect(() => {
		invoke<string>("title", { name: "Morty" })
			.then((result) => setTitle(result))
			.catch(console.error);
	}, []);

	useEffect(() => {
		search();
	}, [search, page]);

	return (
		<div className={styles.container}>
			<h3>{title}</h3>

			<section>
				<button
					onClick={() => {
						setPage((prev) => {
							return prev === 1 ? 1 : prev - 1;
						});
					}}
					disabled={page === 1 || isLoading}
				>
					Previous
				</button>
				<button
					onClick={() => {
						setPage((prev) => {
							return prev + 1;
						});
					}}
					disabled={isLoading}
				>
					Next
				</button>
			</section>

			<ul>
				{characters?.map((character) => (
					<li key={`character-${character.id}`}>
						<img src={character.image} alt={`Image of ${character.name}`} />
						<span>{character.name}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

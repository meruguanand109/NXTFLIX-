import data from "./movies.json";
import type { Movie } from "@/context/WatchLaterContext";

const movies: Movie[] = data as Movie[];
export default movies;

export const GENRES = [
  "All",
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Sci-Fi",
  "Romance",
  "Horror",
  "Fantasy",
] as const;

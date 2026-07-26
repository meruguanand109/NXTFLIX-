import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import movies, { GENRES } from "@/data/movies";
import { MovieCard } from "@/components/MovieCard";
import { MovieCarousel } from "@/components/MovieCarousel";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "NXTFLIX — Discover your next favourite movie" },
      { name: "description", content: "Browse trending movies, filter by genre, and build your Watch Later list on NXTFLIX." },
      { property: "og:title", content: "NXTFLIX — Discover your next favourite movie" },
      { property: "og:description", content: "Browse trending movies, filter by genre, and build your Watch Later list on NXTFLIX." },
    ],
  }),
  component: Home,
});

function Home() {
  const [genre, setGenre] = useState<string>("All");

  const trending = useMemo(
    () => [...movies].sort((a, b) => Number(b.rating) - Number(a.rating)).slice(0, 16),
    [],
  );
  const fresh = useMemo(() => movies.filter((m) => m.year >= 2015).slice(0, 16), []);
  const filtered = useMemo(
    () => (genre === "All" ? movies : movies.filter((m) => m.genre === genre)),
    [genre],
  );

  return (
    <main>
      <section
        className="relative overflow-hidden border-b border-white/10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(10,10,10,1)), url(https://picsum.photos/seed/nxtflixhero/1600/900)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl">
            Discover your next favourite
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-200">
            Browse {movies.length} handpicked movies across every genre. Save the ones you love to
            your Watch Later list.
          </p>
        </div>
      </section>

      <MovieCarousel title="Trending Now" movies={trending} direction="left" />
      <MovieCarousel title="Fresh Releases" movies={fresh} direction="right" />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                genre === g
                  ? "bg-red-600 text-white"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-neutral-400">No movies found for this genre.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { MovieCard } from "@/components/MovieCard";
import { useWatchLater } from "@/context/WatchLaterContext";

export const Route = createFileRoute("/_authenticated/watch-later")({
  head: () => ({
    meta: [
      { title: "Watch Later — NXTFLIX" },
      { name: "description", content: "Your saved movies to watch later on NXTFLIX." },
      { property: "og:title", content: "Watch Later — NXTFLIX" },
      { property: "og:description", content: "Your saved movies to watch later on NXTFLIX." },
    ],
  }),
  component: WatchLaterPage,
});

function WatchLaterPage() {
  const { watchLater } = useWatchLater();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-black text-white sm:text-4xl">Watch Later</h1>
      {watchLater.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-neutral-400">Your Watch Later list is empty.</p>
          <Link
            to="/"
            className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {watchLater.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </main>
  );
}

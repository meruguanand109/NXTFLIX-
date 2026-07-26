import { createFileRoute, Link, useRouter, redirect } from "@tanstack/react-router";
import movies from "@/data/movies";
import { useWatchLater } from "@/context/WatchLaterContext";

export const Route = createFileRoute("/_authenticated/movies/$id")({
  beforeLoad: ({ params }) => {
    if (!movies.some((m) => String(m.id) === params.id)) {
      throw redirect({ to: "/not-found" });
    }
  },
  head: ({ params }) => {
    const movie = movies.find((m) => String(m.id) === params.id);
    return {
      meta: [
        { title: movie ? `${movie.title} — NXTFLIX` : "Movie — NXTFLIX" },
        { name: "description", content: movie?.overview ?? "" },
        { property: "og:title", content: movie ? `${movie.title} — NXTFLIX` : "NXTFLIX" },
        { property: "og:description", content: movie?.overview ?? "" },
        ...(movie ? [{ property: "og:image", content: movie.backdrop }, { name: "twitter:image", content: movie.backdrop }] : []),
      ],
    };
  },
  component: MovieDetails,
});

function MovieDetails() {
  const { id } = Route.useParams();
  const router = useRouter();
  const movie = movies.find((m) => String(m.id) === id)!;
  const { isInWatchLater, toggleWatchLater } = useWatchLater();
  const inList = isInWatchLater(movie.id);

  return (
    <main
      className="min-h-[calc(100vh-64px)] w-full bg-neutral-950"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.92), rgba(10,10,10,0.75), rgba(10,10,10,0.55)), url(${movie.backdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <button
          onClick={() => router.history.back()}
          className="rounded-md bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur transition hover:bg-black/80"
        >
          ← Go Back
        </button>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="w-52 shrink-0 rounded-lg shadow-2xl sm:w-60"
          />
          <div className="max-w-2xl">
            <h1 className="text-4xl font-black text-white sm:text-5xl">{movie.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
              <span className="rounded bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
                {movie.genre}
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="text-yellow-400">★ {movie.rating}</span>
            </div>
            <p className="mt-6 text-base leading-relaxed text-neutral-200">{movie.overview}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => toggleWatchLater(movie)}
                className={`rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${
                  inList
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {inList ? "✓ Added to Watch Later" : "+ Watch Later"}
              </button>
              <Link
                to="/"
                className="rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

}

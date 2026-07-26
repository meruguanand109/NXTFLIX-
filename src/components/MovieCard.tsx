import { Link } from "@tanstack/react-router";
import type { Movie } from "@/context/WatchLaterContext";

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      to="/movies/$id"
      params={{ id: String(movie.id) }}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-neutral-900 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-yellow-400 backdrop-blur">
          <span>★</span>
          <span>{movie.rating}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-bold text-white">{movie.title}</h3>
        <p className="mt-1 text-xs text-neutral-400">
          {movie.genre} · {movie.year} · {movie.duration}
        </p>
      </div>
    </Link>
  );
}

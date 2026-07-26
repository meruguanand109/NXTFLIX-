import { Link } from "@tanstack/react-router";
import type { Movie } from "@/context/WatchLaterContext";

interface Props {
  title: string;
  movies: Movie[];
  direction?: "left" | "right";
}

export function MovieCarousel({ title, movies, direction = "left" }: Props) {
  const items = [...movies, ...movies];
  const animClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  return (
    <section className="my-8">
      <h2 className="mb-4 px-4 text-2xl font-bold text-white">{title}</h2>
      <div className="group relative overflow-hidden">
        <div
          className={`flex gap-4 ${animClass}`}
          style={{ width: "max-content" }}
        >
          {items.map((m, i) => (
            <Link
              key={`${m.id}-${i}`}
              to="/movies/$id"
              params={{ id: String(m.id) }}
              className="relative w-40 shrink-0 overflow-hidden rounded-lg bg-neutral-900 shadow-lg sm:w-48"
            >
              <img
                src={m.poster}
                alt={m.title}
                loading="lazy"
                className="aspect-[2/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3">
                <p className="line-clamp-1 text-sm font-bold text-white">{m.title}</p>
                <p className="text-xs text-neutral-300">
                  {m.genre} · ★ {m.rating}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

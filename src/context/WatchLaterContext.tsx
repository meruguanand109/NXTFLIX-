import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: string;
  duration: string;
  poster: string;
  backdrop: string;
  overview: string;
}

const KEY = "nxtflix_watch_later";

interface Ctx {
  watchLater: Movie[];
  isInWatchLater: (id: number) => boolean;
  toggleWatchLater: (movie: Movie) => void;
}

const WatchLaterContext = createContext<Ctx | null>(null);

export function WatchLaterProvider({ children }: { children: ReactNode }) {
  const [watchLater, setWatchLater] = useState<Movie[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setWatchLater(JSON.parse(raw));
    } catch {
      setWatchLater([]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(watchLater));
  }, [watchLater, hydrated]);

  const isInWatchLater = useCallback(
    (id: number) => watchLater.some((m) => m.id === id),
    [watchLater],
  );

  const toggleWatchLater = useCallback((movie: Movie) => {
    setWatchLater((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie],
    );
  }, []);

  return (
    <WatchLaterContext.Provider value={{ watchLater, isInWatchLater, toggleWatchLater }}>
      {children}
    </WatchLaterContext.Provider>
  );
}

export function useWatchLater() {
  const ctx = useContext(WatchLaterContext);
  if (!ctx) throw new Error("useWatchLater must be used within WatchLaterProvider");
  return ctx;
}

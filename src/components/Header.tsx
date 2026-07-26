import { Link, useNavigate } from "@tanstack/react-router";
import { useWatchLater } from "@/context/WatchLaterContext";

export function Header() {
  const { watchLater } = useWatchLater();
  const navigate = useNavigate();

  const handleLogout = () => {
    try { localStorage.removeItem("jwt_token"); } catch {}
    navigate({ to: "/login", replace: true });
  };


  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-black tracking-tight text-red-600">
          NXTFLIX
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-white [&.active]:text-white"
          >
            Home
          </Link>
          <Link
            to="/watch-later"
            className="relative flex items-center gap-1 text-sm font-medium text-neutral-300 transition-colors hover:text-white [&.active]:text-white"
          >
            Watch Later
            {watchLater.length > 0 && (
              <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                {watchLater.length}
              </span>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

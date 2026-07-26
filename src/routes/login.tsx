import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { signIn } from "@/api/auth";

export const Route = createFileRoute("/login")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined" && window.localStorage.getItem("jwt_token")) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Sign In — NXTFLIX" },
      { name: "description", content: "Sign in to NXTFLIX to browse unlimited movies." },
      { property: "og:title", content: "Sign In — NXTFLIX" },
      { property: "og:description", content: "Sign in to NXTFLIX to browse unlimited movies." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await signIn(email, password);
      localStorage.setItem("jwt_token", token);
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="grid min-h-screen bg-neutral-950 text-white md:grid-cols-2">
      <div
        className="relative hidden flex-col justify-between p-10 md:flex"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(220,38,38,0.6), rgba(0,0,0,0.9)), url(https://picsum.photos/seed/nxtflixhero/1600/900)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-black tracking-tight text-red-500">NXTFLIX</h1>
        <div>
          <h2 className="text-4xl font-bold">Unlimited movies, shows and more.</h2>
          <p className="mt-4 text-lg text-neutral-200">Watch anywhere. Cancel anytime.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-5">
          <div className="md:hidden">
            <h1 className="text-3xl font-black text-red-500">NXTFLIX</h1>
          </div>
          <h2 className="text-2xl font-bold">Sign In</h2>

          {error && (
            <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-neutral-900 px-3 py-2.5 text-white outline-none focus:border-red-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-neutral-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-neutral-900 px-3 py-2.5 text-white outline-none focus:border-red-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

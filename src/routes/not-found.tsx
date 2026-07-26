import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/not-found")({
  head: () => ({
    meta: [
      { title: "Page Not Found — NXTFLIX" },
      { name: "description", content: "The page you are looking for does not exist." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFound,
});

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 text-center text-white">
      <div>
        <h1 className="text-8xl font-black text-red-600">404</h1>
        <h2 className="mt-2 text-2xl font-bold">Page Not Found</h2>
        <p className="mt-3 max-w-md text-neutral-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

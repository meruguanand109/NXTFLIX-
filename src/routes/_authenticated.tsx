import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { WatchLaterProvider } from "@/context/WatchLaterContext";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !window.localStorage.getItem("jwt_token")) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});


function AuthLayout() {
  return (
    <WatchLaterProvider>
      <div className="min-h-screen bg-neutral-950 text-white">
        <Header />
        <Outlet />
      </div>
    </WatchLaterProvider>
  );
}

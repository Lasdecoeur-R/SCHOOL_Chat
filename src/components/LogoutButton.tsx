"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-full border border-zinc-600 bg-zinc-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white"
    >
      Quitter
    </button>
  );
}

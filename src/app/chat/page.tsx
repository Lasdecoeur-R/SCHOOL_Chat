"use client";

import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import LogoutButton from "@/components/LogoutButton";
import { useCallback, useState } from "react";

export default function ChatPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const onPosted = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-black font-sans text-zinc-100">
      {/* Halo vert type interface vidéo */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.18),transparent)]"
        aria-hidden
      />

      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-zinc-800/80 bg-black/60 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className="cr-live-dot size-2.5 shrink-0 rounded-full bg-emerald-400"
            title="Connecté"
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              DiscussLike
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-500/90">
              Salon ouvert — conversation aléatoire
            </p>
          </div>
        </div>
        <LogoutButton />
      </header>

      {/* Zone « flux » comme un cadre vidéo */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-3 pb-3 pt-2 sm:px-5">
        <div className="cr-scanlines relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(16,185,129,0.08)]">
          <div className="relative z-[2] flex min-h-0 flex-1 flex-col">
            <ChatMessages refreshKey={refreshKey} />
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 border-t border-zinc-800/90 bg-black/80 px-3 py-3 backdrop-blur-md sm:px-5">
        <ChatInput onPosted={onPosted} />
      </div>
    </div>
  );
}

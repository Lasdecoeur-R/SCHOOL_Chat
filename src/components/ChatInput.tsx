"use client";

import { useState } from "react";

type Props = {
  onPosted?: () => void;
};

export default function ChatInput({ onPosted }: Props) {
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) return;

    const request = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (request.ok) {
      setContent("");
      onPosted?.();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-4xl items-end gap-2 sm:gap-3"
    >
      <label className="sr-only" htmlFor="chat-message-input">
        Message
      </label>
      <input
        id="chat-message-input"
        type="text"
        autoComplete="off"
        placeholder="Écrivez votre message…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[48px] min-w-0 flex-1 rounded-full border border-zinc-700 bg-zinc-950/90 px-5 py-3 text-[15px] text-white placeholder:text-zinc-500 shadow-inner outline-none ring-emerald-500/0 transition focus:border-emerald-600/60 focus:ring-2 focus:ring-emerald-500/35"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_24px_-4px_rgba(52,211,153,0.55)] transition hover:bg-emerald-400 active:scale-[0.98] disabled:opacity-40"
        disabled={!content.trim()}
      >
        Envoyer
      </button>
    </form>
  );
}

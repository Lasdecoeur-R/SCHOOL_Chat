"use client";

import Message from "@/types/Message";
import { FaTrash } from "react-icons/fa";

export default function CardMessage({
  m,
  userId,
  onDeleted,
}: {
  m: Message;
  userId: string | undefined;
  onDeleted?: () => void;
}) {
  const isOwn = m.userId === userId;

  async function deleteMessage(_id: string, userId: string | undefined) {
    const request = await fetch("/api/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id, userId }),
    });
    if (!request.ok) {
      const data = await request.json();
      console.log(data);
      return;
    }
    onDeleted?.();
  }

  function handleClick() {
    deleteMessage(m._id, userId);
  }

  return (
    <div
      className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`group relative max-w-[min(85%,28rem)] rounded-2xl px-4 py-2.5 shadow-lg sm:max-w-[75%] ${
          isOwn
            ? "rounded-br-md bg-gradient-to-br from-emerald-600 to-emerald-800 text-white ring-1 ring-emerald-400/30"
            : "rounded-bl-md border border-zinc-700 bg-zinc-900/95 text-zinc-100 ring-1 ring-white/5"
        }`}
      >
        {!isOwn && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90">
            {m.userName}
          </p>
        )}
        <p className="whitespace-pre-wrap break-words text-[15px] leading-snug">
          {m.content}
        </p>
        <div
          className={`mt-2 flex items-center justify-between gap-2 text-[10px] ${
            isOwn ? "text-emerald-100/70" : "text-zinc-500"
          }`}
        >
          <time dateTime={m.createdAt}>
            {new Date(m.createdAt).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
          {isOwn && (
            <button
              type="button"
              onClick={handleClick}
              className="rounded-md p-1 text-emerald-100/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Supprimer le message"
            >
              <FaTrash className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

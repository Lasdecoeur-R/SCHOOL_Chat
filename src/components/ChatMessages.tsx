"use client";

import Message from "@/types/Message";
import { authClient } from "@/lib/auth-client";
import { useCallback, useEffect, useState } from "react";
import CardMessage from "./CardMessage";

/** Intervalle de synchronisation pour voir les messages des autres (secondes). */
const POLL_INTERVAL_MS = 4000;

function normalizeMessages(raw: unknown): Message[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((row: Record<string, unknown>) => {
    const id = row._id;
    const _id =
      typeof id === "object" &&
      id !== null &&
      "$oid" in id &&
      typeof (id as { $oid: string }).$oid === "string"
        ? (id as { $oid: string }).$oid
        : String(id ?? "");

    let createdAt = "";
    const ca = row.createdAt;
    if (typeof ca === "string") createdAt = ca;
    else if (ca instanceof Date) createdAt = ca.toISOString();
    else if (typeof ca === "object" && ca !== null && "$date" in ca)
      createdAt = String((ca as { $date: string }).$date);

    return {
      _id,
      content: String(row.content ?? ""),
      userId: String(row.userId ?? ""),
      userName: String(row.userName ?? "Inconnu"),
      createdAt,
    };
  });
}

type Props = {
  refreshKey?: number;
};

export default function ChatMessages({ refreshKey = 0 }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: session } = authClient.useSession();

  const fetchMessages = useCallback(async () => {
    const request = await fetch("/api/messages");
    if (!request.ok) return;
    const data = await request.json();
    setMessages(normalizeMessages(data));
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, refreshKey]);

  useEffect(() => {
    const id = window.setInterval(fetchMessages, POLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [fetchMessages]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchMessages();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [fetchMessages]);

  if (messages.length === 0) {
    return (
      <div className="flex min-h-[min(50vh,420px)] flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="rounded-full border border-zinc-700 bg-zinc-900/80 px-5 py-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
          En attente
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
          Aucun message pour l&apos;instant. Écrivez quelque chose pour lancer la
          conversation — comme sur un salon vidéo, mais en texte.
        </p>
      </div>
    );
  }

  return (
    <div className="scrollbar-cr flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-4 sm:px-5">
      {messages.map((m) => (
        <CardMessage
          key={m._id}
          m={m}
          userId={session?.user.id}
          onDeleted={fetchMessages}
        />
      ))}
    </div>
  );
}

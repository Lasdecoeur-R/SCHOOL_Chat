"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    if (error) {
      setErrorMessage(error.message ?? "Inscription impossible.");
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
    setLoading(false);
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-black font-sans text-zinc-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.18),transparent)]"
        aria-hidden
      />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <span
            className="cr-live-dot size-2.5 rounded-full bg-emerald-400"
            aria-hidden
          />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500/90">
            DiscussLike
          </span>
        </div>

        <div className="cr-scanlines relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(16,185,129,0.08)]">
          <div className="relative z-[2] px-6 py-10 sm:px-10">
            <h1 className="text-center text-2xl font-semibold tracking-tight text-white">
              Inscription
            </h1>
            <p className="mt-2 text-center text-sm text-zinc-400">
              Créez un compte pour accéder au salon.
            </p>

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="register-name"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Nom
                </label>
                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Votre pseudo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 shadow-inner outline-none ring-emerald-500/0 transition focus:border-emerald-600/60 focus:ring-2 focus:ring-emerald-500/35"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="register-email"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  E-mail
                </label>
                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 shadow-inner outline-none ring-emerald-500/0 transition focus:border-emerald-600/60 focus:ring-2 focus:ring-emerald-500/35"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="register-password"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Mot de passe
                </label>
                <input
                  id="register-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Au moins 6 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-zinc-950/90 px-4 py-3 text-[15px] text-white placeholder:text-zinc-500 shadow-inner outline-none ring-emerald-500/0 transition focus:border-emerald-600/60 focus:ring-2 focus:ring-emerald-500/35"
                  required
                  minLength={6}
                />
              </div>

              {errorMessage ? (
                <p
                  className="rounded-lg border border-red-900/60 bg-red-950/40 px-3 py-2 text-center text-sm text-red-300"
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-emerald-500 text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_24px_-4px_rgba(52,211,153,0.55)] transition hover:bg-emerald-400 active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <PacmanLoader color="#052e16" size={28} />
                ) : (
                  "S&apos;inscrire"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-zinc-500">
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-400 underline-offset-4 hover:text-emerald-300 hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

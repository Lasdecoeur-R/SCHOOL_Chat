"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setErrorMessage(error.message ?? "Connexion impossible.");
      setLoading(false);
    } else {
      router.push("/chat");
      router.refresh();
    }
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
              Connexion
            </h1>
            <p className="mt-2 text-center text-sm text-zinc-400">
              Entrez vos identifiants pour rejoindre le salon.
            </p>

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="login-email"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  E-mail
                </label>
                <input
                  id="login-email"
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
                  htmlFor="login-password"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  Mot de passe
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
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
                  "Se connecter"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-zinc-500">
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="font-semibold text-emerald-400 underline-offset-4 hover:text-emerald-300 hover:underline"
              >
                S&apos;inscrire
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

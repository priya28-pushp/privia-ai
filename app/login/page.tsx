"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Demo login for Version 1
    localStorage.setItem(
      "priviaUser",
      JSON.stringify({
        email,
      })
    );

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-[#fff8fa] px-6 py-10 text-[#4a3038]">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-[#efdce2] bg-white shadow-xl shadow-[#d99aad]/10 md:grid-cols-2">

          {/* Left side */}
          <div className="hidden bg-[#c96b89] p-12 text-white md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-bold tracking-[0.25em]">
                PRIVIA AI
              </p>

              <h1 className="mt-8 text-4xl font-bold leading-tight">
                Find a place
                <br />
                that feels like home.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/85">
                Search, compare and make smarter apartment decisions
                with Privia's intelligent recommendation system.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold">
                ✨ Smarter apartment decisions
              </p>

              <p className="mt-2 text-xs leading-6 text-white/80">
                Compare apartments using budget, location, bedrooms,
                amenities and your personal preferences.
              </p>
            </div>
          </div>

          {/* Login form */}
          <div className="p-8 sm:p-12">
            <div className="mx-auto max-w-md">

              <Link
                href="/"
                className="text-sm font-semibold text-[#a45670] transition hover:text-[#c96b89]"
              >
                ← Back to Privia
              </Link>

              <div className="mt-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c96b89]">
                  Welcome back
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#4a3038]">
                  Sign in to Privia
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#80636d]">
                  Continue your apartment search and manage your
                  bookings.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#5b4049]">
                    Email address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[#e8cbd4] bg-[#fffafb] px-4 py-3.5 text-[#4a3038] outline-none transition placeholder:text-[#b69da5] focus:border-[#c96b89] focus:ring-4 focus:ring-[#c96b89]/10"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-[#5b4049]">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-[#c96b89] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-[#e8cbd4] bg-[#fffafb] px-4 py-3.5 pr-20 text-[#4a3038] outline-none transition placeholder:text-[#b69da5] focus:border-[#c96b89] focus:ring-4 focus:ring-[#c96b89]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#a45670]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-2xl border border-[#f0cdd5] bg-[#fff1f3] px-4 py-3 text-sm font-medium text-[#a45670]">
                    {error}
                  </div>
                )}

                {/* Login */}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#c96b89] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#c96b89]/20 transition hover:bg-[#b95d7c]"
                >
                  Sign In →
                </button>

              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#ead9df]" />
                <span className="text-xs text-[#a88b94]">
                  OR
                </span>
                <div className="h-px flex-1 bg-[#ead9df]" />
              </div>

              <p className="text-center text-sm text-[#80636d]">
                Don't have a Privia account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-[#c96b89] hover:underline"
                >
                  Create one
                </Link>
              </p>

              <p className="mt-8 text-center text-xs leading-5 text-[#a88b94]">
                Privia is currently a prototype. Authentication is
                simulated locally for this version.
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
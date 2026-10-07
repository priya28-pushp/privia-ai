"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo account for Version 1
    localStorage.setItem(
      "priviaUser",
      JSON.stringify({
        name,
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
                Your next home
                <br />
                starts here.
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/85">
                Create your Privia account and make apartment hunting
                simpler, smarter and more personalized.
              </p>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold">
                🏠 Your apartment journey
              </p>

              <p className="mt-2 text-xs leading-6 text-white/80">
                Discover apartments, compare your options and keep
                track of your booking requests in one place.
              </p>
            </div>
          </div>

          {/* Signup form */}
          <div className="p-8 sm:p-12">
            <div className="mx-auto max-w-md">

              <Link
                href="/login"
                className="text-sm font-semibold text-[#a45670] transition hover:text-[#c96b89]"
              >
                ← Back to Login
              </Link>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c96b89]">
                  Get started
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#4a3038]">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#80636d]">
                  Join Privia and start finding a place that fits you.
                </p>
              </div>

              <form onSubmit={handleSignup} className="mt-8 space-y-5">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#5b4049]">
                    Full name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-[#e8cbd4] bg-[#fffafb] px-4 py-3.5 text-[#4a3038] outline-none transition placeholder:text-[#b69da5] focus:border-[#c96b89] focus:ring-4 focus:ring-[#c96b89]/10"
                  />
                </div>

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
                  <label className="mb-2 block text-sm font-semibold text-[#5b4049]">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                    className="w-full rounded-2xl border border-[#e8cbd4] bg-[#fffafb] px-4 py-3.5 text-[#4a3038] outline-none transition placeholder:text-[#b69da5] focus:border-[#c96b89] focus:ring-4 focus:ring-[#c96b89]/10"
                  />
                </div>

                {/* Confirm password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#5b4049]">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Confirm your password"
                    className="w-full rounded-2xl border border-[#e8cbd4] bg-[#fffafb] px-4 py-3.5 text-[#4a3038] outline-none transition placeholder:text-[#b69da5] focus:border-[#c96b89] focus:ring-4 focus:ring-[#c96b89]/10"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-2xl border border-[#f0cdd5] bg-[#fff1f3] px-4 py-3 text-sm font-medium text-[#a45670]">
                    {error}
                  </div>
                )}

                {/* Create account */}
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-[#c96b89] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#c96b89]/20 transition hover:bg-[#b95d7c]"
                >
                  Create Account →
                </button>

              </form>

              <p className="mt-8 text-center text-sm text-[#80636d]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#c96b89] hover:underline"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-6 text-center text-xs leading-5 text-[#a88b94]">
                Privia is currently a prototype. Account data is stored
                locally for this version.
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
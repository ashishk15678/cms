"use client";

import { useState } from "react";
import { signIn, signUp } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await signIn(email, password);
        if (res !== "OK") throw new Error(res);
        router.push("/dashboard");
      } else {
        if (!name) throw new Error("Name is required");
        const res = await signUp(email, password);
        if (res !== "OK") throw new Error(res);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f4f9] p-4 font-sans text-slate-800">
      <div className="w-full max-w-[448px] bg-white rounded-3xl p-10 shadow-sm border border-slate-200/60">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-5 shadow-sm">
            C
          </div>
          <h1 className="text-[32px] font-normal tracking-tight mb-2 text-[#1f1f1f]">
            {isLogin ? "Sign in" : "Create account"}
          </h1>
          <p className="text-[#444746] font-medium">
            {isLogin ? "to continue to CMS" : "to get started with CMS"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="relative mt-2">
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full px-4 pt-5 pb-2 border border-slate-300 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors bg-transparent placeholder-transparent"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-1.5 text-xs text-[#444746] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-600 pointer-events-none"
              >
                Name
              </label>
            </div>
          )}

          <div className="relative mt-2">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 border border-slate-300 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors bg-transparent placeholder-transparent"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-1.5 text-xs text-[#444746] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-600 pointer-events-none"
            >
              Email
            </label>
          </div>

          <div className="relative mt-2">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 border border-slate-300 rounded-xl outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors bg-transparent placeholder-transparent"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1.5 text-xs text-[#444746] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-blue-600 pointer-events-none"
            >
              Password
            </label>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-blue-600 font-medium hover:bg-[#f3f7fe] px-4 py-2.5 rounded-full transition-colors text-sm"
            >
              {isLogin ? "Create account" : "Sign in instead"}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0b57d0] hover:bg-[#0842a0] text-white px-6 py-2.5 rounded-full font-medium transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px] shadow-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLogin ? (
                "Next"
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex gap-6 text-xs text-[#444746] font-medium w-full max-w-[448px] px-4 justify-between">
        <div>
          <button className="hover:bg-slate-200 px-3 py-1.5 rounded transition-colors">
            English (United States)
          </button>
        </div>
        <div className="flex gap-2">
          <button className="hover:bg-slate-200 px-3 py-1.5 rounded transition-colors">
            Help
          </button>
          <button className="hover:bg-slate-200 px-3 py-1.5 rounded transition-colors">
            Privacy
          </button>
          <button className="hover:bg-slate-200 px-3 py-1.5 rounded transition-colors">
            Terms
          </button>
        </div>
      </div>
    </div>
  );
}

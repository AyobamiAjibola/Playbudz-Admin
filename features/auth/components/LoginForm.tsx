"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const refreshUser = useAuthStore((state) => state.refreshUser)

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true)

    try {
      await api.post("/auth/login-admin", {
        email,
        password,
      });

      await refreshUser();

      router.push("/dashboard");

    } catch (error) {
      const normalizedError =
        error instanceof Error
          ? error
          : new Error("Unable to load user profile");
      setError(normalizedError)
    } finally {
      setLoading(false)
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-sm space-y-4"
    >
      <h1 className="text-2xl font-bold">
        Login
      </h1>

      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Email"
        className="w-full rounded-lg border p-3"
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        placeholder="Password"
        className="w-full rounded-lg border p-3"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black p-3 text-white"
      >
        {loading ? "Signing in..." : "Login"}
      </button>
    </form>
  );
}
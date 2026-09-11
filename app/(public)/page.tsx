// src/app/(public)/page.tsx

import Link from "next/link";

export default function GetStartedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Welcome
        </h1>

        <p className="mt-3 text-gray-500">
          Get started with your account.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
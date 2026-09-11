// src/app/(public)/page.tsx

import Link from "next/link";

export default function GetStartedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white"
        >
          Playbudz Admin
        </Link>
      </div>
    </main>
  );
}
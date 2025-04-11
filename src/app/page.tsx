import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-matcha-offwhite flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-matcha-taupe mb-4 drop-shadow-sm">
        🍵 MatchaMatch
      </h1>
      <p className="text-lg sm:text-xl text-matcha-taupe max-w-md mb-8">
        Discover your ideal matcha based on your unique taste. No fluff—just flavor.
      </p>
      <Link
        href="/taste"
        className="px-6 py-3 bg-matcha-med text-white rounded-full text-lg font-semibold hover:bg-matcha-light transition"
      >
        Start Taste Test →
      </Link>
    </main>
  );
}

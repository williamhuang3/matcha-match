import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-matcha-offwhite shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link
          href="/"
          className="text-2xl font-bold text-matcha-taupe tracking-tight"
        >
          🍵 MatchaMatch
        </Link>

        <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
          <Link
            href="/about"
            className="text-sm text-matcha-taupe hover:underline"
          >
            About
          </Link>
          <Link
            href="/submit"
            className="text-sm text-matcha-taupe hover:underline"
          >
            Submit Matcha
          </Link>
          <Link
            href="/taste"
            className="text-sm bg-matcha-med text-white px-4 py-2 rounded-full hover:bg-matcha-light transition"
          >
            Start Taste Test
          </Link>
        </div>
      </div>
    </nav>
  );
}

import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "MatchaMatch",
  description: "Discover your ideal matcha flavor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-matcha-offwhite">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

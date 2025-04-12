import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "MatchaMatch",
  description: "Get a personalized matcha recommendation based on your taste profile",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <title>MatchaMatch</title>
        <meta name="description" content="Get a personalized matcha recommendation based on your taste profile" />
      </head>
      <body className="bg-matcha-offwhite">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

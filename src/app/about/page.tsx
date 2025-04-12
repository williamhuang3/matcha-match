import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-8 text-center text-matcha-taupe flex flex-col items-center space-y-6">
      
      {/* Profile Picture */}
      <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-matcha-med">
        <Image
          src="/me.jpg" // Make sure this image exists in /public
          alt="William Huang"
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Intro & Backstory */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">About MatchaMatch</h1>
        <p className="text-lg leading-relaxed">
          Hey! I&rsquo;m Will — a matcha enthusiast, UCLA computational biology grad, and (hopefully) future café owner.
        </p>
        <p className="text-md leading-relaxed">
          My first experience with matcha? Mixing Costco matcha powder into vanilla ice cream when I was little. Definitely not the best.
        </p>
        <p className="text-md leading-relaxed">
          But since then, I&rsquo;ve tried to perfect my craft and dive deeper into what matcha has to offer. These days, I host home cafés for friends, experiment with new matcha drinks, and explore different cultivars. Along the way, I noticed something: people either <em>love</em> matcha or say it&rsquo;s &ldquo;too grassy&rdquo; or &ldquo;tastes like dirt&rdquo; — often because they&rsquo;ve only had low-quality stuff or haven&rsquo;t found a matcha that truly suits their taste.
        </p>
        <p className="text-md leading-relaxed">
          The truth is, matcha is a spectrum: from umami-rich to nutty, bright to mellow, sweet to astringent. I built MatchaMatch to help people discover what they actually enjoy based on their own taste (like an MBTI, but for matcha).
        </p>
        <p className="text-md leading-relaxed">
          Whether you&rsquo;re just getting into it or chasing that perfect koicha, I hope this helps you find something you love.
        </p>
        <p className="text-md mt-2">
          Want to help grow the database?{" "}
          <a href="/submit" className="underline">Submit your favorite matcha here.</a>
        </p>
      </div>

      {/* Social Links */}
      <div className="flex space-x-6 text-2xl mt-4">
        <a href="https://github.com/williamhuang3" target="_blank" rel="noopener noreferrer" className="hover:text-black">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/whuang03" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5]">
          <FaLinkedin />
        </a>
        <a href="https://instagram.com/whu4ng" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C]">
          <FaInstagram />
        </a>
      </div>
    </main>
  );
}

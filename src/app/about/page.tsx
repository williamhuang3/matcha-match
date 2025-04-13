import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 sm:p-8 text-center text-matcha-taupe flex flex-col items-center space-y-6">

      {/* Profile Picture */}
      <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border-4 border-matcha-med">
        <Image
          src="/me.jpeg" // place the new file in /public folder
          alt="William making matcha"
          width={800}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>


      {/* Intro & Backstory */}
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold">About MatchaMatch</h1>

        <p className="text-lg leading-relaxed">
          Hey! I&rsquo;m Will — a matcha enthusiast, UCLA computational biology grad pivoting to SWE, and (hopefully) future café owner.
        </p>

        {/* Spacer under first paragraph */}
        <div className="h-2 sm:h-4" />

        <p className="text-md leading-relaxed">
          Since my middle school days of mixing Costco matcha powder into vanilla ice cream, I&rsquo;ve tried to perfect my craft and dive deeper into what matcha has to offer. 
          Fast forward to college, and I now spend most of my free time hosting home cafés for friends, experimenting with new matcha drink recipes, and trying out different cultivars.
        </p>
        <p className="text-md leading-relaxed">  
          Along the way, I realized most people who say they don&rsquo;t like matcha have only tried bulk culinary powder &mdash; and unfortunately walk away thinking it tastes like dirt or grass.
        </p>
        <p className="text-md leading-relaxed">
          But the truth is, matcha is a spectrum: umami-rich to nutty, bright to mellow, sweet to astringent, or culinary to first harvest (sometimes called ceremonial). With that in mind, I built MatchaMatch as a way to help people discover matchas from personalized taste profiles.
        </p>
        <p className="text-md leading-relaxed">
          Whether you&rsquo;re just getting into it or chasing that perfect koicha, I hope this helps you find something you love!
        </p>
        <p className="text-md mt-2">
          Want to help grow the database?{" "}
          <a href="/submit" className="underline">Submit your favorite matcha here.</a>
        </p>
      </div>

      {/* Social Links */}
      <div className="flex space-x-6 text-2xl mt-6">
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

/* ---------- reusable fade-up variant ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

/* ---------- shimmer divider ---------- */
const Divider = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="h-1 w-40 mx-auto bg-gradient-to-r from-matcha-med via-matcha-light to-matcha-med animate-pulse rounded-full my-8"
  />
);

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 sm:p-8 text-matcha-taupe space-y-24">

      {/* ---------- hero image ---------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg border-4 border-matcha-med"
      >
        <Image
          src="/me.jpeg"
          alt="William making matcha"
          width={800}
          height={600}
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* ---------- emphasis headline ---------- */}
      

      {/* ---------- section 1 ---------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="space-y-6 text-center text-lg leading-relaxed"
      >
        <p>
          Hi, I’m <strong>Will</strong> — UCLA grad going into software engineering, gym-goer, and (maybe one day) a matcha café owner!
        </p>
      </motion.section>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center"
      >
        How it all started...
      </motion.h2>

      <Divider />

      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="space-y-6 text-center text-lg leading-relaxed"
      >
        <p>
          So <strong>how did I get into this?</strong> To be honest, as the child of two Chinese parents, I&apos;ve always loved green tea. Naturally curious after sneaking a few sips from
          my mom&apos;s leftover jasmine pot, I asked her, &rdquo;What other green teas are there?&rdquo; From that point on, I was dedicated to learning about
          every type of green tea I could find. Longjing for its nuttiness. Sencha for its grassiness. But matcha, with its different terroirs, cultivars, and preparation methods, was a whole different animal.
        </p>
        <p>
          Of all the green teas I tried, matcha was the most complex tasting and fun to make! Perfecting recipes and researching brands like Ippodo,
          by college, I found myself whisking up lattes pretty much every single time a friend was over. Eventually, 3 friends became 10. 10 became 30. Before I knew it, I had started what was
          essentially a pop-up café in my apartment kitchen.
        </p>
      </motion.section>

      {/* ---------- section 2 ---------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="space-y-6 text-center text-lg leading-relaxed"
      >
        <p>
          All the while during this matcha craze, my friends kept asking the same thing:
        </p>
      </motion.section>

      {/* ---------- Dramatic question ---------- */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-extrabold text-center"
      >
        What&nbsp;matcha&nbsp;should&nbsp;I&nbsp;get?
      </motion.h2>

      <Divider />

      {/* ---------- section 3 ---------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="space-y-6 text-center text-lg leading-relaxed"
      >
        <p>
          Now I don&apos;t consider myself an actual expert, but the answer depends on <em>a lot</em>: are you sipping usucha, koicha,
          making fruit lattes, or baking? Do you prefer umami or nutty first matchas? Sweet or grassy?
        </p>
        <p>
          For a beginner it&apos;s overwhelming — dozens of cultivars, grades, and price points.
        </p>
      </motion.section>

      {/* ---------- MatchaMatch headline ---------- */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center"
      >
        That’s why I built MatchaMatch!
      </motion.h2>

      <Divider />

      {/* ---------- section 4 ---------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="space-y-6 text-center text-lg leading-relaxed"
      >
        <p>
          Take a short taste quiz, and MatchaMatch maps your flavor profile to a curated
          database so you can skip the trial-and-error. Whether you&apos;re a seasoned connoisseur or 
          just getting into things, I hope MatchaMatch helps you find the perfect matcha for your needs!
        </p>
        <p className="text-base">
          Want to help the project grow?&nbsp;
          <Link href="/submit" className="underline">
            Submit your favorite matcha →
          </Link>
        </p>
      </motion.section>

      {/* ---------- social links ---------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex justify-center space-x-8 text-3xl"
      >
        <Link href="https://github.com/williamhuang3" target="_blank" className="hover:text-black">
          <FaGithub />
        </Link>
        <Link href="https://linkedin.com/in/whuang03" target="_blank" className="hover:text-[#0077b5]">
          <FaLinkedin />
        </Link>
        <Link href="https://instagram.com/whu4ng" target="_blank" className="hover:text-[#E1306C]">
          <FaInstagram />
        </Link>
      </motion.div>
    </main>
  );
}

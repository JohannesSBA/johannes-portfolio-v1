"use client";
import LightRays from "@/components/LightRays";
import TextType from "@/components/TextType";
import Image from "next/image";
import About from "@/components/page/about";
import SplitText from "@/components/SplitText";
import { Kantumruy_Pro, Bebas_Neue } from "next/font/google";
import StaggeredMenu from "@/components/StaggeredMenu";
import Projects from "@/components/page/projects";
import Link from "next/link";
import { useState } from "react";
import Loop from "@/components/Loop";
import Experience from "@/components/page/experience";
import Contact from "@/components/page/contact";
import { FaArrowAltCircleUp } from "react-icons/fa";

const kantumruyPro = Kantumruy_Pro({
  weight: "400",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "#home" },
    { label: "About", ariaLabel: "Learn about us", link: "#about" },
    {
      label: "Experiences",
      ariaLabel: "View my experiences",
      link: "#experiences",
    },
    { label: "Projects", ariaLabel: "View our projects", link: "#projects" },
    { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com/JohannesSBA" },
    { label: "LinkedIn", link: "https://linkedin.com/in/johannes-bekele" },
  ];

  return (
    <div className="relative min-h-screen bg-[#060010] overflow-x-hidden transition-all duration-300 scroll-smooth">
      {/* Floating menu */}
      <div className="h-screen bg-transparent fixed top-0 left-0 w-full z-[400]">
        {isTypingComplete && (
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            colors={["#B19EEF", "#5227FF"]}
            logoUrl="/jojo.jpg"
            accentColor="#ff6b6b"
            onMenuOpen={() => console.log("Menu opened")}
            onMenuClose={() => console.log("Menu closed")}
          />
        )}
      </div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center" id="home">
        {/* Background accents */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-30"
            style={{
              background: "radial-gradient(closest-side, #5227FF, transparent)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-30"
            style={{
              background: "radial-gradient(closest-side, #B19EEF, transparent)",
            }}
          />
        </div>

        <div className="fixed inset-0 pointer-events-none z-[50]">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.1}
            lightSpread={1.0}
            rayLength={1.0}
            followMouse={true}
            mouseInfluence={0.5}
            noiseAmount={0.08}
            distortion={0.04}
            className="opacity-40"
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Copy */}
            <div className="md:col-span-7">
              <div className="mb-3">
                <TextType
                  as="span"
                  text={["Hi there"]}
                  typingSpeed={200}
                  pauseDuration={1000}
                  showCursor={true}
                  cursorCharacter="|"
                  className={`${kantumruyPro.className} text-sm md:text-base tracking-wide text-white/70`}
                  loop={false}
                  onComplete={() => {
                    setIsTypingComplete(true);
                  }}
                />
              </div>
              <h1
                className={`${bebasNeue.className}  text-white text-5xl md:text-7xl leading-[0.95] font-semibold`}
              >
                <SplitText
                  text="Johannes Bekele"
                  splitType="words"
                  className={`${bebasNeue.className}`}
                  from={{ opacity: 0, y: 12 }}
                  to={{ opacity: 1, y: 0 }}
                  duration={0.5}
                />
              </h1>
              <div className="mt-2 text-xl md:text-2xl text-white/80">
                <SplitText
                  text="Software Engineer"
                  splitType="words"
                  className={`${bebasNeue.className}`}
                  from={{ opacity: 0, y: 12 }}
                  to={{ opacity: 1, y: 0 }}
                  duration={0.5}
                />
              </div>
              <p
                className={`${kantumruyPro.className} mt-5 max-w-xl text-white/70 text-sm md:text-base`}
              >
                I build playful, performant interfaces and full‑stack products.
                I enjoy motion, polish, and clear UX.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="#projects"
                  className="rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
                >
                  View Projects
                </Link>
                <Link
                  href="#about"
                  className="rounded-md border border-white/20 bg-white/5 text-white px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  About Me
                </Link>
              </div>
            </div>

            {/* Portrait */}
            <div className="md:col-span-5">
              <div className="relative mx-auto w-56 h-56 md:w-72 md:h-72">
                <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[#B19EEF] via-white/40 to-[#5227FF] opacity-70 blur-lg" />
                <div className="relative h-full w-full rounded-[24px] overflow-hidden border border-white/15 bg-white/5 backdrop-blur-sm">
                  <Image
                    src="/jojo.jpg"
                    alt="Portrait of Johannes"
                    fill
                    className="object-cover grayscale-[30%]"
                    sizes="(max-width: 768px) 14rem, 18rem"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="fixed left-1/2 -translate-x-1/2 bottom-0  hidden md:flex flex-col items-center text-white/60">
            <span className="text-xs tracking-wider">SCROLL</span>
            <a
              href="#about"
              className="mt-1 h-8 w-5 rounded-full border border-white/30 flex items-start justify-center p-1"
            >
              <span className="h-2 w-1 rounded-full bg-white/60 animate-bounce" />
            </a>
          </div>
        </div>
      </section>
      {/* About section */}
      <section className="w-screen min-h-screen" id="about">
        <About />
      </section>
      <section className="w-screen min-h-screen" id="experiences">
        <Experience />
      </section>
      <section className="w-screen" id="projects">
        <Projects />
      </section>
      <section className="w-screen min-h-screen" id="contact">
        <Contact />
      </section>
      <div className="w-screen h-20 flex text-center items-center justify-center gap-2">
        <a
          href="#home"
          className="flex flex-col items-center justify-center gap-2"
        >
          <FaArrowAltCircleUp
            size={20}
            className="text-white flex items-center justify-center"
          />
          <p className="text-white text-sm">Back to top</p>
        </a>
      </div>
    </div>
  );
}

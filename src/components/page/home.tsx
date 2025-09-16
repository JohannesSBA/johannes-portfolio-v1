"use client";
import TextType from "@/components/TextType";
import { Kantumruy_Pro, Bebas_Neue } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DecryptedText from "../DecryptedText";

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

  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start md:items-center">
        {/* Left: Portrait in framed box */}
        <div
          className={`md:col-span-6 order-2 md:order-1 transition-all duration-700 ${
            isTypingComplete
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative w-full max-w-[560px]">
            <div className="cut-corner border border-white/15 bg-white/5 overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/jojo.jpg"
                  alt="Portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 560px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Headline and card */}
        <div className={`md:col-span-6 order-1 md:order-2 `}>
          <div className="mb-6 md:mb-8">
            <TextType
              as="span"
              text={["Hi, I'm Johannes"]}
              typingSpeed={50}
              pauseDuration={1000}
              showCursor={true}
              cursorCharacter="|"
              className={`${kantumruyPro.className} text-sm md:text-base tracking-wide text-white/70`}
              loop={false}
              onComplete={() => setIsTypingComplete(true)}
            />
          </div>
          <div
            className={`mt-8 h-40 transition-all duration-700 ${
              isTypingComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <DecryptedText
              text="Software Engineer / Developer"
              speed={60}
              maxIterations={20}
              sequential={true}
              animateOn={isTypingComplete ? "both" : "hover"}
              useOriginalCharsOnly
              revealDirection="start"
              characters="ABCD1234!?"
              className={`${
                isTypingComplete
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } leading-none text-white text-7xl tracking-tight font-bold ${
                bebasNeue.className
              }`}
              encryptedClassName={`${
                isTypingComplete
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } text-white/80 blur-[0.5px]`}
              parentClassName={`${
                isTypingComplete
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              } leading-none text-white text-7xl font-bold tracking-tight ${
                bebasNeue.className
              }`}
            />
          </div>
          {/* <h1 className={`hero-headline  text-white`}>Software</h1>
          <h1 className={`hero-headline text-white/90 -mt-3`}>Engineer/</h1>
          <h1 className={`hero-headline text-white/90 -mt-3`}>DEVELOPER</h1> */}

          <div
            className={`hero-card mt-8 transition-all duration-700  ${
              isTypingComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 text-xs tracking-widest text-white/70 pb-4">
              <span className="text-base">✶</span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-semibold">SOFTWARE ENGINEER</span>
            </div>
            <DecryptedText
              text={`I create immersive, high-performing websites tailored for startups, agencies, and in‑house teams that need speed, scalability, and full control.`}
              speed={5}
              maxIterations={20}
              sequential={true}
              animateOn={"view"}
              useOriginalCharsOnly
              revealDirection="start"
              characters="ABCD1234!?"
              className={`${kantumruyPro.className} mt-6 text-white/80 text-base leading-7`}
              parentClassName={`text-white/80 text-base leading-7${
                isTypingComplete
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            />
            <div
              className={`mt-6 flex flex-wrap gap-3 transition-all duration-700 ${
                isTypingComplete
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href="#contact"
                className="inline-flex items-center rounded-md bg-purple-300 text-black px-5 py-2.5 text-sm font-semibold hover:bg-purple-200 z-[9999] transition-colors relative"
              >
                <DecryptedText
                  text="Get in touch"
                  maxIterations={20}
                  sequential={true}
                  animateOn="hover"
                  useOriginalCharsOnly
                  revealDirection="start"
                  characters="ABCD1234!?"
                />
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center rounded-md border border-white/20 bg-transparent text-white px-5 py-2.5 text-sm hover:bg-white/5 z-[9999] transition-colors relative"
              >
                <DecryptedText
                  text="See work"
                  maxIterations={20}
                  sequential={true}
                  animateOn="hover"
                  useOriginalCharsOnly
                  revealDirection="start"
                  characters="ABCD1234!?"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-0 hidden md:flex flex-col items-center text-white/60">
        <span className="text-xs tracking-wider">SCROLL</span>
        <a
          href="#about"
          className="mt-1 h-8 w-5 rounded-full border border-white/30 flex items-start justify-center p-1"
        >
          <span className="h-2 w-1 rounded-full bg-white/60 animate-bounce" />
        </a>
      </div>
    </div>
  );
}

"use client";
import TextType from "@/components/TextType";
import { Kantumruy_Pro } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DecryptedText from "../DecryptedText";
import { ArrowUpRight, Sparkles } from "lucide-react";

const kantumruyPro = Kantumruy_Pro({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  return (
    <div className="relative section-shell">
      <div className="absolute inset-0 max-w-5xl mx-auto blur-3xl opacity-60 pointer-events-none">
        <div className="absolute top-10 left-10 w-56 h-56 rounded-full bg-[#5eb1ef22]" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#7dd1c820]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className={`md:col-span-7 order-2 md:order-1 space-y-6`}>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Sparkles size={14} className="text-[#5eb1ef]" />
              Available for select work
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Boston · Remote friendly
            </span>
          </div>

          <div className="space-y-3">
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
            <div
              className={`transition-all duration-700 h-96 ${
                isTypingComplete
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <DecryptedText
                text="Frontend-leaning Software Engineer building scalable web platforms with Next.js, Postgres, and AWS."
                speed={60}
                maxIterations={20}
                sequential={true}
                animateOn={"view"}
                useOriginalCharsOnly
                revealDirection="start"
                characters="ABCD1234!?"
                className="leading-tight text-white text-4xl sm:text-5xl md:text-6xl font-[var(--font-display)] font-semibold"
                encryptedClassName="leading-tight text-white/80 text-4xl sm:text-5xl md:text-6xl font-[var(--font-display)] font-semibold blur-[0.5px]"
                parentClassName="leading-tight text-4xl sm:text-5xl md:text-6xl font-[var(--font-display)] font-semibold"
              />
            </div>
          </div>

          <div
            className={`panel mt-4 transition-all duration-700 ${
              isTypingComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-white/60 pb-3">
              <span className="text-sm">✶</span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-semibold text-white/80">
                FAST · PLAYFUL · SCALABLE
              </span>
            </div>
            <p
              className={`${kantumruyPro.className} mt-1 text-white/80 text-base leading-7`}
            >
              I build expressive, performant web experiences for startups,
              agencies, and product teams—mixing solid engineering with bold
              creative direction and polished interactions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5eb1ef] to-[#7dd1c8] text-black px-5 py-2.5 text-sm font-semibold shadow-[0_15px_40px_rgba(94,177,239,0.25)] transition-transform hover:-translate-y-0.5"
              >
                <DecryptedText
                  text="Book a project"
                  maxIterations={20}
                  sequential={true}
                  animateOn="hover"
                  useOriginalCharsOnly
                  revealDirection="start"
                  characters="ABCD1234!?"
                />
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 text-white px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
              >
                <DecryptedText
                  text="See the work"
                  maxIterations={20}
                  sequential={true}
                  animateOn="hover"
                  useOriginalCharsOnly
                  revealDirection="start"
                  characters="ABCD1234!?"
                />
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Backend focus",
                value: "Next.js + Postgres",
                detail: "Prisma, auth, observability",
              },
              {
                label: "Average response",
                value: "<24h",
                detail: "Async & transparent",
              },
              {
                label: "Launches",
                value: "30+",
                detail: "Web, mobile, client builds",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="panel p-4 bg-white/5 border-white/10 hover:border-white/25 transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-white/60">
                  {item.label}
                </p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {item.value}
                </p>
                <p className="text-sm text-white/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Portrait and highlights */}
        <div
          className={`md:col-span-5 order-1 md:order-2 transition-all duration-700 ${
            isTypingComplete
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative w-full max-w-[520px] mx-auto">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#5eb1ef33] via-transparent to-[#7dd1c833] blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/5 backdrop-blur-md">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/jojo.jpg"
                  alt="Johannes portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
              </div>
              <div className="absolute left-5 right-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Current focus
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Web experiences · 3D · Design systems
                  </p>
                </div>
                <span className="h-10 w-10 grid place-items-center rounded-full bg-white text-black text-xs font-bold">
                  2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-6 hidden md:flex flex-col items-center text-white/60">
        <span className="text-xs tracking-wider">Scroll</span>
        <a
          href="#about"
          className="mt-1 h-10 w-6 rounded-full border border-white/30 flex items-start justify-center p-1 bg-white/5"
        >
          <span className="h-2 w-1 rounded-full bg-white/70 animate-bounce" />
        </a>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import Loop from "../Loop";
import DecryptedText from "../DecryptedText";

type Project = {
  title: string;
  blurb: string;
  image?: string;
  tags: string[];
  links?: { demo?: string; repo?: string };
  glow?: string; // per-card hover glow color
};

const projectsData: Project[] = [
  {
    title: "Econnect",
    blurb:
      "A social platform that helps job seekers connect with employers, featuring profiles, posts, and a hiring flow.",
    image: "/econnect.jpeg",
    tags: ["Next.js", "TypeScript", "Prisma", "Postgres", "Tailwind"],
    links: {
      demo: "https://econnectpilot.com",
      repo: "https://github.com/JohannesSBA/econnect-dev",
    },
    glow: "#8b5cf6cc", // violet
  },
  {
    title: "Portfolio Website",
    blurb:
      "This site — built with Next.js and motion experiments. Focused on playful interactions and performance.",
    image: "/jojo.jpg",
    tags: ["Next.js", "Lenis", "GSAP", "Tailwind"],
    links: { demo: "#", repo: "#" },
    glow: "#22d3eecc", // cyan
  },
  {
    title: "Freelance Work",
    blurb:
      "Projects I've worked on for clients. Mostly web development and design. Some mobile development as well.",
    tags: ["Framer Motion", "Next.js", "Tailwind", "UX"],
    image: "/freelance.png",
    links: {
      demo: "https://www.coredevelopment.org",
      repo: "https://github.com/JohannesSBA/coredevelopment",
    },
    glow: "#f43f5ecc", // rose
  },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-white/90">
    {children}
  </span>
);

const CTA = ({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) => (
  <a
    href={href && href !== "#" ? href : undefined}
    target={href && href !== "#" ? "_blank" : undefined}
    rel={href && href !== "#" ? "noopener noreferrer" : undefined}
    aria-disabled={!href || href === "#"}
    className={`group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      href && href !== "#"
        ? "bg-white text-black hover:bg-white/90"
        : "bg-white/10 text-white/60 cursor-not-allowed"
    }`}
  >
    {children}
  </a>
);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // Do not unobserve to keep simple one-shot animation
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={sectionRef}
      className={`relative w-full h-full pt-10 overflow-x-hidden transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#5a3aff0f] to-transparent" />
      <div className="mx-auto max-w-screen px-4 sm:px-6">
        <Loop
          texts={[
            "Projects",
            "////////////////////",
            "Projects",
            "////////////////////",
            "Projects",
            "////////////////////",
            "Projects",
            "////////////////////",
            "Projects",
            "////////////////////",
            "Projects",
            "////////////////////",
          ]}
          className="text-white/90 my-3"
          speed={20}
          direction="left"
        />

        <div className="w-full flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
          <div className="w-full px-0 md:px-4 flex flex-col items-center md:items-start text-center md:text-left border-y border-white/10 py-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              <span className=" text-white bg-clip-text ">Projects</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70">
              A few things I&apos;ve built and explored lately.
            </p>
          </div>
          <div className="hidden md:block w-px h-20 md:h-40 bg-white/20" />
          <div className="w-full md:w-auto flex gap-4 items-center justify-between md:justify-end md:pr-14 border-b md:border-b border-white/10 py-3 md:py-4">
            <p className="hidden md:block mt-0 max-w-2xl text-xs md:text-base text-white/70">
              {"//////////////////////////////////////////////////////////"}
            </p>
            <p className="text-xs md:text-sm text-white/70">Projects_test_12</p>
          </div>
        </div>

        <ScrollStack
          useWindowScroll
          itemDistance={500}
          itemStackDistance={5}
          stackPosition="35%"
          rotationAmount={0}
          blurAmount={2}
          itemScale={0.04}
          baseScale={0.85}
        >
          {projectsData.map((p, idx) => (
            <ScrollStackItem
              key={p.title}
              itemClassName="group relative overflow-hidden h-auto min-h-[20rem] md:min-h-[22rem] bg-white/5 text-white border border-white/10 backdrop-blur-sm"
            >
              <div
                className="relative flex flex-col gap-4 p-6 md:p-8"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - r.left;
                  const y = e.clientY - r.top;
                  e.currentTarget.style.setProperty("--mx", `${x}px`);
                  e.currentTarget.style.setProperty("--my", `${y}px`);
                }}
              >
                {/* strong per-card glow overlay */}
                <div
                  className="pointer-events-none absolute -inset-[1px] rounded-[40px] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(320px 240px at var(--mx, 50%) var(--my, -30px), ${
                      p.glow ?? "#ffffffaa"
                    } 0%, transparent 60%)`,
                    filter: `drop-shadow(0 0 70px ${p.glow ?? "#ffffff66"})`,
                  }}
                />
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                    {p.title}
                  </h2>
                  <Badge>Featured</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <p className="text-sm md:text-base text-white/80 leading-relaxed">
                      {p.blurb}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[#6b50ff1a] text-[#cfc6ff] border border-[#6b50ff40] px-2.5 py-1 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative h-48 md:h-56 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                        priority={idx === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-white/50 text-sm">
                        Preview coming soon
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-3 z-[10000]">
                  <CTA href={p.links?.demo}>
                    <ExternalLink size={16} />{" "}
                    <DecryptedText
                      text="Live Demo"
                      maxIterations={20}
                      sequential={true}
                      animateOn="hover"
                      useOriginalCharsOnly
                      revealDirection="start"
                      characters="ABCD1234!?"
                    />
                  </CTA>
                  <CTA href={p.links?.repo}>
                    <Github size={16} />{" "}
                    <DecryptedText
                      text="View Repo"
                      maxIterations={20}
                      sequential={true}
                      animateOn="hover"
                      useOriginalCharsOnly
                      revealDirection="start"
                      characters="ABCD1234!?"
                    />
                  </CTA>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
};

export default Projects;

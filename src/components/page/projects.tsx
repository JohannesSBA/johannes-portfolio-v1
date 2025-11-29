import React from "react";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import Loop from "../Loop";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import DecryptedText from "../DecryptedText";

type LinkSet = { label: string; href?: string };
type Project = {
  title: string;
  timeframe: string;
  summary: string;
  impact: string;
  stack: string[];
  image?: string;
  links?: LinkSet[];
  badge?: string;
  highlight?: string;
};

const projects: Project[] = [
  {
    title: "Kickaas",
    timeframe: "2025",
    summary:
      "AI-enhanced event platform with real-time ticketing, interactive venue maps, and scalable microservices.",
    impact:
      "Built responsive UI and integrated Stripe, scheduling, and CI/CD to stabilize deployments across environments.",
    stack: ["Next.js", "FastAPI", "TypeScript", "Tailwind", "Stripe", "CI/CD"],
    links: [
      { label: "Github", href: "https://github.com/BUMETCS673/cs673f25a2project-cs673a2f25team5" },
    ],
    image: "/kickaas.png",
    badge: "AI + Events",
    highlight: "Real-time ticketing",
  },
  {
    title: "Econnect",
    timeframe: "2024",
    summary:
      "Professional networking and job-matching platform built for Ethiopia with localized onboarding and multi-language support.",
    impact:
      "Implemented role-based routing, Chapa-powered payments, S3 uploads, and real-time messaging to keep employers and seekers in sync.",
    stack: ["Next.js", "TypeScript", "Prisma", "Postgres", "AWS S3", "Chapa"],
    links: [
      { label: "Live", href: "https://econnectpilot.com" },
      { label: "Repo", href: "https://github.com/JohannesSBA/econnect-dev" },
    ],
    image: "/econnect.jpeg",
    badge: "Networking",
    highlight: "Localized onboarding",
  },
  {
    title: "Core Development Payments",
    timeframe: "2024",
    summary:
      "Parking and EV charging payment experience for Core Development, shipped across web and mobile.",
    impact:
      "Delivered React + AWS Amplify stack, improving payment flow clarity and uptime for station customers.",
    stack: ["React", "AWS Amplify", "Stripe", "Tailwind", "Mobile"],
    links: [{ label: "Live", href: "https://www.coredevelopment.org" }],
    image: "/freelance.png",
    badge: "Client build",
    highlight: "Web + mobile",
  },
];

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur">
    {children}
  </span>
);

const Projects = () => {
  const { ref: sectionRef, visible } = useInViewOnce<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full py-16 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#67e5bf0a] to-transparent" />
      <div className="section-shell">
        <Loop
          texts={[
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

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border-y border-white/10 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/60 mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-[#b9ff66]" /> Selected builds
              from 2024–2025
            </p>
            <h2 className="text-3xl md:text-5xl font-[var(--font-display)] font-semibold text-white glow-underline">
              Product work that ships
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl">
              Lean, resilient projects with real users: payments, networking, AI
              surfaces, and platform plumbing. Every build tied to a clear outcome.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">
              Backend-leaning
            </span>
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1">
              Next.js · FastAPI · AWS
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/5 backdrop-blur-sm p-6 flex flex-col gap-4"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(480px_at_center,rgba(94,177,239,0.12),transparent_60%)]" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">
                    {project.timeframe}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
                {project.badge && <Tag>{project.badge}</Tag>}
              </div>

              <div className="relative w-full h-44 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-white/60 text-sm">
                    Preview coming soon
                  </div>
                )}
                {project.highlight && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 text-white px-3 py-1 text-xs border border-white/10 backdrop-blur">
                    {project.highlight}
                  </span>
                )}
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                {project.summary}
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {project.impact}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-3 pt-2">
                {project.links?.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href ? "_blank" : undefined}
                    rel={link.href ? "noopener noreferrer" : undefined}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                      link.href
                        ? "bg-gradient-to-r from-[#5eb1ef] to-[#7dd1c8] text-black shadow-[0_10px_25px_rgba(94,177,239,0.25)] hover:opacity-90"
                        : "bg-white/8 text-white/60 cursor-not-allowed"
                    }`}
                  >
                    {link.label}
                    {link.label.toLowerCase().includes("repo") ||
                    link.label.toLowerCase().includes("git") ? (
                      <Github size={16} />
                    ) : (
                      <ExternalLink size={16} />
                    )}
                  </a>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-white/60">
                  <DecryptedText
                    text="Shipped"
                    animateOn="hover"
                    sequential
                    characters="ABCD1234!?"
                    maxIterations={20}
                    revealDirection="start"
                  />
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import React from "react";
import CurvedLoop from "../CurvedLoop";
import Image from "next/image";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const About = () => {
  const { ref: sectionRef, visible } = useInViewOnce<HTMLDivElement>({
    threshold: 0.2,
  });
  const highlights = [
    {
      title: "Product engineering",
      description:
        "Ship scalable web apps with clean data models, auth, and observability—balancing velocity with longevity.",
    },
    {
      title: "Backend leaning",
      description:
        "Prisma, Postgres, AWS, and Stripe integrations paired with strong type-safety and API contracts.",
    },
    {
      title: "Partnership mindset",
      description:
        "Work as a technical co-pilot—aligning on goals, removing friction, and keeping communication crisp.",
    },
  ];
  const stats = [
    { label: "Origin", value: "Arbaminch, Ethiopia" },
    { label: "Based in", value: "Boston & New York" },
    { label: "Timezone", value: "EST (flexible)" },
  ];
  const skills = {
    programming: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "Flutter",
    ],
    stack: [
      "Next.js",
      "Prisma",
      "Postgres",
      "Redis",
      "AWS (S3, EC2, Amplify)",
      "FastAPI",
      "Stripe",
      "Tailwind",
      "OAuth",
      "Docker",
      "CI/CD",
    ],
    other: [
      "Scrum certified",
      "Adobe XD/Illustrator",
      "Figma",
      "Excel/Docs",
      "Bilingual: English/Amharic",
    ],
  };

  return (
    <div
      ref={sectionRef}
      className={`w-full min-h-screen relative flex flex-col justify-center text-white border-y border-white/10 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_at_50%_10%,rgba(94,177,239,0.12),transparent_70%)]" />
        <Image
          src="/jojo.jpg"
          alt="About me background"
          fill
          sizes="100vw"
          className="object-cover opacity-5"
          priority
        />
      </div>

      <div className="section-shell relative z-10 py-20">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-10">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              About me
            </span>
            <div className="h-px w-16 bg-white/20" />
            <span className="text-white/60">
              Engineer · Builder · Storyteller
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Focused on expressive web experiences in 2025
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[22px] border border-white/12 bg-white/5 backdrop-blur-sm">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/grad.JPG"
                  alt="Johannes graduation"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
              </div>
              <div className="absolute top-4 right-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
                Ethiopia → Boston
              </div>
              <div className="absolute left-4 bottom-4 right-4 panel p-4 bg-white/10">
                <p className="text-sm text-white">
                  Building across cultures taught me to design with empathy and
                  ship with intention—no matter the timezone.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <p className="text-lg leading-7 text-white/80">
              Computer Science grad focused on building scalable web
              applications with Next.js, Prisma, Postgres, and AWS. Led
              EConnect, a networking platform with real-time messaging,
              payments, and localized onboarding. I love pairing clear user
              journeys with resilient backends.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="panel p-4 bg-white/5 border-white/10 hover:border-white/25 transition-colors"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60">
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="panel p-4 md:p-5 bg-white/5 border-white/10 hover:border-white/25 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/75 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="panel p-5 bg-white/5 border-white/10">
              <h4 className="text-sm uppercase tracking-[0.16em] text-white/60 mb-3">
                Skills snapshot
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/80">
                <div>
                  <p className="text-white font-semibold">Programming</p>
                  <p className="mt-1 leading-relaxed">
                    {skills.programming.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-white font-semibold">Stack</p>
                  <p className="mt-1 leading-relaxed">
                    {skills.stack.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-white font-semibold">Other</p>
                  <p className="mt-1 leading-relaxed">
                    {skills.other.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

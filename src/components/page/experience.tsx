import React from "react";
import Image from "next/image";
import Loop from "../Loop";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type ExperienceItem = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  blurb: string;
  logo?: string; // public path for an optional logo
  tags?: string[];
};

type EducationItem = {
  school: string;
  degree: string;
  start: string;
  end: string;
  details?: string[];
  logo?: string;
};

const experiences: ExperienceItem[] = [
  {
    role: "Product Management Externship",
    company: "BeReal",
    location: "",
    start: "Nov 2025",
    end: "Present",
    blurb:
      "Mapped end-to-end user journeys, benchmarked competitors, and proposed features targeting a projected 15–20% lift in session completion. Led focus groups with Illustrator prototypes, synthesizing qualitative insights into a data-backed engagement plan for Gen Z users.",
    tags: ["Product thinking", "User research", "Prototyping"],
  },
  {
    role: "Software Engineer",
    company: "Freelance",
    location: "",
    start: "May 2024",
    end: "Present",
    blurb:
      "Built Core Development's parking/EV payment web and mobile experience with React + AWS Amplify, boosting access and payment reliability. Delivered web presence for Gedeb Engineering and Yeshi's Ethiopian Cuisine, aligning on docs and deployment with founders.",
    tags: ["React", "AWS Amplify", "Client delivery", "Payments"],
  },
  {
    role: "Software Engineer Intern",
    company: "Grassroots Grocery",
    location: "New York, NY",
    start: "May 2023",
    end: "Aug 2023",
    blurb:
      "Built TypeScript automation sending event notifications to 2,000+ coordinators, cutting manual driver assignments by 90%. Created 6+ webhooks and text triggers, boosting operational efficiency ~50%, and documented deployment for leadership.",
    tags: ["TypeScript", "Automation", "Webhooks", "Messaging"],
  },
  {
    role: "Tech Volunteer",
    company: "Shady Grove Group",
    location: "Rockville, MD",
    start: "May 2022",
    end: "Aug 2022",
    blurb:
      "Developed Flutter + Firebase apps for the GERD project to secure authentication and onboarding. Participated in daily standups, resolving blockers and rotating through team lead/scrum master roles.",
    tags: ["Flutter", "Firebase", "Scrum", "Git"],
  },
];

const education: EducationItem[] = [
  {
    school: "Boston University",
    degree: "M.S. Computer Science, Cyber Security concentration",
    start: "May 2025",
    end: "Present",
    details: [
      "Coursework: Operating Systems, Computer Networks, Software Engineering, Analysis of Algorithms, Computer Language Theory.",
    ],
    logo: "/boston.png",
  },
  {
    school: "Fordham University",
    degree: "B.S. Computer Science (GPA: 3.7)",
    start: "Sep 2021",
    end: "May 2025",
    details: [
      "Cum Laude, Faber Award recipient.",
      "Coursework: Database Systems, Operating Systems, Algorithms, Cybersecurity & Applications, Data Mining, Machine Learning, Internet & Web Programming.",
    ],
    logo: "/fordham.png",
  },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs text-white/90">
    {children}
  </span>
);

const ExperienceCard = ({ item }: { item: ExperienceItem }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/5 text-white backdrop-blur-sm">
    <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#5eb1ef] via-[#7dd1c8] to-transparent" />
    <div className="relative flex flex-col gap-4 p-5 sm:p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight truncate">
            {item.role}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-white/70 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <Briefcase size={14} /> {item.company}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} /> {item.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} /> {item.start} – {item.end}
            </span>
          </div>
        </div>
        {item.logo && (
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/10">
            <Image
              src={item.logo}
              alt={`${item.company} logo`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      <p className="text-sm sm:text-base text-white/80 leading-relaxed">
        {item.blurb}
      </p>

      {item.tags && item.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Experience = () => {
  const { ref: sectionRef, visible } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 });
  const itemRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={sectionRef}
      className={`relative w-full min-h-screen py-16 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#5eb1ef0f] to-transparent" />

      <div className="section-shell">
        <Loop
          texts={[
            "Experience",
            "////////////////////",
            "Experience",
            "////////////////////",
            "Experience",
            "////////////////////",
          ]}
          className="text-white/90 my-3"
          speed={20}
          direction="left"
        />

        {/* Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
          <div className="w-full flex flex-col items-start text-left border-y border-white/10 py-4">
            <h1 className="text-3xl md:text-5xl font-[var(--font-display)] font-semibold tracking-tight text-white glow-underline">
              Career track
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70">
              Roles that taught me to ship quickly, listen closely, and keep teams
              aligned. I thrive where design, engineering, and operations overlap.
            </p>
          </div>
          <div className="hidden md:block w-px h-20 md:h-40 bg-white/20" />
          <div className="w-full md:w-auto flex gap-4 items-center justify-between md:justify-end md:pr-4 border-b md:border-b border-white/10 py-3 md:py-4">
            <p className="text-xs md:text-sm text-white/70">
              Now → 2025 · Open to impactful teams
            </p>
          </div>
        </div>

        {/* Experience list */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6" ref={itemRef}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-6">
            {experiences.map((ex) => (
              <ExperienceCard
                key={`${ex.company}-${ex.role}-${ex.start}`}
                item={ex}
              />
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-12 md:mt-16">
          <div className="mb-4 flex items-center gap-2 text-white/80">
            <GraduationCap size={20} />
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Education
            </h2>
          </div>

          {education.map((edu) => (
            <div
              key={edu.school}
              className="relative overflow-hidden my-2 rounded-2xl border border-white/12 bg-white/5 text-white backdrop-blur-sm p-5 sm:p-6 md:p-8"
            >
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#5eb1ef] via-[#7dd1c8] to-transparent" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-base md:text-lg font-medium">
                    {edu.school}
                  </p>
                  <p className="text-sm md:text-base text-white/80">
                    {edu.degree}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-white/70 text-xs sm:text-sm">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={14} /> {edu.start} – {edu.end}
                    </span>
                  </div>
                </div>
                {edu.logo && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/10">
                    <Image
                      src={edu.logo}
                      alt="school logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {edu.details && edu.details.length > 0 && (
                <ul className="mt-4 list-disc pl-5 text-sm md:text-base text-white/80 space-y-1">
                  {edu.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;

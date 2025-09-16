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
    role: "Software Engineer Intern",
    company: "Grassroots Grocery",
    location: "New York, NY",
    start: "May 2023",
    end: "Aug 2023",
    blurb:
      "Designed automation to send event notifications to 2,000+ coordinators; cut manual driver assignments by 90% with JS scripts; established 6+ webhooks and text triggers boosting operational efficiency by ~50%; presented documentation and deployment plan to the founder and tech lead.",
    tags: ["JavaScript", "Automation", "Webhooks", "Messaging"],
  },
  {
    role: "Tech Volunteer",
    company: "Shady Grove Group",
    location: "Rockville, MD",
    start: "May 2022",
    end: "Aug 2022",
    blurb:
      "Developed Flutter + Firebase apps for the GERD project enabling secure user authentication and account creation; participated in daily standups to report progress and unblock issues; collaborated within a Scrum Agile team, rotating through roles including team lead and scrum master.",
    tags: ["Flutter", "Firebase", "Scrum", "Git"],
  },
  {
    role: "Intern",
    company: "Websprix IT Solutions PLC",
    location: "Addis Ababa, ET",
    start: "Mar 2019",
    end: "Mar 2019",
    blurb:
      "Facilitated onboarding documentation for new broadband connections; conducted customer follow-up calls to identify root causes of dissatisfaction and provide insights; represented the company at promotional events, distributing materials and communicating service benefits.",
    tags: ["Customer Success", "Operations", "Documentation"],
  },
];

const education: EducationItem[] = [
  {
    school: "Boston University",
    degree: "M.Sc. Computer Science, Cyber Security concentration",
    start: "2025",
    end: "2026",
    details: [
      "Graduated with honors; focus on systems and security.",
      "Led a capstone on secure web architectures.",
    ],
    logo: "/boston.png",
  },
  {
    school: "Fordham University",
    degree: "B.Sc. Computer Science",
    start: "2021",
    end: "2025",
    details: [
      "Graduated with honors; focus on systems and security.",
      "Led a capstone on secure web architectures",
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
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-sm">
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
      className={`relative w-full min-h-screen pt-10 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#5a3aff0f] to-transparent" />

      <div className="mx-auto max-w-screen px-4 sm:px-6">
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
          <div className="w-full flex flex-col items-center md:items-start text-center md:text-left border-y border-white/10 py-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              <span className="text-white bg-clip-text">Experience</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70">
              A snapshot of roles I&apos;ve held and what I learned.
            </p>
          </div>
          <div className="hidden md:block w-px h-20 md:h-40 bg-white/20" />
          <div className="w-full md:w-auto flex gap-4 items-center justify-between md:justify-end md:pr-14 border-b md:border-b border-white/10 py-3 md:py-4">
            <p className="hidden md:block mt-0 max-w-2xl text-xs md:text-base text-white/70">
              {"//////////////////////////////////////////////////////////"}
            </p>
            <p className="text-xs md:text-sm text-white/70">Experience_01</p>
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
              className="relative overflow-hidden my-2 rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-sm p-5 sm:p-6 md:p-8"
            >
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

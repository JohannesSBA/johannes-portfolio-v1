"use client";
import dynamic from "next/dynamic";
const LightRays = dynamic(() => import("@/components/LightRays"), {
  ssr: false,
});
import About from "@/components/page/about";
import StaggeredMenu from "@/components/StaggeredMenu";
import Projects from "@/components/page/projects";
import { useState } from "react";
import Experience from "@/components/page/experience";
import Contact from "@/components/page/contact";
import HomePage from "@/components/page/home";


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "#home" },
    { label: "About", ariaLabel: "Learn about us", link: "#about" },
    { label: "Projects", ariaLabel: "View our projects", link: "#projects" },
    {
      label: "Experiences",
      ariaLabel: "View my experiences",
      link: "#experiences",
    },
    { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com/JohannesSBA" },
    { label: "LinkedIn", link: "https://linkedin.com/in/johannes-bekele" },
  ];

  return (
    <div className="relative min-h-screen bg-[#060010] overflow-x-hidden transition-all duration-300 scroll-smooth">
      {/* Floating menu */}
      <div
        className={`h-screen bg-transparent fixed top-0 left-0 w-full z-[500] ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
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
          className="relative z-[100]" // remove pointer-events-none here too
          accentColor="#5227FF"
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </div>
      <div className="fixed inset-0 pointer-events-none  z-[50]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#5227FF"
          raysSpeed={3}
          lightSpread={2}
          rayLength={3}
          fadeDistance={2}
          followMouse={true}
          mouseInfluence={1}
          noiseAmount={0.5}
          distortion={1}
          className="opacity-100 z-0"
        />
      </div>
      {/* Hero */}
      <section
        className="min-h-screen flex items-center relative z-[100]" // removed pointer-events-none
        id="home"
      >
        <HomePage />
      </section>
      {/* About section */}
      <section className="w-screen min-h-screen relative z-[100]" id="about">
        <About />
      </section>
      <section className="w-screen relative z-[100]" id="projects">
        <Projects />
      </section>
      <section
        className="w-screen min-h-screen relative z-[100]"
        id="experiences"
      >
        <Experience />
      </section>

      <section className="w-screen min-h-screen relative z-[100]" id="contact">
        <Contact />
      </section>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import CurvedLoop from "../CurvedLoop";
import Image from "next/image";

const About = () => {
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
      className={`w-full min-h-screen relative flex flex-col justify-between items-center text-white border-y border-white/20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {/* Background image layer (non-interactive) */}
      <div
        className={`absolute inset-0 bg-transparent transition-all duration-700 z-0 pointer-events-none ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <Image
          src="/jojo.jpg"
          alt="About me background"
          fill
          sizes="100vw"
          className="object-cover opacity-10"
          priority
        />
      </div>

      {/* Content wrapper in normal flow for responsiveness */}
      <div className="w-full relative flex flex-col md:flex-row gap-4 px-4 md:px-8 z-50 py-8">
        {/* Left label (desktop only) */}
        <div className=" md:flex md:w-[12.5%] h-full p-6">
          <h1 className="text-white/50 text-xs font-bold">About me</h1>
        </div>

        {/* Main content */}
        <div className="flex-1 h-full m-0 md:m-4 md:mt-2 flex flex-col md:flex-row gap-6 rounded-md">
          {/* Profile image */}
          <div className="flex flex-col md:items-start relative">
            <Image
              src="/grad.JPG"
              alt="About me"
              width={400}
              height={400}
              sizes="(max-width: 768px) 80vw, 400px"
              className="rounded-md object-cover w-full flex just-center max-w-[280px] sm:max-w-[320px] md:w-[400px]"
            />
          </div>

          {/* Text + actions */}
          <div className="md:w-1/2 w-full h-full text-white p-1 sm:p-3 z-40 font-mono flex flex-col gap-6 justify-between">
            <p className="text-sm md:text-base leading-relaxed">
              I was born in Arbaminch, Ethiopia. I moved to Pelham, New York in
              2014 and remained there for 4 years. During this time, I developed
              a deep appreciation for computer science when I built my first PC
              to play video games. After my short time in New York, I moved back
              to Ethiopia for the remainder of my high school career. Now, five
              years later, I graduated with my undergraduate degree in computer
              science and pursued a master&apos;s degree in Cyber Security.
            </p>
          </div>
        </div>

        {/* Right spacer (desktop only) */}
        <div className="hidden md:block md:w-[25%] h-screen ">
          <div
            style={{
              height: "100%",
              position: "relative",
              width: "100%",
            }}
          ></div>
        </div>
      </div>

      {/* Decorative marquee (non-interactive) */}
      <div className="absolute bottom-100 md:top-0 left-0 w-full h-1/4 z-0 pt-12 pointer-events-none">
        <CurvedLoop marqueeText="About me * " />
      </div>
    </div>
  );
};

export default About;

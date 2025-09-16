"use client";
import React, { useEffect, useRef, useState } from "react";
import { Mail, Copy, Check, ChevronDown } from "lucide-react";
import Loop from "../Loop";
import DecryptedText from "../DecryptedText";
import dynamic from "next/dynamic";
const FaultyTerminal = dynamic(() => import("../FaultyTerminal"), {
  ssr: false,
});

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[10px] tracking-[0.14em] uppercase text-white/60 mb-2">
    {children}
  </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition ${
      props.className ?? ""
    }`}
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className={`w-full min-h-[140px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30 transition ${
      props.className ?? ""
    }`}
  />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative">
    <select
      {...props}
      className={`w-full appearance-none rounded-md border border-white/10 bg-white/5 px-3 py-2 pr-8 text-sm text-white outline-none focus:border-white/30 transition ${
        props.className ?? ""
      }`}
    />
    <ChevronDown
      size={16}
      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/50"
    />
  </div>
);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitOk, setSubmitOk] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("johannesseleshi@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div
      ref={sectionRef}
      className={`relative w-full min-h-screen pt-10 px-4 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="mx-auto absolute inset-0 w-screen h-screen max-w-screen px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-y border-white/10 py-8">
          <div
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] text-white transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <DecryptedText
              text="LET'S"
              className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95]"
              encryptedClassName="text-white/80 blur-[0.5px]"
              parentClassName="leading-none"
              animateOn="both"
              sequential={true}
              revealDirection="start"
              speed={60}
            />
            <br />
            <DecryptedText
              text="WORK"
              className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95]"
              encryptedClassName="text-white/80 blur-[0.5px]"
              parentClassName="leading-none"
              animateOn="both"
              sequential={true}
              revealDirection="start"
              speed={60}
            />
            <DecryptedText
              text="TOGETHER"
              className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95]"
              encryptedClassName="text-white/80 blur-[0.5px]"
              parentClassName="leading-none"
              animateOn="both"
              sequential={true}
              revealDirection="start"
              speed={0}
            />
          </div>
          <div
            className={`md:border-l md:border-white/10 md:pl-6 text-white/80 transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-sm md:text-base leading-relaxed">
              Get in touch today if you&apos;re looking to launch a website,
              refine your existing site, or discuss a potential collaboration.
              Let&apos;s find solutions together.
            </p>
          </div>
        </div>

        <Loop
          texts={[
            "Hello",
            "مرحبًا",
            "Hola",
            "ጤና ይስጥህ",
            "Hallo",
            "Ciao",
            "Hello",
            "مرحبًا",
            "Hola",
            "ጤና ይስጥህ",
            "Hallo",
            "Ciao",
          ]}
          className="text-white my-3 text-xl "
          separator="•"
          speed={20}
          direction="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 py-10">
          <div className="space-y-8">
            <div>
              <p className="text-[10px] tracking-[0.14em] uppercase text-white/50">
                [Email]
              </p>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href="mailto:johannesseleshi@gmail.com"
                  className="inline-flex items-center gap-2 text-white text-base md:text-lg hover:underline"
                >
                  <Mail size={16} /> johannesseleshi@gmail.com
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:bg-white/10"
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.14em] uppercase text-white/50">
                [For Collaborators]
              </p>
              <p className="text-sm md:text-base text-white/80 max-w-prose">
                I&apos;m always open to partnering up with creatives,
                developers, agencies, and whoever is interested in my work. Send
                me an email and let&apos;s discuss.
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.14em] uppercase text-white/50">
                [For Questions]
              </p>
              <p className="text-sm md:text-base text-white/80 max-w-prose">
                Have questions? Feel free to contact me and I&apos;ll get back
                to you.
              </p>
            </div>
          </div>

          <form
            className="space-y-6 relative p-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const fd = new FormData(form);
              const payload = Object.fromEntries(fd.entries());
              setSubmitting(true);
              setSubmitError("");
              setSubmitOk(false);
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });
                const json = await res.json().catch(() => ({}));
                if (!res.ok || !json?.ok) {
                  throw new Error(json?.error || "Failed to send");
                }
                setSubmitOk(true);
                form.reset();
              } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Something went wrong";
                setSubmitError(message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className=" inset-0 w-full h-full absolute pointer-events-none">
              <FaultyTerminal
                scale={1.5}
                gridMul={[2, 1]}
                digitSize={1.2}
                timeScale={1}
                pause={false}
                scanlineIntensity={1}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={1}
                chromaticAberration={0}
                dither={0}
                curvature={0}
                tint="#5227FF"
                mouseReact={true}
                mouseStrength={0.5}
                pageLoadAnimation={false}
                brightness={1}
                className=" inset-0 -z-10 pointer-events-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 text-white gap-6 backdrop-blur-md p-2">
              <div>
                <FieldLabel>What&apos;s your name?</FieldLabel>
                <Input placeholder="Full Name" name="name" required />
              </div>
              <div>
                <FieldLabel>What&apos;s your email?</FieldLabel>
                <Input
                  placeholder="name@company.com"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel>What&apos;s your brief?</FieldLabel>
                <Textarea
                  placeholder="Write your brief here: I need ___ with this scope, pages, specific needs ___"
                  name="brief"
                  required
                />
              </div>
              <div>
                <FieldLabel>Current website URL</FieldLabel>
                <Input placeholder="www.example.com" name="url" />
              </div>
              <div>
                <FieldLabel>Company stage</FieldLabel>
                <Select name="stage" defaultValue="">
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="pre-seed">Pre‑seed</option>
                  <option value="seed">Seed</option>
                  <option value="series">Series A+</option>
                  <option value="established">Established</option>
                </Select>
              </div>
              <div>
                <FieldLabel>Do you have a deadline?</FieldLabel>
                <Select name="deadline" defaultValue="">
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="flexible">Flexible</option>
                  <option value="1-2">1–2 months</option>
                  <option value="<1">Less than a month</option>
                </Select>
              </div>
              <div>
                <FieldLabel>What is your estimated budget?</FieldLabel>
                <Select name="budget" defaultValue="">
                  <option value="" disabled>
                    Please select
                  </option>
                  <option value="2-5">$2k – $5k</option>
                  <option value="5-10">$5k – $10k</option>
                  <option value=">10">$10k+</option>
                </Select>
                <p className="mt-2 text-xs text-white/50">
                  We&apos;ll confirm this together, don&apos;t worry.
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition ${
                  submitting
                    ? "bg-white/70 text-black cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {submitting ? "Sending…" : "Send inquiry"}
              </button>
              {submitOk && (
                <p
                  className="text-xs text-green-400"
                  role="status"
                  aria-live="polite"
                >
                  Thanks! Your message was sent.
                </p>
              )}
              {submitError && (
                <p className="text-xs text-red-400" role="alert">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
// If you have framer-motion installed (most common):
import { motion } from "framer-motion";
// If you're using the new Motion package instead, swap the line above for:
// import { motion } from "motion/react";

type DecryptedTextProps = {
  text: string;
  speed?: number; // ms between shuffles
  maxIterations?: number; // how many shuffles when not sequential
  sequential?: boolean; // reveal one-by-one
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string; // fallback pool
  className?: string; // revealed style
  encryptedClassName?: string; // scrambling style
  parentClassName?: string;
  animateOn?: "view" | "hover" | "both";
  onComplete?: () => void;
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  onComplete,
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalIdRef = useRef<number | null>(null);
  const iterationRef = useRef(0);

  // Helpers
  const availableChars = useMemo(
    () =>
      useOriginalCharsOnly
        ? Array.from(new Set(text.split(""))).filter((c) => c !== " ")
        : characters.split(""),
    [useOriginalCharsOnly, text, characters]
  );

  const getNextIndex = (revealedSet: Set<number>): number => {
    const n = text.length;
    switch (revealDirection) {
      case "end":
        return n - 1 - revealedSet.size;
      case "center": {
        const mid = Math.floor(n / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const candidate =
          revealedSet.size % 2 === 0 ? mid + offset : mid - offset - 1;
        if (candidate >= 0 && candidate < n && !revealedSet.has(candidate)) {
          return candidate;
        }
        // fallback to first unrevealed
        for (let i = 0; i < n; i++) if (!revealedSet.has(i)) return i;
        return 0;
      }
      case "start":
      default:
        return revealedSet.size;
    }
  };

  const shuffleText = (original: string, revealedSet: Set<number>) => {
    if (useOriginalCharsOnly) {
      const pos = original.split("").map((char, i) => ({
        char,
        i,
        isSpace: char === " ",
        locked: revealedSet.has(i),
      }));
      const pool = pos
        .filter((p) => !p.isSpace && !p.locked)
        .map((p) => p.char);
      // Fisher–Yates
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      let k = 0;
      return pos
        .map((p) => (p.isSpace ? " " : p.locked ? original[p.i] : pool[k++]))
        .join("");
    }
    return original
      .split("")
      .map((char, i) =>
        char === " " || revealedSet.has(i)
          ? original[i]
          : availableChars[Math.floor(Math.random() * availableChars.length)]
      )
      .join("");
  };

  const stopScramble = useCallback(() => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsScrambling(false);
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  const startScramble = () => {
    if (intervalIdRef.current !== null) return; // guard double-starts
    setIsScrambling(true);
    iterationRef.current = 0;

    const id = window.setInterval(() => {
      if (sequential) {
        setRevealed((prev) => {
          if (prev.size >= text.length) {
            stopScramble();
            return prev;
          }
          const next = new Set(prev);
          next.add(getNextIndex(prev));
          setDisplayText(shuffleText(text, next));
          return next;
        });
      } else {
        setDisplayText(() => shuffleText(text, revealed));
        iterationRef.current += 1;
        if (iterationRef.current >= maxIterations) {
          stopScramble();
          setDisplayText(text);
        }
      }
    }, Math.max(16, speed)); // don’t go below ~60fps
    intervalIdRef.current = id;
  };

  // Reset when text changes
  useEffect(() => {
    setDisplayText(text);
    setRevealed(new Set());
    stopScramble();
  }, [text, stopScramble]);

  // Animate on view
  // useEffect(() => {
  //   if (start) {
  //     setIsHovering(true);
  //     setHasAnimated(true);
  //     setIsScrambling(true);
  //     startScramble();
  //   }
  // }, [start]);

  useEffect(() => {
    if (!(animateOn === "view" || animateOn === "both")) return;
    const node = containerRef.current;
    if (!node || hasAnimated) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setIsHovering(true);
            startScramble();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
    // hasAnimated intentionally in deps to avoid retrigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, hasAnimated]);

  // Hover / pointer events
  const pointerHandlers =
    animateOn === "hover" || animateOn === "both"
      ? {
          onPointerEnter: () => {
            setIsHovering(true);
            startScramble();
          },
          onPointerLeave: () => {
            setIsHovering(false);
            stopScramble();
            setDisplayText(text);
            setRevealed(new Set());
          },
        }
      : {};

  // Cleanup on unmount
  useEffect(() => () => stopScramble(), [stopScramble]);

  const isRevealedOrDone = (idx: number) =>
    revealed.has(idx) || !isScrambling || !isHovering;

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...pointerHandlers}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, i) => (
          <span
            key={`${i}-${char}-${isRevealedOrDone(i) ? "r" : "e"}`}
            className={isRevealedOrDone(i) ? className : encryptedClassName}
          >
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}

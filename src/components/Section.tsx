"use client";
import React from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

type SectionProps = React.HTMLAttributes<HTMLDivElement> & {
  threshold?: number;
  animate?: boolean;
};

export default function Section({
  className = "",
  threshold = 0.2,
  animate = true,
  children,
  ...rest
}: SectionProps) {
  const { ref, visible } = useInViewOnce<HTMLDivElement>({ threshold });
  const anim = animate
    ? visible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-12"
    : "";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${anim} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}


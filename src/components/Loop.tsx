"use client";

import React from "react";

type Direction = "left" | "right";

interface LoopProps {
  texts: string[];
  speed?: number; // seconds for one full loop
  direction?: Direction;
  className?: string;
  separator?: string;
}

const Loop: React.FC<LoopProps> = ({
  texts,
  speed = 12,
  direction = "left",
  className,
  separator = "•",
}) => {
  const items = texts.filter(Boolean);
  const content = (
    <div className="flex items-center gap-6 whitespace-nowrap pr-6">
      {items.map((t, i) => (
        <React.Fragment key={`${t}-${i}`}>
          <span className="text-xs md:text-sm tracking-wide opacity-90">
            {t}
          </span>
          {i !== items.length - 1 && (
            <span className="opacity-40 select-none" aria-hidden>
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`relative w-full overflow-hidden ${
        className ?? ""
      } border-y border-white`}
      style={{ height: "2rem" }}
    >
      <div
        className="loop-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection:
            direction === "right" ? ("reverse" as const) : ("normal" as const),
        }}
      >
        {content}
        <div
          aria-hidden
          className="flex items-center gap-6 whitespace-nowrap pl-6"
        >
          {items.map((t, i) => (
            <React.Fragment key={`dup-${t}-${i}`}>
              <span className="text-xs md:text-sm tracking-wide opacity-90">
                {t}
              </span>
              {i !== items.length - 1 && (
                <span className="opacity-40 select-none" aria-hidden>
                  {separator}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <style jsx>{`
        .loop-track {
          display: inline-flex;
          align-items: center;
          width: max-content;
          will-change: transform;
          animation-name: loop-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes loop-scroll {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loop;

"use client";
import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top bg-white/10 text-white border border-white/10 backdrop-blur-xl ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
      willChange: "transform, filter",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

type TransformState = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const endTopRef = useRef<number>(0);
  const containerHRef = useRef<number>(0);

  const lastTransformsRef = useRef(new Map<number, TransformState>());
  const topCardIndexRef = useRef(0);
  const stackCompletedRef = useRef(false);
  const latestScrollRef = useRef(0); // unified scroll value (Lenis or native)

  /** Utils */
  const parsePercentage = (value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return Number(value);
  };

  const calcProgress = (x: number, a: number, b: number) => {
    if (x <= a) return 0;
    if (x >= b) return 1;
    return (x - a) / Math.max(1, b - a);
  };

  /** Measure static geometry (cards + end marker) */
  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    const usingWindow = useWindowScroll;

    const cards = Array.from(
      usingWindow
        ? document.querySelectorAll(".scroll-stack-card")
        : wrapper?.querySelectorAll(".scroll-stack-card") ?? []
    ) as HTMLElement[];
    cardsRef.current = cards;

    // Apply spacing only once (layout)
    cards.forEach((card, i) => {
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      // apply bottom margin except last (visual spacing)
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
    });

    // Container height
    const containerH = usingWindow
      ? window.innerHeight
      : wrapper?.clientHeight ?? 0;
    containerHRef.current = containerH;

    // Compute absolute top offsets for cards & end marker
    const getOffset = (el: HTMLElement) => {
      if (usingWindow) {
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY;
      }
      // offsetTop chain for nested scroller
      let y = 0 as number;
      let node: HTMLElement | null = el;
      const root = wrapper;
      while (node && node !== root && node instanceof HTMLElement) {
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return y;
    };

    cardTopsRef.current = cards.map(getOffset);

    const endEl = usingWindow
      ? (document.querySelector(".scroll-stack-end") as HTMLElement | null)
      : (wrapper?.querySelector(".scroll-stack-end") as HTMLElement | null);
    endTopRef.current = endEl
      ? getOffset(endEl)
      : cardTopsRef.current.at(-1) ?? 0;

    // Initial transform cache clear
    lastTransformsRef.current.clear();
  }, [itemDistance, useWindowScroll]);

  /** Compute & apply transforms */
  const renderFrame = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scroll = latestScrollRef.current;
    const containerH = containerHRef.current;

    const stackPx = parsePercentage(stackPosition, containerH);
    const scaleEndPx = parsePercentage(scaleEndPosition, containerH);

    const endTop = endTopRef.current;
    const cardTops = cardTopsRef.current;

    // Determine topCardIndex only if blur is on
    let topIdx = 0;
    if (blurAmount) {
      for (let j = 0; j < cards.length; j++) {
        const jStart = cardTops[j] - stackPx - itemStackDistance * j;
        if (scroll >= jStart) topIdx = j;
      }
      topCardIndexRef.current = topIdx;
    }

    // Precompute per-card transforms
    const computed: TransformState[] = new Array(cards.length);
    for (let i = 0; i < cards.length; i++) {
      const cardTop = cardTops[i];

      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;

      const pinStart = triggerStart; // same expression
      const pinEnd = endTop - containerH / 2;

      const sProg = calcProgress(scroll, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - sProg * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * sProg : 0;

      let blur = 0;
      if (blurAmount && i < topIdx) {
        const depth = topIdx - i;
        blur = Math.max(0, depth * blurAmount);
      }

      let translateY = 0;
      if (scroll >= pinStart && scroll <= pinEnd) {
        translateY = scroll - cardTop + stackPx + itemStackDistance * i;
      } else if (scroll > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }

      computed[i] = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
    }

    // Write styles (batched)
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const nextT = computed[i];
      const prevT = lastTransformsRef.current.get(i);

      const changed =
        !prevT ||
        Math.abs(prevT.translateY - nextT.translateY) > 0.1 ||
        Math.abs(prevT.scale - nextT.scale) > 0.001 ||
        Math.abs(prevT.rotation - nextT.rotation) > 0.1 ||
        Math.abs(prevT.blur - nextT.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${nextT.translateY}px, 0) scale(${nextT.scale}) rotate(${nextT.rotation}deg)`;
        if (blurAmount) {
          if (nextT.blur > 0) card.style.filter = `blur(${nextT.blur}px)`;
          else if (card.style.filter) card.style.removeProperty("filter");
        }
        lastTransformsRef.current.set(i, nextT);
      }
    }

    // Fire onStackComplete when the last card is "pinned" (in view band)
    const lastIdx = cards.length - 1;
    if (lastIdx >= 0) {
      const lastTop = cardTops[lastIdx];
      const pinStart = lastTop - stackPx - itemStackDistance * lastIdx;
      const pinEnd = endTop - containerH / 2;
      const inBand = scroll >= pinStart && scroll <= pinEnd;
      if (inBand && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (!inBand && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    }
  }, [
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    baseScale,
    itemScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
  ]);

  /** Lenis setup (or native scroll loop) */
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper && !useWindowScroll) return;

    // Initial measure
    measure();

    // Resize/content observers to refresh geometry
    const ro = new ResizeObserver(() => {
      measure();
      // keep transforms consistent after layout change
      renderFrame();
    });
    ro.observe(
      useWindowScroll ? document.documentElement : (wrapper as Element)
    );

    const mo = new MutationObserver(() => {
      // content change inside
      measure();
      renderFrame();
    });
    const inner = (useWindowScroll ? document.body : wrapper)?.querySelector(
      ".scroll-stack-inner"
    );
    if (inner) mo.observe(inner, { childList: true, subtree: true });

    // SCROLL DRIVER
    if (useWindowScroll) {
      // Native window scroll
      const onScroll = () => {
        latestScrollRef.current = window.scrollY;
        // throttle to one RAF
        if (rafIdRef.current == null) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            renderFrame();
          });
        }
      };
      latestScrollRef.current = window.scrollY;
      window.addEventListener("scroll", onScroll, { passive: true });

      // initial frame
      renderFrame();

      return () => {
        window.removeEventListener("scroll", onScroll);
        ro.disconnect();
        mo.disconnect();
      };
    } else {
      // Lenis-managed scroll (virtual)
      const lenis = new Lenis({
        wrapper: wrapper!, // Non-null assertion since we're in else clause where wrapper exists
        content: wrapper!.querySelector(".scroll-stack-inner") as HTMLElement,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: "vertical",
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });
      lenisRef.current = lenis;

      type LenisScrollEvent = { scroll: number };
      lenis.on("scroll", (e: LenisScrollEvent) => {
        latestScrollRef.current = e.scroll; // <- use Lenis’ authoritative scroll
      });

      const loop = (time: number) => {
        lenis.raf(time);
        // Render once per Lenis tick
        renderFrame();
        rafIdRef.current = requestAnimationFrame(loop);
      };
      rafIdRef.current = requestAnimationFrame(loop);

      // initial frame
      renderFrame();

      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        lenis.destroy();
        lenisRef.current = null;
        ro.disconnect();
        mo.disconnect();
      };
    }
  }, [useWindowScroll, measure, renderFrame]);

  // Wrapper: prevent overflow conflict with Lenis
  const wrapperOverflow = useWindowScroll
    ? "overflow-visible"
    : "overflow-hidden"; // Lenis wants hidden

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full h-full ${wrapperOverflow} overflow-x-visible ${className}`.trim()}
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "auto", // let Lenis handle smoothness
        // IMPORTANT: no 'scrollBehavior: smooth' to avoid double smoothing
        transform: "translateZ(0)",
        // Avoid contain: 'layout paint' here; it can interfere with sticky/Lenis composites
      }}
    >
      <div className="scroll-stack-inner md:px-20 pb-40 min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;

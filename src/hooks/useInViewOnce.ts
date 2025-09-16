"use client";
import { useEffect, useRef, useState } from "react";

export function useInViewOnce<T extends Element = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setVisible(true);
          // One-shot; disconnect
          observer.disconnect();
          break;
        }
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options, visible]);

  return { ref, visible } as const;
}


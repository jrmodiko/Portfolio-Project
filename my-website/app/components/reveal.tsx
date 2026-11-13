"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";

type Variant = "up" | "left" | "right" | "scale";

const variantClass: Record<Variant, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}

/**
 * Fades content in when it scrolls into view.
 * Use it only on wrapper elements. Do not put reveal classes on children
 * inside it: they never receive the `active` class and stay invisible.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${variantClass[variant]} ${isInView ? "active" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

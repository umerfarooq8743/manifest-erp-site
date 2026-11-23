"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { RevealController } from "./reveal-controller";

/** Loads the lightweight animation feature set once and honours prefers-reduced-motion. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <RevealController />
      </MotionConfig>
    </LazyMotion>
  );
}

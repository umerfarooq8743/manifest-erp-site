import "react";

declare module "react" {
  interface CSSProperties {
    /** Stagger for <Reveal> (seconds), read by the reveal CSS transition. */
    "--reveal-delay"?: string;
    /** Index used to stagger the hero lifecycle-chip light (see .chip-wave). */
    "--i"?: number;
  }
}

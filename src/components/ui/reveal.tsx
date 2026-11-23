import type { CSSProperties, ReactNode } from "react";

/**
 * Marks content to fade up once as it enters the viewport.
 *
 * Plain server-rendered markup: the motion is a CSS transition started by a
 * single <RevealController>. Content is only hidden when the pre-paint script
 * has added `js-reveal` to <html> (JavaScript running, reduced motion not
 * requested), so nothing is ever stuck invisible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  const style: CSSProperties | undefined = delay ? { "--reveal-delay": `${delay}s` } : undefined;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}

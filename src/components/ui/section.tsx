import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  children,
  className,
  tone = "plain",
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "plain" | "muted";
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "section-cv relative py-20 sm:py-24 lg:py-28",
        tone === "muted" && "border-y border-line bg-surface-2/50 dark:bg-surface/40",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
  as: Tag = "h2",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag id={id} className={Tag === "h1" ? "text-display" : "text-h2"}>
        {title}
      </Tag>
      {description && <p className={cn("text-lead mt-5", align === "center" && "mx-auto max-w-2xl")}>{description}</p>}
      {children}
    </Reveal>
  );
}

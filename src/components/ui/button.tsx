import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-brand-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(4_120_87/0.25),0_8px_24px_-10px_rgb(4_120_87/0.55)] hover:bg-brand-strong dark:hover:bg-brand-strong",
  secondary:
    "border border-line-strong bg-surface text-ink shadow-[0_1px_2px_hsl(var(--shadow-color)/0.05)] hover:border-ink/25 hover:bg-surface-2",
  ghost: "text-ink-2 hover:bg-surface-2 hover:text-ink",
  link: "px-0! text-brand underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-lg px-3.5 text-sm",
  md: "h-11 rounded-[0.65rem] px-5 text-[0.9375rem]",
  lg: "h-12 rounded-xl px-6 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
}

function Content({ icon, iconPosition = "end", children }: Pick<CommonProps, "icon" | "iconPosition" | "children">) {
  const iconEl = icon ? (
    <Icon
      name={icon}
      className={cn(
        "size-4 shrink-0",
        iconPosition === "end" && (icon === "arrow-right" || icon === "arrow-up-right") && "transition-transform duration-300 group-hover/btn:translate-x-0.5",
      )}
    />
  ) : null;
  return (
    <>
      {iconPosition === "start" && iconEl}
      <span>{children}</span>
      {iconPosition === "end" && iconEl}
    </>
  );
}

export function buttonClasses({ variant = "primary", size = "md", className }: Pick<CommonProps, "variant" | "size" | "className">) {
  return cn(base, variants[variant], sizes[size], className);
}

type LinkButtonProps = CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function ButtonLink({ href, external, variant, size, icon, iconPosition, className, children, ...rest }: LinkButtonProps) {
  const classes = buttonClasses({ variant, size, className });
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        <Content icon={icon} iconPosition={iconPosition}>
          {children}
        </Content>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </Link>
  );
}

type NativeButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant, size, icon, iconPosition, className, children, type = "button", ...rest }: NativeButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}

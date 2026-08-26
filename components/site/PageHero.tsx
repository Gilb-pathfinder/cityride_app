import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-36 sm:pb-20 sm:pt-44">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-lime">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-xl text-base text-white/70">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

export function Section({
  id,
  className = "",
  bleed = false,
  children,
}: {
  id?: string;
  className?: string;
  bleed?: boolean;
  children: ReactNode;
}) {
  if (bleed) {
    return (
      <section id={id} className={className}>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">{children}</div>
      </section>
    );
  }
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-16 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

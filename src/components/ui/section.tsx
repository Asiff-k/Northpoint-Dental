import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-(--container-site) px-5 sm:px-6", className)}
      {...props}
    />
  );
}

/** Standard page section: 64px vertical padding on mobile, 96px on desktop. */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-[0.14em] uppercase",
            tone === "light" ? "text-primary/70" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "text-[1.75rem] leading-tight font-bold text-balance md:text-[2.5rem]",
          tone === "light" ? "text-primary" : "text-white",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-4 text-base text-pretty md:text-lg",
            tone === "light" ? "text-muted-foreground" : "text-white/75",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

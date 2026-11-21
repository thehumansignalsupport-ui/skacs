import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Leaf, Star } from "lucide-react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "font-mono-label inline-flex items-center gap-2.5",
        tone === "dark" ? "text-ink/55" : "text-lime/90",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-7", tone === "dark" ? "bg-ink/35" : "bg-lime/60")}
      />
      {children}
    </p>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-moss text-lime sm:h-10 sm:w-10">
        <Leaf size={17} strokeWidth={1.9} className="-rotate-45" aria-hidden="true" />
        <span className="absolute inset-[3px] rounded-full border border-lime/25" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[23px] font-black tracking-[-0.045em] text-ink sm:text-[26px]">
          MA CHA
        </span>
        {!compact && (
          <span className="mt-[3px] block font-mono text-[7.5px] uppercase tracking-[0.19em] text-ink/55 sm:text-[8px]">
            coffee + matcha takeaway
          </span>
        )}
      </span>
    </span>
  );
}

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-butter", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={11} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.16em] text-ink/40">{index}</span>
      <span className="h-px w-6 bg-ink/20" aria-hidden="true" />
      <span className="font-mono-label text-ink/60">{children}</span>
    </div>
  );
}

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

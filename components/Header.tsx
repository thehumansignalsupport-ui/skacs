import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, Menu as MenuIcon, Phone, ShoppingBag, X } from "lucide-react";
import { STORE } from "../data/menu";
import { useStoreStatus } from "../lib/store";
import { cn } from "../utils/cn";
import { Wordmark, useBodyLock, useScrolled } from "./ui";

const NAV = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "The counter" },
  { href: "#find-us", label: "Find us" },
  { href: "#faq", label: "Questions" },
];

export function Header({
  cartCount,
  onOpenTray,
}: {
  cartCount: number;
  onOpenTray: () => void;
}) {
  const status = useStoreStatus();
  const scrolled = useScrolled(10);
  const [menuOpen, setMenuOpen] = useState(false);
  useBodyLock(menuOpen);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-ink/10 bg-paper/92 shadow-[0_8px_30px_-24px_rgba(26,37,27,0.6)] backdrop-blur-md"
            : "border-transparent bg-paper",
        )}
      >
        <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" aria-label="MA CHA — home" className="shrink-0 rounded-sm">
            <Wordmark />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[12px] font-semibold tracking-[0.02em] text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-moss transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="mr-1 hidden items-center gap-2 rounded-full border border-ink/12 bg-paper-light/60 px-3 py-1.5 xl:flex">
              <span
                className={cn(
                  "relative flex h-1.5 w-1.5 rounded-full",
                  status.isOpen ? "bg-[#5d8a3f]" : "bg-berry",
                )}
              >
                {status.isOpen && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#5d8a3f]/60" />
                )}
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink/70">
                {status.primary} <span className="text-ink/40">· {status.secondary}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenTray}
              className="group inline-flex items-center gap-2 rounded-full bg-moss py-2.5 pl-3.5 pr-3 text-paper transition-all hover:bg-moss-light hover:shadow-[0_6px_18px_-8px_rgba(36,64,42,0.85)] sm:pl-4 sm:pr-3.5"
              aria-label={`Open your tray, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            >
              <ShoppingBag size={15} strokeWidth={1.9} aria-hidden="true" />
              <span className="hidden text-[11.5px] font-bold uppercase tracking-[0.1em] sm:inline">
                Tray
              </span>
              <span
                className={cn(
                  "grid h-5 min-w-5 place-items-center rounded-full px-1 font-mono text-[10px] font-bold transition-colors",
                  cartCount > 0 ? "bg-lime text-moss" : "bg-paper/15 text-paper/80",
                )}
              >
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-ink/45 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            tabIndex={-1}
          />
          <div className="absolute inset-x-0 top-0 max-h-[94vh] overflow-y-auto rounded-b-[26px] bg-paper px-5 pb-8 pt-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/15"
                aria-label="Close navigation menu"
              >
                <X size={18} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 flex flex-col border-t border-ink/10">
              {NAV.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between border-b border-ink/10 py-4"
                >
                  <span className="font-display text-[32px] leading-none tracking-[-0.03em]">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-ink/35">0{index + 1}</span>
                </a>
              ))}
            </div>

            <div className="mt-6 grid gap-2.5">
              <div className="flex items-center gap-2.5 rounded-xl bg-paper-deep/70 px-4 py-3">
                <Clock size={15} className="text-moss" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/70">
                  {status.primary} · {status.secondary}
                </span>
              </div>
              <a
                href={STORE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl bg-moss px-4 py-3.5 text-paper"
              >
                <span className="text-[12px] font-bold">Blk 302 Ubi Ave 1 · #01-79</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href={`tel:${STORE.phoneTel}`}
                className="flex items-center justify-between rounded-xl border border-ink/15 px-4 py-3.5"
              >
                <span className="flex items-center gap-2.5 text-[12px] font-bold">
                  <Phone size={15} aria-hidden="true" /> {STORE.phoneDisplay}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">call</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

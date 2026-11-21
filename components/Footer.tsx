import { ArrowUpRight, Leaf, MessageCircle, ShoppingBag } from "lucide-react";
import { STORE } from "../data/menu";
import { useStoreStatus } from "../lib/store";
import { Reveal, Wordmark } from "./ui";

export function Footer({
  onOpenTray,
  onPickItem,
}: {
  onOpenTray: () => void;
  onPickItem: (id: string) => void;
}) {
  const status = useStoreStatus();
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(
    "Hi MA CHA! I'd like to ask about an order —",
  )}`;

  return (
    <footer className="relative overflow-hidden bg-paper">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-ink/12 bg-paper-light">
            <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:p-10">
              <div className="lg:col-span-7">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink/40">
                  First time? Start here
                </p>
                <h2 className="mt-2.5 max-w-[18ch] font-display text-[clamp(2rem,4.4vw,3rem)] font-medium leading-[0.98] tracking-[-0.035em]">
                  Order the sea salt one. <span className="italic text-moss">Thank us later.</span>
                </h2>
                <p className="mt-3 max-w-[38ch] text-[12px] leading-relaxed text-ink/55">
                  Build a tray, send it on WhatsApp, and collect from the little green counter
                  inside the fruit shop. No app, no account, no fuss.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onPickItem("sea-salt-cold-foam")}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-moss py-2 pl-5 pr-2 text-paper transition-colors hover:bg-moss-light"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
                      Add a signature cup
                    </span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-moss transition-transform group-hover:rotate-90">
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenTray}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-ink/75 transition-colors hover:border-ink/40 hover:text-ink"
                  >
                    <ShoppingBag size={13} aria-hidden="true" /> View tray
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative ml-auto max-w-[300px] rotate-[-2deg] rounded-xl border border-ink/15 bg-paper p-4 shadow-[0_16px_34px_-26px_rgba(26,37,27,0.8)]">
                  <span
                    className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-1 bg-lime/70"
                    aria-hidden="true"
                  />
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-berry">
                    The order
                  </p>
                  <p className="mt-1.5 font-display text-[19px] font-semibold leading-tight tracking-[-0.02em]">
                    1 × Sea Salt Cold Foam MA CHA
                  </p>
                  <div className="mt-3 space-y-1.5 border-t border-dashed border-ink/20 pt-2.5">
                    {[
                      ["Size", "Regular"],
                      ["Ice", "Iced, obviously"],
                      ["Milk", "Oat · +$1.00"],
                      ["Sweetness", "You decide"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/40">
                          {label}
                        </span>
                        <span className="text-[10.5px] text-ink/70">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 flex items-baseline justify-between border-t border-ink/15 pt-2.5">
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/45">
                      From
                    </span>
                    <span className="font-display text-[22px] font-semibold leading-none">
                      $6.50
                    </span>
                  </div>
                  <p className="mt-2 text-center font-mono text-[6.5px] uppercase tracking-[0.12em] text-ink/30">
                    Pay at the counter · collect at the green sign
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-ink/12 pt-9 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-4 max-w-[27ch] text-[11.5px] leading-relaxed text-ink/55">
              Coffee and matcha takeaway in the heart of Ubi. Small counter, serious matcha,
              friendly people.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-paper-light px-3 py-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-[#5d8a3f]" : "bg-berry"}`}
                aria-hidden="true"
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/60">
                {status.primary} · {status.secondary}
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 lg:pl-4">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">Visit</p>
            <address className="mt-3 not-italic">
              <a
                href={STORE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-start gap-1 text-[12px] leading-relaxed text-ink/70 transition-colors hover:text-ink"
              >
                <span>
                  {STORE.addressLine1}
                  <br />
                  {STORE.addressLine2}
                </span>
                <ArrowUpRight
                  size={11}
                  className="mt-1 shrink-0 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </address>
            <p className="mt-2 text-[10.5px] leading-relaxed text-ink/45">
              Inside the old-school fruit shop.
              <br />
              {STORE.mrt}.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              <a
                href={`tel:${STORE.phoneTel}`}
                className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/50 transition-colors hover:text-ink"
              >
                {STORE.phoneDisplay}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/50 transition-colors hover:text-ink"
              >
                <MessageCircle size={10} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">Hours</p>
            <dl className="mt-3 space-y-1.5">
              <div className="flex justify-between gap-3 text-[11px]">
                <dt className="text-ink/55">Mon – Sat</dt>
                <dd className="font-mono text-[9.5px] text-ink/70">10:00 – 18:00</dd>
              </div>
              <div className="flex justify-between gap-3 text-[11px]">
                <dt className="text-ink/55">Sunday</dt>
                <dd className="font-mono text-[9.5px] text-ink/70">10:00 – 16:30</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-ink/10 pt-1.5 text-[11px]">
                <dt className="text-ink/55">Public holidays</dt>
                <dd className="font-mono text-[9.5px] text-ink/40">ask ahead</dd>
              </div>
            </dl>
            <p className="mt-2 font-mono text-[7px] uppercase leading-relaxed tracking-[0.1em] text-ink/30">
              Last orders a little before close
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
              Wander around
            </p>
            <nav aria-label="Footer" className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { href: "#menu", label: "The menu" },
                { href: "#story", label: "The counter" },
                { href: "#find-us", label: "Find us" },
                { href: "#faq", label: "Good questions" },
                { href: STORE.mapsUrl, label: "Google Maps" },
                { href: whatsappHref, label: "WhatsApp" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-[11px] text-ink/60 transition-colors hover:text-moss"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <p className="mt-4 flex items-start gap-1.5 font-mono text-[7px] uppercase leading-relaxed tracking-[0.1em] text-ink/30">
              <Leaf size={9} className="mt-0.5 shrink-0 rotate-45 text-leaf" aria-hidden="true" />
              Oat milk +$1 · upsize +$1 · sweetness on request
            </p>
          </div>
        </div>

        <div className="relative mt-10 select-none overflow-hidden border-t border-ink/10 pt-8" aria-hidden="true">
          <div className="flex items-end justify-between gap-4">
            <p className="font-display text-[clamp(3.6rem,17vw,13rem)] font-black leading-[0.72] tracking-[-0.055em] text-moss">
              MA CHA
            </p>
            <div className="mb-2 hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
              <Leaf size={30} className="rotate-45 text-leaf" strokeWidth={1.3} />
              <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-ink/35">
                Ubi · Singapore
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[7.5px] uppercase tracking-[0.11em] text-ink/40">
            © {year} MA CHA · Made for the Ubi neighbourhood
          </p>
          <p className="max-w-[46ch] font-mono text-[7px] uppercase leading-relaxed tracking-[0.08em] text-ink/30">
            Independent concept site. Menu, prices & hours are a guide — confirm with the
            counter before making the trip. Hours source: Google listing.
          </p>
        </div>
      </div>
    </footer>
  );
}

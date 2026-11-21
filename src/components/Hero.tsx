import { ArrowDownRight, ArrowUpRight, Leaf, MapPin, Star } from "lucide-react";
import { IMAGES, STORE, formatPrice } from "../data/menu";
import { useStoreStatus } from "../lib/store";
import { Stars } from "./ui";

const TICKER_ITEMS = [
  "Tiny counter, serious matcha",
  "Blk 302 Ubi Ave 1 · #01-79",
  "Two minutes from Ubi MRT",
  "Drinks from $4.90",
  "Open daily",
  "Whisked to order",
];

export function Ticker() {
  return (
    <div className="overflow-hidden bg-moss text-lime/90" aria-hidden="true">
      <div className="flex w-max animate-marquee py-[9px]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {TICKER_ITEMS.map((item) => (
              <span key={`${half}-${item}`} className="flex items-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] sm:text-[9.5px]">
                  {item}
                </span>
                <Leaf size={9} className="mx-5 shrink-0 rotate-45 text-lime/60" strokeWidth={2} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoundBadge() {
  return (
    <div
      className="absolute -left-1 top-2 z-20 grid h-[76px] w-[76px] place-items-center rounded-full bg-butter text-moss shadow-[0_10px_24px_-12px_rgba(26,37,27,0.5)] sm:-left-7 sm:top-6 sm:h-[102px] sm:w-[102px]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_32s_linear_infinite]">
        <defs>
          <path id="hero-badge-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text
          fill="#24402a"
          fontSize="7.6"
          fontFamily="Space Mono, monospace"
          letterSpacing="1.7"
        >
          <textPath href="#hero-badge-path">WHISKED TO ORDER · POURED TO GO ·</textPath>
        </text>
      </svg>
      <div className="grid h-8 w-8 place-items-center rounded-full border border-moss/25">
        <Leaf size={15} strokeWidth={1.9} className="-rotate-45" />
      </div>
    </div>
  );
}

export function Hero({ onPickItem }: { onPickItem: (id: string) => void }) {
  const status = useStoreStatus();

  return (
    <section id="top" className="relative overflow-hidden pb-10 sm:pb-14">
      <div
        className="pointer-events-none absolute -right-32 top-16 h-[520px] w-[520px] rounded-full bg-leaf-soft/25 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[1280px] px-5 pt-6 sm:px-8 sm:pt-12 lg:pt-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-9">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-light/60 py-1.5 pl-2.5 pr-3.5">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-moss text-lime">
              <MapPin size={10} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-ink/70 sm:text-[9.5px]">
              Ubi Ave 1 · Singapore
            </span>
          </div>
          <a
            href={STORE.reviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-ink/60 transition-colors hover:text-ink"
          >
            <Stars />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.1em]">
              {STORE.rating} · {STORE.reviewCount} neighbours
            </span>
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(3.3rem,14.2vw,4.4rem)] font-medium leading-[0.83] tracking-[-0.045em] text-ink sm:text-[clamp(4rem,10.5vw,6rem)] lg:text-[clamp(4.4rem,6.1vw,6rem)]">
              <span className="block">Small</span>
              <span className="block">counter.</span>
              <span className="mt-1 block sm:whitespace-nowrap">
                Serious{" "}
                <span className="relative inline-block italic text-moss">
                  matcha.
                  <svg
                    viewBox="0 0 240 18"
                    className="absolute -bottom-1.5 left-0 h-3 w-full text-leaf/70 sm:-bottom-2 sm:h-4"
                    fill="none"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 12C52 4 100 3 148 7c34 3 62 6 88 2"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-[30rem] text-[14.5px] leading-[1.7] text-ink/70 sm:mt-7 sm:text-[15.5px]">
              Stone-ground Uji matcha, honest coffee and a fruit-shop address. Whisked to
              order at <span className="font-semibold text-ink">Blk 302 Ubi Ave 1</span> — two
              minutes from Ubi MRT, no café pretense.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              <a
                href="#menu"
                className="group inline-flex items-center gap-3 rounded-full bg-moss py-2 pl-5 pr-2 text-paper transition-all hover:bg-moss-light hover:shadow-[0_12px_26px_-14px_rgba(36,64,42,0.9)]"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.08em]">
                  See the menu
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-moss transition-transform group-hover:rotate-45">
                  <ArrowDownRight size={16} strokeWidth={2} aria-hidden="true" />
                </span>
              </a>
              <a
                href="#find-us"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink/40 hover:bg-paper-light"
              >
                <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
                Find the counter
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-ink/55">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-[#5d8a3f]" : "bg-berry"}`}
                  aria-hidden="true"
                />
                {status.primary} · {status.secondary}
                <span className="hidden text-ink/35 sm:inline">
                  (Sun closes earlier)
                </span>
              </span>
              <span className="hidden h-3 w-px bg-ink/15 sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <Star size={11} className="text-butter" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                {STORE.mrt}
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto h-[335px] w-full max-w-[420px] sm:h-[480px] lg:h-[520px] lg:max-w-none">
              <div
                className="arch absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] bg-leaf/45 sm:translate-x-4 sm:translate-y-4"
                aria-hidden="true"
              />
              <div className="arch relative h-full w-full overflow-hidden border-[6px] border-paper-light bg-paper-deep shadow-[0_24px_50px_-30px_rgba(26,37,27,0.7)]">
                <img
                  src={IMAGES.hero}
                  alt="An iced matcha latte in a takeaway cup, layered green and creamy"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-moss/50 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <span className="whitespace-nowrap rounded-full bg-paper/90 px-3.5 py-1.5 font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/70 backdrop-blur">
                    The house pour · from {formatPrice(STORE.fromPrice)}
                  </span>
                </div>
              </div>

              <RoundBadge />

              <button
                type="button"
                onClick={() => onPickItem("sea-salt-cold-foam")}
                className="group absolute -bottom-3 left-0 z-20 w-[212px] rotate-[-2.4deg] rounded-xl border border-ink/12 bg-paper-light p-3.5 text-left shadow-[0_18px_34px_-22px_rgba(26,37,27,0.7)] transition-transform hover:rotate-0 hover:-translate-y-1 sm:-left-8 sm:w-[256px] sm:p-4"
                aria-label="View the Sea Salt Cold Foam MA CHA, house favourite"
              >
                <span
                  className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2 bg-lime/70 shadow-sm"
                  aria-hidden="true"
                />
                <span className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-berry">
                    House favourite
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="text-ink/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 block font-display text-[17px] font-semibold leading-tight tracking-[-0.02em]">
                  Sea Salt Cold Foam MA CHA
                </span>
                <span className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold">{formatPrice(6.5)}</span>
                  <span className="text-[10px] uppercase tracking-[0.08em] text-ink/45">
                    Iced · signature
                  </span>
                </span>
              </button>

              <span className="absolute -right-6 top-1/2 hidden rotate-90 font-mono text-[8px] uppercase tracking-[0.32em] text-ink/35 lang:block lg:block">
                Ubi · Singapore · 400302
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1280px] px-5 sm:px-8 lg:mt-16">
        <dl className="grid grid-cols-2 gap-y-4 border-y border-ink/12 py-4 sm:grid-cols-4 sm:gap-y-0">
          {[
            { label: "From", value: "$4.90", note: "a cup, honestly" },
            { label: "Rating", value: `${STORE.rating} ★`, note: `${STORE.reviewCount} Google reviews` },
            { label: "Address", value: "Ubi Ave 1", note: "#01-79 · 400302" },
            { label: "Hours", value: "Daily", note: "from 10am" },
          ].map((fact, index) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-0.5 sm:pl-5 ${
                index > 0 ? "sm:border-l sm:border-ink/12" : ""
              } ${index % 2 === 1 ? "border-l border-ink/12 pl-5 sm:pl-5" : ""}`}
            >
              <dt className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/40">
                {fact.label}
              </dt>
              <dd className="font-display text-[19px] font-semibold leading-tight tracking-[-0.02em]">
                {fact.value}
              </dd>
              <dd className="text-[10.5px] text-ink/50">{fact.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

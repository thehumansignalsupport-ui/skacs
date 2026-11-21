import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Leaf,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";
import { HOURS, STORE } from "../data/menu";
import { useStoreStatus } from "../lib/store";
import { Reveal } from "./ui";

const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

function NeighbourhoodMap() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-paper/20 bg-[#eee8d7]">
      <svg
        viewBox="0 0 600 440"
        className="h-full w-full"
        role="img"
        aria-label="Illustrated map showing MA CHA at Block 302 Ubi Ave 1, a two minute walk from Ubi MRT Exit A"
      >
        <rect width="600" height="440" fill="#ece5d3" />
        <g opacity="0.55" stroke="#d8cfb9" strokeWidth="1">
          {Array.from({ length: 14 }).map((_, index) => (
            <line key={`v-${index}`} x1={index * 46} y1="0" x2={index * 46} y2="440" />
          ))}
          {Array.from({ length: 11 }).map((_, index) => (
            <line key={`h-${index}`} x1="0" y1={index * 44} x2="600" y2={index * 44} />
          ))}
        </g>

        <g>
          <rect x="34" y="42" width="122" height="92" rx="5" fill="#e2dbc6" />
          <rect x="182" y="34" width="150" height="74" rx="5" fill="#dfd8c4" />
          <rect x="362" y="48" width="96" height="110" rx="5" fill="#e5dec9" />
          <rect x="486" y="34" width="94" height="124" rx="5" fill="#dfd8c4" />
          <rect x="30" y="250" width="120" height="96" rx="5" fill="#dfd8c4" />
          <rect x="182" y="256" width="112" height="112" rx="5" fill="#e5dec9" />
          <rect x="328" y="254" width="126" height="82" rx="5" fill="#e2dbc6" />
          <rect x="482" y="246" width="98" height="120" rx="5" fill="#dfd8c4" />
          <rect x="40" y="368" width="156" height="60" rx="5" fill="#e5dec9" />
          <rect x="438" y="378" width="142" height="52" rx="5" fill="#e2dbc6" />
        </g>

        <g>
          <rect x="196" y="158" width="112" height="62" rx="4" fill="#cdd8ab" />
          <circle cx="226" cy="188" r="10" fill="#b9c98c" />
          <circle cx="262" cy="202" r="7" fill="#b9c98c" />
          <circle cx="282" cy="178" r="8" fill="#b9c98c" />
          <text x="252" y="238" fill="#7f8b5b" fontSize="10" fontFamily="Space Mono, monospace" letterSpacing="1.5">
            FRUIT SHOP
          </text>
        </g>

        <g>
          <path d="M0 150h600" stroke="#d3cab4" strokeWidth="46" />
          <path d="M0 150h600" stroke="#f6f1e3" strokeWidth="38" />
          <path d="M0 150h600" stroke="#dcd3bd" strokeWidth="1" strokeDasharray="13 12" />
          <text x="86" y="140" fill="#8b856f" fontSize="11" fontFamily="Space Mono, monospace" letterSpacing="2.2">
            UBI AVE 1
          </text>

          <path d="M330 0v440" stroke="#d3cab4" strokeWidth="38" />
          <path d="M330 0v440" stroke="#f6f1e3" strokeWidth="30" />
          <path d="M330 0v440" stroke="#dcd3bd" strokeWidth="1" strokeDasharray="12 11" />
          <text
            x="0"
            y="0"
            transform="translate(318 300) rotate(-90)"
            fill="#8b856f"
            fontSize="10"
            fontFamily="Space Mono, monospace"
            letterSpacing="2"
          >
            UBI CLOSE
          </text>
        </g>

        <g>
          <circle cx="80" cy="318" r="24" fill="#24402a" />
          <circle cx="80" cy="318" r="19" fill="none" stroke="#dbe5aa" strokeWidth="1" opacity="0.6" />
          <text
            x="80"
            y="323"
            textAnchor="middle"
            fill="#f3efe3"
            fontSize="10"
            fontFamily="Space Mono, monospace"
            fontWeight="700"
          >
            MRT
          </text>
          <rect x="112" y="304" width="116" height="27" rx="13" fill="#f3efe3" />
          <text x="124" y="321" fill="#24402a" fontSize="9.5" fontFamily="Space Mono, monospace" letterSpacing="0.6">
            UBI · EXIT A
          </text>
        </g>

        <path
          d="M108 310 C 160 300, 214 280, 262 260"
          fill="none"
          stroke="#24402a"
          strokeWidth="2.2"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />
        <rect x="152" y="286" width="60" height="20" rx="10" fill="#24402a" transform="rotate(-14 152 286)" />
        <text
          x="182"
          y="300"
          textAnchor="middle"
          fill="#dbe5aa"
          fontSize="9"
          fontFamily="Space Mono, monospace"
          transform="rotate(-14 182 300)"
        >
          2 MIN
        </text>

        <g>
          <ellipse cx="292" cy="262" rx="30" ry="9" fill="#1a251b" opacity="0.14" />
          <path
            d="M292 196c-17 0-30 13-30 30 0 23 30 46 30 46s30-23 30-46c0-17-13-30-30-30Z"
            fill="#24402a"
            stroke="#f3efe3"
            strokeWidth="3"
          />
          <circle cx="292" cy="226" r="12" fill="#dbe5aa" />
          <path
            d="M292 233c-4-3-6-7-5-11 4 0 8 3 9 6 0 2-1 4-4 5Z"
            fill="#24402a"
          />
          <rect x="238" y="166" width="108" height="26" rx="6" fill="#f3efe3" />
          <text
            x="292"
            y="183"
            textAnchor="middle"
            fill="#24402a"
            fontSize="11"
            fontFamily="Space Mono, monospace"
            fontWeight="700"
            letterSpacing="1.6"
          >
            MA CHA
          </text>
          <text
            x="292"
            y="152"
            textAnchor="middle"
            fill="#24402a"
            fontSize="9"
            fontFamily="Space Mono, monospace"
            letterSpacing="1"
          >
            BLK 302 · #01-79
          </text>
        </g>

        <g opacity="0.8">
          <circle cx="548" cy="388" r="20" fill="none" stroke="#8b856f" strokeWidth="1" />
          <path d="M548 374v14" stroke="#8b856f" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M548 374l-4 7h8Z" fill="#24402a" />
          <text x="548" y="400" textAnchor="middle" fill="#8b856f" fontSize="8" fontFamily="Space Mono, monospace">
            N
          </text>
        </g>

        <text x="30" y="424" fill="#a49d87" fontSize="8" fontFamily="Space Mono, monospace" letterSpacing="1.5">
          NOT TO SCALE · UBI, SINGAPORE
        </text>
      </svg>

      <a
        href={STORE.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="group absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 py-1.5 pl-3 pr-2 font-mono text-[8px] uppercase tracking-[0.1em] text-moss backdrop-blur transition-colors hover:bg-paper"
      >
        Open map
        <span className="grid h-5 w-5 place-items-center rounded-full bg-moss text-paper">
          <ArrowUpRight size={11} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </a>
    </div>
  );
}

export function FindUs() {
  const status = useStoreStatus();
  const [copied, setCopied] = useState(false);
  const whatsappHref = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(
    "Hi MA CHA! I'd like to check something before heading down —",
  )}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${STORE.addressLine1}, ${STORE.addressLine2}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="find-us" className="relative overflow-hidden bg-moss py-16 text-paper sm:py-24">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full border border-lime/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[460px] w-[460px] rounded-full border border-lime/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <p className="font-mono-label flex items-center gap-2.5 text-lime/80">
              <span className="h-px w-7 bg-lime/50" aria-hidden="true" />
              04 — Find us
            </p>
            <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.6rem,6.4vw,4.2rem)] font-medium leading-[0.92] tracking-[-0.04em]">
              Come find the <span className="italic text-lime">green sign.</span>
            </h2>
            <p className="mt-4 max-w-[36ch] text-[13.5px] leading-[1.75] text-paper/65">
              Second floor? No. Mall? No. It's at street level inside the fruit shop at Ubi
              Ave 1 — walk in, look for the little green counter, say hi.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-4 rounded-xl border border-paper/15 bg-paper/[0.06] p-4">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime/15 text-lime">
                  <MapPin size={15} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-paper/40">
                    The counter
                  </p>
                  <p className="mt-1 text-[13.5px] font-semibold leading-snug">
                    {STORE.addressLine1}
                    <br />
                    {STORE.addressLine2}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-paper/50">
                    <Leaf size={10} className="rotate-45 text-lime" aria-hidden="true" />
                    Inside the old-school fruit shop · {STORE.mrt}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <a
                      href={STORE.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-lime underline decoration-lime/30 underline-offset-4 transition-colors hover:decoration-lime"
                    >
                      Directions <ArrowUpRight size={10} aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={copyAddress}
                      className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-paper/50 transition-colors hover:text-paper"
                    >
                      {copied ? <Check size={10} aria-hidden="true" /> : <Copy size={10} aria-hidden="true" />}
                      {copied ? "Copied" : "Copy address"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-paper/15 bg-paper/[0.06] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-paper/40">
                    <Clock size={12} aria-hidden="true" /> Opening hours
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-lime">
                    <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-lime" : "bg-berry"}`} aria-hidden="true" />
                    {status.primary} · {status.secondary}
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
                  {DISPLAY_ORDER.map((index) => {
                    const day = HOURS[index];
                    const isToday = status.todayIndex === index;
                    return (
                      <div
                        key={day.day}
                        className={`flex items-baseline justify-between gap-2 rounded px-1.5 py-[2px] text-[10px] leading-[1.35] ${
                          isToday ? "bg-lime/15 text-paper" : "text-paper/55"
                        }`}
                      >
                        <dt className="flex items-center gap-1.5">
                          {day.short}
                          {isToday && <span className="h-1 w-1 shrink-0 rounded-full bg-lime" aria-hidden="true" />}
                        </dt>
                        <dd className="shrink-0 font-mono text-[8.5px] tabular-nums">{day.label}</dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-2.5 border-t border-paper/10 pt-2 font-mono text-[7.5px] uppercase tracking-[0.1em] text-paper/30">
                  Hours may shift on public holidays — a quick WhatsApp saves a walk
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={STORE.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-lime py-2 pl-5 pr-2 text-moss transition-colors hover:bg-paper"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em]">Get directions</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-moss text-lime">
                    <Navigation size={13} className="transition-transform group-hover:rotate-12" aria-hidden="true" />
                  </span>
                </a>
                <a
                  href={`tel:${STORE.phoneTel}`}
                  className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-paper/85 transition-colors hover:border-paper/50 hover:text-paper"
                >
                  <Phone size={13} aria-hidden="true" /> {STORE.phoneDisplay}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.06em] text-paper/85 transition-colors hover:border-paper/50 hover:text-paper"
                >
                  <MessageCircle size={13} aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={90}>
            <NeighbourhoodMap />
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ["2 min", "from Ubi MRT Exit A"],
                ["Ground floor", "inside the fruit shop"],
                ["Takeaway", "no seats, no fuss"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-lg border border-paper/12 bg-paper/[0.04] px-3 py-2.5">
                  <p className="font-display text-[15px] font-semibold leading-tight text-paper">{value}</p>
                  <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-paper/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center font-mono text-[7.5px] uppercase tracking-[0.12em] text-paper/30">
              A concept map, drawn by hand · the real walk is easier
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

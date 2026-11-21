import { useState } from "react";
import { ArrowUpRight, Clock, MessageCircle, Plus } from "lucide-react";
import {
  ADD_ONS,
  CATEGORIES,
  FEATURED_IDS,
  IMAGES,
  MENU,
  STORE,
  formatPrice,
  findItem,
  type CategoryId,
} from "../data/menu";
import { cn } from "../utils/cn";
import { Reveal, SectionLabel } from "./ui";

const FEATURED_IMAGES: Record<string, string> = {
  "sea-salt-cold-foam": IMAGES.seaSalt,
  "strawberry-ma-cha": IMAGES.strawberry,
  "ma-cha-kopi": IMAGES.kopi,
};

const FEATURED_CAPTIONS: Record<string, string> = {
  "sea-salt-cold-foam": "The one everyone comes back for.",
  "strawberry-ma-cha": "Fruit purée, then a slow green pour.",
  "ma-cha-kopi": "For the coffee half of the office run.",
};

type Filter = CategoryId | "all";

export function MenuSection({ onPickItem }: { onPickItem: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>("all");
  const items = MENU.filter((item) => filter === "all" || item.category === filter);
  const featured = FEATURED_IDS.map((id) => findItem(id)).filter(Boolean);
  const whatsappLink = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(
    "Hi MA CHA! Quick question about the menu —",
  )}`;

  return (
    <section id="menu" className="relative bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionLabel index="03">The menu</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6.5vw,4.2rem)] font-medium leading-[0.9] tracking-[-0.04em]">
              Pick your <span className="italic text-moss">pour.</span>
            </h2>
          </Reveal>
          <Reveal delay={60} className="max-w-[19rem]">
            <p className="text-[12px] leading-relaxed text-ink/55">
              Sixteen ways to caffeinate. Build a tray here, then send it over on WhatsApp —
              we'll have it ready by the time you reach the green sign.
            </p>
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.13em] text-ink/35">
              Menu guide · prices in SGD · iced unless noted
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3">
          {featured.map((item, index) =>
            item ? (
              <Reveal key={item.id} delay={index * 70}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-paper-light transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_40px_-30px_rgba(26,37,27,0.8)]">
                  <div className="relative overflow-hidden bg-paper-deep">
                    <img
                      src={FEATURED_IMAGES[item.id]}
                      alt={`${item.name}, ${item.tags[0].toLowerCase()}`}
                      className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-paper/92 px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-moss backdrop-blur">
                      {item.badge ?? "Counter pick"}
                    </span>
                    <span className="absolute right-3 top-3 rounded-full bg-moss/85 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-paper backdrop-blur">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[20px] font-semibold leading-[1.1] tracking-[-0.02em]">
                        {item.name}
                      </h3>
                      <span className="shrink-0 pt-0.5 font-mono text-[12px] font-bold">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink/55">
                      {FEATURED_CAPTIONS[item.id]}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                      <span className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink/40">
                        {item.tags.join(" · ")}
                      </span>
                      <button
                        type="button"
                        onClick={() => onPickItem(item.id)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/20 py-1.5 pl-3 pr-2 text-[10px] font-bold uppercase tracking-[0.06em] transition-colors hover:bg-moss hover:text-paper"
                        aria-label={`Add ${item.name} to your tray`}
                      >
                        Add
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-ink/8">
                          <Plus size={11} strokeWidth={2.4} aria-hidden="true" />
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ) : null,
          )}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/12 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {CATEGORIES.map((category) => {
              const count =
                category.id === "all"
                  ? MENU.length
                  : MENU.filter((item) => item.category === category.id).length;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  aria-pressed={filter === category.id}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.06em] transition-all",
                    filter === category.id
                      ? "border-moss bg-moss text-paper"
                      : "border-ink/15 bg-transparent text-ink/65 hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {category.label}
                  <span
                    className={cn(
                      "font-mono text-[8px]",
                      filter === category.id ? "text-lime" : "text-ink/35",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-ink/40">
            Tap a drink to choose milk, ice & sugar
          </p>
        </div>

        <ul className="mt-2 grid gap-x-12 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onPickItem(item.id)}
                className="group flex w-full items-start justify-between gap-4 border-b border-ink/12 py-5 text-left transition-colors hover:border-ink/25"
                aria-label={`Customise ${item.name}, ${formatPrice(item.price)}`}
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-inset ring-ink/10"
                    style={{ backgroundColor: item.tone }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <h3 className="font-display text-[18.5px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                        {item.name}
                      </h3>
                      {item.badge && (
                        <span className="rounded-full bg-berry/10 px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-berry">
                          {item.badge}
                        </span>
                      )}
                      {item.big && (
                        <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-ink/35">
                          big cup
                        </span>
                      )}
                    </div>
                    <p className="mt-1 max-w-[44ch] text-[11.5px] leading-[1.6] text-ink/55">
                      {item.blurb}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/40"
                        >
                          {tag}
                          {tagIndex < item.tags.length - 1 && (
                            <span className="ml-2 text-ink/20">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2.5">
                  <span className="font-mono text-[11.5px] font-bold tabular-nums">
                    {formatPrice(item.price)}
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-ink/18 text-ink/60 transition-all duration-300 group-hover:rotate-90 group-hover:border-moss group-hover:bg-moss group-hover:text-paper">
                    <Plus size={13} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink/12 bg-paper-light p-5 sm:col-span-1">
            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
              Make it yours
            </p>
            <ul className="mt-3 space-y-2">
              {ADD_ONS.map((addOn) => (
                <li key={addOn.id} className="flex items-baseline justify-between gap-3">
                  <span className="text-[11.5px] text-ink/70">{addOn.label}</span>
                  <span className="font-mono text-[9px] text-ink/45">{addOn.note}</span>
                </li>
              ))}
              <li className="flex items-baseline justify-between gap-3 border-t border-dashed border-ink/15 pt-2">
                <span className="text-[11.5px] text-ink/70">Sweetness level</span>
                <span className="font-mono text-[9px] text-ink/45">your call</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-ink/12 bg-paper-light p-5">
            <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
              <Clock size={12} aria-hidden="true" /> Takeaway, always
            </p>
            <p className="mt-3 font-display text-[19px] leading-tight tracking-[-0.02em]">
              It's a counter, not a café.
            </p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-ink/55">
              Grab your cup and go. The fruit shop around you is the ambience.
            </p>
          </div>

          <div className="rounded-2xl bg-moss p-5 text-paper">
            <p className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-lime/80">
              <MessageCircle size={12} aria-hidden="true" /> Office run?
            </p>
            <p className="mt-3 font-display text-[19px] leading-tight tracking-[-0.02em]">
              Send a list. Save a queue.
            </p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-paper/65">
              Message ahead for bigger orders and the counter will sort what's possible.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-lime transition-colors hover:text-paper"
            >
              WhatsApp the counter
              <ArrowUpRight size={11} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

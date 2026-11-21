import { ArrowUpRight, Check, Leaf, Quote } from "lucide-react";
import { IMAGES, STORE } from "../data/menu";
import { Eyebrow, Reveal, SectionLabel, Stars } from "./ui";

const KNOWN_FOR = [
  "Uji matcha, whisked cup by cup",
  "Sweetness dialled in on the spot",
  "Fruit-forward specials, no fake stuff",
  "Coffee for the matcha sceptics",
];

export function DisplayMarquee() {
  const words = ["matcha, made slow", "kopi, made sweet", "cold foam, made salty", "fruit, from the shop"];
  return (
    <div className="overflow-hidden bg-moss py-3.5 text-paper sm:py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee-slow items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {words.map((word) => (
              <span key={`${half}-${word}`} className="flex items-center">
                <span className="whitespace-nowrap font-display text-[25px] italic leading-none tracking-[-0.02em] sm:text-[34px]">
                  {word}
                </span>
                <Leaf
                  size={15}
                  className="mx-6 rotate-45 text-lime/70 sm:mx-9 sm:size-[18px]"
                  strokeWidth={1.6}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Story() {
  return (
    <section id="story" className="relative border-b border-ink/10 bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="relative mx-auto w-full max-w-[420px] pb-14 lg:col-span-5 lg:max-w-none">
            <div className="absolute inset-x-5 top-6 bottom-8 translate-x-2 rotate-[2deg] bg-leaf-soft/50" aria-hidden="true" />
            <div className="relative rotate-[-1.6deg] border-[7px] border-paper-light bg-paper-light shadow-[0_22px_44px_-30px_rgba(26,37,27,0.75)] sm:border-[9px]">
              <span className="tape -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-2" aria-hidden="true" />
              <img
                src={IMAGES.fruitShop}
                alt="A colourful neighbourhood fruit stall, the sort of old-school shop the counter sits inside"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div className="flex items-center justify-between bg-paper-light px-3 py-2">
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/50">
                  Old shop · new ritual
                </span>
                <Leaf size={11} className="rotate-45 text-leaf" aria-hidden="true" />
              </div>
            </div>

            <div className="absolute -bottom-2 right-0 w-[47%] rotate-[4deg] border-[5px] border-paper-light bg-paper-light p-1.5 shadow-[0_16px_30px_-20px_rgba(26,37,27,0.8)] sm:-right-3">
              <img
                src={IMAGES.whisk}
                alt="A bamboo whisk being used to prepare matcha"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <p className="px-1 pb-0.5 pt-1.5 font-mono text-[7px] uppercase leading-relaxed tracking-[0.1em] text-ink/55">
                Whisked per cup, not pumped from a tub.
              </p>
            </div>

            <div className="absolute -left-2 bottom-16 z-10 hidden h-[86px] w-[86px] rotate-[-9deg] place-items-center rounded-full border border-dashed border-ink/35 bg-paper/80 text-center sm:grid">
              <div>
                <p className="font-display text-[17px] font-semibold italic leading-none">No frills.</p>
                <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-ink/50">
                  all flavour
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:pl-4" delay={80}>
            <SectionLabel index="01">The counter</SectionLabel>
            <h2 className="mt-5 max-w-[13ch] font-display text-[clamp(2.4rem,6.2vw,4rem)] font-medium leading-[0.95] tracking-[-0.035em]">
              Tucked in the fruit shop, <span className="italic text-moss">not the mall.</span>
            </h2>

            <div className="mt-6 grid gap-4 text-[14px] leading-[1.75] text-ink/70 sm:text-[15px]">
              <p>
                MA CHA is a very small coffee and matcha counter on Ubi Ave 1, living inside a
                wonderfully old-school fruit shop. No marble bar, no queue ropes, no
                fourteen-dollar matcha. Just a green sign, a whisk and whoever's on the counter
                that day.
              </p>
              <p>
                The matcha is Uji, whisked to order and poured over cold milk — or steamed, if
                that's your mood. The coffee runs on the sweeter side, but tell them and they'll
                happily pull it back. Fruit-forward specials come loaded with real purée. The
                whole menu starts at{" "}
                <span className="font-semibold text-ink">$4.90</span>.
              </p>
            </div>

            <div className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {KNOWN_FOR.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-leaf/25 text-moss">
                    <Check size={10} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[12.5px] leading-snug text-ink/75">{point}</span>
                </div>
              ))}
            </div>

            <figure className="relative mt-8 rounded-2xl border border-ink/12 bg-paper-light p-5 sm:p-6">
              <Quote
                size={26}
                className="absolute right-5 top-5 text-leaf/35"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden="true"
              />
              <Stars />
              <blockquote className="mt-2.5 max-w-[38ch] font-display text-[19px] leading-snug tracking-[-0.015em] text-ink sm:text-[21px]">
                “Their matchas are surprisingly good — affordable caffeine without the coffee
                shop pretense.”
              </blockquote>
              <figcaption className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[8.5px] uppercase tracking-[0.13em] text-ink/45">
                <span>@max11ne</span>
                <span className="h-2.5 w-px bg-ink/20" aria-hidden="true" />
                <a
                  href={STORE.reviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-ink/25 underline-offset-2 transition-colors hover:text-ink"
                >
                  Google review
                  <ArrowUpRight size={10} aria-hidden="true" />
                </a>
                <span className="h-2.5 w-px bg-ink/20" aria-hidden="true" />
                <span>4.9 from {STORE.reviewCount}</span>
              </figcaption>
            </figure>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Eyebrow>Look for the green sign</Eyebrow>
              <a
                href="#find-us"
                className="group inline-flex items-center gap-1 text-[12px] font-bold text-moss underline decoration-moss/25 underline-offset-4 transition-colors hover:decoration-moss"
              >
                Directions to the counter
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function VibeStrip() {
  const photos = [
    {
      src: IMAGES.matchaHand,
      alt: "A hand holding an iced matcha drink with a straw",
      caption: "Sip on the walk back to the office.",
      className: "rotate-[-1.5deg]",
    },
    {
      src: IMAGES.pour,
      alt: "A layered strawberry and matcha drink in a glass jar",
      caption: "Layers you're allowed to stir.",
      className: "rotate-[1.8deg] sm:mt-6",
    },
    {
      src: IMAGES.cafe,
      alt: "An iced matcha latte on a cafe table",
      caption: "Two minutes from Ubi MRT Exit A.",
      className: "rotate-[-1deg]",
    },
  ];

  return (
    <section className="border-b border-ink/10 bg-paper-deep/45 py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel index="02">The general idea</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4.2vw,2.8rem)] font-medium leading-none tracking-[-0.03em]">
              Cold cup, <span className="italic">warm corner.</span>
            </h2>
          </div>
          <p className="max-w-[24rem] text-[11.5px] leading-relaxed text-ink/50">
            Photography for the vibe — the real counter is less styled and better value. Go
            see it.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <Reveal key={photo.caption} delay={index * 70}>
              <figure className={`border-[6px] border-paper-light bg-paper-light shadow-[0_16px_32px_-26px_rgba(26,37,27,0.8)] transition-transform duration-500 hover:rotate-0 ${photo.className}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-[4/3] w-full object-cover sm:aspect-[4/5]"
                  loading="lazy"
                />
                <figcaption className="flex items-center gap-2 px-2 py-2.5">
                  <span className="h-1 w-1 rounded-full bg-berry" aria-hidden="true" />
                  <span className="font-mono text-[7.5px] uppercase leading-relaxed tracking-[0.11em] text-ink/55">
                    {photo.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

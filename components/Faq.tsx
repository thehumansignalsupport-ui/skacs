import { useState } from "react";
import { MessageCircle, Phone, Plus } from "lucide-react";
import { STORE } from "../data/menu";
import { cn } from "../utils/cn";
import { Reveal, SectionLabel } from "./ui";

const FAQS = [
  {
    question: "Where exactly is the counter?",
    answer:
      "Blk 302 Ubi Ave 1, #01-79, Singapore 400302. It's the little matcha and coffee counter inside the old-school fruit shop — about a two-minute walk from Ubi MRT Exit A. Look for the green sign, not a big café frontage.",
  },
  {
    question: "Can I order ahead? Do you deliver?",
    answer:
      "You can build a tray on this site and send it straight to the counter on WhatsApp. A human confirms your order and you pay when you collect — no card details online. There's no delivery set up here; it's a takeaway counter, so collection is the move. For anything unusual, just message them.",
  },
  {
    question: "How sweet are the drinks?",
    answer:
      "The coffee runs sweet by default and the matcha is balanced rather than bitter. The good news: they'll adjust sweetness on the spot if you ask. Same for ice. 0%, 50%, whatever — just say so.",
  },
  {
    question: "Do you have oat milk or dairy-free options?",
    answer:
      "Oat milk is available for an extra $1 on milk-based drinks, and you can choose no milk entirely. If you have a specific allergy or swap in mind, message the counter before you head down so they can check for you.",
  },
  {
    question: "Is there seating?",
    answer:
      "No — and that's the charm. It's a takeaway counter tucked inside a working fruit shop, so grab your cup and go. The shop itself is worth a look while you wait.",
  },
  {
    question: "What should a first-timer order?",
    answer:
      "The Sea Salt Cold Foam MA CHA if you want the signature. The Strawberry MA CHA if you like fruit-forward drinks. The MA CHA Kopi if you're the coffee friend who got dragged along. All three are in the short list above.",
  },
  {
    question: "I don't drink coffee or matcha. Am I doomed?",
    answer:
      "Not at all. There's proper dark chocolate and strawberry milk with zero caffeine. Nobody gets left at the fruit shop.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappHref = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(
    "Hi MA CHA! I have a question before visiting —",
  )}`;

  return (
    <section id="faq" className="border-t border-ink/10 bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <SectionLabel index="05">Good questions</SectionLabel>
              <h2 className="mt-4 max-w-[9ch] font-display text-[clamp(2.4rem,6vw,3.7rem)] font-medium leading-[0.94] tracking-[-0.035em]">
                Before you <span className="italic text-moss">knock.</span>
              </h2>
              <p className="mt-4 max-w-[27ch] text-[12px] leading-relaxed text-ink/55">
                The short answers. Anything else, the counter is one message away — a real
                person reads it.
              </p>

              <div className="mt-6 rounded-2xl border border-ink/12 bg-paper-light p-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/40">
                  Say hi
                </p>
                <a
                  href={`tel:${STORE.phoneTel}`}
                  className="group mt-2.5 flex items-center justify-between gap-3 border-b border-ink/10 pb-2.5"
                >
                  <span className="flex items-center gap-2.5 text-[12.5px] font-semibold">
                    <Phone size={14} className="text-moss" aria-hidden="true" />
                    {STORE.phoneDisplay}
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/35 transition-colors group-hover:text-ink/60">
                    call
                  </span>
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2.5 flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-2.5 text-[12.5px] font-semibold">
                    <MessageCircle size={14} className="text-moss" aria-hidden="true" />
                    WhatsApp the counter
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-ink/35 transition-colors group-hover:text-ink/60">
                    chat
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={80}>
            <div className="border-t border-ink/15">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.question} className="border-b border-ink/15">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        id={`faq-button-${index}`}
                        className="group flex w-full items-start justify-between gap-4 py-4 text-left"
                      >
                        <span className="flex items-start gap-3">
                          <span className="mt-[5px] font-mono text-[8px] tracking-[0.1em] text-ink/30">
                            0{index + 1}
                          </span>
                          <span
                            className={cn(
                              "font-display text-[17px] font-semibold leading-snug tracking-[-0.015em] transition-colors sm:text-[19px]",
                              isOpen ? "text-moss" : "text-ink group-hover:text-moss",
                            )}
                          >
                            {faq.question}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300",
                            isOpen
                              ? "rotate-45 border-moss bg-moss text-paper"
                              : "border-ink/20 text-ink/50 group-hover:border-ink/40",
                          )}
                        >
                          <Plus size={13} aria-hidden="true" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[58ch] pb-4 pl-7 pr-10 text-[12.5px] leading-[1.75] text-ink/60">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

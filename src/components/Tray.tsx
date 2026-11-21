import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ClipboardCopy,
  Leaf,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { STORE, formatPrice, type CartLine } from "../data/menu";
import { cn } from "../utils/cn";
import { useBodyLock } from "./ui";

const PICKUP_OPTIONS = [
  "ASAP — about 10 minutes",
  "In 30 minutes",
  "In about an hour",
  "Lunchtime — around 12:30pm",
  "I'll confirm on WhatsApp",
];

export function Tray({
  open,
  lines,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
  onBrowse,
}: {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
  onBrowse: () => void;
}) {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState(PICKUP_OPTIONS[0]);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    setCopied(false);
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const count = lines.reduce((total, line) => total + line.qty, 0);
  const subtotal = lines.reduce((total, line) => total + line.unitPrice * line.qty, 0);

  const buildMessage = () => {
    const header = [
      "Hi MA CHA! I'd like to pre-order for pickup 🍵",
      "",
      `Name: ${name.trim() || "(I'll confirm on WhatsApp)"}`,
      `Pickup: ${pickup}`,
    ];
    const body = lines.map(
      (line) =>
        `• ${line.qty}× ${line.name}\n   ${[line.size, line.serve, line.milk, line.sweetness, ...line.addOns]
          .filter(Boolean)
          .join(" · ")}\n   ${formatPrice(line.unitPrice * line.qty)}`,
    );
    const footer = [
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      notes.trim() ? `Notes: ${notes.trim()}` : "",
      "",
      "I'll pay at the counter. Please confirm — thank you!",
    ];
    return [...header, "", ...body, ...footer].filter((line) => line !== undefined).join("\n");
  };

  const message = buildMessage();
  const whatsappHref = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      const area = document.createElement("textarea");
      area.value = message;
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      } finally {
        document.body.removeChild(area);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="tray-title">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-[fade-in_0.2s_ease-out] cursor-default bg-ink/45 backdrop-blur-[2px]"
        aria-label="Close tray"
        tabIndex={-1}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-[460px] animate-[drawer-in_0.32s_cubic-bezier(0.22,1,0.36,1)] flex-col border-l border-ink/10 bg-paper shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-ink/12 px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="tray-title" className="font-display text-[27px] font-semibold leading-none tracking-[-0.03em]">
                Your tray
              </h2>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-moss px-1 font-mono text-[9px] font-bold text-lime">
                {count}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/45">
              <Leaf size={10} className="rotate-45 text-leaf" aria-hidden="true" />
              Pay at the counter · no payment online
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink/5"
            aria-label="Close tray"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="relative mb-5 grid h-24 w-24 place-items-center rounded-full border border-dashed border-ink/20 bg-paper-light">
              <svg viewBox="0 0 48 48" className="h-12 w-12 text-moss" fill="none" aria-hidden="true">
                <path d="M13 17h22l-2.6 20a4 4 0 0 1-4 3.5h-8.8a4 4 0 0 1-4-3.5L13 17Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M18 17c0-5 2.7-8 6-8s6 3 6 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M20 26c2 3 6 3 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="absolute -right-1 top-2 grid h-7 w-7 place-items-center rounded-full bg-butter font-mono text-[10px] font-bold text-moss">
                0
              </span>
            </div>
            <p className="font-display text-[24px] leading-tight tracking-[-0.02em]">Nothing poured yet.</p>
            <p className="mt-2 max-w-[26ch] text-[12px] leading-relaxed text-ink/55">
              Pick a matcha, add it to the tray, and we'll sort the rest over WhatsApp.
            </p>
            <button
              type="button"
              onClick={onBrowse}
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-moss py-2 pl-5 pr-2 text-paper transition-colors hover:bg-moss-light"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.08em]">Browse the menu</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-moss transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </button>
            <p className="mt-5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/35">
              Drinks from {formatPrice(STORE.fromPrice)}
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              <ul className="space-y-3">
                {lines.map((line) => (
                  <li key={line.key} className="rounded-xl border border-ink/12 bg-paper-light p-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-[16px] font-semibold leading-tight tracking-[-0.015em]">
                          {line.name}
                        </h3>
                        <p className="mt-1 text-[10.5px] leading-relaxed text-ink/50">
                          {[line.size, line.serve, line.milk, line.sweetness, ...line.addOns].join(" · ")}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(line.key)}
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-ink/30 transition-colors hover:bg-berry/10 hover:text-berry"
                        aria-label={`Remove ${line.name}`}
                      >
                        <X size={13} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-paper px-1 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(line.key, -1)}
                          className="grid h-6 w-6 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5"
                          aria-label={`Decrease quantity of ${line.name}`}
                        >
                          <Minus size={11} aria-hidden="true" />
                        </button>
                        <span className="w-5 text-center font-mono text-[10px] font-bold">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(line.key, 1)}
                          className="grid h-6 w-6 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5"
                          aria-label={`Increase quantity of ${line.name}`}
                        >
                          <Plus size={11} aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-mono text-[11px] font-bold">
                        {formatPrice(line.unitPrice * line.qty)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45">
                  Pickup details
                </p>
                <div className="mt-2.5 grid gap-2.5">
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name for the cup"
                    aria-label="Name for the order"
                    autoComplete="name"
                    className="w-full rounded-lg border border-ink/15 bg-paper-light px-3 py-2.5 text-[12px] text-ink placeholder:text-ink/35 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/15"
                  />
                  <div className="relative">
                    <select
                      value={pickup}
                      onChange={(event) => setPickup(event.target.value)}
                      aria-label="Pickup time"
                      className="w-full appearance-none rounded-lg border border-ink/15 bg-paper-light px-3 py-2.5 pr-8 text-[12px] text-ink focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/15"
                    >
                      {PICKUP_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40">
                      ▾
                    </span>
                  </div>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Anything else? (less ice, no straw, extra napkins…)"
                    aria-label="Order notes"
                    rows={2}
                    className="w-full resize-none rounded-lg border border-ink/15 bg-paper-light px-3 py-2.5 text-[12px] text-ink placeholder:text-ink/35 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/15"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-ink/10 bg-paper-deep/50 px-3 py-2.5">
                <p className="text-[10.5px] leading-relaxed text-ink/55">
                  This sends a pre-order message to the counter on WhatsApp. Your order is
                  confirmed by a human, and you pay when you collect. Easy.
                </p>
              </div>

              <button
                type="button"
                onClick={onClear}
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/35 transition-colors hover:text-berry"
              >
                <Trash2 size={10} aria-hidden="true" /> Clear tray
              </button>
            </div>

            <div className="border-t border-ink/12 bg-paper-light px-5 pb-4 pt-3.5 sm:px-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/45">
                    Subtotal · {count} {count === 1 ? "cup" : "cups"}
                  </p>
                  <p className="mt-0.5 font-display text-[28px] font-semibold leading-none tracking-[-0.03em]">
                    {formatPrice(subtotal)}
                  </p>
                </div>
                <p className="max-w-[11rem] text-right text-[9px] leading-relaxed text-ink/35">
                  Final price confirmed at the counter. No card details, ever.
                </p>
              </div>

              <div className="mt-3 grid gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setSent(true)}
                  className="group flex items-center justify-between gap-2 rounded-full bg-moss py-3 pl-5 pr-2.5 text-paper transition-colors hover:bg-moss-light"
                >
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em]">
                    <MessageCircle size={15} aria-hidden="true" />
                    Send order on WhatsApp
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-moss transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={copyOrder}
                    className={cn(
                      "flex items-center justify-center gap-1.5 rounded-full border py-2.5 text-[10px] font-bold uppercase tracking-[0.06em] transition-colors",
                      copied
                        ? "border-moss bg-moss/8 text-moss"
                        : "border-ink/20 text-ink/70 hover:border-ink/35 hover:text-ink",
                    )}
                  >
                    {copied ? <Check size={12} aria-hidden="true" /> : <ClipboardCopy size={12} aria-hidden="true" />}
                    {copied ? "Copied" : "Copy order"}
                  </button>
                  <a
                    href={`tel:${STORE.phoneTel}`}
                    className="flex items-center justify-center gap-1.5 rounded-full border border-ink/20 py-2.5 text-[10px] font-bold uppercase tracking-[0.06em] text-ink/70 transition-colors hover:border-ink/35 hover:text-ink"
                  >
                    <Phone size={12} aria-hidden="true" /> Call counter
                  </a>
                </div>
              </div>
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-center font-mono text-[7.5px] uppercase tracking-[0.1em] text-ink/35" aria-live="polite">
                <ShoppingBag size={9} aria-hidden="true" />
                {sent
                  ? "Message ready — hit send in WhatsApp to confirm"
                  : "Pre-order only · confirmed by the counter"}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

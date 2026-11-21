import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Header } from "./components/Header";
import { Ticker, Hero } from "./components/Hero";
import { DisplayMarquee, Story, VibeStrip } from "./components/Story";
import { MenuSection } from "./components/Menu";
import { FindUs } from "./components/FindUs";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Tray } from "./components/Tray";
import { ItemModal, type AddPayload } from "./components/ItemModal";
import { findItem, formatPrice, type CartLine } from "./data/menu";

const CART_KEY = "macha-tray-v1";

function loadTray(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        typeof line === "object" &&
        line !== null &&
        typeof (line as CartLine).key === "string" &&
        typeof (line as CartLine).name === "string" &&
        typeof (line as CartLine).unitPrice === "number" &&
        typeof (line as CartLine).qty === "number" &&
        findItem((line as CartLine).itemId) !== undefined,
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [lines, setLines] = useState<CartLine[]>(loadTray);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [trayOpen, setTrayOpen] = useState(false);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* storage may be unavailable — the tray still works in-session */
    }
  }, [lines]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const activeItem = activeItemId ? findItem(activeItemId) : undefined;
  const itemCount = lines.reduce((total, line) => total + line.qty, 0);
  const subtotal = useMemo(
    () => lines.reduce((total, line) => total + line.unitPrice * line.qty, 0),
    [lines],
  );

  const openItem = useCallback((id: string) => {
    setTrayOpen(false);
    setActiveItemId(id);
  }, []);

  const openTray = useCallback(() => {
    setActiveItemId(null);
    setTrayOpen(true);
  }, []);

  const addToTray = (payload: AddPayload) => {
    const key = [
      payload.itemId,
      payload.size,
      payload.serve,
      payload.milk,
      payload.sweetness,
      [...payload.addOns].sort().join("+"),
    ].join("|");

    setLines((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, qty: Math.min(20, line.qty + payload.qty) } : line,
        );
      }
      return [
        ...current,
        {
          key,
          itemId: payload.itemId,
          name: payload.name,
          unitPrice: payload.unitPrice,
          qty: payload.qty,
          size: payload.size,
          serve: payload.serve,
          milk: payload.milk,
          sweetness: payload.sweetness,
          addOns: payload.addOns,
        },
      ];
    });

    setActiveItemId(null);
    setToast({ id: Date.now(), text: `${payload.qty}× ${payload.name} added to your tray` });
  };

  const updateQty = (key: string, delta: number) => {
    setLines((current) =>
      current
        .map((line) =>
          line.key === key ? { ...line, qty: Math.min(20, line.qty + delta) } : line,
        )
        .filter((line) => line.qty > 0),
    );
  };

  const removeLine = (key: string) => {
    setLines((current) => current.filter((line) => line.key !== key));
  };

  const browseMenu = () => {
    setTrayOpen(false);
    window.setTimeout(() => {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="paper-grain min-h-screen bg-paper">
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-moss focus:px-4 focus:py-2 focus:text-[12px] focus:font-bold focus:text-paper"
      >
        Skip to the menu
      </a>

      <Ticker />
      <Header cartCount={itemCount} onOpenTray={openTray} />

      <main>
        <Hero onPickItem={openItem} />
        <DisplayMarquee />
        <Story />
        <VibeStrip />
        <MenuSection onPickItem={openItem} />
        <FindUs />
        <Faq />
      </main>

      <Footer onOpenTray={openTray} onPickItem={openItem} />

      {itemCount > 0 && !trayOpen && !activeItem && (
        <div className="fixed inset-x-4 bottom-4 z-30 sm:inset-x-auto sm:right-6 sm:w-auto">
          <button
            type="button"
            onClick={openTray}
            className="group flex w-full animate-[pop-in_0.3s_cubic-bezier(0.22,1,0.36,1)] items-center justify-between gap-4 rounded-full bg-moss py-2 pl-4 pr-2 text-paper shadow-[0_16px_34px_-16px_rgba(26,37,27,0.9)] transition-colors hover:bg-moss-light sm:min-w-[248px]"
          >
            <span className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-lime font-mono text-[10px] font-bold text-moss">
                {itemCount}
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-[0.08em]">
                  Your tray
                </span>
                <span className="font-mono text-[9px] text-paper/55">{formatPrice(subtotal)}</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-paper/10 py-1.5 pl-3 pr-2 font-mono text-[8px] uppercase tracking-[0.08em] text-lime">
              Review
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </button>
        </div>
      )}

      {toast && !trayOpen && !activeItem && (
        <div
          className="fixed bottom-[86px] left-1/2 z-30 flex w-[calc(100%-2rem)] max-w-[360px] -translate-x-1/2 items-center gap-2.5 rounded-full border border-paper/10 bg-ink px-4 py-2.5 text-paper shadow-xl sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0"
          role="status"
          aria-live="polite"
        >
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-moss">
            <Check size={11} strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1 truncate text-[11px] text-paper/80">{toast.text}</span>
          <button
            type="button"
            onClick={openTray}
            className="shrink-0 rounded-full bg-paper/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-lime"
          >
            View
          </button>
        </div>
      )}

      {activeItem && (
        <ItemModal
          key={activeItem.id}
          item={activeItem}
          onClose={() => setActiveItemId(null)}
          onAdd={addToTray}
        />
      )}

      <Tray
        open={trayOpen}
        lines={lines}
        onClose={() => setTrayOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeLine}
        onClear={() => setLines([])}
        onBrowse={browseMenu}
      />
    </div>
  );
}

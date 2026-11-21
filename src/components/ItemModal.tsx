import { useEffect, useRef, useState } from "react";
import { Check, Leaf, Minus, Plus, X } from "lucide-react";
import {
  ADD_ONS,
  MILKS,
  SERVES,
  SIZES,
  SWEETNESS,
  formatPrice,
  type MenuItem,
} from "../data/menu";
import { cn } from "../utils/cn";
import { useBodyLock } from "./ui";

export interface AddPayload {
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
  size: string;
  serve: string;
  milk: string;
  sweetness: string;
  addOns: string[];
}

export function ItemModal({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: (payload: AddPayload) => void;
}) {
  const [size, setSize] = useState(SIZES[0].id as string);
  const [serve, setServe] = useState(item.serves[0]);
  const [milk, setMilk] = useState(item.milk ? "fresh" : "none");
  const [sweetness, setSweetness] = useState("100");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useBodyLock(true);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const sizeOption = SIZES.find((option) => option.id === size) ?? SIZES[0];
  const milkOption = MILKS.find((option) => option.id === milk) ?? MILKS[0];
  const selectedAddOns = ADD_ONS.filter((addOn) => addOns.includes(addOn.id));
  const unitPrice =
    item.price +
    sizeOption.price +
    (item.milk ? milkOption.price : 0) +
    selectedAddOns.reduce((total, addOn) => total + addOn.price, 0);

  const toggleAddOn = (id: string) => {
    setAddOns((current) =>
      current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
    );
  };

  const submit = () => {
    onAdd({
      itemId: item.id,
      name: item.name,
      unitPrice,
      qty,
      size: sizeOption.label,
      serve: serve === "iced" ? "Iced" : "Hot",
      milk: item.milk && milk !== "none" ? milkOption.label : "No milk",
      sweetness: `${sweetness}% sweet`,
      addOns: selectedAddOns.map((addOn) => addOn.label),
    });
  };

  return (
    <div className="fixed inset-0 z-[55] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="item-modal-title">
      <button
        type="button"
        className="fixed inset-0 h-full w-full cursor-default bg-ink/50 backdrop-blur-[3px]"
        onClick={onClose}
        aria-label="Close drink options"
        tabIndex={-1}
      />
      <div className="relative mx-auto my-4 w-[calc(100%-1.5rem)] max-w-[540px] overflow-hidden rounded-[22px] border border-paper-light/40 bg-paper shadow-2xl sm:my-10">
        <div className="relative overflow-hidden bg-moss px-5 pb-5 pt-4 text-paper sm:px-6">
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
            style={{ backgroundColor: item.tone }}
            aria-hidden="true"
          />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-paper/30"
                style={{ backgroundColor: item.tone }}
                aria-hidden="true"
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-lime/90">
                {item.category === "matcha" ? "Matcha" : item.category === "coffee" ? "Coffee" : "Not coffee"} · made to order
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-paper/25 text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
              aria-label="Close drink options"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>

          <h3
            id="item-modal-title"
            className="relative mt-3 font-display text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[30px]"
          >
            {item.name}
          </h3>
          <p className="relative mt-2 max-w-[42ch] text-[12px] leading-relaxed text-paper/65">
            {item.blurb}
          </p>
          <div className="relative mt-3.5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[9px] font-bold text-moss">
              {formatPrice(item.price)}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-paper/45">
              base price · add-ons below
            </span>
          </div>
        </div>

        <div className="max-h-[52vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
          {item.serves.length > 1 && (
            <Group label="Serve it">
              <div className="grid grid-cols-2 gap-2">
                {SERVES.filter((option) => item.serves.includes(option.id)).map((option) => (
                  <OptionButton
                    key={option.id}
                    active={serve === option.id}
                    onClick={() => setServe(option.id)}
                  >
                    {option.label}
                  </OptionButton>
                ))}
              </div>
            </Group>
          )}

          <Group label="Size">
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map((option) => (
                <OptionButton
                  key={option.id}
                  active={size === option.id}
                  onClick={() => setSize(option.id)}
                >
                  <span className="flex flex-col items-start">
                    <span>{option.label}</span>
                    <span className="mt-0.5 text-[9px] font-medium opacity-60">
                      {option.price === 0 ? "included" : option.note}
                    </span>
                  </span>
                </OptionButton>
              ))}
            </div>
          </Group>

          {item.milk && (
            <Group label="Milk">
              <div className="grid grid-cols-3 gap-2">
                {MILKS.map((option) => (
                  <OptionButton
                    key={option.id}
                    active={milk === option.id}
                    onClick={() => setMilk(option.id)}
                  >
                    <span className="flex flex-col items-start">
                      <span>{option.id === "fresh" ? "Fresh" : option.id === "oat" ? "Oat" : "None"}</span>
                      <span className="mt-0.5 text-[9px] font-medium opacity-60">
                        {option.price === 0 ? "included" : `+ ${formatPrice(option.price)}`}
                      </span>
                    </span>
                  </OptionButton>
                ))}
              </div>
            </Group>
          )}

          <Group label="Sweetness" hint="they'll adjust it on the spot">
            <div className="grid grid-cols-5 gap-1.5">
              {SWEETNESS.map((option) => (
                <OptionButton
                  key={option.id}
                  active={sweetness === option.id}
                  onClick={() => setSweetness(option.id)}
                  compact
                >
                  {option.label}
                </OptionButton>
              ))}
            </div>
          </Group>

          <Group label="Add a little more" hint="optional">
            <div className="space-y-1.5">
              {ADD_ONS.filter((addOn) => item.addOns.includes(addOn.id)).map((addOn) => {
                const active = addOns.includes(addOn.id);
                return (
                  <button
                    key={addOn.id}
                    type="button"
                    onClick={() => toggleAddOn(addOn.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition-all",
                      active
                        ? "border-moss bg-moss/8"
                        : "border-ink/12 bg-paper-light/50 hover:border-ink/25",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "grid h-[18px] w-[18px] place-items-center rounded-[4px] border transition-colors",
                          active ? "border-moss bg-moss text-paper" : "border-ink/25 text-transparent",
                        )}
                      >
                        <Check size={11} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-[12px] font-medium">{addOn.label}</span>
                    </span>
                    <span className="font-mono text-[9px] text-ink/45">
                      {addOn.price === 0 ? "free" : `+ ${formatPrice(addOn.price)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </Group>

          <p className="flex items-start gap-2 rounded-lg bg-paper-deep/70 px-3 py-2.5 text-[10.5px] leading-relaxed text-ink/55">
            <Leaf size={12} className="mt-0.5 shrink-0 rotate-45 text-leaf" aria-hidden="true" />
            Made fresh when you order. Have a milk or sweetness question? Just ask at the
            counter — they're nice about it.
          </p>
        </div>

        <div className="flex items-center gap-3 border-t border-ink/12 bg-paper-light px-5 py-4 sm:px-6">
          <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-paper px-1 py-1">
            <button
              type="button"
              onClick={() => setQty((value) => Math.max(1, value - 1))}
              className="grid h-7 w-7 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 disabled:opacity-30"
              aria-label="Decrease quantity"
              disabled={qty <= 1}
            >
              <Minus size={13} aria-hidden="true" />
            </button>
            <span className="w-5 text-center font-mono text-[11px] font-bold" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((value) => Math.min(12, value + 1))}
              className="grid h-7 w-7 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5"
              aria-label="Increase quantity"
            >
              <Plus size={13} aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={submit}
            className="group flex flex-1 items-center justify-between gap-2 rounded-full bg-moss py-3 pl-5 pr-2.5 text-paper transition-colors hover:bg-moss-light"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.08em]">
              Add to tray
            </span>
            <span className="grid h-7 min-w-[62px] place-items-center rounded-full bg-lime px-2.5 font-mono text-[11px] font-bold text-moss">
              {formatPrice(unitPrice * qty)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Group({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-2 flex w-full items-baseline justify-between gap-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink/55">
          {label}
        </span>
        {hint && <span className="text-[9px] italic text-ink/35">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

function OptionButton({
  active,
  onClick,
  children,
  compact = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-lg border text-left transition-all",
        compact ? "px-1 py-2 text-center" : "px-3 py-2.5",
        active
          ? "border-moss bg-moss text-paper shadow-[0_4px_12px_-8px_rgba(36,64,42,0.8)]"
          : "border-ink/15 bg-paper-light/60 text-ink/75 hover:border-ink/30",
      )}
    >
      <span className={cn("block text-[11.5px] font-semibold", compact && "font-mono text-[10px]")}>
        {children}
      </span>
    </button>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { ASSETS, ICONS } from "./constants";
import type { AppState, BranchId } from "./types";
import { xpToLevel, rankNameByLevel } from "./helpers";

export function Wood({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-[100dvh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ASSETS.bg})` }}
    >
      <div className="h-[100dvh] w-full bg-black/30 backdrop-blur-[2px]">
        {children}
      </div>
    </div>
  );
}

export function ScaleToFit({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const recalc = () => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const available = outer.clientHeight;
    const needed = inner.scrollHeight;
    const s = Math.min(1, available / needed);
    setScale(s);
  };
  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    const id = setInterval(recalc, 400);
    return () => {
      window.removeEventListener("resize", onResize);
      clearInterval(id);
    };
  }, []);
  return (
    <div ref={outerRef} className="relative w-full h-full overflow-hidden">
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function SideNav({
  active,
  onNav,
  className = "",
}: {
  active: "character" | "skills" | "friends" | "other";
  onNav: (v: AppState["view"]) => void;
  className?: string;
}) {
  const Btn = ({
    id,
    label,
  }: {
    id: "character" | "skills" | "friends";
    label: string;
  }) => (
    <button
      onClick={() => onNav(id)}
      className={`w-16 h-16 rounded-xl overflow-hidden border border-black/30 bg-white/20 backdrop-blur shadow ${
        active === id ? "ring-2 ring-amber-300" : ""
      }`}
      title={label}
    >
      <img
        src={ICONS[id]}
        alt={label}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </button>
  );
  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      <Btn id="character" label="Character" />
      <Btn id="skills" label="Skills" />
      <Btn id="friends" label="Friends" />
    </div>
  );
}

export function ProgressPill({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="px-3 py-1 rounded-full bg-white/70 shadow text-sm text-black">
      {label}: <b>{value}</b>
    </div>
  );
}

export function BranchStat({ id, xp }: { id: BranchId; xp: number }) {
  const lvl = xpToLevel(xp, "branch");
  const { name } = rankNameByLevel(lvl);
  return (
    <div className="flex flex-col items-center p-2 rounded-2xl shadow bg-white/70 text-black">
      <div className="text-xs font-medium">{id}</div>
      <div className="text-xl font-bold">Lv {lvl}</div>
      <div className="text-[10px] opacity-70">{name}</div>
      <div className="text-[10px] mt-0.5">XP {Math.round(xp)}</div>
    </div>
  );
}

export type Item = { id: string; title: string };
function reorder<T>(arr: T[], from: number, to: number): T[] {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= arr.length ||
    to >= arr.length
  )
    return arr.slice();
  const copy = arr.slice();
  const [moved] = copy.splice(from, 1);
  copy.splice(to, 0, moved);
  return copy;
}
export function OrderList({
  items,
  onChange,
  height = 300,
}: {
  items: Item[];
  onChange: (n: Item[]) => void;
  height?: number;
}) {
  const [local, setLocal] = useState<Item[]>(items);
  const draggingIndex = useRef<number | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => setLocal(items), [items]);
  const autoScroll = (y: number) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const edge = 28;
    const speed = 14;
    if (y < r.top + edge) el.scrollTop -= speed * ((r.top + edge - y) / edge);
    else if (y > r.bottom - edge)
      el.scrollTop += speed * ((y - (r.bottom - edge)) / edge);
  };
  const onDragStart = (e: React.DragEvent, i: number) => {
    draggingIndex.current = i;
    e.dataTransfer.setData("text/plain", String(i));
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e: React.DragEvent, over: number) => {
    e.preventDefault();
    autoScroll(e.clientY);
    const from = draggingIndex.current;
    if (from == null || from === over) return;
    setLocal((prev) => {
      const next = reorder(prev, from, over);
      draggingIndex.current = over;
      return next;
    });
  };
  const onDrop = () => {
    draggingIndex.current = null;
    onChange(local);
  };
  return (
    <div
      ref={boxRef}
      className="rounded-xl bg-white/10 p-2 space-y-2 overflow-auto"
      style={{ height }}
    >
      {local.map((it, i) => (
        <div
          key={it.id}
          draggable
          onDragStart={(e) => onDragStart(e, i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDrop={onDrop}
          className="flex items-center gap-3 bg-white/70 text-black px-3 py-2 rounded shadow cursor-grab active:cursor-grabbing select-none"
        >
          <div className="w-6 text-center opacity-70">{i + 1}</div>
          <div className="flex-1 font-medium text-sm">{it.title}</div>
          <div className="opacity-50 text-xs">⇅ drag</div>
        </div>
      ))}
    </div>
  );
}

// src/feature/fitquest/components/TrainingModal.tsx
import React, { useEffect, useMemo, useState } from "react";
import { EXERCISES } from "@/feature/fitquest/constants";
import { useAppStore } from "@/store/useAppStore";
import { rankByValue, exerciseTotalXP } from "@/feature/fitquest/helpers";

type Step = "choose" | "input" | "summary";

export default function TrainingModal() {
  const store = useAppStore();
  const { training, cancelTraining, setTrainingValue, finishTraining } = store;

  const [step, setStep] = useState<Step>("choose");
  const [selected, setSelected] = useState<string | null>(null);
  const [local, setLocal] = useState("");
  const [xpDelta, setXpDelta] = useState<number>(0);
  const [oldBest, setOldBest] = useState<number>(0);
  const [newBest, setNewBest] = useState<number>(0);

  // сбрасываем при каждом открытии
  useEffect(() => {
    setStep("choose");
    setSelected(null);
    setLocal("");
    setXpDelta(0);
    setOldBest(0);
    setNewBest(0);
  }, [training?.exId]);

  if (!training) return null;

  // вычисляем ex всегда, без useMemo (чтобы не было разного числа хуков)
  const ex = selected ? EXERCISES.find((e) => e.id === selected) ?? null : null;

  // ---------- ШАГ 1: выбор упражнения ----------
  if (step === "choose") {
    return (
      <Overlay onClose={cancelTraining}>
        <Panel title="Выберите упражнение для тренировки">
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {EXERCISES.map((e) => (
              <div
                key={e.id}
                className={`p-2 rounded-xl cursor-pointer ${
                  selected === e.id ? "bg-yellow-200" : "bg-white"
                }`}
                onClick={() => setSelected(e.id)}
              >
                <div className="font-medium">{e.name}</div>
                <div className="text-xs opacity-70">{e.branch}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <Btn gray onClick={cancelTraining}>
              Отмена
            </Btn>
            <Btn disabled={!selected} onClick={() => setStep("input")}>
              Далее
            </Btn>
          </div>
        </Panel>
      </Overlay>
    );
  }

  // без выбраного упражнения дальше не идём (защита от гонок)
  if (!ex) return null;

  // ---------- ШАГ 2: ввод результата ----------
  if (step === "input") {
    const metricHint =
      ex.metric === "time" ? "секунды (меньше — лучше)" : "значение";

    const onConfirmInput = () => {
      const v = Number(String(local).replace(",", "."));
      if (!Number.isFinite(v)) return;

      // вычисляем «итоги» ДО фиксации в сторе
      const prevBest =
        store.bests[ex.id]?.best ?? (ex.betterIs === "lower" ? Infinity : 0);
      const newBestCandidate =
        ex.betterIs === "lower" ? Math.min(prevBest, v) : Math.max(prevBest, v);

      const prevRank = rankByValue(ex, prevBest === Infinity ? 0 : prevBest);
      const newRank = rankByValue(ex, newBestCandidate);

      const prevXP = exerciseTotalXP(ex, prevRank);
      const nextXP = exerciseTotalXP(ex, newRank);

      setOldBest(prevBest === Infinity ? 0 : prevBest);
      setNewBest(newBestCandidate);
      setXpDelta(Math.max(0, nextXP - prevXP));

      // сохраняем значение в training, но НЕ закрываем и НЕ коммитим — покажем summary
      setTrainingValue(v);
      setStep("summary");
    };

    return (
      <Overlay onClose={cancelTraining}>
        <Panel title={ex.name}>
          <div className="text-xs opacity-70 mb-3">
            Введите результат ({metricHint})
          </div>

          <input
            autoFocus
            inputMode="decimal"
            className="w-full rounded-xl border px-3 py-2 mb-3"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Например: 25"
          />

          <div className="flex justify-end gap-2">
            <Btn gray onClick={cancelTraining}>
              Отмена
            </Btn>
            <Btn onClick={onConfirmInput}>Сохранить</Btn>
          </div>
        </Panel>
      </Overlay>
    );
  }

  // ---------- ШАГ 3: Итоги тренировки ----------
  const onFinish = () => {
    // теперь окончательно фиксируем результат в сторе
    finishTraining();
  };

  return (
    <Overlay onClose={onFinish}>
      <Panel title="Итоги тренировки">
        <div className="rounded-xl bg-white p-3 flex items-center justify-between">
          <div>
            <div className="font-medium">{ex.name}</div>
            <div className="text-xs opacity-70">
              Было: {oldBest} • Стало: {newBest}
            </div>
          </div>
          <div className="text-green-700 font-semibold">
            {xpDelta > 0 ? `+${xpDelta} XP` : "+0 XP"}
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <Btn onClick={onFinish}>Готово</Btn>
        </div>
      </Panel>
    </Overlay>
  );
}

/* ===== UI-утилиты для модалки ===== */

function Overlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,.45)" }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-[420px] max-w-[95vw] rounded-2xl p-4 text-black"
      style={{
        background: "linear-gradient(#ffffff,#f4f4f4)",
        border: "3px solid #7d0f0f",
      }}
    >
      <div className="text-lg font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}

function Btn({
  children,
  onClick,
  disabled,
  gray,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  gray?: boolean;
}) {
  const base = "px-3 py-1 rounded-full border-2";
  const active =
    "text-[#7d0f0f] border-[#7d0f0f] shadow-[0_6px_0_rgba(125,15,15,.6)]";
  const yellow = "bg-gradient-to-b from-[#FFE86A] to-[#F1D85A]";
  const muted = "bg-gray-200 border-gray-400 text-gray-700";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${gray ? muted : yellow + " " + active} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}

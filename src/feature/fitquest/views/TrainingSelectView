// src/feature/fitquest/views/TrainingSelectView.tsx
import React, { useMemo, useState } from "react";
import type { AppState, BranchId } from "@/feature/fitquest/types";
import {
  BRANCH_CATEGORIES,
  EXERCISES,
} from "@/feature/fitquest/constants";
import { computeUnlocks } from "@/feature/fitquest/helpers";

type Props = {
  state: AppState;
  goBack: () => void;
};

type BranchCollapsed = Record<BranchId, boolean>;
type CategoryCollapsed = Record<string, boolean>;

const BRANCHES: BranchId[] = ["Strength", "Agility", "Endurance"];

export default function TrainingSelectView({ state, goBack }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [branchCollapsed, setBranchCollapsed] = useState<BranchCollapsed>({
    Strength: false,
    Agility: true,
    Endurance: true,
  });
  const [categoryCollapsed, setCategoryCollapsed] =
    useState<CategoryCollapsed>({});

  const unlocks = useMemo(() => computeUnlocks(state), [state]);

  const toggleExercise = (id: string, unlocked: boolean) => {
    if (!unlocked) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selected.includes(id);

  const toggleBranch = (b: BranchId) => {
    setBranchCollapsed((prev) => ({ ...prev, [b]: !prev[b] }));
  };

  const toggleCategory = (key: string) => {
    setCategoryCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white/10 rounded-3xl p-3 shadow-xl space-y-4 text-black">
      {/* header */}
      <div className="flex items-center justify-between mb-1">
        <div className="text-xl font-semibold text-yellow-300">
          Select exercises
        </div>
        <button
          onClick={goBack}
          className="px-3 py-1 rounded-full text-[#7d0f0f]"
          style={{
            background: "linear-gradient(#FFE86A,#F1D85A)",
            border: "3px solid #7d0f0f",
            boxShadow: "0 6px 0 rgba(125,15,15,.6)",
          }}
        >
          Back
        </button>
      </div>

      <div className="text-xs text-yellow-100/80">
        Choose exercises you want to include in this training session. Locked
        exercises are shown, but cannot be selected yet.
      </div>

      {/* branches */}
      <div className="space-y-3">
        {BRANCHES.map((branch) => {
          const categories = BRANCH_CATEGORIES[branch] ?? [];
          const collapsed = branchCollapsed[branch];

          return (
            <div
              key={branch}
              className="bg-white/15 rounded-2xl px-3 py-2 space-y-2"
            >
              {/* branch header */}
              <button
                type="button"
                onClick={() => toggleBranch(branch)}
                className="w-full flex items-center justify-between text-left text-yellow-200"
              >
                <span className="font-semibold">{branch}</span>
                <span className="text-xs">
                  {collapsed ? "Show" : "Hide"}
                </span>
              </button>

              {!collapsed && (
                <div className="mt-1 space-y-2">
                  {categories.map((catName) => {
                    const catKey = `${branch}:${catName}`;
                    const catCollapsed = categoryCollapsed[catKey] ?? false;
                    const exercises = EXERCISES.filter(
                      (ex) =>
                        ex.branch === branch && ex.category === catName
                    );

                    return (
                      <div
                        key={catKey}
                        className="bg-white/80 rounded-xl p-2 space-y-1"
                      >
                        {/* category header */}
                        <button
                          type="button"
                          onClick={() => toggleCategory(catKey)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <span className="text-sm font-semibold">
                            {catName}
                          </span>
                          <span className="text-xs text-gray-600">
                            {catCollapsed ? "▼" : "▲"}
                          </span>
                        </button>

                        {!catCollapsed && (
                          <div className="mt-1 space-y-1">
                            {exercises.map((ex) => {
                              const unlocked = !!unlocks[ex.id];
                              const selectedNow = isSelected(ex.id);

                              return (
                                <button
                                  key={ex.id}
                                  type="button"
                                  onClick={() =>
                                    toggleExercise(ex.id, unlocked)
                                  }
                                  className={[
                                    "w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs",
                                    unlocked
                                      ? selectedNow
                                        ? "bg-emerald-600 text-white"
                                        : "bg-white text-black hover:bg-emerald-50"
                                      : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70",
                                  ].join(" ")}
                                >
                                  <span className="flex-1">
                                    {ex.name}
                                    {!unlocked && (
                                      <span className="ml-1 text-[10px] uppercase tracking-wide">
                                        (Locked)
                                      </span>
                                    )}
                                  </span>
                                  {unlocked && (
                                    <span className="ml-2 text-[10px]">
                                      {selectedNow ? "Selected" : "Tap to add"}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* footer with summary */}
      <div className="pt-2 border-t border-white/20 flex items-center justify-between text-yellow-100">
        <div className="text-xs">
          Selected exercises:{" "}
          <span className="font-semibold">{selected.length}</span>
        </div>
        <button
          type="button"
          className="px-4 py-1.5 rounded-full text-xs font-bold text-[#0b231b]"
          style={{
            background: "linear-gradient(#52e6b8,#34d399)",
            border: "2px solid rgba(0,0,0,.35)",
            boxShadow: "0 4px 0 rgba(30,90,60,.5)",
          }}
          // TODO: на следующем шаге будет запуск реальной тренировки
          onClick={() => {
            // пока просто алерт, чтобы было видно, что работает
            alert(
              selected.length
                ? `Planned training with ${selected.length} exercises`
                : "Select at least one exercise"
            );
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

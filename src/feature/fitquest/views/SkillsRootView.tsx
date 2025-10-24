// src/feature/fitquest/views/SkillsRootView.tsx
import React from "react";
import { SKILL_ICONS } from "../constants";
import type { AppState, BranchId } from "@/feature/fitquest/types";
import { rankNameByLevel, xpToLevel } from "@/feature/fitquest/helpers";
import { EXERCISES } from "@/feature/fitquest/constants";
import { useAppStore } from "@/store/useAppStore";

export default function SkillsRootView({
  state,
  goBack,
}: {
  state: AppState;
  goBack: () => void;
}) {
  const branches: BranchId[] = ["Strength", "Agility", "Endurance"];
  const actions = useAppStore();

  return (
    <div className="bg-white/10 rounded-3xl p-3 shadow-xl space-y-4">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-yellow-300">Skills</div>
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

      {/* Ветки навыков */}
      {branches.map((b) => {
        const xp = state.branches[b].xp;
        const lvl = xpToLevel(xp, "branch");
        const rk = rankNameByLevel(lvl).name;
        const branchExercises = EXERCISES.filter((e) => e.branch === b);

        return (
          <div key={b} className="bg-white/20 rounded-2xl p-3 space-y-2">
            {/* Заголовок ветки */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src={SKILL_ICONS[b]}
                alt={b}
                className="w-9 h-9 object-contain rounded-md"
                draggable={false}
              />
              <div className="text-left text-black">
                <div className="text-base font-semibold">{b}</div>
                <div className="text-xs opacity-80">
                  Level <b>{lvl}</b> • {rk}
                </div>
              </div>
            </div>

            {/* Список упражнений */}
            <div className="space-y-1">
              {branchExercises.map((ex) => {
                const best =
                  state.bests[ex.id]?.best ??
                  (ex.betterIs === "lower" ? "—" : 0);
                const rank = state.bests[ex.id]?.rank ?? 0;
                return (
                  <div
                    key={ex.id}
                    className="rounded-xl bg-white/80 p-3 flex items-center justify-between text-black"
                  >
                    <div>
                      <div className="font-semibold text-sm">{ex.name}</div>
                      <div className="text-xs opacity-70">
                        Best: {best} • Rank: {rank}
                      </div>
                    </div>
                    <button
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs hover:bg-emerald-700"
                      onClick={() => actions.startTraining(ex.id)}
                    >
                      Тренироваться
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

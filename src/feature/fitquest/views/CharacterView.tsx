// src/feature/fitquest/views/CharacterView.tsx
import React from "react";
import type { AppState } from "@/feature/fitquest/types";
import { ProgressPill, BranchStat } from "@/feature/fitquest/components"; // если у тебя файл components.tsx лежит прямо в feature/fitquest (без папки), поменяй импорт на '@/feature/fitquest/components'
import {
  getHeroImageByXP,
  rankNameByLevel,
  xpToLevel,
} from "@/feature/fitquest/helpers";

export default function CharacterView({
  state,
  gotoSkills,
}: {
  state: AppState;
  gotoSkills: () => void;
}) {
  const level = xpToLevel(state.totalXP, "character");
  const heroRank = rankNameByLevel(level);
  const heroSrc = getHeroImageByXP(state.totalXP);

  return (
    <div className="space-y-3">
      <div className="bg-white/10 rounded-3xl p-4 shadow-xl flex flex-col items-center">
        <img
          src={heroSrc}
          alt={heroRank.name}
          className="w-[220px] sm:w-[260px] h-auto object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,.55)]"
          draggable={false}
        />
        <div className="text-2xl font-semibold mt-1 text-yellow-300">
          {state.name}
        </div>

        <div className="mt-2 flex gap-2 flex-wrap justify-center">
          <ProgressPill label="XP" value={Math.round(state.totalXP)} />
          <ProgressPill label="Level" value={level} />
          <ProgressPill label="Rank" value={heroRank.name} />
        </div>

        <button
          onClick={gotoSkills}
          className="mt-4 px-5 py-2 rounded-full font-extrabold text-[#0b231b]"
          style={{
            background: "linear-gradient(#52e6b8,#34d399)",
            border: "2px solid rgba(0,0,0,.35)",
            boxShadow: "0 6px 0 rgba(30,90,60,.5),0 10px 20px rgba(0,0,0,.35)",
          }}
        >
          open skills
        </button>
      </div>

      <div className="bg-white/10 rounded-3xl p-3 shadow-xl">
        <div className="text-lg font-semibold text-yellow-300 mb-2">Skills</div>
        <div className="grid grid-cols-3 gap-2">
          {(["Strength", "Agility", "Endurance"] as const).map((b) => (
            <BranchStat key={b} id={b} xp={state.branches[b].xp} />
          ))}
        </div>
      </div>
    </div>
  );
}

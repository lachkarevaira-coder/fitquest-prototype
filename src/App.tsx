// src/App.tsx
import React, { useState } from "react";
import { Wood, ScaleToFit, SideNav } from "@/feature/fitquest/components";
import CharacterView from "@/feature/fitquest/views/CharacterView";
import SkillsRootView from "@/feature/fitquest/views/SkillsRootView";
import TrainingModal from "@/feature/fitquest/components/TrainingModal";
import { useAppStore } from "@/store/useAppStore";

export default function App() {
  // Берём СТОР — весь state и actions уже тут
  const store = useAppStore();
  const [view, setView] = useState<"character" | "skills">("character");

  return (
    <Wood>
      <div className="h-[100dvh] w-full mx-auto px-2 pt-3 pb-3 text-yellow-100">
        <div className="h-full flex justify-center gap-3">
          <SideNav
            active={view === "character" ? "character" : "skills"}
            onNav={(v) => setView(v === "character" ? "character" : "skills")}
            className="shrink-0 self-start mt-16"
          />

          <div className="w-[300px] sm:w-[420px] h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="font-extrabold text-lg tracking-wide">
                FitQuest
              </div>
              <button
                onClick={store.hardReset}
                className="text-xs px-3 py-1 rounded bg-white/20 hover:bg-white/30"
              >
                Reset progress
              </button>
            </div>

            <div className="flex-1">
              <ScaleToFit>
                {view === "character" ? (
                  <CharacterView
                    state={store}
                    gotoSkills={() => setView("skills")}
                  />
                ) : (
                  <SkillsRootView
                    state={store}
                    goBack={() => setView("character")}
                  />
                )}
              </ScaleToFit>

              {/* Модалка тренировки: сама вернёт null, если training нет */}
              <TrainingModal />
            </div>
          </div>
        </div>
      </div>
    </Wood>
  );
}

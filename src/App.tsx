// src/App.tsx
import React, { useState } from "react";
import { Wood, ScaleToFit, SideNav } from "@/feature/fitquest/components";
import CharacterView from "@/feature/fitquest/views/CharacterView";
import SkillsRootView from "@/feature/fitquest/views/SkillsRootView";
import TrainingModal from "@/feature/fitquest/components/TrainingModal";
import TrainingSelectView from "@/feature/fitquest/views/TrainingSelectView";
import { useAppStore } from "@/store/useAppStore";

type AppView = "character" | "skills" | "training_select";

export default function App() {
  const store = useAppStore();
  const [view, setView] = useState<AppView>("character");

  return (
    <Wood>
      <div className="h-[100dvh] w-full mx-auto px-2 pt-3 pb-3 text-yellow-100">
        <div className="h-full flex justify-center gap-3">
          <SideNav
            active={view === "character" ? "character" : "skills"}
            onNav={(v) =>
              setView(
                v === "character"
                  ? "character"
                  : v === "skills"
                  ? "skills"
                  : "character"
              )
            }
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
                {view === "character" && (
                  <CharacterView
                    state={store}
                    onStartTraining={() => setView("training_select")}
                    gotoSkills={() => setView("skills")}
                  />
                )}

                {view === "skills" && (
                  <SkillsRootView
                    state={store}
                    goBack={() => setView("character")}
                  />
                )}

                {view === "training_select" && (
                  <TrainingSelectView
                    state={store}
                    goBack={() => setView("character")}
                  />
                )}
              </ScaleToFit>

              {/* пока оставляем модалку на будущее, она не мешает */}
              <TrainingModal />
            </div>
          </div>
        </div>
      </div>
    </Wood>
  );
}

// src/store/useAppStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { EXERCISES, RANKS } from "@/feature/fitquest/constants";
import type { AppState, TrainingSession } from "@/feature/fitquest/types";
import {
  rankByValue,
  exerciseTotalXP,
  saveState,
  loadState,
  computeUnlocks,
} from "@/feature/fitquest/helpers";

type Training = { exId: string; value: number | null };

type Actions = {
  setName: (name: string) => void;

  startTraining: (exId: string) => void;
  setTrainingValue: (v: number) => void;
  cancelTraining: () => void;
  finishTraining: () => void;

  goCharacter: () => void;
  goSkills: () => void;

  hardReset: () => void;
};

type Store = AppState & Actions;

const initial = loadState();

export const useAppStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initial,

      setName: (name) => {
        const next = { ...get(), name };
        set(next);
        saveState(next);
      },

      startTraining: (exId) => {
        set({ training: { exId, value: null } as Training });
      },

      setTrainingValue: (v) => {
        const t = get().training;
        if (!t) return;
        set({ training: { ...t, value: v } });
      },

      cancelTraining: () => set({ training: null }),

      finishTraining: () => {
        const state = get();
        const t = state.training;
        if (!t || t.value == null) return;

        const ex = EXERCISES.find((e) => e.id === t.exId)!;
        const prev = state.bests[ex.id] ?? {
          best: ex.betterIs === "lower" ? Infinity : 0,
          rank: 0,
        };
        const nowBest =
          ex.betterIs === "lower"
            ? Math.min(prev.best, t.value)
            : Math.max(prev.best, t.value);

        // Пересчитываем ранг по новому лучшему значению
        const newRank = rankByValue(ex, nowBest);
        const oldXP = exerciseTotalXP(ex, prev.rank);
        const newXP = exerciseTotalXP(ex, newRank);
        const gained = Math.max(0, newXP - oldXP);

        const next: AppState = {
          ...state,
          totalXP: state.totalXP + gained,
          branches: {
            ...state.branches,
            [ex.branch]: { xp: state.branches[ex.branch].xp + gained },
          },
          bests: {
            ...state.bests,
            [ex.id]: { best: nowBest, rank: newRank },
          },
          training: null,
          unlockedModal: null,
        };

        // Обновим анлоки (если есть правила)
        const unlocks = computeUnlocks(next);
        // Если что-то новое открылось — можно показать модалку позже; пока просто храним флаг
        next.unlockedModal = Object.values(unlocks).some(Boolean) ? null : null;

        set(next);
        saveState(next);
      },

      goCharacter: () => set({ view: "character" }),
      goSkills: () => set({ view: "skills" }),

      hardReset: () => {
        // полный сброс к initial
        const empty: AppState = {
          ...initial,
          bests: {},
          totalXP: 0,
          branches: {
            Strength: { xp: 0 },
            Agility: { xp: 0 },
            Endurance: { xp: 0 },
          },
          training: null,
          unlockedModal: null,
        };
        set(empty);
        saveState(empty);
      },
    }),
    {
      name: "fitquest_store",
      partialize: (s) => ({
        // что хранить в localStorage
        name: s.name,
        totalXP: s.totalXP,
        branches: s.branches,
        bests: s.bests,
      }),
    }
  )
);

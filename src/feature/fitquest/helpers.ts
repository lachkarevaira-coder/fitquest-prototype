import {
  DIFFICULTY_MULT,
  EXERCISES,
  GENERIC_THRESHOLDS,
  RANKS,
  RANK_BY_MIN_LEVEL,
  SPECIFIC_THRESHOLDS,
  STORAGE_KEY,
  HERO_BY_RANK,
} from "./constants";
import type { AppState, BranchId, Exercise, Metric } from "./types";

export function getThresholds(id: string, metric: Metric) {
  return SPECIFIC_THRESHOLDS[id] || GENERIC_THRESHOLDS[metric];
}

export function rankByValue(ex: Exercise, v: number) {
  const th = getThresholds(ex.id, ex.metric);
  if (ex.betterIs === "lower") {
    for (let r = th.length - 1; r >= 1; r--) if (v <= th[r]) return r;
    return 0;
  }
  let res = 0;
  for (let r = 1; r < th.length; r++) if (v >= th[r]) res = r;
  return res;
}

export function sumBaseXPGain(fromRank: number, toRank: number) {
  if (toRank <= fromRank) return 0;
  let s = 0;
  for (let r = fromRank + 1; r <= toRank; r++) s += RANKS[r - 1].baseXP;
  return s;
}
export function difficultyMult(ex: Exercise) {
  return DIFFICULTY_MULT[ex.difficulty] ?? 1;
}
export function exerciseTotalXP(ex: Exercise, rank: number) {
  return Math.round(difficultyMult(ex) * sumBaseXPGain(0, rank));
}

export function xpToLevel(totalXP: number, kind: "character" | "branch") {
  const maxLevel = 150;
  const coef = kind === "character" ? 100 : 70;
  const power = kind === "character" ? 1.3 : 1.25;
  const postMult = kind === "character" ? 1.5 : 1.4;
  let cum = 0;
  for (let L = 1; L <= maxLevel; L++) {
    const need = coef * Math.pow(L, power) * (L > 100 ? postMult : 1);
    cum += need;
    if (totalXP < cum) return L - 1;
  }
  return maxLevel;
}
export function rankNameByLevel(level: number) {
  let best = RANK_BY_MIN_LEVEL[0];
  for (const e of RANK_BY_MIN_LEVEL)
    if (level >= e.minLevel && e.minLevel >= best.minLevel) best = e as any;
  return { rank: best.rank, name: best.name };
}
export function getHeroImageByXP(totalXP: number) {
  const level = xpToLevel(totalXP, "character");
  const { rank } = rankNameByLevel(level);
  return HERO_BY_RANK[rank] ?? HERO_BY_RANK[0];
}

export function categoryXP(
  state: AppState,
  branch: BranchId,
  category: string
) {
  let sum = 0;
  for (const ex of EXERCISES)
    if (ex.branch === branch && ex.category === category)
      sum += exerciseTotalXP(ex, state.bests[ex.id]?.rank ?? 0);
  return sum;
}
export function categoryLevelRank(
  state: AppState,
  branch: BranchId,
  category: string
) {
  const xp = categoryXP(state, branch, category);
  const lvl = xpToLevel(xp, "branch");
  const rk = rankNameByLevel(lvl);
  return { xp, lvl, rk };
}

export function computeUnlocks(state: AppState) {
  const map: Record<string, boolean> = {};
  for (const ex of EXERCISES) map[ex.id] = !!ex.isBase;
  for (const ex of EXERCISES) {
    if (!ex.unlockRules?.length) continue;
    let ok = true;
    for (const r of ex.unlockRules) {
      const best = state.bests[r.prereqId]?.best ?? 0;
      if (r.comparator === ">=") {
        if (best < r.threshold) ok = false;
      } else {
        if (best > r.threshold) ok = false;
      }
      if (!ok) break;
    }
    if (ok) map[ex.id] = true;
  }
  return map;
}

export function unlockText(exId: string, state: AppState) {
  const ex = EXERCISES.find((e) => e.id === exId)!;
  if (!ex.unlockRules?.length) return "";
  return ex.unlockRules
    .map((r) => {
      const prereq = EXERCISES.find((e) => e.id === r.prereqId)!;
      const now = state.bests[prereq.id]?.best ?? 0;
      return `${prereq.name} ${r.comparator} ${r.threshold} (now ${now})`;
    })
    .join("; ");
}

export const DEFAULT_STATE: AppState = {
  view: "character",
  name: "Andress",
  totalXP: 0,
  branches: { Strength: { xp: 0 }, Agility: { xp: 0 }, Endurance: { xp: 0 } },
  bests: {},
  training: null,
  unlockedModal: null,
};
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) } as AppState;
  } catch {}
  return DEFAULT_STATE;
}
export function saveState(s: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}
export function resetState(): AppState {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

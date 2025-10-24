import type { BranchId, Exercise, Metric } from "./types";

// картинки можно добавить позже в /public/img/*
export const ASSETS = { bg: "/img/Background.jpg" };
export const ICONS = {
  character: "/img/Character button.jpg",
  skills: "/img/Skills button.jpg",
  friends: "/img/Friends button.jpg",
} as const;

export const SKILL_ICONS = {
  Strength: "/img/Strength button.jpg",
  Agility: "/img/Agility button.jpg",
  Endurance: "/img/Endurance button.jpg",
} as const;

// все спрайты героя на jpg
export const HERO_BY_RANK: Record<number, string> = {
  0: "/img/hero/0-no-rank.jpg",
  1: "/img/hero/1-novice.jpg",
  2: "/img/hero/2-apprentice.jpg",
  3: "/img/hero/3-seeker.jpg",
  4: "/img/hero/4-initiate.jpg",
  5: "/img/hero/5-tempered.jpg",
  6: "/img/hero/6-warrior.jpg",
  7: "/img/hero/7-veteran.jpg",
  8: "/img/hero/8-master.jpg",
  9: "/img/hero/9-conqueror.jpg",
  10: "/img/hero/10-champion.jpg",
  11: "/img/hero/11-hero.jpg",
  12: "/img/hero/12-chosen.jpg",
  13: "/img/hero/13-legend.jpg",
  14: "/img/hero/14-mythic.jpg",
  15: "/img/hero/15-demigod.jpg",
  16: "/img/hero/16-deity.jpg",
};

// прелоад (необязательно, но не мешает)
if (typeof Image !== "undefined")
  Object.values(HERO_BY_RANK).forEach((src) => {
    const i = new Image();
    i.src = src;
  });

export const DIFFICULTY_MULT: Record<string, number> = {
  Rookie: 0.2,
  Beginner: 0.8,
  Standard: 1.0,
  Advanced: 1.2,
  Elite: 1.5,
};

export const RANKS = [
  { num: 1, name: "Novice", baseXP: 10 },
  { num: 2, name: "Apprentice", baseXP: 40 },
  { num: 3, name: "Seeker", baseXP: 90 },
  { num: 4, name: "Initiate", baseXP: 170 },
  { num: 5, name: "Tempered", baseXP: 290 },
  { num: 6, name: "Warrior", baseXP: 450 },
  { num: 7, name: "Veteran", baseXP: 660 },
  { num: 8, name: "Master", baseXP: 920 },
  { num: 9, name: "Conqueror", baseXP: 1240 },
  { num: 10, name: "Champion", baseXP: 1620 },
  { num: 11, name: "Hero", baseXP: 2390 },
  { num: 12, name: "Chosen", baseXP: 3940 },
  { num: 13, name: "Legend", baseXP: 7040 },
  { num: 14, name: "Mythic", baseXP: 13240 },
  { num: 15, name: "Demigod", baseXP: 25640 },
  { num: 16, name: "Deity", baseXP: 50440 },
];

export const RANK_BY_MIN_LEVEL = [
  { rank: 0, name: "No Rank", minLevel: 0 },
  { rank: 1, name: "Novice", minLevel: 1 },
  { rank: 2, name: "Apprentice", minLevel: 11 },
  { rank: 3, name: "Seeker", minLevel: 21 },
  { rank: 4, name: "Initiate", minLevel: 31 },
  { rank: 5, name: "Tempered", minLevel: 41 },
  { rank: 6, name: "Warrior", minLevel: 51 },
  { rank: 7, name: "Veteran", minLevel: 61 },
  { rank: 8, name: "Master", minLevel: 71 },
  { rank: 9, name: "Conqueror", minLevel: 81 },
  { rank: 10, name: "Champion", minLevel: 91 },
  { rank: 11, name: "Hero", minLevel: 101 },
  { rank: 12, name: "Chosen", minLevel: 111 },
  { rank: 13, name: "Legend", minLevel: 121 },
  { rank: 14, name: "Mythic", minLevel: 131 },
  { rank: 15, name: "Demigod", minLevel: 141 },
  { rank: 16, name: "Deity", minLevel: 150 },
];

export const BRANCH_CATEGORIES: Record<BranchId, string[]> = {
  Strength: ["Pull Ups", "Push Ups", "Core", "Squats"],
  Agility: ["Handstands & Holds"],
  Endurance: [],
};

export const CATEGORY_ORDER: Record<string, string[]> = {
  "Pull Ups": [
    "classic_pull_ups",
    "chin_ups",
    "close_grip_pull_ups",
    "wide_grip_pull_ups",
    "behind_neck_pull_ups",
    "l_sit_pull_ups",
    "clap_pull_ups",
    "archer_pull_ups",
    "muscle_up",
  ],
  "Push Ups": [
    "classic_push_ups",
    "wide_grip_push_ups",
    "diamond_push_ups",
    "decline_push_ups",
    "clapping_push_ups",
    "parallel_bar_dips",
    "archer_push_ups",
    "one_arm_push_ups",
    "pike_push_ups",
    "wall_handstand_push_ups",
    "freestanding_handstand_push_ups",
    "pseudo_planche_push_ups",
  ],
};

export const EXERCISES: Exercise[] = [
  {
    id: "classic_pull_ups",
    name: "Classic pull-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Beginner",
    isBase: true,
  },
  {
    id: "chin_ups",
    name: "Chin-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Standard",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_pull_ups", comparator: ">=", threshold: 5 },
    ],
  },
  {
    id: "close_grip_pull_ups",
    name: "Close grip pull-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_pull_ups", comparator: ">=", threshold: 10 },
      { prereqId: "chin_ups", comparator: ">=", threshold: 8 },
    ],
  },
  {
    id: "wide_grip_pull_ups",
    name: "Wide grip pull-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_pull_ups", comparator: ">=", threshold: 10 },
    ],
  },
  {
    id: "behind_neck_pull_ups",
    name: "Behind the neck pull-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: false,
    unlockRules: [
      { prereqId: "wide_grip_pull_ups", comparator: ">=", threshold: 8 },
    ],
  },
  {
    id: "l_sit_pull_ups",
    name: "L-sit pull-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_pull_ups", comparator: ">=", threshold: 10 },
      { prereqId: "parallel_bars_l_sit_hold", comparator: ">=", threshold: 18 },
    ],
  },
  {
    id: "clap_pull_ups",
    name: "Clap pull-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_pull_ups", comparator: ">=", threshold: 20 },
    ],
  },
  {
    id: "archer_pull_ups",
    name: "Archer pull-ups",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_pull_ups", comparator: ">=", threshold: 13 },
      { prereqId: "wide_grip_pull_ups", comparator: ">=", threshold: 7 },
    ],
  },
  {
    id: "muscle_up",
    name: "Muscle-up",
    branch: "Strength",
    category: "Pull Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_pull_ups", comparator: ">=", threshold: 13 },
      { prereqId: "clap_pull_ups", comparator: ">=", threshold: 5 },
      { prereqId: "parallel_bar_dips", comparator: ">=", threshold: 12 },
    ],
  },

  {
    id: "classic_push_ups",
    name: "Classic push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Beginner",
    isBase: true,
  },
  {
    id: "wide_grip_push_ups",
    name: "Wide grip push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Standard",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_push_ups", comparator: ">=", threshold: 12 },
    ],
  },
  {
    id: "diamond_push_ups",
    name: "Diamond push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_push_ups", comparator: ">=", threshold: 12 },
    ],
  },
  {
    id: "decline_push_ups",
    name: "Decline push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Standard",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_push_ups", comparator: ">=", threshold: 21 },
    ],
  },
  {
    id: "clapping_push_ups",
    name: "Clapping push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_push_ups", comparator: ">=", threshold: 21 },
    ],
  },
  {
    id: "parallel_bar_dips",
    name: "Parallel bar dips",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: false,
    unlockRules: [
      { prereqId: "diamond_push_ups", comparator: ">=", threshold: 10 },
    ],
  },
  {
    id: "archer_push_ups",
    name: "Archer push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: false,
    unlockRules: [
      { prereqId: "wide_grip_push_ups", comparator: ">=", threshold: 13 },
    ],
  },
  {
    id: "one_arm_push_ups",
    name: "One-arm push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "archer_push_ups", comparator: ">=", threshold: 10 },
    ],
  },
  {
    id: "pike_push_ups",
    name: "Pike push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Standard",
    isBase: false,
    unlockRules: [
      { prereqId: "classic_push_ups", comparator: ">=", threshold: 12 },
    ],
  },
  {
    id: "wall_handstand_push_ups",
    name: "Wall handstand push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: false,
    unlockRules: [
      { prereqId: "pike_push_ups", comparator: ">=", threshold: 10 },
      {
        prereqId: "wall_handstand_hold_both_feet",
        comparator: ">=",
        threshold: 21,
      },
    ],
  },
  {
    id: "freestanding_handstand_push_ups",
    name: "Freestanding handstand push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "wall_handstand_push_ups", comparator: ">=", threshold: 7 },
      {
        prereqId: "freestanding_handstand_hold",
        comparator: ">=",
        threshold: 35,
      },
    ],
  },
  {
    id: "pseudo_planche_push_ups",
    name: "Pseudo planche push-ups",
    branch: "Strength",
    category: "Push Ups",
    metric: "reps",
    betterIs: "higher",
    difficulty: "Elite",
    isBase: false,
    unlockRules: [
      { prereqId: "wall_handstand_push_ups", comparator: ">=", threshold: 10 },
      { prereqId: "decline_push_ups", comparator: ">=", threshold: 21 },
      { prereqId: "parallel_bar_dips", comparator: ">=", threshold: 21 },
    ],
  },

  {
    id: "parallel_bars_l_sit_hold",
    name: "Parallel bars L-sit (hold)",
    branch: "Agility",
    category: "Handstands & Holds",
    metric: "duration_s",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: true,
  },
  {
    id: "wall_handstand_hold_both_feet",
    name: "Wall handstand (both feet) – hold",
    branch: "Agility",
    category: "Handstands & Holds",
    metric: "duration_s",
    betterIs: "higher",
    difficulty: "Standard",
    isBase: true,
  },
  {
    id: "freestanding_handstand_hold",
    name: "Freestanding handstand – hold",
    branch: "Agility",
    category: "Handstands & Holds",
    metric: "duration_s",
    betterIs: "higher",
    difficulty: "Advanced",
    isBase: true,
  },
];

export const GENERIC_THRESHOLDS: Record<Metric, number[]> = {
  reps: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 50],
  duration_s: [
    0, 5, 8, 12, 16, 20, 25, 30, 40, 50, 65, 80, 100, 120, 150, 180, 210,
  ],
};

export const SPECIFIC_THRESHOLDS: Record<string, number[]> = {
  classic_pull_ups: [
    0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 35, 40, 50,
  ],
  classic_push_ups: [
    0, 3, 5, 8, 12, 16, 21, 26, 32, 40, 50, 60, 80, 100, 120, 140, 160,
  ],
};

export const STORAGE_KEY = "fitquest_mvp_state_v1";

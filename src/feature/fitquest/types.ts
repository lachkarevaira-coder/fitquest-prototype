export type BranchId = 'Strength' | 'Agility' | 'Endurance'
export type Metric = 'reps' | 'duration_s'

export interface Exercise {
  id: string
  name: string
  branch: BranchId
  category: string
  metric: Metric
  betterIs: 'higher' | 'lower'
  difficulty: 'Rookie' | 'Beginner' | 'Standard' | 'Advanced' | 'Elite'
  isBase: boolean
  unlockRules?: Array<{ prereqId: string; comparator: '>=' | '<='; threshold: number }>
}

export interface BestMap { [exerciseId: string]: { best: number; rank: number } }

export interface TrainingSession {
  selection: string[]
  order: string[]
  current: number
  sets: Record<string, number[]>
  achievements: Array<{ exerciseId: string; fromRank: number; toRank: number; xp: number; value: number }>
  startSnapshot: { totalXP: number; branches: Record<BranchId, number> }
  startUnlocked: Record<string, boolean>
}

export type View =
  | 'character'
  | 'skills'
  | 'friends'
  | { branch: BranchId }
  | { category: { branch: BranchId; name: string } }
  | { exerciseId: string }
  | 'training_select'
  | 'training_order'
  | 'training_run'
  | 'training_summary'

export interface AppState {
  view: View
  name: string
  totalXP: number
  branches: Record<BranchId, { xp: number }>
  bests: BestMap
  training?: TrainingSession | null
  unlockedModal?: string[] | null
}

export function isBranchView(v: View): v is { branch: BranchId } {
  return typeof v === 'object' && v !== null && 'branch' in v && !('category' in v) && !('exerciseId' in v)
}
export function isCategoryView(v: View): v is { category: { branch: BranchId; name: string } } {
  return typeof v === 'object' && v !== null && 'category' in v
}
export function isExerciseView(v: View): v is { exerciseId: string } {
  return typeof v === 'object' && v !== null && 'exerciseId' in v
}

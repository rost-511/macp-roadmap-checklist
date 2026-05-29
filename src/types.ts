// Core domain types for the MACP Roadmap Checklist.

export type Status = 'not_started' | 'active' | 'done';

export type Filter = 'all' | 'active' | 'completed' | 'not_started';

/** A roadmap phase groups a set of mini-projects. */
export interface Phase {
  id: number;
  title: string;
  description: string;
}

/** Static definition of a mini-project (lives in code, never persisted). */
export interface RoadmapDef {
  id: string;
  phaseId: number;
  /** Global 1..32 sequence number. */
  number: number;
  title: string;
  goal: string;
}

/** The mutable, persisted portion of a mini-project. */
export interface ProgressEntry {
  status: Status;
  startedAt: string | null;
  completedAt: string | null;
}

/** A roadmap definition merged with its current progress = a live item. */
export interface Item extends RoadmapDef, ProgressEntry {}

/** Map of mini-project id -> its progress. This is what we persist. */
export type ProgressMap = Record<string, ProgressEntry>;

/** Shape written to localStorage under `macpRoadmapChecklist.v1`. */
export interface PersistedState {
  app: 'macp-roadmap-checklist';
  version: string;
  updatedAt: string;
  progress: ProgressMap;
}

/** Shape produced by Export and accepted by Import. */
export interface ExportFile {
  app: 'macp-roadmap-checklist';
  version: string;
  exportedAt: string;
  completed: number;
  total: number;
  items: Array<{
    id: string;
    number: number;
    title: string;
    status: Status;
    startedAt: string | null;
    completedAt: string | null;
  }>;
}

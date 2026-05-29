import type {
  ExportFile,
  Item,
  PersistedState,
  ProgressEntry,
  ProgressMap,
  Status,
} from '../types';
import { ROADMAP_ITEMS } from '../data/roadmap';

export const STORAGE_KEY = 'macpRoadmapChecklist.v1';
export const STATE_VERSION = 'v1';
export const APP_ID = 'macp-roadmap-checklist' as const;

const VALID_STATUSES: readonly Status[] = ['not_started', 'active', 'done'];
const VALID_IDS = new Set(ROADMAP_ITEMS.map((i) => i.id));

function isStatus(value: unknown): value is Status {
  return typeof value === 'string' && (VALID_STATUSES as readonly string[]).includes(value);
}

/** Narrow an unknown value into a clean ProgressEntry, or null if invalid. */
function toEntry(value: unknown): ProgressEntry | null {
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  if (!isStatus(v.status)) return null;
  const startedAt = v.startedAt === null || typeof v.startedAt === 'string' ? (v.startedAt as string | null) : null;
  const completedAt =
    v.completedAt === null || typeof v.completedAt === 'string' ? (v.completedAt as string | null) : null;
  return { status: v.status, startedAt, completedAt };
}

/**
 * Extract a valid ProgressMap from any unknown object. Accepts both the
 * persisted `{ progress: {...} }` shape and a raw `{ id: entry }` map.
 * Unknown ids are dropped so stale exports can't inject junk.
 */
function extractProgressMap(input: unknown): ProgressMap {
  const out: ProgressMap = {};
  if (typeof input !== 'object' || input === null) return out;
  const obj = input as Record<string, unknown>;
  const source =
    obj.progress && typeof obj.progress === 'object'
      ? (obj.progress as Record<string, unknown>)
      : obj;
  for (const [id, value] of Object.entries(source)) {
    if (!VALID_IDS.has(id)) continue;
    const entry = toEntry(value);
    if (entry) out[id] = entry;
  }
  return out;
}

/** Load persisted progress. Never throws — returns {} on any failure. */
export function loadProgress(): ProgressMap {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return extractProgressMap(JSON.parse(raw) as unknown);
  } catch {
    return {};
  }
}

/** Persist progress derived from the current items. Never throws. */
export function saveProgress(items: Item[]): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const progress: ProgressMap = {};
    for (const it of items) {
      progress[it.id] = {
        status: it.status,
        startedAt: it.startedAt,
        completedAt: it.completedAt,
      };
    }
    const payload: PersistedState = {
      app: APP_ID,
      version: STATE_VERSION,
      updatedAt: new Date().toISOString(),
      progress,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable (private mode / quota) — fail silently */
  }
}

/** Build the human-readable export payload. */
export function buildExportFile(items: Item[]): ExportFile {
  const completed = items.filter((i) => i.status === 'done').length;
  return {
    app: APP_ID,
    version: STATE_VERSION,
    exportedAt: new Date().toISOString(),
    completed,
    total: items.length,
    items: items.map((i) => ({
      id: i.id,
      number: i.number,
      title: i.title,
      status: i.status,
      startedAt: i.startedAt,
      completedAt: i.completedAt,
    })),
  };
}

/**
 * Validate + parse imported JSON text into a ProgressMap.
 * Returns null when the text is not valid / recognizable, so the UI can
 * surface a clean error instead of crashing.
 */
export function parseImport(text: string): ProgressMap | null {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  if (typeof data !== 'object' || data === null) return null;
  const obj = data as Record<string, unknown>;

  // Preferred export shape: { items: [{ id, status, startedAt, completedAt }] }
  if (Array.isArray(obj.items)) {
    const out: ProgressMap = {};
    for (const raw of obj.items) {
      if (typeof raw !== 'object' || raw === null) continue;
      const r = raw as Record<string, unknown>;
      if (typeof r.id !== 'string' || !VALID_IDS.has(r.id)) continue;
      const entry = toEntry(r);
      if (entry) out[r.id] = entry;
    }
    // An empty roadmap export (all reset) is still valid.
    return out;
  }

  // Fallback: a `{ progress: {...} }` object or a raw id->entry map.
  if (obj.progress && typeof obj.progress === 'object') {
    return extractProgressMap(obj);
  }
  const map = extractProgressMap(obj);
  return Object.keys(map).length > 0 ? map : null;
}

/** Trigger a client-side download of a JSON file. */
export function downloadJson(filename: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

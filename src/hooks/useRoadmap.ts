import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Item, ProgressMap } from '../types';
import { ROADMAP_ITEMS, TOTAL_ITEMS } from '../data/roadmap';
import { loadProgress, saveProgress } from '../lib/storage';

const DEFAULT_ENTRY = {
  status: 'not_started' as const,
  startedAt: null,
  completedAt: null,
};

const nowISO = (): string => new Date().toISOString();

/** Merge static roadmap definitions with a progress map into live items. */
function buildItems(progress: ProgressMap): Item[] {
  return ROADMAP_ITEMS.map((def) => {
    const saved = progress[def.id];
    return { ...def, ...(saved ?? DEFAULT_ENTRY) };
  });
}

export interface RoadmapStats {
  total: number;
  completed: number;
  activeCount: number;
  notStarted: number;
  percent: number;
  /** The project currently active, or the next one to pick up if none active. */
  currentFocus: Item | null;
  /** The next incomplete project after the current focus, if any. */
  nextUp: Item | null;
  allDone: boolean;
}

export interface UseRoadmap {
  items: Item[];
  stats: RoadmapStats;
  start: (id: string) => void;
  complete: (id: string) => void;
  reset: (id: string) => void;
  resetAll: () => void;
  replaceProgress: (progress: ProgressMap) => void;
}

export function useRoadmap(): UseRoadmap {
  const [items, setItems] = useState<Item[]>(() => buildItems(loadProgress()));

  // Persist on every change. saveProgress swallows its own errors.
  useEffect(() => {
    saveProgress(items);
  }, [items]);

  const start = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id || it.status === 'done') return it;
        return { ...it, status: 'active', startedAt: it.startedAt ?? nowISO() };
      }),
    );
  }, []);

  const complete = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const now = nowISO();
        return {
          ...it,
          status: 'done',
          startedAt: it.startedAt ?? now,
          completedAt: now,
        };
      }),
    );
  }, []);

  const reset = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, ...DEFAULT_ENTRY } : it,
      ),
    );
  }, []);

  const resetAll = useCallback(() => {
    setItems((prev) => prev.map((it) => ({ ...it, ...DEFAULT_ENTRY })));
  }, []);

  const replaceProgress = useCallback((progress: ProgressMap) => {
    setItems(buildItems(progress));
  }, []);

  const stats = useMemo<RoadmapStats>(() => {
    const completed = items.filter((i) => i.status === 'done').length;
    const activeCount = items.filter((i) => i.status === 'active').length;
    const notStarted = items.filter((i) => i.status === 'not_started').length;
    const percent = TOTAL_ITEMS === 0 ? 0 : Math.round((completed / TOTAL_ITEMS) * 100);

    const firstActive = items.find((i) => i.status === 'active') ?? null;
    const firstNotStarted = items.find((i) => i.status === 'not_started') ?? null;
    const currentFocus = firstActive ?? firstNotStarted;

    const nextUp =
      items.find((i) => i.status !== 'done' && i.id !== currentFocus?.id) ?? null;

    return {
      total: TOTAL_ITEMS,
      completed,
      activeCount,
      notStarted,
      percent,
      currentFocus,
      nextUp,
      allDone: completed === TOTAL_ITEMS,
    };
  }, [items]);

  return { items, stats, start, complete, reset, resetAll, replaceProgress };
}

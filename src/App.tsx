import { useCallback, useMemo, useRef, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Filter, Item } from './types';
import { PHASES } from './data/roadmap';
import { useRoadmap } from './hooks/useRoadmap';
import { buildExportFile, downloadJson, parseImport } from './lib/storage';
import { fileStamp } from './lib/format';
import { EASE_OUT, staggerParent, fadeUp } from './lib/motion';
import { HeaderStats } from './components/HeaderStats';
import { CurrentFocus } from './components/CurrentFocus';
import { PhaseSection } from './components/PhaseSection';
import { Toolbar } from './components/Toolbar';
import { ConfirmModal } from './components/ConfirmModal';
import { Toaster, type ToastData, type ToastKind } from './components/Toast';

function matchesFilter(item: Item, filter: Filter): boolean {
  switch (filter) {
    case 'active':
      return item.status === 'active';
    case 'completed':
      return item.status === 'done';
    case 'not_started':
      return item.status === 'not_started';
    default:
      return true;
  }
}

export default function App() {
  const { items, stats, start, complete, reset, resetAll, replaceProgress } = useRoadmap();
  const [filter, setFilter] = useState<Filter>('all');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  // Keep a live ref so action handlers stay referentially stable (memoized cards).
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const toastTimer = useRef<number | undefined>(undefined);

  const pushToast = useCallback((kind: ToastKind, message: string) => {
    setToast({ id: Date.now(), kind, message });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3600);
  }, []);

  const dismissToast = useCallback(() => {
    window.clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  const handleComplete = useCallback(
    (id: string) => {
      const it = itemsRef.current.find((i) => i.id === id);
      complete(id);
      if (it && it.status !== 'done') pushToast('success', `Done: ${it.title}`);
    },
    [complete, pushToast],
  );

  const handleExport = useCallback(() => {
    downloadJson(`macp-roadmap-${fileStamp()}.json`, buildExportFile(itemsRef.current));
    pushToast('success', 'Progress exported as JSON.');
  }, [pushToast]);

  const handleImportFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const map = parseImport(String(reader.result ?? ''));
        if (!map) {
          pushToast('error', "That file isn't valid roadmap JSON.");
          return;
        }
        replaceProgress(map);
        const n = Object.keys(map).length;
        pushToast('success', `Progress imported (${n} project${n === 1 ? '' : 's'}).`);
      };
      reader.onerror = () => pushToast('error', "Couldn't read that file.");
      reader.readAsText(file);
    },
    [replaceProgress, pushToast],
  );

  const confirmResetAll = useCallback(() => {
    resetAll();
    setConfirmOpen(false);
    pushToast('info', 'All progress has been reset.');
  }, [resetAll, pushToast]);

  const grouped = useMemo(
    () =>
      PHASES.map((phase) => {
        const all = items.filter((i) => i.phaseId === phase.id);
        return { phase, all, visible: all.filter((i) => matchesFilter(i, filter)) };
      }),
    [items, filter],
  );

  const anyVisible = grouped.some((g) => g.visible.length > 0);

  const counts = useMemo(
    () => ({
      all: items.length,
      active: stats.activeCount,
      completed: stats.completed,
      not_started: stats.notStarted,
    }),
    [items.length, stats.activeCount, stats.completed, stats.notStarted],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <div className="aura" aria-hidden="true" />

        <header className="topbar">
          <div className="topbar__inner">
            <a className="brand" href="#top">
              <span className="brand__mark" aria-hidden="true" />
              <span className="brand__name">MACP Roadmap</span>
            </a>
            <div className="topbar__progress" aria-hidden="true">
              <div className="topbar__bar">
                <span className="topbar__bar-fill" style={{ width: `${stats.percent}%` }} />
              </div>
              <span className="topbar__pct">{stats.percent}%</span>
              <span className="topbar__count">
                {stats.completed}/{stats.total}
              </span>
            </div>
          </div>
        </header>

        <main className="container" id="top">
          <motion.header
            className="hero"
            initial="hidden"
            animate="show"
            variants={staggerParent}
          >
            <motion.span className="hero__eyebrow" variants={fadeUp}>
              <Sparkles size={14} strokeWidth={2.5} /> Monetization roadmap
            </motion.span>
            <motion.h1 className="hero__title" variants={fadeUp}>
              MACP Roadmap
            </motion.h1>
            <motion.p className="hero__subtitle" variants={fadeUp}>
              From working habit app to monetized AI productivity platform.
            </motion.p>
            <motion.div className="hero__chips" variants={fadeUp}>
              <span className="chip">9 phases</span>
              <span className="chip">32 mini-projects</span>
              <span className="chip">Web · Google Play · App Store</span>
            </motion.div>
          </motion.header>

          <HeaderStats stats={stats} />

          <CurrentFocus
            item={stats.currentFocus}
            total={stats.total}
            completed={stats.completed}
            allDone={stats.allDone}
            onStart={start}
            onComplete={handleComplete}
          />

          <Toolbar
            filter={filter}
            onFilter={setFilter}
            counts={counts}
            onExport={handleExport}
            onImportFile={handleImportFile}
            onResetAll={() => setConfirmOpen(true)}
          />

          <div className="timeline">
            {anyVisible ? (
              grouped.map(
                (g) =>
                  g.visible.length > 0 && (
                    <PhaseSection
                      key={g.phase.id}
                      phase={g.phase}
                      allItems={g.all}
                      visibleItems={g.visible}
                      onStart={start}
                      onComplete={handleComplete}
                      onReset={reset}
                    />
                  ),
              )
            ) : (
              <motion.div
                className="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                <p className="empty__title">Nothing here yet</p>
                <p className="empty__sub">No mini-projects match the “{filter.replace('_', ' ')}” filter.</p>
                <button type="button" className="btn btn--soft btn--sm" onClick={() => setFilter('all')}>
                  Show all projects
                </button>
              </motion.div>
            )}
          </div>

          <footer className="footer">
            <span className="footer__dot" aria-hidden="true" />
            MACP build tracker · local only
          </footer>
        </main>

        <Toaster toast={toast} onDismiss={dismissToast} />

        <ConfirmModal
          open={confirmOpen}
          title="Reset all progress?"
          message="This clears every started and completed date for all 32 mini-projects. The roadmap itself stays intact. This can't be undone."
          confirmLabel="Reset everything"
          cancelLabel="Keep my progress"
          onConfirm={confirmResetAll}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}

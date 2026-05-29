import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, CheckCircle2, Clock, Play, Sparkles } from 'lucide-react';
import type { Item } from '../types';
import { PHASE_BY_ID } from '../data/roadmap';
import { formatDateTime } from '../lib/format';
import { EASE_OUT } from '../lib/motion';

interface Props {
  item: Item | null;
  total: number;
  completed: number;
  allDone: boolean;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
}

export function CurrentFocus({ item, total, completed, allDone, onStart, onComplete }: Props) {
  return (
    <section className="focus" aria-label="Current focus">
      <AnimatePresence mode="wait" initial={false}>
        {allDone || !item ? (
          <motion.div
            key="done-all"
            className="focus__card focus__card--complete"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <div className="focus__glow" aria-hidden="true" />
            <span className="focus__eyebrow focus__eyebrow--done">
              <Sparkles size={13} /> Roadmap complete
            </span>
            <h2 className="focus__title">Every mini-project is shipped.</h2>
            <p className="focus__goal">
              All {total} projects across 9 phases are done — from monetization foundation to
              launch analytics. Export a backup, or reset progress from the toolbar to run it again.
            </p>
            <div className="focus__complete-badge">
              <CheckCircle2 size={18} strokeWidth={2.5} /> {completed} / {total} complete
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={item.id}
            className={`focus__card${item.status === 'active' ? ' is-active' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <div className="focus__glow" aria-hidden="true" />

            <div className="focus__top">
              <span className={`focus__eyebrow${item.status === 'active' ? ' focus__eyebrow--active' : ''}`}>
                {item.status === 'active' ? (
                  <>
                    <span className="pill__dot" aria-hidden="true" /> Current focus
                  </>
                ) : (
                  <>
                    <ArrowRight size={13} /> Recommended next
                  </>
                )}
              </span>
              <span className="focus__phase">
                Phase {item.phaseId} · {PHASE_BY_ID[item.phaseId]?.title}
              </span>
            </div>

            <div className="focus__heading">
              <span className="focus__num" aria-hidden="true">
                {String(item.number).padStart(2, '0')}
              </span>
              <h2 className="focus__title">{item.title}</h2>
            </div>

            <p className="focus__goal">{item.goal}</p>

            <div className="focus__meta">
              <span className="meta-chip">
                <Clock size={13} aria-hidden="true" />
                Started: {formatDateTime(item.startedAt)}
              </span>
              <span className="meta-chip">
                <Check size={13} aria-hidden="true" />
                Completed: {formatDateTime(item.completedAt)}
              </span>
              <span className="focus__counter">
                Project {item.number} of {total}
              </span>
            </div>

            <div className="focus__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => (item.status === 'active' ? onComplete(item.id) : onStart(item.id))}
              >
                {item.status === 'active' ? (
                  <>
                    <Check size={17} strokeWidth={2.5} /> Mark complete
                  </>
                ) : (
                  <>
                    <Play size={16} strokeWidth={2.5} /> Start project
                  </>
                )}
              </button>

              {item.status === 'active' ? (
                <span className="focus__hint">
                  <span className="pill__dot" aria-hidden="true" /> In progress
                </span>
              ) : (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => onComplete(item.id)}
                >
                  <Check size={16} strokeWidth={2.5} /> Complete now
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

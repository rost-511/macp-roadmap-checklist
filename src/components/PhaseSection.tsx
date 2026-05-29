import { motion } from 'framer-motion';
import type { Item, Phase } from '../types';
import { EASE_OUT, staggerParent } from '../lib/motion';
import { RoadmapCard } from './RoadmapCard';

interface Props {
  phase: Phase;
  /** All items in the phase (for progress), regardless of the active filter. */
  allItems: Item[];
  /** Items that pass the current filter (what we actually render). */
  visibleItems: Item[];
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onReset: (id: string) => void;
}

export function PhaseSection({ phase, allItems, visibleItems, onStart, onComplete, onReset }: Props) {
  const total = allItems.length;
  const done = allItems.filter((i) => i.status === 'done').length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const complete = done === total;

  return (
    <section className={`phase${complete ? ' phase--complete' : ''}`} aria-label={`Phase ${phase.id}: ${phase.title}`}>
      <motion.div
        className="phase__head"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="phase__node">
          <span>{String(phase.id).padStart(2, '0')}</span>
        </div>
        <div className="phase__intro">
          <span className="phase__eyebrow">Phase {phase.id}</span>
          <h2 className="phase__title">{phase.title}</h2>
          <p className="phase__desc">{phase.description}</p>
          <div className="phase__meter" role="presentation">
            <div className="phase__meter-track">
              <motion.div
                className="phase__meter-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
              />
            </div>
            <span className="phase__meter-label">
              {done} / {total}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="phase__cards"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerParent}
      >
        {visibleItems.map((item) => (
          <RoadmapCard
            key={item.id}
            item={item}
            onStart={onStart}
            onComplete={onComplete}
            onReset={onReset}
          />
        ))}
      </motion.div>
    </section>
  );
}

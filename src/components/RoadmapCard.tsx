import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Clock, Play, RotateCcw } from 'lucide-react';
import type { Item } from '../types';
import { formatDate } from '../lib/format';
import { cardItem, springSoft } from '../lib/motion';
import { StatusPill } from './StatusPill';

interface Props {
  item: Item;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onReset: (id: string) => void;
}

function RoadmapCardBase({ item, onStart, onComplete, onReset }: Props) {
  const { status } = item;
  const isDone = status === 'done';
  const isActive = status === 'active';

  return (
    <motion.article
      className={`card is-${status}`}
      variants={cardItem}
      layout="position"
      whileHover={{ y: -3 }}
      transition={springSoft}
    >
      <div className="card__rail" aria-hidden="true">
        <div className="card__node">
          <AnimatePresence mode="wait" initial={false}>
            {isDone ? (
              <motion.span
                key="check"
                className="card__node-check"
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 16 }}
              >
                <Check size={18} strokeWidth={3} />
              </motion.span>
            ) : (
              <motion.span
                key="num"
                className="card__node-num"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {String(item.number).padStart(2, '0')}
              </motion.span>
            )}
          </AnimatePresence>
          {isActive && <span className="card__node-pulse" aria-hidden="true" />}
        </div>
        <span className="card__rail-line" aria-hidden="true" />
      </div>

      <div className="card__body">
        <div className="card__head">
          <span className="card__phase">Phase {item.phaseId}</span>
          <StatusPill status={status} />
        </div>

        {isDone && (
          <p className="card__doneline">
            <Check size={13} strokeWidth={3} aria-hidden="true" />
            Done: {item.title}
          </p>
        )}

        <h3 className="card__title">{item.title}</h3>
        <p className="card__goal">{item.goal}</p>

        <div className="card__meta">
          <span className="meta-chip meta-chip--sm">
            <Play size={11} aria-hidden="true" />
            Started {formatDate(item.startedAt)}
          </span>
          <span className="meta-chip meta-chip--sm">
            <Clock size={11} aria-hidden="true" />
            Completed {formatDate(item.completedAt)}
          </span>
        </div>
      </div>

      <div className="card__actions">
        <button
          type="button"
          className="btn btn--sm btn--soft"
          onClick={() => onStart(item.id)}
          disabled={status !== 'not_started'}
        >
          <Play size={14} strokeWidth={2.5} /> Start
        </button>
        <button
          type="button"
          className="btn btn--sm btn--primary"
          onClick={() => onComplete(item.id)}
          disabled={isDone}
        >
          <Check size={14} strokeWidth={2.5} /> Complete
        </button>
        <button
          type="button"
          className="btn btn--sm btn--icon"
          onClick={() => onReset(item.id)}
          disabled={status === 'not_started'}
          aria-label={`Reset ${item.title}`}
          title="Reset"
        >
          <RotateCcw size={14} strokeWidth={2.5} />
        </button>
      </div>
    </motion.article>
  );
}

export const RoadmapCard = memo(RoadmapCardBase);

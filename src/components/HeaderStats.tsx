import { motion } from 'framer-motion';
import { CheckCircle2, CircleDot, FlagTriangleRight, Route } from 'lucide-react';
import type { ReactNode } from 'react';
import type { RoadmapStats } from '../hooks/useRoadmap';
import { ProgressRing } from './ProgressRing';
import { cardItem, staggerParent } from '../lib/motion';

interface Props {
  stats: RoadmapStats;
}

interface TileProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sub?: string;
  tone?: 'brand' | 'success' | 'muted';
}

function StatTile({ icon, label, value, sub, tone = 'brand' }: TileProps) {
  return (
    <motion.div className={`tile tile--${tone}`} variants={cardItem}>
      <span className="tile__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="tile__label">{label}</span>
      <span className="tile__value">{value}</span>
      {sub && <span className="tile__sub">{sub}</span>}
    </motion.div>
  );
}

export function HeaderStats({ stats }: Props) {
  const { completed, total, percent, activeCount, currentFocus, nextUp, allDone } = stats;

  const activeItem = activeCount > 0 ? currentFocus : null;

  return (
    <motion.section
      className="stats-panel"
      initial="hidden"
      animate="show"
      variants={staggerParent}
      aria-label="Roadmap progress summary"
    >
      <motion.div className="stats-panel__ring" variants={cardItem}>
        <ProgressRing value={percent} />
      </motion.div>

      <div className="stats-panel__grid">
        <StatTile
          icon={<CheckCircle2 size={16} />}
          label="Completed"
          tone="success"
          value={
            <>
              {completed}
              <span className="tile__value-dim"> / {total}</span>
            </>
          }
          sub="mini-projects shipped"
        />
        <StatTile
          icon={<CircleDot size={16} />}
          label="Active project"
          value={activeItem ? activeItem.title : '—'}
          sub={activeItem ? `Project ${activeItem.number}` : 'Nothing in progress'}
        />
        <StatTile
          icon={<FlagTriangleRight size={16} />}
          label="Next up"
          value={allDone ? 'Roadmap complete' : nextUp ? nextUp.title : '—'}
          sub={allDone ? 'All 32 shipped' : nextUp ? `Project ${nextUp.number}` : '—'}
        />
        <StatTile
          icon={<Route size={16} />}
          label="Estimated journey"
          tone="muted"
          value="9 phases"
          sub="Foundation → Launch"
        />
      </div>
    </motion.section>
  );
}

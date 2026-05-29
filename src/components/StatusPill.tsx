import { Check, Circle } from 'lucide-react';
import type { Status } from '../types';

interface Props {
  status: Status;
}

const LABELS: Record<Status, string> = {
  not_started: 'Not started',
  active: 'Active',
  done: 'Done',
};

/** Status conveyed by icon + text + color (never color alone). */
export function StatusPill({ status }: Props) {
  return (
    <span className={`pill pill--${status}`}>
      {status === 'done' ? (
        <Check size={12} strokeWidth={3} aria-hidden="true" />
      ) : status === 'active' ? (
        <span className="pill__dot" aria-hidden="true" />
      ) : (
        <Circle size={11} strokeWidth={2.5} aria-hidden="true" />
      )}
      {LABELS[status]}
    </span>
  );
}

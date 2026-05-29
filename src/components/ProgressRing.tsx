import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  value: number; // 0..100
  size?: number;
  stroke?: number;
}

export function ProgressRing({ value, size = 168, stroke = 13 }: Props) {
  const reduce = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - clamped / 100);
  const center = size / 2;

  return (
    <div
      className="ring"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Overall progress: ${clamped} percent complete`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="ring__svg" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="52%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle
          className="ring__track"
          cx={center}
          cy={center}
          r={r}
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          className="ring__value"
          cx={center}
          cy={center}
          r={r}
          strokeWidth={stroke}
          fill="none"
          stroke="url(#ringGrad)"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? offset : c }}
          animate={{ strokeDashoffset: offset }}
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 55, damping: 18, delay: 0.2 }}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="ring__center">
        <span className="ring__pct">
          <span className="ring__num">{clamped}</span>
          <span className="ring__unit">%</span>
        </span>
        <span className="ring__label">complete</span>
      </div>
    </div>
  );
}

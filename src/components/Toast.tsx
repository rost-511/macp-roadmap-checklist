import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { EASE_OUT } from '../lib/motion';

export type ToastKind = 'success' | 'error' | 'info';

export interface ToastData {
  id: number;
  kind: ToastKind;
  message: string;
}

interface Props {
  toast: ToastData | null;
  onDismiss: () => void;
}

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
} as const;

export function Toaster({ toast, onDismiss }: Props) {
  const Icon = toast ? ICONS[toast.kind] : null;
  return (
    <div className="toaster" aria-live="polite" aria-atomic="true">
      {toast && Icon && (
        // Conditional mount + key remounts on each new toast (replays enter).
        <motion.div
          key={toast.id}
          className={`toast toast--${toast.kind}`}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.26, ease: EASE_OUT }}
        >
          <span className="toast__icon" aria-hidden="true">
            <Icon size={17} strokeWidth={2.5} />
          </span>
          <span className="toast__msg">{toast.message}</span>
          <button
            type="button"
            className="toast__close"
            onClick={onDismiss}
            aria-label="Dismiss notification"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </div>
  );
}

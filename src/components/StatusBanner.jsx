import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Info, TriangleAlert, X } from 'lucide-react';

const ICONS = {
  error: AlertCircle,
  info: Info,
  warning: TriangleAlert,
};

const STYLES = {
  error: 'border-rose-400/25 bg-rose-500/10 text-rose-100',
  info: 'border-sky-300/25 bg-sky-500/10 text-sky-100',
  warning: 'border-amber-300/25 bg-amber-500/10 text-amber-100',
};

export default function StatusBanner({ status, onDismiss }) {
  const Icon = status ? ICONS[status.type] ?? Info : Info;

  return (
    <AnimatePresence>
      {status ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className={`mt-4 flex items-start gap-3 rounded-[24px] border px-4 py-3 shadow-glass ${STYLES[status.type] ?? STYLES.info}`}
        >
          <div className="status-blink mt-0.5">
            <Icon size={18} />
          </div>
          <p className="flex-1 text-sm leading-6">{status.message}</p>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full p-1 text-current/70 transition hover:bg-white/10 hover:text-current"
            aria-label="Dismiss status"
          >
            <X size={16} />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

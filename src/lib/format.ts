// Small, dependency-free date formatting helpers.

const DATE_TIME: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
};

const DATE_ONLY: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
};

const EM_DASH = '—';

function parse(iso: string | null): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "May 29, 2026, 11:42 PM" — falls back to an em dash. */
export function formatDateTime(iso: string | null): string {
  const d = parse(iso);
  return d ? d.toLocaleString(undefined, DATE_TIME) : EM_DASH;
}

/** "May 29, 2026" — falls back to an em dash. */
export function formatDate(iso: string | null): string {
  const d = parse(iso);
  return d ? d.toLocaleDateString(undefined, DATE_ONLY) : EM_DASH;
}

/** Compact "yyyy-mm-dd-hhmm" stamp for export filenames. */
export function fileStamp(date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}` +
    `-${p(date.getHours())}${p(date.getMinutes())}`
  );
}

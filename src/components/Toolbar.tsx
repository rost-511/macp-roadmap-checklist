import { useRef, type ChangeEvent } from 'react';
import { Download, Trash2, Upload } from 'lucide-react';
import type { Filter } from '../types';

interface Counts {
  all: number;
  active: number;
  completed: number;
  not_started: number;
}

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
  counts: Counts;
  onExport: () => void;
  onImportFile: (file: File) => void;
  onResetAll: () => void;
}

const FILTERS: { key: Filter; label: string; countKey: keyof Counts }[] = [
  { key: 'all', label: 'All', countKey: 'all' },
  { key: 'active', label: 'Active', countKey: 'active' },
  { key: 'completed', label: 'Completed', countKey: 'completed' },
  { key: 'not_started', label: 'Not started', countKey: 'not_started' },
];

export function Toolbar({ filter, onFilter, counts, onExport, onImportFile, onResetAll }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImportFile(file);
    // Reset so importing the same filename twice still fires onChange.
    e.target.value = '';
  };

  return (
    <div className="toolbar">
      <div className="segmented" role="group" aria-label="Filter mini-projects">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`segmented__btn${filter === f.key ? ' is-on' : ''}`}
            aria-pressed={filter === f.key}
            onClick={() => onFilter(f.key)}
          >
            {f.label}
            <span className="segmented__count">{counts[f.countKey]}</span>
          </button>
        ))}
      </div>

      <div className="toolbar__actions">
        <button type="button" className="btn btn--soft btn--sm" onClick={onExport}>
          <Download size={15} strokeWidth={2.5} /> Export
        </button>
        <button
          type="button"
          className="btn btn--soft btn--sm"
          onClick={() => fileRef.current?.click()}
        >
          <Upload size={15} strokeWidth={2.5} /> Import
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="visually-hidden"
          onChange={handleFile}
          tabIndex={-1}
          aria-hidden="true"
        />
        <button type="button" className="btn btn--danger-soft btn--sm" onClick={onResetAll}>
          <Trash2 size={15} strokeWidth={2.5} /> Reset all
        </button>
      </div>
    </div>
  );
}

import clsx from 'clsx';
import type { FilterType } from '@/types';

type TodoFilterProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
};

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="flex gap-1 mb-4 bg-surface-2 rounded-xl p-1 border border-surface-3">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={clsx(
            'flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-150',
            filter === f.value
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-muted hover:text-text'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

import { useState } from 'react';
import { Plus } from 'lucide-react';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="Add a new task…"
        className="flex-1 bg-surface-2 border border-surface-3 rounded-xl px-4 py-3 text-text placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-150 text-sm"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 flex items-center gap-2 transition-all duration-150 font-medium text-sm shadow-lg hover:shadow-primary/30"
      >
        <Plus size={18} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}

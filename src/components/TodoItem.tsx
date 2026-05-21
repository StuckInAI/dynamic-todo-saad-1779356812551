import { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Pencil, X, Save } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (text: string) => void;
};

export default function TodoItem({
  todo,
  isEditing,
  onEdit,
  onCancelEdit,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) {
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onUpdate(editValue);
    if (e.key === 'Escape') onCancelEdit();
  };

  return (
    <div
      className={clsx(
        'group flex items-center gap-3 bg-surface-2 border rounded-xl px-4 py-3 transition-all duration-150',
        todo.completed ? 'border-surface-3 opacity-60' : 'border-surface-3 hover:border-primary/40'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-150',
          todo.completed
            ? 'bg-success border-success text-white'
            : 'border-surface-3 hover:border-primary'
        )}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      {isEditing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-surface-3 border border-primary/50 rounded-lg px-3 py-1.5 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm leading-relaxed',
            todo.completed ? 'line-through text-text-muted' : 'text-text'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 ml-auto">
        {isEditing ? (
          <>
            <button
              onClick={() => onUpdate(editValue)}
              className="p-1.5 rounded-lg text-success hover:bg-success/10 transition-colors duration-150"
              aria-label="Save"
            >
              <Save size={15} />
            </button>
            <button
              onClick={onCancelEdit}
              className="p-1.5 rounded-lg text-text-muted hover:bg-surface-3 transition-colors duration-150"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-150 opacity-0 group-hover:opacity-100"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-all duration-150 opacity-0 group-hover:opacity-100"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

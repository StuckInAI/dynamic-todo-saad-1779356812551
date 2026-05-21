import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import TodoFilter from '@/components/TodoFilter';
import TodoStats from '@/components/TodoStats';
import { supabase } from '@/lib/supabase';
import { CheckSquare, AlertCircle, Loader2 } from 'lucide-react';

export default function TodoPage() {
  const {
    todos,
    loading,
    error,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  const [editingId, setEditingId] = useState<string | null>(null);

  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl p-8 max-w-md w-full text-center border border-surface-3">
          <AlertCircle className="mx-auto mb-4 text-yellow-400" size={48} />
          <h2 className="text-xl font-bold text-text mb-2">Supabase Not Connected</h2>
          <p className="text-text-muted text-sm">
            Please set <code className="bg-surface-3 px-1 rounded text-primary">VITE_SUPABASE_URL</code> and{' '}
            <code className="bg-surface-3 px-1 rounded text-primary">VITE_SUPABASE_ANON_KEY</code> environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <CheckSquare size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text tracking-tight">My Todos</h1>
            <p className="text-text-muted text-sm">{activeCount} task{activeCount !== 1 ? 's' : ''} remaining</p>
          </div>
        </div>

        {/* Input */}
        <TodoInput onAdd={addTodo} />

        {/* Stats */}
        <TodoStats activeCount={activeCount} completedCount={completedCount} />

        {/* Filter */}
        <TodoFilter filter={filter} setFilter={setFilter} />

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* List */}
        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={32} className="animate-spin text-primary" />
            </div>
          ) : todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface-2 flex items-center justify-center mb-4">
                <CheckSquare size={32} className="text-text-muted" />
              </div>
              <p className="text-text-muted font-medium">No todos here!</p>
              <p className="text-text-muted text-sm mt-1">
                {filter === 'all' ? 'Add one above to get started.' : `No ${filter} todos.`}
              </p>
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                onEdit={() => setEditingId(todo.id)}
                onCancelEdit={() => setEditingId(null)}
                onToggle={() => toggleTodo(todo.id, todo.completed)}
                onDelete={() => deleteTodo(todo.id)}
                onUpdate={async (text) => {
                  await updateTodo(todo.id, text);
                  setEditingId(null);
                }}
              />
            ))
          )}
        </div>

        {/* Clear completed */}
        {completedCount > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearCompleted}
              className="text-sm text-text-muted hover:text-danger transition-colors duration-150 flex items-center gap-1"
            >
              Clear {completedCount} completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

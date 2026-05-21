import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Todo, FilterType } from '@/types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchTodos = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setTodos(data as Todo[]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (text: string) => {
    if (!supabase || !text.trim()) return;
    try {
      const { data, error: err } = await supabase
        .from('todos')
        .insert([{ text: text.trim(), completed: false }])
        .select()
        .single();
      if (err) throw err;
      setTodos(prev => [data as Todo, ...prev]);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    if (!supabase) return;
    try {
      const { error: err } = await supabase
        .from('todos')
        .update({ completed: !completed })
        .eq('id', id);
      if (err) throw err;
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, completed: !completed } : t))
      );
    } catch (e: any) {
      setError(e.message);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!supabase) return;
    try {
      const { error: err } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      if (err) throw err;
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const updateTodo = async (id: string, text: string) => {
    if (!supabase || !text.trim()) return;
    try {
      const { error: err } = await supabase
        .from('todos')
        .update({ text: text.trim() })
        .eq('id', id);
      if (err) throw err;
      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, text: text.trim() } : t))
      );
    } catch (e: any) {
      setError(e.message);
    }
  };

  const clearCompleted = async () => {
    if (!supabase) return;
    try {
      const { error: err } = await supabase
        .from('todos')
        .delete()
        .eq('completed', true);
      if (err) throw err;
      setTodos(prev => prev.filter(t => !t.completed));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return {
    todos: filteredTodos,
    allTodos: todos,
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
    refetch: fetchTodos,
  };
}

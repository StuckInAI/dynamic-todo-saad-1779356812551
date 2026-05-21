import { ListTodo, CheckCircle2 } from 'lucide-react';

type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ activeCount, completedCount }: TodoStatsProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-1 bg-surface-2 border border-surface-3 rounded-xl p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <ListTodo size={16} className="text-primary" />
        </div>
        <div>
          <p className="text-xs text-text-muted">Active</p>
          <p className="text-lg font-bold text-text">{activeCount}</p>
        </div>
      </div>
      <div className="flex-1 bg-surface-2 border border-surface-3 rounded-xl p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
          <CheckCircle2 size={16} className="text-success" />
        </div>
        <div>
          <p className="text-xs text-text-muted">Done</p>
          <p className="text-lg font-bold text-text">{completedCount}</p>
        </div>
      </div>
      <div className="flex-1 bg-surface-2 border border-surface-3 rounded-xl p-3 flex flex-col justify-center">
        <div className="flex justify-between text-xs text-text-muted mb-1">
          <span>Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full h-2 bg-surface-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

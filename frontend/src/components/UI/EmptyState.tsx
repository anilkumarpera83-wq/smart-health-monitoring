import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, actionText, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 my-6">
      <div className="rounded-full bg-slate-100 p-4 text-slate-400 mb-3">
        <FolderOpen className="h-8 w-8" />
      </div>
      <h4 className="text-base font-semibold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="rounded-lg bg-health-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-health-blue-700 transition-colors shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

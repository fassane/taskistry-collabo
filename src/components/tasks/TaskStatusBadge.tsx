
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TaskStatus } from '@/utils/types';
import { CheckCircle2, CircleEllipsis, Clock } from 'lucide-react';

interface TaskStatusBadgeProps {
  status: TaskStatus;
  size?: 'sm' | 'md' | 'lg';
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'todo':
        return {
          variant: 'outline' as const,
          label: 'À faire',
          icon: <Clock className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} />,
          className: 'border-gray-300 text-gray-600',
        };
      case 'in_progress':
        return {
          variant: 'secondary' as const,
          label: 'En cours',
          icon: <CircleEllipsis className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} />,
          className: 'bg-blue-100 border-blue-300 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        };
      case 'completed':
        return {
          variant: 'default' as const,
          label: 'Terminé',
          icon: <CheckCircle2 className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} />,
          className: 'bg-green-100 border-green-300 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        };
      default:
        return {
          variant: 'outline' as const,
          label: 'Inconnu',
          icon: null,
          className: '',
        };
    }
  };

  const config = getStatusConfig();
  
  return (
    <Badge 
      variant={config.variant}
      className={`flex items-center transition-all ${size === 'sm' ? 'text-xs py-0' : 'text-sm'} ${config.className}`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};

export default TaskStatusBadge;

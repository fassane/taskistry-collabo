
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import TaskStatusBadge from '@/components/tasks/TaskStatusBadge';
import { Task, User } from '@/utils/types';
import { AlertCircle, CalendarDays, Edit, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskCardProps {
  task: Task;
  users: User[];
  onEdit?: (task: Task) => void;
  onChangeStatus?: (taskId: string, newStatus: Task['status']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  users,
  onEdit,
  onChangeStatus 
}) => {
  const assignedUser = task.assignedTo 
    ? users.find(user => user.id === task.assignedTo) 
    : null;
  
  const createdByUser = users.find(user => user.id === task.createdBy);
  
  const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();
  
  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd MMM yyyy', { locale: fr });
  };

  const getStatusOptions = () => {
    return [
      { value: 'todo', label: 'À faire' },
      { value: 'in_progress', label: 'En cours' },
      { value: 'completed', label: 'Terminé' },
    ].filter(option => option.value !== task.status);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <TaskStatusBadge status={task.status} />
            {isOverdue && (
              <div className="flex items-center text-xs text-destructive">
                <AlertCircle className="h-3 w-3 mr-1" />
                <span>En retard</span>
              </div>
            )}
          </div>
          <h3 className="font-medium text-base line-clamp-1">{task.title}</h3>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit && onEdit(task)}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
            {getStatusOptions().map(option => (
              <DropdownMenuItem 
                key={option.value} 
                onClick={() => onChangeStatus && onChangeStatus(task.id, option.value as Task['status'])}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{task.description}</p>
        
        <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          <span>Échéance: {formatDate(task.dueDate)}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex-shrink-0 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="text-xs text-muted-foreground">Créé par:</div>
            <Avatar className="h-6 w-6 ml-2">
              <AvatarImage src={createdByUser?.avatar} />
              <AvatarFallback>{createdByUser?.name.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
          </div>
          
          {assignedUser && (
            <div className="flex items-center">
              <div className="text-xs text-muted-foreground mr-2">Assigné à:</div>
              <Avatar className="h-6 w-6">
                <AvatarImage src={assignedUser.avatar} />
                <AvatarFallback>{assignedUser.name.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;

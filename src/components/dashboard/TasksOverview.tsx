
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CircleEllipsis, Clock } from 'lucide-react';
import { Task } from '@/utils/types';
import { Progress } from '@/components/ui/progress';

interface TasksOverviewProps {
  tasks: Task[];
}

const TasksOverview: React.FC<TasksOverviewProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  
  const completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const inProgressPercentage = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;
  const todoPercentage = totalTasks > 0 ? Math.round((todoTasks / totalTasks) * 100) : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Aperçu des tâches</CardTitle>
        <CardDescription>Répartition des statuts de toutes les tâches</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {totalTasks === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Aucune tâche disponible
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  <span>Terminées</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{completedTasks}</span>
                  <span className="text-muted-foreground text-sm">{completedPercentage}%</span>
                </div>
              </div>
              <Progress value={completedPercentage} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CircleEllipsis className="w-4 h-4 mr-2 text-blue-500" />
                  <span>En cours</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{inProgressTasks}</span>
                  <span className="text-muted-foreground text-sm">{inProgressPercentage}%</span>
                </div>
              </div>
              <Progress value={inProgressPercentage} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  <span>À faire</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{todoTasks}</span>
                  <span className="text-muted-foreground text-sm">{todoPercentage}%</span>
                </div>
              </div>
              <Progress value={todoPercentage} className="h-2 bg-muted" indicatorClassName="bg-orange-500" />
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total des tâches</span>
                <span className="font-medium">{totalTasks}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TasksOverview;

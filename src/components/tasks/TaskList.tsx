
import React, { useState } from 'react';
import { Task, User, TaskStatus } from '@/utils/types';
import TaskCard from './TaskCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Filter } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  users: User[];
  onEdit?: (task: Task) => void;
  onChangeStatus?: (taskId: string, newStatus: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  users,
  onEdit,
  onChangeStatus 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    const matchesAssignee = 
      assigneeFilter === 'all' || 
      assigneeFilter === 'unassigned' && !task.assignedTo ||
      task.assignedTo === assigneeFilter;
    
    return matchesSearch && matchesStatus && matchesAssignee;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des tâches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-full md:w-40">
            <Label htmlFor="status-filter" className="sr-only">Filtrer par statut</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="todo">À faire</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-40">
            <Label htmlFor="assignee-filter" className="sr-only">Filtrer par responsable</Label>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger id="assignee-filter" className="w-full">
                <SelectValue placeholder="Responsable" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les responsables</SelectItem>
                <SelectItem value="unassigned">Non assigné</SelectItem>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              users={users}
              onEdit={onEdit}
              onChangeStatus={onChangeStatus}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Aucune tâche ne correspond à vos critères de filtrage.</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;

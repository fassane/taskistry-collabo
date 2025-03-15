
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Project, Task, User, TaskStatus } from '@/utils/types';

interface CreateTaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  projects: Project[];
  users: User[];
  initialData?: Task;
  onCancel?: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  onSubmit,
  projects,
  users,
  initialData,
  onCancel,
}) => {
  const { user } = useAuth();
  const isEditing = !!initialData;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [assignedTo, setAssignedTo] = useState<string | null>(null);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  // Set initial form data if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setProjectId(initialData.projectId);
      setStatus(initialData.status);
      setDueDate(new Date(initialData.dueDate));
      setAssignedTo(initialData.assignedTo);
    }
  }, [initialData]);

  // Update available users based on selected project
  useEffect(() => {
    if (projectId) {
      const selectedProject = projects.find((p) => p.id === projectId);
      const projectUsers = selectedProject 
        ? users.filter((u) => selectedProject.members.includes(u.id))
        : [];
      setAvailableUsers(projectUsers);
      
      // Reset assignee if not in the current project
      if (assignedTo && !projectUsers.some(u => u.id === assignedTo)) {
        setAssignedTo(null);
      }
    } else {
      setAvailableUsers([]);
      setAssignedTo(null);
    }
  }, [projectId, projects, users, assignedTo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (!title || !description || !projectId || !dueDate) return;
    
    const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      projectId,
      status,
      dueDate,
      assignedTo,
      createdBy: initialData ? initialData.createdBy : user.id,
    };
    
    onSubmit(newTask);
  };

  const canAssignTeachers = user?.role !== 'student';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la tâche"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description détaillée de la tâche"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="project">Projet</Label>
        <Select 
          value={projectId} 
          onValueChange={setProjectId}
          disabled={isEditing} // Can't change project when editing
        >
          <SelectTrigger id="project">
            <SelectValue placeholder="Sélectionnez un projet" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">À faire</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Date d'échéance</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? (
                  format(dueDate, "PPP", { locale: fr })
                ) : (
                  <span>Sélectionnez une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={(date) => setDueDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="assignee">Responsable</Label>
        <Select 
          value={assignedTo || ''} 
          onValueChange={setAssignedTo}
          disabled={!projectId || (availableUsers.length === 0)}
        >
          <SelectTrigger id="assignee">
            <SelectValue placeholder="Sélectionnez un responsable" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Non assigné</SelectItem>
            {availableUsers
              .filter(u => canAssignTeachers || u.role !== 'teacher')
              .map((assignee) => (
                <SelectItem key={assignee.id} value={assignee.id}>
                  {assignee.name} {assignee.role === 'teacher' ? '(Enseignant)' : ''}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {projectId && availableUsers.length === 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Aucun membre disponible dans ce projet.
          </p>
        )}
        {!canAssignTeachers && (
          <p className="text-xs text-amber-600 mt-1">
            Les étudiants ne peuvent pas assigner de tâches aux enseignants.
          </p>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit">
          {isEditing ? 'Mettre à jour' : 'Créer'} la tâche
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;

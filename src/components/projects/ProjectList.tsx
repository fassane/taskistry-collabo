
import React, { useState } from 'react';
import { Project, User, Task } from '@/utils/types';
import ProjectCard from './ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  users: User[];
  tasks: Task[];
  onCreateNew: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  users,
  tasks,
  onCreateNew 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTaskCountForProject = (projectId: string): number => {
    return tasks.filter(task => task.projectId === projectId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des projets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Button onClick={onCreateNew} className="gap-1">
          <Plus className="h-4 w-4" />
          <span>Nouveau projet</span>
        </Button>
      </div>
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              users={users}
              taskCount={getTaskCountForProject(project.id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm 
              ? "Aucun projet ne correspond à votre recherche." 
              : "Aucun projet n'a encore été créé."
            }
          </p>
          <Button onClick={onCreateNew} variant="outline" className="mt-4">
            Créer votre premier projet
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;

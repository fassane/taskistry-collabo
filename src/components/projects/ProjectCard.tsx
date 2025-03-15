
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AvatarGroup } from '@/components/ui/avatar';
import { Project, User } from '@/utils/types';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  users: User[];
  taskCount?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, users, taskCount = 0 }) => {
  const createdByUser = users.find(user => user.id === project.createdBy);
  
  const projectMembers = users.filter(user => 
    project.members.includes(user.id)
  );
  
  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd MMM yyyy', { locale: fr });
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 pb-2 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg line-clamp-1">{project.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(project.createdAt)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {project.members.length} membre{project.members.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="text-sm">
            <span className="font-medium">{taskCount}</span>
            <span className="text-muted-foreground ml-1">tâche{taskCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <div className="mt-4">
          {projectMembers.length > 0 && (
            <div className="flex items-center">
              <AvatarGroup limit={5}>
                {projectMembers.map(member => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex-shrink-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Créé par: </span>
            <Avatar className="h-5 w-5 ml-1">
              <AvatarImage src={createdByUser?.avatar} />
              <AvatarFallback>{createdByUser?.name.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <span className="ml-1">{createdByUser?.name}</span>
          </div>
          
          <Button asChild variant="ghost" size="sm" className="ml-auto">
            <Link to={`/projects/${project.id}`}>
              <span>Détails</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

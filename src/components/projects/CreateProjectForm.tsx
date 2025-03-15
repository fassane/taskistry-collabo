
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Project, User } from '@/utils/types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CreateProjectFormProps {
  onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  users: User[];
  initialData?: Project;
  onCancel?: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onSubmit,
  users,
  initialData,
  onCancel,
}) => {
  const { user } = useAuth();
  const isEditing = !!initialData;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Set initial form data if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setMembers(initialData.members);
    } else if (user) {
      // Always include current user as member for new projects
      setMembers([user.id]);
    }
  }, [initialData, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (!title || !description) return;
    
    const projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      createdBy: initialData ? initialData.createdBy : user.id,
      members,
    };
    
    onSubmit(projectData);
  };

  const addMember = (userId: string) => {
    if (!members.includes(userId)) {
      setMembers([...members, userId]);
    }
    setPopoverOpen(false);
  };

  const removeMember = (userId: string) => {
    // Don't allow removing yourself
    if (userId === user?.id) return;
    
    setMembers(members.filter(id => id !== userId));
  };

  const getAvailableUsers = () => {
    return users.filter(u => !members.includes(u.id));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre du projet</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du projet"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description détaillée du projet"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="members">Membres du projet</Label>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={getAvailableUsers().length === 0}
              >
                Ajouter des membres
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Rechercher un utilisateur..." />
                <CommandList>
                  <CommandEmpty>Aucun utilisateur trouvé</CommandEmpty>
                  <CommandGroup>
                    {getAvailableUsers().map(availableUser => (
                      <CommandItem
                        key={availableUser.id}
                        onSelect={() => addMember(availableUser.id)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={availableUser.avatar} alt={availableUser.name} />
                          <AvatarFallback>{availableUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{availableUser.name}</span>
                        <Badge variant="outline" className="ml-auto capitalize">
                          {availableUser.role}
                        </Badge>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="border rounded-md p-2 min-h-[100px]">
          {members.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {members.map(memberId => {
                const memberUser = users.find(u => u.id === memberId);
                if (!memberUser) return null;
                
                return (
                  <Badge 
                    key={memberId} 
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1 rounded-full"
                  >
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={memberUser.avatar} alt={memberUser.name} />
                      <AvatarFallback>{memberUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{memberUser.name}</span>
                    {memberId !== user?.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.preventDefault();
                          removeMember(memberId);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Badge>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucun membre ajouté au projet
            </p>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          Vous serez automatiquement ajouté en tant que membre et créateur du projet.
        </p>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit">
          {isEditing ? 'Mettre à jour' : 'Créer'} le projet
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;

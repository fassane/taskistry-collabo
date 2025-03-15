
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  Home,
  Users
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export const AppSidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <span className="font-bold text-xl tracking-tight">
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Taskistry
          </span>
          <span className="text-xs font-semibold ml-1 bg-primary/10 text-primary px-2 py-0.5 rounded-md">
            ESMT
          </span>
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'text-primary' : ''}
                end
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Tableau de bord</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/projects" 
                className={({ isActive }) => isActive ? 'text-primary' : ''}
              >
                <FolderKanban className="w-5 h-5 mr-3" />
                <span>Projets</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => isActive ? 'text-primary' : ''}
              >
                <CheckSquare className="w-5 h-5 mr-3" />
                <span>Tâches</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/statistics" 
                className={({ isActive }) => isActive ? 'text-primary' : ''}
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                <span>Statistiques</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {user.role === 'admin' && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink 
                  to="/users" 
                  className={({ isActive }) => isActive ? 'text-primary' : ''}
                >
                  <Users className="w-5 h-5 mr-3" />
                  <span>Utilisateurs</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 text-xs text-center text-muted-foreground">
        <div className="space-y-1">
          <p>Taskistry ESMT</p>
          <p>© {new Date().getFullYear()} - Tous droits réservés</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

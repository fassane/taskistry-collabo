
import React from 'react';
import { Check, CheckCircle2, Clock, CircleEllipsis, ListTodo, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import TasksOverview from '@/components/dashboard/TasksOverview';
import StatCard from '@/components/dashboard/StatCard';
import { Task, Project, User, Statistic, UserPerformance } from '@/utils/types';

// Sample data for demonstration
const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Moussa Diop',
    email: 'moussa.diop@esmt.sn',
    role: 'teacher',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Prof. Fatou Ndiaye',
    email: 'fatou.ndiaye@esmt.sn',
    role: 'teacher',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Omar Faye',
    email: 'omar.faye@esmt.sn',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Aminata Sow',
    email: 'aminata.sow@esmt.sn',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Développement d\'une application mobile éducative',
    description: 'Créer une application mobile pour aider les étudiants à réviser leurs cours de programmation avec des quiz interactifs.',
    createdBy: '1',
    members: ['1', '3', '4'],
    createdAt: new Date(2023, 2, 15),
    updatedAt: new Date(2023, 3, 1),
  },
  {
    id: '2',
    title: 'Recherche sur l\'intelligence artificielle en éducation',
    description: 'Étudier les applications potentielles de l\'IA pour améliorer l\'apprentissage en ligne.',
    createdBy: '2',
    members: ['2', '3'],
    createdAt: new Date(2023, 4, 10),
    updatedAt: new Date(2023, 4, 20),
  },
];

const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Concevoir les maquettes de l\'application',
    description: 'Créer les wireframes et les maquettes pour l\'application mobile.',
    projectId: '1',
    status: 'completed',
    dueDate: new Date(2023, 3, 1),
    assignedTo: '4',
    createdBy: '1',
    createdAt: new Date(2023, 2, 16),
    updatedAt: new Date(2023, 2, 28),
  },
  {
    id: '2',
    title: 'Développer l\'API backend',
    description: 'Créer les endpoints nécessaires pour stocker et récupérer les données des quiz.',
    projectId: '1',
    status: 'in_progress',
    dueDate: new Date(2023, 4, 1),
    assignedTo: '3',
    createdBy: '1',
    createdAt: new Date(2023, 3, 2),
    updatedAt: new Date(2023, 3, 15),
  },
  {
    id: '3',
    title: 'Revue de littérature sur l\'IA en éducation',
    description: 'Identifier et analyser les recherches existantes sur l\'utilisation de l\'IA dans l\'éducation.',
    projectId: '2',
    status: 'todo',
    dueDate: new Date(2023, 5, 1),
    assignedTo: '3',
    createdBy: '2',
    createdAt: new Date(2023, 4, 11),
    updatedAt: new Date(2023, 4, 11),
  },
  {
    id: '4',
    title: 'Développer un prototype de système de recommandation',
    description: 'Créer un prototype de système basé sur l\'IA pour recommander des ressources d\'apprentissage.',
    projectId: '2',
    status: 'todo',
    dueDate: new Date(2023, 6, 1),
    assignedTo: null,
    createdBy: '2',
    createdAt: new Date(2023, 4, 15),
    updatedAt: new Date(2023, 4, 15),
  },
];

const SAMPLE_STATISTICS: Statistic = {
  completed: 12,
  inProgress: 5,
  todo: 8,
  total: 25,
  onTime: 10,
  late: 2,
};

const SAMPLE_PERFORMANCES: UserPerformance[] = [
  {
    userId: '1',
    userName: 'Dr. Moussa Diop',
    completedTasks: 15,
    onTimeCompletionRate: 93,
    score: 87,
  },
  {
    userId: '2',
    userName: 'Prof. Fatou Ndiaye',
    completedTasks: 12,
    onTimeCompletionRate: 83,
    score: 78,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Helmet>
        <title>Tableau de bord | Taskistry Collabo</title>
      </Helmet>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <div className="text-sm text-muted-foreground">
          Bienvenue à Taskistry Collabo - votre plateforme de gestion de tâches pour ESMT
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Projets actifs" 
          value={SAMPLE_PROJECTS.length} 
          icon={<ListTodo className="h-4 w-4" />}
        />
        <StatCard 
          title="Tâches totales" 
          value={SAMPLE_STATISTICS.total} 
          icon={<Check className="h-4 w-4" />}
        />
        <StatCard 
          title="Tâches en cours" 
          value={SAMPLE_STATISTICS.inProgress} 
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Utilisateurs" 
          value={SAMPLE_USERS.length} 
          icon={<Users className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TasksOverview tasks={SAMPLE_TASKS} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des enseignants</CardTitle>
              <CardDescription>Taux de complétion des tâches à temps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SAMPLE_PERFORMANCES.map(performance => (
                  <div key={performance.userId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{performance.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{performance.userName}</span>
                      </div>
                      <div className="text-sm font-medium">
                        {performance.score}/100
                      </div>
                    </div>
                    <Progress 
                      value={performance.score} 
                      className="h-2"
                      indicatorClassName={performance.score > 80 ? "bg-green-500" : "bg-amber-500"}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{performance.completedTasks} tâches terminées</span>
                      <span>{performance.onTimeCompletionRate}% à temps</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tâches par statut</CardTitle>
              <CardDescription>Vue d'ensemble des statuts de tâches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center space-x-4 mt-2">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-full">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-xl font-bold">{SAMPLE_STATISTICS.completed}</div>
                  <div className="text-xs text-muted-foreground">Terminées</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-3 rounded-full">
                    <CircleEllipsis className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-xl font-bold">{SAMPLE_STATISTICS.inProgress}</div>
                  <div className="text-xs text-muted-foreground">En cours</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 p-3 rounded-full">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="mt-2 text-xl font-bold">{SAMPLE_STATISTICS.todo}</div>
                  <div className="text-xs text-muted-foreground">À faire</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

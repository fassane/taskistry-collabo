
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: TaskStatus;
  dueDate: Date;
  assignedTo: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Statistic {
  completed: number;
  inProgress: number;
  todo: number;
  total: number;
  onTime: number;
  late: number;
}

export interface UserPerformance {
  userId: string;
  userName: string;
  completedTasks: number;
  onTimeCompletionRate: number;
  score: number; // 0-100 score for performance (determines bonuses for teachers)
}

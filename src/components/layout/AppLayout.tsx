
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import AppSidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;


import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, FolderKanban, Users, BarChart3 } from 'lucide-react';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Helmet>
        <title>Accueil | Taskistry ESMT</title>
      </Helmet>
      
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Taskistry ESMT
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          La plateforme collaborative de gestion de tâches dédiée aux enseignants et étudiants de l'ESMT
        </p>
      </div>
      
      {!isAuthenticated ? (
        <div className="flex justify-center mt-8 mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link to="/login">
            <Button size="lg" className="mr-4">
              Se connecter
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline">
              S'inscrire
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center mt-8 mb-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link to="/dashboard">
            <Button size="lg">
              Aller au tableau de bord
            </Button>
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card className="hover-scale animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <div className="bg-primary/10 p-3 w-fit rounded-full mb-4">
              <FolderKanban className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Gestion de Projets</CardTitle>
            <CardDescription>Créez et gérez des projets collaboratifs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Organisez votre travail en projets, assignez des tâches, suivez la progression et collaborez efficacement avec les équipes d'enseignants et d'étudiants.</p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardHeader>
            <div className="bg-primary/10 p-3 w-fit rounded-full mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Suivi des Tâches</CardTitle>
            <CardDescription>Visualisez et gérez toutes vos tâches</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Suivez l'avancement des tâches avec des statuts clairs, des dates d'échéance et des assignations. Restez organisé et à jour avec tous vos travaux académiques.</p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <CardHeader>
            <div className="bg-primary/10 p-3 w-fit rounded-full mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Statistiques & Analyses</CardTitle>
            <CardDescription>Mesurez les performances et la productivité</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Visualisez les statistiques trimestrielles et annuelles. Évaluez les performances des membres pour identifier les enseignants méritant des primes de performance.</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Pourquoi choisir Taskistry ESMT?</h2>
          <p className="text-muted-foreground">Une solution complète conçue pour l'environnement académique de l'ESMT</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Collaboration Enseignants-Étudiants</h3>
              <p className="text-sm text-muted-foreground">Facilitez la communication et la collaboration entre enseignants et étudiants sur des projets académiques.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Système de Gestion Adapté</h3>
              <p className="text-sm text-muted-foreground">Des fonctionnalités spécifiquement conçues pour répondre aux besoins de l'environnement académique de l'ESMT.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground pb-8 animate-fade-in" style={{ animationDelay: "0.7s" }}>
        <p>© {new Date().getFullYear()} Taskistry ESMT. Tous droits réservés.</p>
        <p className="mt-1">Conçu avec ❤️ pour l'École Supérieure Multinationale des Télécommunications</p>
      </footer>
    </div>
  );
};

export default Home;

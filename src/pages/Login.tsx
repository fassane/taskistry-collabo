
import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <Helmet>
        <title>Connexion | Taskistry ESMT</title>
      </Helmet>
      
      <div className="absolute top-4 left-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
      
      <LoginForm />
    </div>
  );
};

export default Login;

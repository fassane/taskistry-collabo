
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../../utils/types';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@esmt.edu',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    name: 'Teacher One',
    email: 'teacher@esmt.edu',
    role: 'teacher',
    avatar: 'https://ui-avatars.com/api/?name=Teacher+One&background=2563EB&color=fff',
  },
  {
    id: '3',
    name: 'Student One',
    email: 'student@esmt.edu',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Student+One&background=818CF8&color=fff',
  },
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('taskistryUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user by email (in a real app, validate password too)
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('taskistryUser', JSON.stringify(foundUser));
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${foundUser.name}!`,
        });
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskistryUser');
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        toast({
          title: "Échec de l'inscription",
          description: "Un utilisateur avec cet email existe déjà",
          variant: "destructive",
        });
        throw new Error('User already exists');
      }
      
      // In a real app, we would create the user in the database
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=2563EB&color=fff`,
      };
      
      // For demo, we just simulate successful registration
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès",
      });
      
      // Auto login after registration
      setUser(newUser);
      localStorage.setItem('taskistryUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

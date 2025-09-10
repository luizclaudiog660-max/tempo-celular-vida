"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  premium: boolean;
  createdAt: string;
  lastLogin: string;
}

interface UserProfile {
  persona: string;
  objectives: string[];
  age?: number;
  hoursPerDay?: number;
}

interface ChallengeProgress {
  day1: boolean;
  day2: boolean;
  day3: boolean;
  day4: boolean;
  day5: boolean;
  day6: boolean;
  day7: boolean;
  startDate: string;
  completedAt?: string;
}

interface UserProgress {
  challenge7d: ChallengeProgress;
  selectedPlan: string;
  badges: any[];
}

interface UserSettings {
  language: string;
  darkMode: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  progress: UserProgress | null;
  settings: UserSettings | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateProgress: (progress: UserProgress) => void;
  updateSettings: (settings: UserSettings) => void;
  upgradeToPremiun: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para obter chave do usuário
  const getUserKey = (email: string, dataType: string) => {
    return `tciv:user:${email}:${dataType}`;
  };

  // Carregar dados do usuário logado
  const loadUserData = (email: string) => {
    try {
      const userProfile = localStorage.getItem(getUserKey(email, 'profile'));
      const userProgress = localStorage.getItem(getUserKey(email, 'progress'));
      const userSettings = localStorage.getItem(getUserKey(email, 'settings'));

      if (userProfile) {
        setProfile(JSON.parse(userProfile));
      }
      if (userProgress) {
        setProgress(JSON.parse(userProgress));
      }
      if (userSettings) {
        setSettings(JSON.parse(userSettings));
      } else {
        // Configurações padrão
        const defaultSettings = { language: 'pt', darkMode: false };
        setSettings(defaultSettings);
        localStorage.setItem(getUserKey(email, 'settings'), JSON.stringify(defaultSettings));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  // Migrar dados existentes para o usuário
  const migrateExistingData = (email: string) => {
    try {
      // Migrar perfil
      const oldProfile = localStorage.getItem('user_profile');
      if (oldProfile && !localStorage.getItem(getUserKey(email, 'profile'))) {
        localStorage.setItem(getUserKey(email, 'profile'), oldProfile);
        localStorage.removeItem('user_profile');
      }

      // Migrar progresso do desafio
      const oldChallenge = localStorage.getItem('challenge_progress');
      const oldBadges = localStorage.getItem('challenge_badges');
      const oldPlan = localStorage.getItem('selected_plan');
      
      if ((oldChallenge || oldBadges || oldPlan) && !localStorage.getItem(getUserKey(email, 'progress'))) {
        const progressData = {
          challenge7d: oldChallenge ? JSON.parse(oldChallenge) : {
            day1: false, day2: false, day3: false, day4: false,
            day5: false, day6: false, day7: false, startDate: ''
          },
          selectedPlan: oldPlan || '',
          badges: oldBadges ? JSON.parse(oldBadges) : []
        };
        localStorage.setItem(getUserKey(email, 'progress'), JSON.stringify(progressData));
        
        // Limpar dados antigos
        localStorage.removeItem('challenge_progress');
        localStorage.removeItem('challenge_badges');
        localStorage.removeItem('selected_plan');
      }

      // Migrar configurações
      const oldLanguage = localStorage.getItem('app_language');
      const oldPremium = localStorage.getItem('premium_status');
      
      if ((oldLanguage || oldPremium) && !localStorage.getItem(getUserKey(email, 'settings'))) {
        const settingsData = {
          language: oldLanguage || 'pt',
          darkMode: false
        };
        localStorage.setItem(getUserKey(email, 'settings'), JSON.stringify(settingsData));
        
        // Atualizar status premium no usuário se existir
        if (oldPremium === 'true') {
          const userData = localStorage.getItem('tciv:current_user');
          if (userData) {
            const user = JSON.parse(userData);
            user.premium = true;
            localStorage.setItem('tciv:current_user', JSON.stringify(user));
          }
        }
        
        localStorage.removeItem('app_language');
        localStorage.removeItem('premium_status');
      }
    } catch (error) {
      console.error('Erro ao migrar dados:', error);
    }
  };

  // Verificar sessão ao carregar
  useEffect(() => {
    const checkSession = () => {
      try {
        const currentUser = localStorage.getItem('tciv:current_user');
        if (currentUser) {
          const userData = JSON.parse(currentUser);
          userData.lastLogin = new Date().toISOString();
          setUser(userData);
          localStorage.setItem('tciv:current_user', JSON.stringify(userData));
          
          // Migrar dados existentes
          migrateExistingData(userData.email);
          
          // Carregar dados do usuário
          loadUserData(userData.email);
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        localStorage.removeItem('tciv:current_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validação básica
      if (!email || !password || password.length < 6) {
        return false;
      }

      // Verificar se usuário existe
      const existingUser = localStorage.getItem(`tciv:user:${email}:auth`);
      
      if (existingUser) {
        const authData = JSON.parse(existingUser);
        if (authData.password === password) {
          // Login bem-sucedido
          const userData: User = {
            email,
            premium: authData.premium || false,
            createdAt: authData.createdAt,
            lastLogin: new Date().toISOString()
          };
          
          setUser(userData);
          localStorage.setItem('tciv:current_user', JSON.stringify(userData));
          
          // Carregar dados do usuário
          loadUserData(email);
          
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validação básica
      if (!email || !password || password.length < 6) {
        return false;
      }

      // Verificar se usuário já existe
      const existingUser = localStorage.getItem(`tciv:user:${email}:auth`);
      if (existingUser) {
        return false; // Usuário já existe
      }

      // Criar novo usuário
      const now = new Date().toISOString();
      const authData = {
        password,
        premium: false,
        createdAt: now
      };
      
      const userData: User = {
        email,
        premium: false,
        createdAt: now,
        lastLogin: now
      };

      // Salvar dados de autenticação
      localStorage.setItem(`tciv:user:${email}:auth`, JSON.stringify(authData));
      
      // Salvar sessão atual
      localStorage.setItem('tciv:current_user', JSON.stringify(userData));
      
      setUser(userData);
      
      // Migrar dados existentes se houver
      migrateExistingData(email);
      
      // Carregar dados do usuário
      loadUserData(email);
      
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setProgress(null);
    setSettings(null);
    localStorage.removeItem('tciv:current_user');
  };

  const updateProfile = (newProfile: UserProfile) => {
    if (!user) return;
    
    setProfile(newProfile);
    localStorage.setItem(getUserKey(user.email, 'profile'), JSON.stringify(newProfile));
  };

  const updateProgress = (newProgress: UserProgress) => {
    if (!user) return;
    
    setProgress(newProgress);
    localStorage.setItem(getUserKey(user.email, 'progress'), JSON.stringify(newProgress));
  };

  const updateSettings = (newSettings: UserSettings) => {
    if (!user) return;
    
    setSettings(newSettings);
    localStorage.setItem(getUserKey(user.email, 'settings'), JSON.stringify(newSettings));
  };

  const upgradeToPremiun = () => {
    if (!user) return;
    
    const updatedUser = { ...user, premium: true };
    setUser(updatedUser);
    
    // Atualizar sessão atual
    localStorage.setItem('tciv:current_user', JSON.stringify(updatedUser));
    
    // Atualizar dados de auth
    const authData = localStorage.getItem(`tciv:user:${user.email}:auth`);
    if (authData) {
      const auth = JSON.parse(authData);
      auth.premium = true;
      localStorage.setItem(`tciv:user:${user.email}:auth`, JSON.stringify(auth));
    }
  };

  const value = {
    user,
    profile,
    progress,
    settings,
    login,
    register,
    logout,
    updateProfile,
    updateProgress,
    updateSettings,
    upgradeToPremiun,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
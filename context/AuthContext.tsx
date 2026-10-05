'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';

const USERS_STORAGE_KEY = 'kiddotube_users_db_v1';
const CURRENT_USER_KEY = 'kiddotube_current_user_v1';

// Preset default demo account
const DEFAULT_DEMO_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'demo-user-1',
    name: 'Demo Explorer',
    email: 'demo@kiddotube.com',
    avatar: '🚀',
    pin: '1234',
    isPremium: false,
    createdAt: new Date().toISOString(),
    passwordHash: 'password123',
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authModalOpen: boolean;
  authModalTab: 'login' | 'register';
  premiumModalOpen: boolean;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  openPremiumModal: () => void;
  closePremiumModal: () => void;
  activatePremium: () => void;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  demoLogin: () => void;
  updateUserPin: (newPin: string) => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [premiumModalOpen, setPremiumModalOpen] = useState<boolean>(false);

  // Load existing users DB or initialize default demo accounts
  const getUsersDB = (): (User & { passwordHash: string })[] => {
    if (typeof window === 'undefined') return DEFAULT_DEMO_USERS;
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USERS));
        return DEFAULT_DEMO_USERS;
      }
    } catch {
      return DEFAULT_DEMO_USERS;
    }
  };

  useEffect(() => {
    try {
      // Restore active session
      const savedSession = localStorage.getItem(CURRENT_USER_KEY);
      if (savedSession) {
        setUser(JSON.parse(savedSession));
      }
    } catch (err) {
      console.error('Failed to load session:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const openPremiumModal = () => {
    setPremiumModalOpen(true);
  };

  const closePremiumModal = () => {
    setPremiumModalOpen(false);
  };

  const activatePremium = () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

      // Update in users DB
      const usersDB = getUsersDB();
      const updatedDB = usersDB.map(u => u.id === user.id ? { ...u, isPremium: true } : u);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedDB));
    }
    setPremiumModalOpen(false);
  };

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; message?: string }> => {
    const usersDB = getUsersDB();
    const foundUser = usersDB.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!foundUser) {
      return { success: false, message: 'No account found with this email address.' };
    }

    if (foundUser.passwordHash !== credentials.password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    const { passwordHash, ...userSession } = foundUser;
    setUser(userSession);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
    closeAuthModal();
    return { success: true };
  };

  const register = async (credentials: RegisterCredentials): Promise<{ success: boolean; message?: string }> => {
    const usersDB = getUsersDB();
    const exists = usersDB.some(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (exists) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUserFull: User & { passwordHash: string } = {
      id: `user-${Date.now()}`,
      name: credentials.name.trim(),
      email: credentials.email.trim(),
      avatar: credentials.avatar || '🦁',
      pin: credentials.pin || '1234',
      isPremium: true, // Gift 7-day free trial on new registrations
      createdAt: new Date().toISOString(),
      passwordHash: credentials.password,
    };

    const updatedDB = [...usersDB, newUserFull];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedDB));

    const { passwordHash, ...userSession } = newUserFull;
    setUser(userSession);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
    closeAuthModal();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const deleteAccount = () => {
    if (!user) return;
    const usersDB = getUsersDB();
    const updatedDB = usersDB.filter((u) => u.id !== user.id);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedDB));
    logout();
  };

  const demoLogin = () => {
    const usersDB = getUsersDB();
    const demoAccount = usersDB[0] || DEFAULT_DEMO_USERS[0];
    const { passwordHash, ...userSession } = demoAccount;
    setUser(userSession);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
    closeAuthModal();
  };

  const updateUserPin = (newPin: string) => {
    if (!user) return;
    const updatedUser = { ...user, pin: newPin };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users DB
    const usersDB = getUsersDB();
    const updatedDB = usersDB.map(u => u.id === user.id ? { ...u, pin: newPin } : u);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedDB));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authModalOpen,
        authModalTab,
        premiumModalOpen,
        openAuthModal,
        closeAuthModal,
        openPremiumModal,
        closePremiumModal,
        activatePremium,
        login,
        register,
        logout,
        demoLogin,
        updateUserPin,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

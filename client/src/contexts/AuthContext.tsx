import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginData, SignupData } from '@shared/schema';
import * as localStore from '@/lib/localStore';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStore.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
    const result = localStore.login(data);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    const result = localStore.signup(data);
    if (result.success && result.user) {
      const loginResult = localStore.login({ username: data.username, password: data.password });
      if (loginResult.success && loginResult.user) {
        setUser(loginResult.user);
      }
    }
    return result;
  };

  const logout = () => {
    localStore.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        signup,
        logout,
        isLoading,
      }}
    >
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

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";

export interface User {
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  loading: true,
});

const SetAuthContext = createContext<
  React.Dispatch<React.SetStateAction<AuthState>> | null
>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  // added pathname as dep
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
          return;
        }

        const user = await res.json();

        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
        });
      } catch {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <SetAuthContext.Provider value={setAuthState}>
        {children}
      </SetAuthContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthenticated() {
  return useContext(AuthContext).isAuthenticated;
}

export function useSetAuth() {
  const setter = useContext(SetAuthContext);
  if (!setter) {
    throw new Error("useSetAuth must be used within <AuthProvider />");
  }
  return setter;
}
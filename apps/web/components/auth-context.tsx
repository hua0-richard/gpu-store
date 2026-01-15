"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

const SetAuthContext = createContext<React.Dispatch<
  React.SetStateAction<AuthState>
> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        let res = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 401) {
          const refreshRes = await fetch("/refresh/user", {
            method: "POST",
            credentials: "include",
            cache: "no-store",
          });

          if (!refreshRes.ok) {
            throw new Error("Refresh failed");
          }

          console.log("finished")

          res = await fetch("/api/auth/profile", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          });
        }

        if (!res.ok) {
          throw new Error("Profile fetch failed");
        }

        const user = await res.json();

        if (!cancelled) {
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
          });
        }
      } catch {
        if (!cancelled) {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      }
    }

    checkAuth();

    return () => {
      cancelled = true;
    };
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

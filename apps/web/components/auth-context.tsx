"use client";

import { createContext, useContext, useState } from "react";

export interface User {
  username: string;
  password?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
});

const SetAuthContext = createContext<React.Dispatch<
  React.SetStateAction<AuthState>
> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

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

// Deprecated: maintained for some compatibility if possible, but behavior changes
export function useAuthenticated() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated;
}

export function useSetAuth() {
  const setter = useContext(SetAuthContext);
  if (!setter) throw new Error("useSetAuth must be used in <AuthProvider />");
  return setter;
}

export function useSetAuthenticated() {
  // This is a compatibility wrapper or we might need to change callsites completely.
  // Since we are updating all call sites, let's just expose the new setter or
  // adapt this one to throw an error if used incorrectly, or return the new setter.
  // However, the signature of the setter has changed.
  // I will update this to return the new setter but consumers need updates.
  return useSetAuth();
}

export async function login(
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>,
  user: string,
  secret: string,
) {
  const res = await fetch('/api/auth/login', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: secret,
    }),
  });

  if (res.ok) {
    console.log("found user");
    setAuth({
      isAuthenticated: true,
      user: { username: user },
    });
    return true;
  } else {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
  }
  return false;
}

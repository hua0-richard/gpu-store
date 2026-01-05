"use client";

import { createContext, useContext, useState } from "react";

const AuthenticatedContext = createContext(false);
const SetAuthenticatedContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthenticatedContext.Provider value={authenticated}>
      <SetAuthenticatedContext.Provider value={setAuthenticated}>
        {children}
      </SetAuthenticatedContext.Provider>
    </AuthenticatedContext.Provider>
  );
}

export function useAuthenticated() {
  return useContext(AuthenticatedContext);
}

export function useSetAuthenticated() {
  const setter = useContext(SetAuthenticatedContext);
  if (!setter) throw new Error("useSetAuthenticated must be used in <AuthProvider />");
  return setter;
}

export async function getAuth(setAuthenticated: (v: boolean) => void) {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "john",
      password: "changeme",
    }),
  });

  if (res.ok) {
    console.log("found user");
    setAuthenticated(true);
  } else {
    setAuthenticated(false);
  }
}

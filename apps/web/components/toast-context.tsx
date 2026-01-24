"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback((message: string, type: ToastType = "info", duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-[350px] pointer-events-none pr-4">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={cn(
                            "pointer-events-auto flex items-center gap-3 p-4 rounded-lg border shadow-lg transition-all animate-in slide-in-from-right-full fade-in duration-300",
                            "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800",
                            t.type === "error" && "border-l-4 border-l-red-500",
                            t.type === "success" && "border-l-4 border-l-emerald-500",
                            t.type === "info" && "border-l-4 border-l-blue-500"
                        )}
                    >
                        {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                        {t.type === "error" && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                        {t.type === "info" && <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />}

                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.message}</p>

                        <button
                            onClick={() => removeToast(t.id)}
                            className="ml-auto text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

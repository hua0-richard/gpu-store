"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string;
    name: string;
    gpuId: string;
    quantity: number;
    cpus: number;
    storage: number;
    hours: number;
    pricePerStep: number; // Price per hour/unit
    totalPrice: number;
    architecture?: string;
    memory?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "id">) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("tensor-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from local storage", e);
            }
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem("tensor-cart", JSON.stringify(items));
    }, [items]);

    const addItem = useContext(CartContext)?.addItem || ((item: Omit<CartItem, "id">) => { // This line is just a safety fallback or types, actually I need to define the function properly
    });

    // Correcting implementation below

    const addItemCallback = React.useCallback((item: Omit<CartItem, "id">) => {
        const newItem = { ...item, id: crypto.randomUUID() };
        setItems((prev) => [...prev, newItem]);
    }, []);

    const removeItemCallback = React.useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const clearCartCallback = React.useCallback(() => {
        console.log("CartContext: clearCart called");
        setItems([]);
        localStorage.removeItem("tensor-cart");
    }, []);

    const cartCount = items.length;

    const value = React.useMemo(() => ({
        items,
        addItem: addItemCallback,
        removeItem: removeItemCallback,
        clearCart: clearCartCallback,
        cartCount
    }), [items, addItemCallback, removeItemCallback, clearCartCallback, cartCount]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

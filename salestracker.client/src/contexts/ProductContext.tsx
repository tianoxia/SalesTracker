import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types/sales';

interface ProductContextType {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: React.ReactNode;
}

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);
    const addToFavorites = (product: Product) => {
        setFavorites((prev) => [...prev, product]);
    }
    const removeFromFavorites = (id: number) => {
        setFavorites((prev) => prev.filter(product => product.id !== id));
    }
    const isFavorite = (id: number) => {
        return favorites.some(product => product.id === id);
    }
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
};
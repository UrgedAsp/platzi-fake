import { create } from "zustand";
import { Product } from "../interfaces/Product";

interface FavoriteStore {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favorites: [],
    addFavorite: (product: Product) => set(state => ({
        favorites: [...state.favorites, product]
    })),
    removeFavorite: (productId: number) => set(state => ({
        favorites: state.favorites.filter((product) => product.id !== productId)
    }))
}));
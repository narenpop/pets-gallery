import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Pet } from "../types/pet";
import { usePets } from "../hooks/usePets";

const FAVORITES_STORAGE_KEY = "pets-gallery-favorites";

interface FavoritesContextType {
  favorites: Pet[];
  addFavorite: (pet: Pet) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { data } = usePets();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!stored) return;

    try {
      setFavoriteIds(JSON.parse(stored) as string[]);
    } catch {
      setFavoriteIds([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteIds),
    );
  }, [favoriteIds]);

  useEffect(() => {
    setFavoriteIds((prev) => prev.filter((id) => data.some((pet) => pet.id === id)));
  }, [data]);

  const favorites = useMemo(
    () => data.filter((pet) => favoriteIds.includes(pet.id)),
    [data, favoriteIds],
  );

  const addFavorite = (pet: Pet) => {
    setFavoriteIds((prev) => {
      if (prev.includes(pet.id)) return prev;
      return [...prev, pet.id];
    });
  };

  const removeFavorite = (id: string) => {
    setFavoriteIds((prev) => prev.filter((item) => item !== id));
  };

  const isFavorite = (id: string) => {
    return favoriteIds.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("Wrap your app with FavoritesProvider");
  }
  return context;
};
import { createContext, useContext, useState } from "react";
import type { Pet } from "../types/pet";

interface SelectionContextType {
  selected: Pet[];
  toggleSelect: (pet: Pet) => void;
  clearSelection: () => void;
  selectAll: (pets: Pet[]) => void;
}

const SelectionContext = createContext<SelectionContextType | null>(null);

export const SelectionProvider = ({ children }: any) => {
  const [selected, setSelected] = useState<Pet[]>([]);

  const toggleSelect = (pet: Pet) => {
    setSelected((prev) =>
      prev.find((p) => p.id === pet.id)
        ? prev.filter((p) => p.id !== pet.id)
        : [...prev, pet]
    );
  };

  const clearSelection = () => setSelected([]);

  const selectAll = (pets: Pet[]) => setSelected(pets);

  return (
    <SelectionContext.Provider
      value={{ selected, toggleSelect, clearSelection, selectAll }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("Wrap with SelectionProvider");
  return context;
};
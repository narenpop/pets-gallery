import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { careTipSeeds, groomingTipSeeds } from "../data/dashboardSeeds";
import type { CareTip, GroomingTip, Pet } from "../types/pet";

const PETS_STORAGE_KEY = "pets-gallery-pets";
const CARE_STORAGE_KEY = "pets-gallery-care-tips";
const GROOMING_STORAGE_KEY = "pets-gallery-grooming-tips";

interface PetInput {
  title: string;
  breed: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  size?: number;
}

interface CareTipInput {
  title: string;
  category: string;
  description: string;
}

interface GroomingTipInput {
  title: string;
  petType: string;
  frequency: string;
  description: string;
}

interface PetsContextType {
  data: Pet[];
  careTips: CareTip[];
  groomingTips: GroomingTip[];
  loading: boolean;
  error: string | null;
  createPet: (pet: PetInput) => void;
  updatePet: (id: string, pet: PetInput) => void;
  deletePet: (id: string) => void;
  createCareTip: (tip: CareTipInput) => void;
  updateCareTip: (id: string, tip: CareTipInput) => void;
  deleteCareTip: (id: string) => void;
  createGroomingTip: (tip: GroomingTipInput) => void;
  updateGroomingTip: (id: string, tip: GroomingTipInput) => void;
  deleteGroomingTip: (id: string) => void;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const readStorage = <T,>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

export const PetsProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [careTips, setCareTips] = useState<CareTip[]>([]);
  const [groomingTips, setGroomingTips] = useState<GroomingTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedPets = readStorage<Pet[]>(PETS_STORAGE_KEY);
    const storedCare = readStorage<CareTip[]>(CARE_STORAGE_KEY);
    const storedGrooming = readStorage<GroomingTip[]>(GROOMING_STORAGE_KEY);

    if (storedCare) {
      setCareTips(storedCare);
    } else {
      setCareTips(careTipSeeds);
    }

    if (storedGrooming) {
      setGroomingTips(storedGrooming);
    } else {
      setGroomingTips(groomingTipSeeds);
    }

    if (storedPets) {
      setPets(storedPets);
      setLoading(false);
      return;
    }

    fetch("/pets.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch pets");
        return res.json();
      })
      .then((res: Pet[]) => {
        setPets(res);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      window.localStorage.setItem(PETS_STORAGE_KEY, JSON.stringify(pets));
    }
  }, [pets, loading]);

  useEffect(() => {
    window.localStorage.setItem(CARE_STORAGE_KEY, JSON.stringify(careTips));
  }, [careTips]);

  useEffect(() => {
    window.localStorage.setItem(
      GROOMING_STORAGE_KEY,
      JSON.stringify(groomingTips),
    );
  }, [groomingTips]);

  const value = useMemo<PetsContextType>(
    () => ({
      data: pets,
      careTips,
      groomingTips,
      loading,
      error,
      createPet: (pet) => {
        setPets((prev) => [{ id: createId(), ...pet }, ...prev]);
      },
      updatePet: (id, pet) => {
        setPets((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...pet, id } : item)),
        );
      },
      deletePet: (id) => {
        setPets((prev) => prev.filter((pet) => pet.id !== id));
      },
      createCareTip: (tip) => {
        setCareTips((prev) => [{ id: createId(), ...tip }, ...prev]);
      },
      updateCareTip: (id, tip) => {
        setCareTips((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...tip, id } : item)),
        );
      },
      deleteCareTip: (id) => {
        setCareTips((prev) => prev.filter((tip) => tip.id !== id));
      },
      createGroomingTip: (tip) => {
        setGroomingTips((prev) => [{ id: createId(), ...tip }, ...prev]);
      },
      updateGroomingTip: (id, tip) => {
        setGroomingTips((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...tip, id } : item)),
        );
      },
      deleteGroomingTip: (id) => {
        setGroomingTips((prev) => prev.filter((tip) => tip.id !== id));
      },
    }),
    [careTips, error, groomingTips, loading, pets],
  );

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
};

export const usePetsContext = () => {
  const context = useContext(PetsContext);

  if (!context) {
    throw new Error("Wrap your app with PetsProvider");
  }

  return context;
};

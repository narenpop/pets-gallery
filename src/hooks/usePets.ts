import { useEffect, useState } from "react";

export interface Pet {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  size?: number;
}

export const usePets = () => {
  const [data, setData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/pets.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};
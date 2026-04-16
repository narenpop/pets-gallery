import { usePets } from "../hooks/usePets";
import PetCard from "../components/PetCard";
import styled from "styled-components";
import { useState } from "react";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";





const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};
export default function Home() {
  const { data, loading, error } = usePets();
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const filtered = data.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "A-Z") return a.title.localeCompare(b.title);
    if (sort === "Z-A") return b.title.localeCompare(a.title);
    if (sort === "NEW") return +new Date(b.createdAt) - +new Date(a.createdAt);
    if (sort === "OLD") return +new Date(a.createdAt) - +new Date(b.createdAt);
    return 0;
  });
  const toggleSelect = (id: string) => {
    setSelectedPets((prev) =>
      prev.includes(id)
        ? prev.filter((petId) => petId !== id)
        : [...prev, id]
    );
  };

  const selectedItems = sorted.filter((pet) =>
    selectedPets.includes(pet.id)
  );

  const dogCount = selectedItems.filter((pet) =>
    pet.title.toLowerCase().includes("dog")
  ).length;

  const catCount = selectedItems.filter((pet) =>
    pet.title.toLowerCase().includes("cat")
  ).length;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="flex flex-col gap-4 justify-center items-center p-4 pb-10"
    >
      <div className="mt-20 flex max-w-5xl flex-col gap-4 rounded-2xl bg-white/85 p-6 text-center shadow-lg backdrop-blur-sm">
        <h1 className="text-5xl font-semibold text-slate-900">
          Welcome to the Pets Gallery
        </h1>
        <p className="text-lg text-slate-700">
          Discover a delightful collection of pets waiting for their forever
          homes. From playful puppies to cuddly kittens, our gallery showcases
          a variety of adorable animals looking for love and companionship.
          Browse through our selection and find your new best friend today.
        </p>
      </div>

      <input
        placeholder="Search by type, breed, or description..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md rounded-md border border-gray-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        onChange={(e) => setSort(e.target.value)}
        className="w-full max-w-md rounded-md border border-gray-300 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort</option>
        <option value="A-Z">Name A-Z</option>
        <option value="Z-A">Name Z-A</option>
        <option value="NEW">Newest</option>
        <option value="OLD">Oldest</option>
      </select>

      <div className="flex items-center gap-4 text-cyan-100">
        <p className="rounded-full bg-slate-900/80 px-4 py-2 text-sm">
          Selected: {selectedPets.length} | Dogs: {dogCount} | Cats: {catCount}
        </p>
        <Button
          variant="contained"
          onClick={() => setSelectedPets(sorted.map((pet) => pet.id))}
        >
          Select All
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSelectedPets([])}
        >
          Clear
        </Button>
      </div>

      {!sorted.length ? (
        <div className="rounded-xl bg-white/85 px-6 py-10 text-center shadow-lg">
          <p className="text-lg font-medium text-slate-800">No pets found.</p>
          <p className="text-sm text-slate-600">
            Try a different search or add a new pet from the dashboard.
          </p>
        </div>
      ) : (
        <Grid>
          {sorted.map((pet) => {
            const isSelected = selectedPets.includes(pet.id);

            return (
              <div
                key={pet.id}
                className={`relative cursor-pointer ${
                  isSelected ? "rounded-lg ring-4 ring-blue-400" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(pet.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-3 top-3 z-10 h-4 w-4"
                />
                <div onClick={() => navigate(`/pet/${pet.id}`)}>
                  <PetCard pet={pet} />
                </div>
              </div>
            );
          })}
        </Grid>
      )}

      <footer className="mt-8 mb-4 text-center text-sm text-white">
        &copy; 2024 Pets Gallery. All rights reserved.
      </footer>
    </motion.div>
  );
}
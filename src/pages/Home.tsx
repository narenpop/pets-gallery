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
  if (!data.length) return <p>No pets found</p>;

  const filtered = data.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
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
      className="flex flex-col gap-4 justify-center items-center p-4"
    >
      <div className="flex flex-col gap-4 justify-center items-center p-4 mt-20">
        <h1 className="text-5xl">Welcome to the Pets Gallery</h1>
        <p className="text-lg mt-2">Discover a delightful collection of pets waiting for their forever homes. From playful puppies to cuddly kittens, our gallery showcases a variety of adorable animals looking for love and companionship. Browse through our selection and find your new best friend today!</p>
      </div>

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select onChange={(e) => setSort(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <option value="">Sort</option>
        <option value="A-Z">Name A-Z</option>
        <option value="Z-A">Name Z-A</option>
        <option value="NEW">Newest</option>
        <option value="OLD">Oldest</option>
      </select>

      <p className="text-cyan-500">
  Selected: {selectedPets.length} | 🐶 Dogs: {dogCount} | 🐱 Cats: {catCount}
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
   <Grid>
  {sorted.map((pet) => {
    const isSelected = selectedPets.includes(pet.id);

    return (
      <div
        key={pet.id}
        className={`relative cursor-pointer ${
          isSelected ? "ring-4 ring-blue-400 rounded-lg" : ""
        }`}
      >
        {/* Checkbox → ONLY select */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelect(pet.id)}
          onClick={(e) => e.stopPropagation()} // 🔥 important
          className="absolute top-2 left-2 z-10 w-4 h-4"
        />

        {/* Card click → NAVIGATE */}
        <div onClick={() => navigate(`/pet/${pet.id}`)}>
          <PetCard pet={pet} />
        </div>
      </div>
    );
  })}
</Grid>
      <footer className="text-sm text-gray-500 mt-8 mb-4 *:text-center" >
        &copy; 2024 Pets Gallery. All rights reserved.
      </footer>
    </motion.div>
  );
}
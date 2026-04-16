import type { Pet } from "../types/pet";
import { useFavorites } from "../context/FavoritesContext";

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(pet.id);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={pet.imageUrl}
        alt={pet.title}
        className="h-56 w-full object-cover"
      />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{pet.title}</h3>
          <p className="text-sm text-slate-600">{pet.breed}</p>
        </div>
        <p className="line-clamp-3 text-sm text-slate-700">{pet.description}</p>

        <button
          onClick={(e) => {
            // Prevent the parent card click (navigation) when favoriting.
            e.stopPropagation();
            favorite ? removeFavorite(pet.id) : addFavorite(pet);
          }}
          className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
            favorite ? "bg-rose-500" : "bg-slate-800"
          }`}
        >
          {favorite ? "Remove Favorite" : "Add Favorite"}
        </button>
      </div>
    </div>
  );
};

export default PetCard;
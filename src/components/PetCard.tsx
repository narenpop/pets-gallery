import { useFavorites } from "../context/FavoritesContext";

export default function PetCard({ pet }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(pet.id);

  const handleClick = () => {
    if (favorite) {
      removeFavorite(pet.id);
    } else {
      addFavorite(pet);
    }
  };

  return (
    <div className="relative w-72 h-48 rounded-xl overflow-hidden shadow-lg">
      <img
        src={pet.imageUrl}
        alt={pet.name}  
        className="w-full h-full object-cover"
      />

      {/* ❤️ Button */}
      <button
        onClick={handleClick}
        className="absolute top-2 right-2 bg-white/80 p-2 rounded-full"
      >
        {favorite ? "❤️" : "🤍"}
      </button>

      <div className="absolute bottom-0 w-full p-3 bg-black/50 text-white">
        {pet.name}
      </div>
    </div>
  );
}
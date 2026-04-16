import { useParams } from "react-router-dom";
import { usePets } from "../hooks/usePets";
import {motion} from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

export default function PetDetail() {
  const { id } = useParams();
  const { data, loading, error } = usePets();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const pet = data.find((p) => p.id === id);

  if (!pet) return <p>Not found</p>;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="mt-32 flex max-w-4xl flex-col items-center justify-center gap-4 p-4"
    >
      <div className="grid w-full gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-[1.1fr_0.9fr]">
        <img
          src={pet.imageUrl}
          alt={pet.title}
          className="h-full min-h-[320px] w-full object-cover"
        />
        <div className="flex flex-col justify-center gap-4 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-600">
            Pet Profile
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">{pet.title}</h1>
          <p className="text-lg font-medium text-slate-700">
            Breed: {pet.breed}
          </p>
          <p className="text-base leading-7 text-slate-600">{pet.description}</p>
          <div className="grid gap-3 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Created:</span> {pet.createdAt}
            </p>
            <p>
              <span className="font-semibold">Card Size:</span>{" "}
              {pet.size ?? "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
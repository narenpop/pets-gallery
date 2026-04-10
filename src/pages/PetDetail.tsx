import { useParams } from "react-router-dom";
import { usePets } from "../hooks/usePets";
import {motion} from "framer-motion";
import Navbar from "../components/Navbar";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

export default function PetDetail() {
  const { id } = useParams();
  const { data } = usePets();

  const pet = data.find((p) => p.id === id);

  if (!pet) return <p>Not found</p>;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="p-4 max-w-md mx-auto justify-center items-center flex flex-col gap-4 mt-40"
    >
      
      <div className="flex flex-col gap-4 justify-center items-center p-4 border border-gray-300 rounded-md bg-amber-400">
        <h1 className="text-4xl">{pet.title}</h1>
        <p>{pet.description}</p>    
        <img src={pet.imageUrl} alt={pet.title} />      
      </div>   
    </motion.div>
  );
}
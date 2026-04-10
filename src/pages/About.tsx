import { motion } from "framer-motion";
import paw from "../assets/paw.png";
import Navbar from "../components/Navbar";

const pageVariants = {  
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="flex flex-col gap-4 justify-center items-center p-4 bg-yellow-700 text-white h-screen"
    >
      <div>
        <img src={paw} width="100" height="100" alt="Paw print" />
        <h1 className="text-5xl">About me </h1>
        <p className="text-lg mt-2">I’m a frontend developer with 3+ years of experience building responsive, user-focused web applications using React.js and Tailwind CSS. I enjoy turning complex ideas into clean, intuitive interfaces that deliver real value to users.

I’ve worked on multiple projects where I handled everything from UI implementation to performance optimization, ensuring fast load times and smooth user experiences. My approach focuses on writing scalable, maintainable code while keeping design consistency and usability at the core.

I’m particularly interested in building modern web applications and SaaS dashboards, and I’m always exploring better ways to improve user experience through animations, accessibility, and thoughtful design. I’m excited to connect with other developers and contribute to open source projects that make a positive impact.</p>
      </div>
      <div className="flex flex-col gap-2 mt-6">  
      </div>
    </motion.div>
  );
}
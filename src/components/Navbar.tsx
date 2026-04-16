import PetsIcon from "@mui/icons-material/Pets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 transition ${
      isActive ? "bg-white/20 text-white" : "text-slate-200 hover:text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 z-10 w-full bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PetsIcon />
          <span className="text-lg font-semibold">Pets Gallery</span>
        </div>
        <div className="flex gap-2">
          <NavLink to="/" className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClassName}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={navLinkClassName}>
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
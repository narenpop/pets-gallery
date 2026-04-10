import PetsIcon from '@mui/icons-material/Pets';
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 z-10">
        <div className="container mx-auto flex justify-between items-center">   
            <PetsIcon />
            <div className="flex gap-4">
                <a href="/" className="hover:text-gray-300"> Home</a>
                <a href="/about" className="hover:text-gray-300">About</a>      
            </div>      
        </div>
    </nav>
  );
}

export default Navbar;
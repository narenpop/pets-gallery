import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PetDetails from "./pages/PetDetail";
import Navbar from "./components/Navbar";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet/:id" element={<PetDetails/>} />
        <Route path="/About" element={<About /> } />
      </Routes>
    </Router>
  );
}

export default App;

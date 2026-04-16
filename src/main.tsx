import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import { PetsProvider } from "./context/PetsContext.tsx";

createRoot(document.getElementById('root')!).render(
  <PetsProvider>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </PetsProvider>
  // <StrictMode>
  // </StrictMode>
)

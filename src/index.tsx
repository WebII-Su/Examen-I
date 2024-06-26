import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/pokelogo.png"
import Navbar from "./components/navbar"; //esta es la  navbar, la primera N debe ir mayuscula igual abajo xd 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObtenerPokemones from './pages/listPokemon';
import ObtenerTrainers from './pages/listTrainer';
import PostTrainer from './components/postTrainers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Navbar />
      <Routes>
      <Route path="/" element={<App />} />
      <Route path='/listPokemon' element={<ObtenerPokemones />} />  
      <Route path='/listTrainer' element={<ObtenerTrainers />} />  
      <Route path='/postTrainers' element={<PostTrainer />} />  
    </Routes>
  </BrowserRouter>
);


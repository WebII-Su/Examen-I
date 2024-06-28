import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Navbar from "./components/navbar"; //esta es la  navbar, la primera N debe ir mayuscula igual abajo xd 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObtenerPokemones from './pages/listPokemon';
import ObtenerTrainers from './pages/listTrainer';
import PostTrainer from './components/postTrainers';
import GetTeams from './components/GetTeams';
import PostTeams from './components/PostTeams';


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
      <Route path='/GetTeams' element={<GetTeams />} />
      <Route path='/PostTeam' element={<PostTeams />} />   
    </Routes>
  </BrowserRouter>
);


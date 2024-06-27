import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/postTrainer.css";

const PostTrainer = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sexo, setSexo] = useState('');
  const [residencia, setResidencia] = useState('');
  const [foto_Url, setFotoUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5005/api/addtrainer', 
      { nombre, apellidos, sexo, residencia, foto_Url });
      navigate('/listTrainer');
    } catch (error) {
      console.error('Error adding new trainer:', error);
      return(
        <div>errrooooor</div>
      )
    }
  };

  return (
    <div className="pad" >
      <form className="form-container" onSubmit={handleSubmit}>
        <h5>Datos del entrenador</h5>
        <br />
         <div >
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
         </div>
         <br />
         <div>
           <input type="text" placeholder="Apellidos"  value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
        </div>
        <br /> 
         <div>
           <input type="text" placeholder="Sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} required />
        </div>
         <br />
         
         <input type="text" placeholder="Residencia" value={residencia} onChange={(e) => setResidencia(e.target.value)} required />
          <br />
          <br />
          <div>
            <input type="text" placeholder="Foto URL"   value={foto_Url} onChange={(e) => setFotoUrl(e.target.value)} required />
          </div>
          <br />
            <button type="submit">Agregar</button>    
      </form>
    </div>
  );
};

export default PostTrainer;
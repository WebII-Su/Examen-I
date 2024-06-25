import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      await axios.post('http://localhost:5005/trainers', 
      { nombre, apellidos, sexo, residencia, foto_Url });
      navigate('/');
    } catch (error) {
      console.error('Error adding new trainer:', error);
    }
  };

  return (
    <div>
      <h2>Agregar Nuevo Entrenador</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre"     value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Apellidos"  value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
        <input type="text" placeholder="Sexo"       value={sexo} onChange={(e) => setSexo(e.target.value)} required />
        <input type="text" placeholder="Residencia" value={residencia} onChange={(e) => setResidencia(e.target.value)} required />
        <input type="text" placeholder="Foto URL"   value={foto_Url} onChange={(e) => setFotoUrl(e.target.value)} required />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default PostTrainer;
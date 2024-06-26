import React, { useEffect, useState } from "react";
import axios from "axios";

const GetTeams = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const llamada_api = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/getTeam');
      const jsonData = response.data; // Datos de la respuesta
      if (jsonData.status_code === 200) {
        setData(jsonData.data); // Asigna los equipos al estado
      } else {
        setError('Error al obtener los equipos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    };
   
  };

  useEffect(() => {
    llamada_api();
  }, []);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Equipos</h1>
      {data.length === 0 ? (
        <p>No hay equipos disponibles.</p>
      ) : (
        <ul>
          {data.map((team, index) => (
            <li key={index}>
              <h2>{team.nombreEquipo}</h2>
              <p>Entrenador: {team.entrenadorEncargado}</p>
              <p>Pokémon 1: {team.pkmon_1}</p>
              <p>Pokémon 2: {team.pkmon_2}</p>
              <p>Pokémon 3: {team.pkmon_3}</p>
              <p>Pokémon 4: {team.pkmon_4}</p>
              <p>Pokémon 5: {team.pkmon_5}</p>
              <p>Pokémon 6: {team.pkmon_6}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetTeams;

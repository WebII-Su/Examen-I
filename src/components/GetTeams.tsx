import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetTeams = () => {
  const [data, setData] = useState<any[]>([]);
  const [pokemones, setPokemones] = useState<{ name: string; index: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  //whehe
  // Obtener equipos desde la API
  const llamada_api = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/getTeam');
      const jsonData = response.data; // Datos de la respuesta
      if (jsonData.status_code === 200) {
        setData(Array.isArray(jsonData.data) ? jsonData.data : []); 
      } else {
        setError('Error al obtener los equipos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    };
  };

  // Obtener nombres e índices de Pokémon desde la PokeAPI
  const guardar_pokemones = async () => {
    try {
      const generations = [
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
        "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100",
        "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135",
        "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107",
        "https://pokeapi.co/api/v2/pokemon?offset=493&limit=156"
      ];

      let allPokemon: { name: string; index: number }[] = [];

      for (let gen of generations) {
        const respuesta = await axios.get(gen);
        const jsonName = respuesta.data.results;

        const nuevosPokemon = jsonName.map((pokemon: any, index: number) => ({
          name: pokemon.name,
          index: index + 1 
        }));

        allPokemon = [...allPokemon, ...nuevosPokemon];
      }

      setPokemones(allPokemon); // se agregan todos los pokemones al array

    } catch (err) {
      console.log('Se produjo un error al obtener los nombres de Pokémon de múltiples generaciones');
      setError('Error al cargar los datos de Pokémon');
    }
  };

  // Cargar datos de la API y de Pokémon al montar el componente
  useEffect(() => {
    llamada_api();
    guardar_pokemones();
  }, []);

  // Función para construir la URL de la imagen de un Pokémon
  const construirURLImagen = (nombrePokemon: string) => {
    const id = pokemones.find(pokemon => pokemon.name === nombrePokemon)?.index;
    if (id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    } else {
      return ''; // Manejar el caso donde no se encuentra el id del Pokémon
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="contenedor">
      <div className="boton">
        <button onClick={() => navigate('/PostTeam')}>Agregar un nuevo equipo</button>
      </div>

      {data.map((team, index) => (
        <div key={index} className="main">
          <h2>Entrenador a cargo</h2>
          <h4>{team.entrenadorEncargado}</h4>
          <img src={team.urlFoto_entrenador} alt={`Foto de ${team.entrenadorEncargado}`} />
          <br />
          <br />
          <h2>Equipo {team.nombreEquipo} </h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre Pokémon</th>
                <th>Imagen Pokémon</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map((num) => {
                const nombrePokemon = team[`pkmon_${num}`];
                if (nombrePokemon && nombrePokemon !== 'null' && nombrePokemon !== '') {
                  return (
                    <tr key={num}>
                      <td>{num}</td>
                      <td>{nombrePokemon}</td>
                      <td>
                        <img
                          src={construirURLImagen(nombrePokemon)}
                          alt={`Imagen de ${nombrePokemon}`}
                          style={{ width: '150px', height: '150px' }}
                        />
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Si no hay Pokémon en esa posición o es 'null' o '', retornar null
                }
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GetTeams;

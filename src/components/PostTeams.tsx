import React, { useEffect, useState } from "react";
import axios from "axios";

const PostTeams = () => {
  const [nombre1, setNombre1] = useState<string>('');
  const [imagenUrl1, setImagenUrl1] = useState<string>(''); 

  const [nombre2, setNombre2] = useState<string>('');
  const [imagenUrl2, setImagenUrl2] = useState<string>(''); 
  
  // Variable para el nombre del Pokémon
  const [pokemones, setPokemones] = useState<{ name: string; index: number }[]>([]); // Estado para almacenar los Pokémon
  // Estado para la URL de la imagen del Pokémon

  const guardarPokemones = async () => {
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

      setPokemones(allPokemon); // Guardamos todos los Pokémon en el estado pokemones

    } catch (err) {
      console.log('Se produjo un error al obtener los nombres de Pokémon de múltiples generaciones');
    }
  };        // fin de guardando pokemones xddd

  // 3333333333333333333333333333333333333333333333333333333333333333333

  const cambiarVar1 = (pokeName: string) => {
    setNombre1(pokeName.toLowerCase()); // Convertimos el nombre a minúsculas y lo guardamos en estado
  };



  const buscaPokemon = (nombrePokemon: string, pokemones: { name: string; index: number }[]) => {
    for (let i = 0; i < pokemones.length; i++) {
      const pokemon = pokemones[i];
      if (nombrePokemon === pokemon.name.toLowerCase()) { // Comparamos nombres en minúsculas
        const id = pokemon.index;
        buscaImagen(id); // Llamamos a la función para buscar la imagen con el ID correspondiente
        return; // Terminamos la búsqueda una vez encontrado el Pokémon
      }
    }
    // Si no se encuentra el Pokémon, podrías manejar alguna lógica de error aquí
  };

  const buscaImagen = (id: number) => {
    if (id) {
      const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      setImagenUrl1(url); // Guardamos la URL de la imagen en estado para mostrarla
    }
  };

  useEffect(() => {
    guardarPokemones(); // Llamada a la función para obtener los Pokémon al montar el componente
  }, []);

  useEffect(() => {
    if (nombre1.trim() !== '') { // Verificamos que el nombre no esté vacío antes de buscar
      buscaPokemon(nombre1, pokemones); // Llamada a la función de búsqueda al cambiar el nombre
    }
  }, [nombre1, pokemones]);















  return (
    <div>
      <input type="text" onChange={(e) => cambiarVar1(e.target.value)} />
      <p>{nombre1}</p>
      
      {imagenUrl1  &&(
        <div>
            <img src={imagenUrl1} alt={`Imagen de ${nombre1}`} />
        </div> // Mostrar la imagen si hay una URL válida
        
      )}

      {/* Solo para verificar que se guardan los Pokémon correctamente
      {pokemones.map((poke, index) => (
        <p key={index}>{poke.name}</p>
      ))}
      */}
    </div>
  );
};

export default PostTeams;

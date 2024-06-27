import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/postTeam.css";

const PostTeams = () => {
  const [nombre1, setNombre1] = useState<string>('');
  const [imagenUrl1, setImagenUrl1] = useState<string>(''); 

  const [nombre2, setNombre2] = useState<string>('');
  const [imagenUrl2, setImagenUrl2] = useState<string>(''); 

  const [nombre3, setNombre3] = useState<string>('');
  const [imagenUrl3, setImagenUrl3] = useState<string>(''); 

  const [nombre4, setNombre4] = useState<string>('');
  const [imagenUrl4, setImagenUrl4] = useState<string>(''); 

  const [nombre5, setNombre5] = useState<string>('');
  const [imagenUrl5, setImagenUrl5] = useState<string>(''); 

  const [nombre6, setNombre6] = useState<string>('');
  const [imagenUrl6, setImagenUrl6] = useState<string>(''); 
  
  // Variable para el nombre del Pokémon
  const [pokemones, setPokemones] = useState<{ name: string; index: number }[]>([]); // Array para almacenar los Pokémon
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
      let currentIndex = 1; // Índice inicial para todos los Pokémon

      for (let gen of generations) {
        const respuesta = await axios.get(gen);
        const jsonName = respuesta.data.results;
        // eslint-disable-next-line 
        const nuevosPokemon = jsonName.map((pokemon: any) => ({
          name: pokemon.name,
          index: currentIndex++ // Usamos y luego incrementamos currentIndex
        }));

        allPokemon = [...allPokemon, ...nuevosPokemon];
      }

      setPokemones(allPokemon); // Guardamos todos los Pokémon en el estado pokemones

    } catch (err) {
      console.log('Se produjo un error al obtener los nombres de Pokémon de múltiples generaciones');
    }
  };        // fin de guardando pokemones xddd

  // #############################################################################################################


  const cambiarVar1 = (pokeName: string) => {
    setNombre1(pokeName.toLowerCase()); 
  };

  const cambiarVar2 = (pokeName: string) => {
    setNombre2(pokeName.toLowerCase()); 
  };

  const cambiarVar3 = (pokeName: string) => {
    setNombre3(pokeName.toLowerCase()); 
  };

  const cambiarVar4 = (pokeName: string) => {
    setNombre4(pokeName.toLowerCase()); 
  };

  const cambiarVar5 = (pokeName: string) => {
    setNombre5(pokeName.toLowerCase());  
  };

  const cambiarVar6 = (pokeName: string) => {
    setNombre6(pokeName.toLowerCase()); 
  };


  const buscaPokemon = (nombrePokemon: string, input: string ,pokemones: { name: string; index: number }[]) => {
    for (let i = 0; i < pokemones.length; i++) {
      const pokemon = pokemones[i];
      if (nombrePokemon === pokemon.name.toLowerCase()) { // Comparamos nombres en minúsculas
        const id = pokemon.index;
        buscaImagen(id, input); // Llamamos a la función para buscar la imagen con el ID correspondiente
        return; // Terminamos la búsqueda una vez encontrado el Pokémon
      }
    }
    // Si no se encuentra el Pokémon, podrías manejar alguna lógica de error aquí
  };

  const buscaImagen = (id: number, input:string) => {
    if (id) {
      switch (input) {
        case 'nombre1':
          const url1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          setImagenUrl1(url1); // Guardamos la URL de la imagen en estado para mostrarla
          break;
        case 'nombre2':
          const url2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          setImagenUrl2(url2); 
          break;
        case 'nombre3':
          const url3 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          setImagenUrl3(url3); // Guardamos la URL de la imagen en estado para mostrarla
          break;
        case 'nombre4':
          const url4 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          setImagenUrl4(url4); 
          break;
        case 'nombre5':
          const url5 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          setImagenUrl5(url5); // Guardamos la URL de la imagen en estado para mostrarla
          break;
        case 'nombre6':
          const url6 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          setImagenUrl6(url6); 
          break;
      }//cierra switch case

    }
  };

  

  useEffect(() => {
    guardarPokemones(); // Llamada a la función para obtener los Pokémon al montar el componente
  }, []);


  //    POKEMON 1
  useEffect(() => {
    if (nombre1.trim() !== '') { // Verificamos que el nombre no esté vacío antes de buscar
      buscaPokemon(nombre1, 'nombre1' ,pokemones); // Llamada a la función de búsqueda al cambiar el nombre
    } // eslint-disable-next-line 
  }, [nombre1, pokemones]);

   //    POKEMON 2
  useEffect(() => {
    if (nombre2.trim() !== '') { // Verificamos que el nombre no esté vacío antes de buscar
      buscaPokemon(nombre2, 'nombre2' ,pokemones); // Llamada a la función de búsqueda al cambiar el nombre
    } // eslint-disable-next-line 
  }, [nombre2, pokemones]);

  //    POKEMON 3
  useEffect(() => {
    if (nombre3.trim() !== '') { // Verificamos que el nombre no esté vacío antes de buscar
      buscaPokemon(nombre3, 'nombre3' ,pokemones); // Llamada a la función de búsqueda al cambiar el nombre
    } // eslint-disable-next-line 
  }, [nombre3, pokemones]);

   //    POKEMON 4
  useEffect(() => {
    if (nombre4.trim() !== '') { // Verificamos que el nombre no esté vacío antes de buscar
      buscaPokemon(nombre4, 'nombre4' ,pokemones); // Llamada a la función de búsqueda al cambiar el nombre
    } // eslint-disable-next-line 
  }, [nombre4, pokemones]);

  //    POKEMON 5
  useEffect(() => {
    if (nombre5.trim() !== '') { // Verificamos que el nombre no esté vacío antes de buscar
      buscaPokemon(nombre5, 'nombre5' ,pokemones); // Llamada a la función de búsqueda al cambiar el nombre
    } // eslint-disable-next-line
  }, [nombre5, pokemones]);

   //    POKEMON 6
  useEffect(() => {
    if (nombre6.trim() !== '') { // Verificamos que el nombre no esté vacío antes de buscar
      buscaPokemon(nombre6, 'nombre6' ,pokemones); // Llamada a la función de búsqueda al cambiar el nombre
    } // eslint-disable-next-line 
  }, [nombre6, pokemones]);

    return (
    <div>
      <div className="contenedor_form">
        <h3>Formulario para publicar tu equipo</h3>

        <div className="formulario">
          <div className="inputs">
            <h4>Pokemon 1</h4>
            <input type="text" onChange={(e) => cambiarVar1(e.target.value)} />
            <img src={imagenUrl1} alt={`Imagen de ${nombre1}`} />

            <h4>Pokemon 2</h4>
            <input type="text" onChange={(e) => cambiarVar2(e.target.value)} />
            <img src={imagenUrl2} width="30px" height="20px" alt={`Imagen de ${nombre2}`} />

            <h4>Pokemon 3</h4>
            <input type="text" onChange={(e) => cambiarVar3(e.target.value)} />
            <img src={imagenUrl3} alt={`Imagen de ${nombre3}`} />

            <h4>Pokemon 4</h4>
            <input type="text" onChange={(e) => cambiarVar4(e.target.value)} />
            <img src={imagenUrl4} alt={`Imagen de ${nombre4}`} />

            <h4>Pokemon 5</h4>
            <input type="text" onChange={(e) => cambiarVar5(e.target.value)} />
            <img src={imagenUrl5} alt={`Imagen de ${nombre5}`} />

            <h4>Pokemon 6</h4>
            <input type="text" onChange={(e) => cambiarVar6(e.target.value)} />
            <img src={imagenUrl6} alt={`Imagen de ${nombre6}`} />

          </div>


        </div>

      </div>















      {/* trabajando con las imagenes y los inputs */}

      {/* <input type="text" onChange={(e) => cambiarVar1(e.target.value)} />
      <input type="text" onChange={(e) => cambiarVar2(e.target.value)} />
      <input type="text" onChange={(e) => cambiarVar3(e.target.value)} />
      <input type="text" onChange={(e) => cambiarVar4(e.target.value)} />
      <input type="text" onChange={(e) => cambiarVar5(e.target.value)} />
      <input type="text" onChange={(e) => cambiarVar6(e.target.value)} />
      <p>{nombre1}</p> */}
      
      {/* {imagenUrl1  && (
        <div>
            <img src={imagenUrl1} alt={`Imagen de ${nombre1}`} />
            <img src={imagenUrl2} alt={`Imagen de ${nombre2}`} />
            <img src={imagenUrl3} alt={`Imagen de ${nombre3}`} />
            <img src={imagenUrl4} alt={`Imagen de ${nombre4}`} />
            <img src={imagenUrl5} alt={`Imagen de ${nombre5}`} />
            <img src={imagenUrl6} alt={`Imagen de ${nombre6}`} />
        </div> 
        
      )} */}

      
    </div>
  );
};

export default PostTeams;

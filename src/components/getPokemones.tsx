import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/pag.css";
import pokelogo from  '../styles/pokelogo.png'


const GetPokemon = () => {
    // Definir el tipo para las generaciones
    type Generation = 'Gen1' | 'Gen2' | 'Gen3' | 'Gen4' | 'Gen5';

    // Estados para los datos y la generación
    const [data, setData] = useState<any[]>([]); 
    const [gen, setGen] = useState<Generation>("Gen1");
    const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null); // Estado para el Pokémon seleccionado

    // URLs de las generaciones
    const urls: { [key in Generation]: string } = {
        Gen1: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151",
        Gen2: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100",
        Gen3: "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135",
        Gen4: "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107",
        Gen5: "https://pokeapi.co/api/v2/pokemon?offset=493&limit=156"
    };

    // Función para obtener los datos de la API
    const obtener = async (url: string) => {
        try {
            const response = await axios.get(url);
            const json = response.data.results;             //acá el profe lo trabaja como json
            setData(json);
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect cada vez que cambia generación
    useEffect(() => {
        obtener(urls[gen]);
        //eslint 
    }, [gen]);

    // Función del clic en el pokemon
    const pokepokexd = (pokemon: any) => {
        const ruta = pokemon.url;               //le mando la url
        Pokeinfo(ruta);
    };

    const Pokeinfo = async (ruta: string) => {
        try {
            const response = await axios.get(ruta);
            const pokemonData = {
                name: response.data.name,
                id: response.data.id,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
                types: response.data.types.map((type: any) =>type.type.name),
                moves: response.data.moves.map((move: any) => move.move.name),
                height: response.data.height,
                weight: response.data.weight
            };
            setSelectedPokemon(pokemonData); // Establece el Pokémon seleccionado en el estado
        } catch (error) {
            console.error('Error fetching Pokemon details:', error);
        }
    };

    const equis = () => {
        setSelectedPokemon(null);
    };
    

    return (
        <div className="color" >
             <div className="contenedor_grande">
             <img className="space" src={pokelogo} alt="pokelogoxd" width="30%"  />
            <br />
            <br />
            <div className="opciones" >
                <h5>Generación</h5> 
                <select name="generacion" id="cmb1opciones" onChange={(e) => setGen(e.target.value as Generation)}> 
                    <option value="Gen1">Primera</option>
                    <option value="Gen2">Segunda</option>
                    <option value="Gen3">Tercera</option>
                    <option value="Gen4">Cuarta</option>
                    <option value="Gen5">Quinta</option>
                </select>
            </div>
            
            <hr />
            <div className="row row-cols-3 row-cols-md-6 g-1">
                {data.map((item) => {
                    const ruta = item.url;
                    const pock = ruta.split('/');
                    const id = pock[6];
                    const urlP = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                    return (
                        <div className="col" key={id}>
                            <div className="card h-100" onClick={() => pokepokexd(item)}>
                                <img src={urlP} className="card-img" width="5%" alt="Sprite de Pokemon"/> 
                                <div className="card-body">
                                    <hr />
                                    <h5 className="card-title">{item.name}</h5>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
       

        {/* Modal para el Pokémon seleccionado */}
            {selectedPokemon && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={equis}>&times;</span>
                        <div className="card">
                            <img  src={selectedPokemon.imageUrl} className="card-img-top" alt="Sprite de Pokemon"/>
                            <div className="card-body">
                                <h5 className="card-title">{selectedPokemon.name}</h5>
                                <p>Number: {selectedPokemon.id}</p>
                                <p>Height: {selectedPokemon.height} </p>
                                <p>Weight: {selectedPokemon.weight} </p>
                                <p>Type: {selectedPokemon.types.map((type: string, index: number)  => (
                                    <p key={index}>{type} </p>
                                ))} 
                                </p>
                                <p >Moves:</p>
                                <ul>
                                {selectedPokemon.moves.map((move: string, index: number) => (
                                        <p id="scrollspyHeading2" key={index}>{move}</p> ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetPokemon;
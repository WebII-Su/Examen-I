import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const GetTrainer = () => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const obtener = async () => {
        try {
          const response = await axios.get('http://localhost:5005/api/getTrainers');
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
        obtener();
      }, []);
    

      if (error) {
        return <div>
            <h4>Parece que hubo un error!</h4>
        <footer>{error}</footer>
        </div>;
      }

    return(
        <div className="contenedor_grande">
            <h1>pruebaxd</h1>
            {data.length === 0 ? (
            <p>No existen entrenadores.</p>
      ) : (
        <div className="container-lg" >
            <h3>Estos son los entrenadores que existen: </h3>
            <div className="row" >
            {data.map((trainer, index) => (
            <div className="col" key={index}>
                <div className="card h-100" >
                <img src={trainer.foto_Url} className="card-img img-fluid" width="40%" alt="Sprite de Pokemon"/> 
                <div className="card-body"> 
                    <hr />
                    <h6 className="card-title" > Entrenador: {trainer.nombre} </h6>
                    <p className="card-text" >Pokémon 1: {trainer.apellidos}</p>
                    <p>Sexo: {trainer.sexo }</p>
                    <p>Residencia: {trainer.residencia}</p>
                </div>
                </div>
            </div>
            ))}
            </div>
            <br />
            <br />
            <button onClick={() => navigate('/postTrainers')}>AGREGA UN ENTRENADOR!</button>
      </div>
    )}
  </div>
);
};
export default GetTrainer;
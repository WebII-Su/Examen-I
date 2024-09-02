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
          const jsonData = response.data;
      if (jsonData.status_code === 200) {
        setData(Array.isArray(jsonData.data) ? jsonData.data : []);
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
            {data.length === 0 ? (
            <div>            
              Al parecer no existen entrenadores...
              <br />
              <br />
              <button onClick={() => navigate('/postTrainers')}>AGREGA UN ENTRENADOR!</button>
            </div>
      ) : (
        <div className="container-lg" >
            <h3>Estos son los entrenadores que existen: </h3>
            <div className="row" >
            {data.map((trainer, index) => (
            <div className="col" key={index}>
                <div className="card h-100" >
                <img src={trainer.foto_Url} className="card-img" width="100px" height="100px" alt="Sprite de Pokemon"/> 
                <div className="card-body"> 
                    <hr />
                    <h6 className="card-title"> Entrenador: {trainer.nombre}-{trainer.apellidos} </h6>
                    <p className="card-text">Sexo: {trainer.sexo }</p>
                    <p className="card-text">Residencia: {trainer.residencia} </p>
                    <p></p>
                    <p></p>
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
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




type Trainer = {   //acá es lo mismo que las generaciones| se puyede usar interface
    _id: string;
    nombre: string;
    apellidos: string;
    sexo: string;
    residencia: string;
    foto_Url: string;
};

const GetTrainer = () => {
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerTrainer = async () => {
            try {
                const response = await axios.get('http://localhost:5005/');
                const json = response.data;             //acá el profe lo trabaja como json
                setData(json);
                console.log(json);
            } catch (error) {
                console.error(error);
            }
        };

        obtenerTrainer();
    }, []);
    

    return(
        <div>
             <ul>
        {data.map((item, index) => (
          <p key={index}>{item.nombre} - {item.apellidos}</p>
        
        ))}
      </ul>
      <br />
      <button onClick={() => navigate('/putTrainers')} >Ingresa un nuevo entrenador!</button>
        </div>
    )

}
export default GetTrainer;
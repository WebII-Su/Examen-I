import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const GetTrainer = () => {
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerTrainer = async () => {
            try {
                const response = await axios.get('http://localhost:5005/trainers');
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
        <div className="contenedor_grande">
            <h1>pruebaxd</h1>
        
        </div>
    )

}
export default GetTrainer;
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const GetTrainer = () => {
    const [data, setData] = useState([]);
    let result: any[];
    result = [];
    const navigate = useNavigate();

    const Obtener = async () => {
        try {
            axios
                .get('http://localhost:5000/users')
                .then(response => {
                    const json = response.data;
                    setData(json.data);
                    console.log(json.data);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const convertir = () => {
        data.forEach((item, index) => {
            result.push(item);
        });
    }

    useEffect(() => {
        Obtener();

    }, []);

    useEffect(() => {
        convertir();
    }, [data]);
    

    return(
        <div className="contenedor_grande">
            <h1>pruebaxd</h1>
        
        </div>
    )

}
export default GetTrainer;
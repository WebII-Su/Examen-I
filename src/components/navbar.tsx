import React from "react";
import {Link} from "react-router-dom";

const navbar = () => {
    return(
        <>
        <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
            <div className="bg-dark p-4">
            <span className="text-body-secondary">  <Link to="/listPokemon" >Pokemones</Link>   </span>
            <span className="text-body-secondary">  <Link to="/listTrainers">Entrenadores</Link>    </span>
        </div>
        </div>
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
    </div>
    </nav>
    </>
    )
}
export default navbar;
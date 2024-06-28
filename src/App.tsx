import React from 'react';
import pok from './styles/pok.png';
import autores from './styles/autores.png';
import pokelogo from './styles/pokelogo.png'

const App = () => {
  return (
    <div
      style={{
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundImage: `url(${pok})`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh'
      }}
    >
      <div
        style={{
          color: 'white',
          position: 'relative',
          paddingTop: '6%',
          paddingLeft: '10%'

        }}
      >
        <img src={pokelogo} width="40%" alt="" />
        <br />
        <img src={autores} width="29%" style={{
            paddingLeft: '14%'
        }}  alt="" />
      </div>
    </div>
  );
}

export default App;
import React from 'react'
import './App.css'
import Home from './componentes/Site/Home';
import devinhoYeah from './assets/devinho yeah.png';

function App() {

  return(
    <>
      <h1>Bem-vindo ao Site de Votações</h1>
      <div class="divisao">
        <div class="titulo">
          <img src={devinhoYeah} alt="Devinho Yeah" id="yeah"/>
        </div>
        <div class="formulario">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App

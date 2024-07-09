import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom

export default function ListaJogos({id, titulo, descricao, url, jogos}) {

  const [jogo, setJogo] = useState([]);

  useEffect(() => {
    const acharJogo = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3000/jogos/jogoEspecifico/${jogos}`);
        if(resposta.status === 200)
          setJogo(resposta.data)
      } catch (erro){
        console.log(erro);
      }
    }
    acharJogo();
  }, [jogos])  
  
  return (
    <>
      <p>{titulo}</p>
    {
      jogo.map((game, index) => (
          <img src={game.image} alt={game.name} key={index} />
      ))
    }
      <button><Link to='/verListaJogo' state={{id, titulo, descricao, url, jogos}}>Acessar</Link></button>
    </>
  )
}
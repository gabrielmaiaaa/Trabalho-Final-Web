import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function IdentidadeVisual() {
  const {titulo, descricao, url, jogos} = useLocation().state

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
    <h2>{titulo}</h2>
    <p>{descricao}</p>
    {
      jogo.map((game, index) => (
        <button key={index}>
          <img src={game.image} alt={game.name} />
          <p>Votar</p>
        </button>
      ))
    }

    <button> <Link to={`${url}`}>Página no itch.io</Link> </button>
    <button> <Link to='/tema' state={{titulo,descricao,url,jogos}}>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/polimento' state={{titulo,descricao,url,jogos}}>Próxima Categoria</Link> </button>
    </>
  )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function GameDesign() {
  const {id, titulo, descricao, url, jogos} = useLocation().state
  const [jogo, setJogo] = useState([]);
  const categoria = 'gameDesign';

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
  }, [jogos]);
  console.log(jogo);

  const vote = async (gameId) =>{
    const competicaoId = id;

    console.log("votei");

    try {
      
      const response = await axios.post('http://localhost:3000/votar', {
        competicaoId,
        categoria,
        gameId

      });

      if(response.data.success){
        alert('Voto registrado com sucesso!');
      }

    } catch (error) {
      console.log('Erro', error);
    }

  };

  return (
    <>
    <h2>{titulo}</h2>
    <p>{descricao}</p>
    {
      jogo.map((game, index) => (
        
        <button key={index} onClick={vote(index)}>
          <img src={game.image} alt={game.name} />
          <p>Votar</p>
        </button>
      ))
    }
    <button> <Link to={`${url}`}>Página no itch.io</Link> </button>
    <button> <Link to='/polimento'>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/jogabilidade'>Próxima Categoria</Link> </button>
    </>
  )
}

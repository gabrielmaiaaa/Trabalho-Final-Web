import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListaJogos.css';

export default function ListaJogos({ id, titulo, descricao, url, jogos }) {
  const [jogo, setJogo] = useState([]);

  useEffect(() => {
    const acharJogo = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3000/jogos/jogoEspecifico/${jogos}`);
        if (resposta.status === 200)
          setJogo(resposta.data);
      } catch (erro) {
        console.log(erro);
      }
    }
    acharJogo();
  }, [jogos]);

  return (
    <div className="lista-jogos">
      <button className="button">
        <div className="button-content">
          {jogo.map((game, index) => (
            <img src={game.image} alt={game.name} key={index} className="game-image" />
          ))}
        </div>
        <div className="button-text">{titulo}</div>
        <Link to='/verListaJogo' state={{ id, titulo, descricao, url, jogos }} className="button-link" aria-label={titulo}></Link>
      </button>
    </div>
  )
}

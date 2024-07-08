import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Polimento() {

  const {titulo, descricao, url, jogos} = useLocation().state;

  return (
    <>
    <h2>{titulo}</h2>
    <p>{descricao}</p>

    <button>

    </button>

    <button> <Link to={`${url}`}>Página no itch.io</Link> </button>
    <button> <Link to='/identidade-visual' state={{titulo,descricao,url,jogos}}>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/game-design' state={{titulo,descricao,url,jogos}}>Próxima Categoria</Link> </button>
    </>
  )
}

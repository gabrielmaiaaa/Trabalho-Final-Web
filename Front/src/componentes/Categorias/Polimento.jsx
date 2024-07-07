import React from 'react'
import { Link } from 'react-router-dom'

export default function Polimento({link}) {
  return (
    <>
    <button> <Link to={`${link}`}>Página no itch.io</Link> </button>
    <button> <Link to='/identidade-visual'>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/game-design'>Próxima Categoria</Link> </button>
    </>
  )
}

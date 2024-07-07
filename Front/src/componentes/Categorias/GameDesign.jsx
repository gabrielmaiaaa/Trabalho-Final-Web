import React from 'react'
import { Link } from 'react-router-dom'

export default function GameDesign({link}) {
  return (
    <>
    <button> <Link to={`${link}`}>Página no itch.io</Link> </button>
    <button> <Link to='/polimento'>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/jogabilidade'>Próxima Categoria</Link> </button>
    </>
  )
}

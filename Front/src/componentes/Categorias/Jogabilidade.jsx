import React from 'react'
import { Link } from 'react-router-dom'

export default function Jogabilidade({link}) {
  return (
    <>
    <button> <Link to={`${link}`}>Página no itch.io</Link> </button>
    <button> <Link to='/game-design'>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/originalidade'>Próxima Categoria</Link> </button>
    </>
  )
}

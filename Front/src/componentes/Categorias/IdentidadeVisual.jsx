import React from 'react'
import { Link } from 'react-router-dom'

export default function IdentidadeVisual({link}) {
  return (
    <>
    <button> <Link to={`${link}`}>Página no itch.io</Link> </button>
    <button> <Link to='/tema'>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/polimento'>Próxima Categoria</Link> </button>
    </>
  )
}

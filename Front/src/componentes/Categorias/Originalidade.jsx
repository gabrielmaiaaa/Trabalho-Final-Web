import React from 'react'
import { Link } from 'react-router-dom'

export default function Originalidade({link}) {
  return (
    <>
    <button> <Link to={`${link}`}>Página no itch.io</Link> </button>
    <button> <Link to='/jogabilidade'>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/tema'>Próxima Categoria</Link> </button>
    </>
  )
}

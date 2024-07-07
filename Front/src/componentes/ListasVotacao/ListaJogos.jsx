import React from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom

export default function ListaJogos({id, titulo, descricao}) {

  return (
    <>
      <p>{titulo}</p>
      <button><Link to='/verListaJogo' state={{id, titulo, descricao}}>Acessar</Link></button>
    </>
  )
}
import React from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom

export default function ListaJogos({id, username, email, password, admin}) {

  return (
    <>
      <p>{username}</p>
      <button><Link to='/verListaJogo'>Acessar</Link></button>
    </>
  )
}
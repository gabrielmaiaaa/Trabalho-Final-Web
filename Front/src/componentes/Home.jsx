import React from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom
import ListaJogos from './ListaJogos.jsx'

export default function Home() {

  return (
    <>
        <ListaJogos />
        
        <button><Link to='/configuração'>Configuração</Link></button>
        <button><Link to='/votação'>Votação</Link></button>
    </>
  ) 
}

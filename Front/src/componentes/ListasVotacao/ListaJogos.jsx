import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom

export default function ListaJogos({id, titulo, descricao, url, jogos}) {  
  return (
    <>
      <p>{titulo}</p>
      <button><Link to='/verListaJogo' state={{id, titulo, descricao, url, jogos}}>Acessar</Link></button>
    </>
  )
}
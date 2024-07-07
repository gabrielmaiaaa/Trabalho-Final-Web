import React from 'react'

export default function ListaJogos({id, username, email, password, admin}) {

  return (
    <>
      <p>{username}</p>
      <button>Acessar</button>
    </>
  )
}
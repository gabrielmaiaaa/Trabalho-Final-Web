import React from 'react'
import {Link, Navigate, useLocation} from 'react-router-dom' //npm i react-router-dom
import { useState } from 'react';
import axios from 'axios'

export default function Configuração() {

  const [msg, setMsg] = useState('');

  const {id, username, email, password} = useLocation().state;
  // const {id, username, email, password} = useLocation().state || {};

  const [dados, setDados] = useState({
    id,
    username,
    email,
    password
  });

  const handleChange = (e) => {
    const novoValor = {
      [e.target.name] : e.target.value
    }

    setDados({
      ...dados,
      ...novoValor
    });
  }

  const config = {
    headers: {
      Authorization : "Bearer " + sessionStorage.getItem('token')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const estado = await axios.put('http://localhost:3000/atualizarDados/atualizar-dados', dados, config);
      if(estado.status === 200){
        setMsg('OK');
      }
    }catch (error){
      console.log(error);
    }
  }

  const handleDelete = async () => {
    let c = confirm(`Deseja excluir a conta ${username}?`);
    if(c === true){
      try {
        const resposta = await axios.delete(`http://localhost:3000/atualizarDados/deletar-dados/${id}`, config);
        if(resposta.status === 200)
          location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  if(msg === 'OK')
    return <Navigate to='/' /> 

  return (
    <>
    <h1>Dados Pessoais</h1>
    <hr />
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Nome</label>
        <input type="text" id='username' name='username' 
        onChange={handleChange} value={dados.username} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id='email' name='email'  
        onChange={handleChange} value={dados.email} />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input type="password" id='password' name='password'  
        onChange={handleChange} value={dados.password} />
      </div>
      
      <Link to='/'>Voltar</Link>
      <button>Atualizar</button>
      <button onClick={handleDelete}>Excluir Perfil</button>
    </form>
    </>
  )
}

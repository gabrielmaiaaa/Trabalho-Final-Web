import axios from 'axios'
import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function VerListaJogo() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState('');

  const {id, titulo, descricao, url, jogos} = useLocation().state;

  const handleDelete = async () =>{
    let c = confirm(`Deseja exluir a lista ${titulo}?`);
    if(c === true){
      try {
        const resposta = await axios.delete(`http://localhost:3000/listas/deletar-lista/${id}`);
        if(resposta.status === 200){
          setMsg('OK');
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleBack = () => navigate(-1);

  return (
    <>
      <p>{titulo}</p>
      <p>{descricao}</p>
      <p>Vote na catagoria: <Link to='/identidade-visual' state={{titulo,descricao,url,jogos}}>Identidade Visual</Link></p>
      <p>Vote na catagoria: <Link to='/polimento' state={{titulo,descricao,url,jogos}}>Polimento</Link></p>
      <p>Vote na catagoria: <Link to='/game-design' state={{titulo,descricao,url,jogos}}>Game Design</Link></p>
      <p>Vote na catagoria: <Link to='/jogabilidade' state={{titulo,descricao,url,jogos}}>Jogabilidade</Link></p>
      <p>Vote na catagoria: <Link to='/originalidade' state={{titulo,descricao,url,jogos}}>Originalidade</Link></p>
      <p>Vote na catagoria: <Link to='/tema'>Tema</Link></p>
      <button onClick={handleBack}>Voltar</button>
      <button onClick={handleDelete}>Excluir Lista</button>
    </>
  )
}

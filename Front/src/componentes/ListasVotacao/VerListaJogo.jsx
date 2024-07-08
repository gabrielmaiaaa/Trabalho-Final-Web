import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function VerListaJogo() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState('');

  const {id, titulo, descricao, url, jogos} = useLocation().state;

  const email = localStorage.getItem('email');

  const [authorized, setAuthorized] = useState(false);

  const config = {
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem('token')
    }
  }

  useEffect(() =>{
      
    async function validaAcesso(){
      try{
        const resposta = await axios.get('http://localhost:3000/auth/usuarios', config);
        if(resposta.status === 200){
          setAuthorized(true);
        }
      } catch(erro){
        console.log(erro);
        setAuthorized(false);            
      }
    }
    validaAcesso();
  },[]);

  const handleDelete = async () => {
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

  if(!authorized) return <p>Sem Autorização</p>

  return (
    <>
      <p>{titulo}</p>
      <p>{descricao}</p>
      <p>Vote na catagoria: <Link to='/identidade-visual' state={{id,titulo,descricao,url,jogos}}>Identidade Visual</Link></p>
      <p>Vote na catagoria: <Link to='/polimento' state={{id,titulo,descricao,url,jogos}}>Polimento</Link></p>
      <p>Vote na catagoria: <Link to='/game-design' state={{id,titulo,descricao,url,jogos}}>Game Design</Link></p>
      <p>Vote na catagoria: <Link to='/jogabilidade' state={{id,titulo,descricao,url,jogos}}>Jogabilidade</Link></p>
      <p>Vote na catagoria: <Link to='/originalidade' state={{id,titulo,descricao,url,jogos}}>Originalidade</Link></p>
      <p>Vote na catagoria: <Link to='/tema' state={{id,titulo,descricao,url,jogos}}>Tema</Link></p>
      <button> <Link to='/paginaInicial' state={{email}}>Voltar</Link> </button>
      <button onClick={handleDelete}>Excluir Lista</button>
      <button> <Link to='/resultados' state={{id}}>Resultados</Link> </button>
    </>
  )
}

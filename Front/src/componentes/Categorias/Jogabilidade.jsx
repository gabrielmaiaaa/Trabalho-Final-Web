import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Jogabilidade() {
  const {titulo, descricao, url, jogos} = useLocation().state

  const [jogo, setJogo] = useState([]);

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

  useEffect(() => {
    const acharJogo = async () => {
      try {
        const resposta = await axios.get(`http://localhost:3000/jogos/jogoEspecifico/${jogos}`);
        if(resposta.status === 200)
          setJogo(resposta.data)
      } catch (erro){
        console.log(erro);
      }
    }
    acharJogo();
  }, [jogos])

  if(!authorized) return <p>Sem Autorização</p>

  return (
    <>
    <h2>{titulo}</h2>
    <p>{descricao}</p>
    {
      jogo.map((game, index) => (
        <button key={index}>
          <img src={game.image} alt={game.name} />
          <p>Votar</p>
        </button>
      ))
    }
    <button> <Link to={`${url}`}>Página no itch.io</Link> </button>
    <button> <Link to='/game-design' state={{titulo,descricao,url,jogos}}>Voltar Categoria</Link> </button>
    <button> <Link to='/'>Mostrar todos</Link> </button>
    <button> <Link to='/originalidade' state={{titulo,descricao,url,jogos}}>Próxima Categoria</Link> </button>
    </>
  )
}

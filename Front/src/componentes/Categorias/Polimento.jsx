import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Polimento() {
  const {id, titulo, descricao, url, jogos} = useLocation().state
  const [jogo, setJogo] = useState([]);
  const categoria = 'Polimento';

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

  const vote = async (gameId, nome) => {
    const competicaoId = id;

    console.log("Dados enviados:", {
      competicaoId,
      categoria,
      gameId
    });
    let c = confirm(`Deseja votar em ${nome}`);
    if(c === true){
      try {
        const response = await axios.post('http://localhost:3000/votar/votando', {
          competicaoId,
          categoria,
          gameId
        });
  
        console.log("Resposta recebida:", response);
  
        if (response.data.success) {
          alert('Voto registrado com sucesso!');
        }
  
      } catch (error) {
        console.log('Erro:', error.response ? error.response.data : error.message);
      }
    }
  };

  if(!authorized) return <p>Sem Autorização</p>

  return (
    <>
    <h1>Polimento</h1>
    <h2>{titulo}</h2>
    <p>{descricao}</p>
    {
      jogo.map((game, index) => (
        
        <button key={index} onClick={() => vote(index,game.name)}>
          <img src={game.image} alt={game.name} />
          <p>Votar</p>
        </button>
      ))
    }

    <button> <Link to={`${url}`}>Página no itch.io</Link> </button>
    <button> <Link to='/identidade-visual' state={{id,titulo,descricao,url,jogos}}>Voltar Categoria</Link> </button>
    <button> <Link to='/game-design' state={{id,titulo,descricao,url,jogos}}>Próxima Categoria</Link> </button>
    </>
  )
}

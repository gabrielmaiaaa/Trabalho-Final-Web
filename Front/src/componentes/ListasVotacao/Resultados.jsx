import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Resultados() {
  const {id, titulo} = useLocation().state;
  const [authorized, setAuthorized] = useState(false);
  const [resultado, setResultado] = useState([]);

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
    async function fazueli(){
      try{
        const resposta = await axios.get(`http://localhost:3000/resultados/resultado/${id}`);
        if(resposta.status === 200){
          setResultado(resposta.data);
        }
      } catch (erro){
        console.log(erro);
      }
    }
    fazueli();
  }, [])

  if(!authorized) return <p>Sem Autorização</p>

  return (
    <>
    <h1>{titulo}!</h1>
    <h3>Jogos ganhadores de cada categoria:</h3>
    {
      resultado.map((result, index) => (
        <p key={index}>{result.categoria}: {result.ganhador}</p>
      ))
    }
    </>
  )
}

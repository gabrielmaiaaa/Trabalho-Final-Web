import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom' //npm i react-router-dom
import ListaJogos from '../ListasVotacao/ListaJogos';

export default function PaginaInicial() {

  const [propriedades, setPropriedades] = useState([]);
  const [dadosListas, setDadosListas] = useState([]);
  const [user, setUser] = useState();

  const [authorized, setAuthorized] = useState(false);

  const {email} = useLocation().state;

  localStorage.setItem('email', email);

  const config = {
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem('token')
    }
  }

  useEffect(() =>{
      
      async function buscaPropriedades(){
        try{
          const resposta = await axios.get('http://localhost:3000/auth/usuarios', config);
          if(resposta.status === 200){
            setPropriedades(resposta.data);
            console.log(resposta.data);
            setAuthorized(true);
          }
        } catch(erro){
          console.log(erro);
          setAuthorized(false);            
        }
      }
      buscaPropriedades();
  },[]);

  useEffect(() => {
    async function buscaLista(){
      try{
        const list = await axios.get('http://localhost:3000/listas/dados', config);
        setDadosListas(list.data);
      } catch (erro) {
        console.log(erro);
      }
    }
    buscaLista();
  }, []);
  
  useEffect(() => {
    const usuario = propriedades.find(p => p.email === email);
    setUser(usuario);
  }, [propriedades, email]);

  if (!user) {
    console.log("Carregando ou usuário não encontrado...");
  }

  if(!authorized) return <p>Sem Autorização</p>

  return (
    <>
    <div>
      {
        dadosListas.map(p => <ListaJogos key={p.id} {...p} />)
      }
    </div>
    <button><Link to='/criarListaJogos'>Criar Lista</Link></button>
    <button><Link to='/configuracao' state={{...user}}>Configuração</Link></button>
    <button><Link to='/'>Sair da Conta</Link></button>
    </>
  )
}
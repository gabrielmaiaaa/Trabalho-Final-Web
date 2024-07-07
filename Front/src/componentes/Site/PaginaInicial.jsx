import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom
import Configuracao from './Configuracao';
import ListaJogos from '../ListasVotacao/ListaJogos';

export default function PaginaInicial({email}) {

  const [propriedades, setPropriedades] = useState([]);
  const [dadosListas, setDadosListas] = useState([]);
  const [user, setUser] = useState();

    useEffect(() =>{
        
        async function buscaPropriedades(){
            const dado = await axios.get('http://localhost:3000/auth/usuarios');
            //Armazenar a resposta em um state
            setPropriedades(dado.data);
            console.log(dado.data);
        }
        buscaPropriedades();
    },[]);

    useEffect(() => {
      async function buscaLista(){
        const list = await axios.get('http://localhost:3000/listas/dados');
        setDadosListas(list.data);
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

  return (
    <>
    <div>
      {
        dadosListas.map(p => <ListaJogos key={p.id} {...p} />)
      }
    </div>
    <button><Link to='/criarListaJogos'>Criar Lista</Link></button>
    <button><Link to='/configuracao' state={{...user}}>Configuração</Link></button>
    </>
  )
}
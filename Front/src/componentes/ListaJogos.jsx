import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom
import Configuracao from './Configuracao';

export default function ListaJogos({email}) {

  const [propriedades, setPropriedades] = useState([]);
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
      const usuario = propriedades.find(p => p.email === email);
      setUser(usuario);
    }, [propriedades, email]);

    if (!user) {
      console.log("Carregando ou usuário não encontrado...");
      return <p>Carregando ou usuário não encontrado...</p>;
    }

  return (
    <>
    <button><Link to='/configuracao' state={{...user}}>Configuração</Link></button>
    </>
  )
}
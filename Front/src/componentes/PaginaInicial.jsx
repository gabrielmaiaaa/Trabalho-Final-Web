import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom' //npm i react-router-dom
import Configuracao from './Configuracao';
import ListaJogos from './ListaJogos';

export default function PaginaInicial({email}) {

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
    }

  return (
    <>
    <div>
      {
        propriedades.map(p => <ListaJogos key={p.id} {...p} />)
      }
    </div>
    <button><Link to='/configuracao' state={{...user}}>Configuração</Link></button>
    </>
  )
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListaJogos from '../ListasVotacao/ListaJogos';

export default function PaginaInicial() {
  const [propriedades, setPropriedades] = useState([]);
  const [dadosListas, setDadosListas] = useState([]);
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const email = sessionStorage.getItem('email');
  const token = sessionStorage.getItem('token');
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const respostaUsuarios = await axios.get('http://localhost:3000/auth/usuarios', config);
        const respostaListas = await axios.get('http://localhost:3000/listas/dados', config);
        
        if (respostaUsuarios.status === 200) {
          setPropriedades(respostaUsuarios.data);
          setAuthorized(true);
          
          const usuario = respostaUsuarios.data.find(p => p.email === email);
          setUser(usuario);
        } else {
          setAuthorized(false);
        }

        setDadosListas(respostaListas.data);
      } catch (erro) {
        console.log(erro);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    if (token && email) {
      fetchData();
    } else {
      setLoading(false);
      setAuthorized(false);
    }
  }, [email, token]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!authorized) {
    return <p>Sem Autorização</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado...</p>;
  }

  return (
    <>
      <div>
        {dadosListas.map(p => <ListaJogos key={p.id} {...p} />)}
      </div>
      <button><Link to='/criarListaJogos'>Criar Lista</Link></button>
      <button><Link to='/configuracao' state={{ ...user }}>Configuração</Link></button>
      <button><Link to='/'>Sair da Conta</Link></button>
    </>
  );
}

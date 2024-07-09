import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'; //npm i react-router-dom
import ListaJogos from '../ListasVotacao/ListaJogos';
import './PaginaInicial.css'; // Importe seu arquivo CSS aqui

export default function PaginaInicial() {
  const [propriedades, setPropriedades] = useState([]);
  const [dadosListas, setDadosListas] = useState([]);
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const email = sessionStorage.getItem('email');
  const [menuAberto, setMenuAberto] = useState(false); // Estado para controlar a abertura do menu lateral

  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  useEffect(() => {
    async function buscaPropriedades() {
      try {
        const resposta = await axios.get('http://localhost:3000/auth/usuarios', config);
        if (resposta.status === 200) {
          setPropriedades(resposta.data);
          setAuthorized(true);
          const usuario = resposta.data.find((p) => p.email === email);
          setUser(usuario);
        }
      } catch (erro) {
        console.log(erro);
        setAuthorized(false);
      }
    }
    buscaPropriedades();
  }, []);

  useEffect(() => {
    async function buscaLista() {
      try {
        const list = await axios.get('http://localhost:3000/listas/dados', config);
        setDadosListas(list.data);
      } catch (erro) {
        console.log(erro);
      }
    }
    buscaLista();
  }, []);

  if (!user) {
    console.log('Carregando ou usuário não encontrado...');
  }

  if (!authorized) return <p>Sem Autorização</p>;

  return (
    <div className="container">
      {/* Símbolo no canto superior esquerdo */}
      <div className="symbol" onClick={() => setMenuAberto(!menuAberto)}>
        <span>&#9776;</span> {/* Ícone de menu */}
      </div>

      {/* Menu lateral */}
      <div className={`sidebar ${menuAberto ? 'open' : ''}`}>
        <div className="options">
          <Link to="/criarListaJogos">Criar Lista</Link>
          <Link to="/configuracao" state={{ ...user }}>
            Configuração
          </Link>
          <Link to="/">Sair da Conta</Link>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="main-content">
        {/* Listas de jogos */}
        {dadosListas.map((p) => (
          <ListaJogos key={p.id} {...p} className="lista-jogos" />
        ))}
      </div>
    </div>
  );
}

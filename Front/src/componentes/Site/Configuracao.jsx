import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Configuracao.css'; // Importa o CSS específico para esta página

export default function Configuracao() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const { id, username, email, password, admin } = useLocation().state;

  const [dados, setDados] = useState({
    id,
    username,
    email,
    password,
    admin,
  });

  const handleChange = (e) => {
    const novoValor = {
      [e.target.name]: e.target.value,
    };

    setDados({
      ...dados,
      ...novoValor,
    });
  };

  const config = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };

  useEffect(() => {
    async function validaAcesso() {
      try {
        const resposta = await axios.get('http://localhost:3000/auth/usuarios', config);
        if (resposta.status === 200) {
          setAuthorized(true);
        }
      } catch (erro) {
        console.log(erro);
        setAuthorized(false);
      }
    }
    validaAcesso();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const estado = await axios.put('http://localhost:3000/auth/atualizar', dados);
      if (estado.status === 200) {
        setMsg('OK');
        navigate(-1);
      }
    } catch (error) {
      setMsg(error.estado.data);
    }
  };

  const handleDelete = async () => {
    let c = confirm(`Deseja excluir a conta ${username}?`);
    if (c === true) {
      try {
        const resposta = await axios.delete(`http://localhost:3000/auth/deletar/${email}`);
        if (resposta.status === 200) {
          setMsg('OK');
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBack = () => navigate(-1);

  if (!authorized) return <p>Sem Autorização</p>;

  return (
    <div className="container-configuracao">
      <h1>Dados Pessoais</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Nome</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={dados.username}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            value={dados.email}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={dados.password}
          />
        </div>

        <div className="button-group">
          <button>Atualizar</button>
        </div>
      </form>
      <div className="button-group">
          <button onClick={handleDelete}>Excluir Perfil</button>
          <button onClick={handleBack}>Voltar</button>
        </div>
      <p className='server-response'>{msg}</p>
    </div>
  );
}

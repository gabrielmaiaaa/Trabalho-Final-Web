import React, { useEffect, useState } from 'react'
import {set, useForm} from 'react-hook-form'; //npm i react-hook-form
import { yupResolver } from "@hookform/resolvers/yup"; //npm i @hookform/resolvers
import * as yup from "yup"; //npm i yup
import axios from 'axios';//npm i axios
import { Link, Navigate, useNavigate } from 'react-router-dom';

const schema = yup.object({
  titulo: yup.string().required('Título obrigatório'),
  descricao: yup.string().required('Descrição obrigatório'),
  url: yup.string().url('Url inválido').required('Url obrigatório'),
  jogos: yup.array().min(3, 'Selecione pelo menos 3 jogos').required('Seleciones os jogos')
}).required();

export default function CriarListaJogos() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState('');
  const [jogos, setJogos] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema)
  });

  const {register, handleSubmit, formState} = form;

  const {errors} = formState;

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
    const acharJogos = async () => {
      try{
        const resposta = await axios.get('http://localhost:3000/jogos/dados');
        if(resposta.status === 200){
          setJogos(resposta.data);
        }
      } catch (erro){
        console.log(erro);
      }
    };
    acharJogos();
  }, [])

  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/listas/criar-lista', data);
      if(response.status === 200){
        setMsg('OK');
        navigate(-1);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleBack = () => {
    navigate(-1);
  };

  if(!authorized) return <p>Sem Autorização</p>

  return (
    <>
    <h2>Insira informações para criar a lista</h2>
    <form onSubmit={handleSubmit(submit)} noValidate>
      <label htmlFor="titulo">Titulo</label>
      <input type="text" id='titulo' {...register('titulo')} />
      <p className='erro'> {errors.titulo?.message} </p>

      <label htmlFor="">Descrição</label>
      <textarea name="descricao" id="descricao" {...register('descricao')} ></textarea>
      <p className='erro'> {errors.descricao?.message} </p>

      <label htmlFor="itch">Link da Página itch.io</label>
      <input type="url" id="url" {...register('url')} />
      <p className='erro'> {errors.url?.message} </p>

      <label htmlFor="jogos">Jogo:</label>
      <select name="jogos" id="jogos" {...register('jogos')} multiple>
        <option value="">Selecione um Jogo</option>
        {
          jogos.map((jogo, index) => (
            <option key={index} value={jogo.name}>{jogo.name}</option>
          ))
        }
      </select>
      <p className='erro'> {errors.jogos?.message} </p>

      <button>Criar</button>
    </form>
    <p className='server-response'>{msg}</p>
    <button onClick={handleBack}>Voltar</button>
    </>
  )
}

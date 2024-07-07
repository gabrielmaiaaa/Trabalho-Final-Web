import React, { useState } from 'react'
import {set, useForm} from 'react-hook-form'; //npm i react-hook-form
import { yupResolver } from "@hookform/resolvers/yup"; //npm i @hookform/resolvers
import * as yup from "yup"; //npm i yup
import axios from 'axios';//npm i axios
import { Link, Navigate } from 'react-router-dom';

const schema = yup.object({
  titulo: yup.string().required('Título obrigatório'),
  descricao: yup.string().required('Descrição obrigatório'),
}).required();

export default function CriarListaJogos() {

  const [msg, setMsg] = useState('');

  const form = useForm({
    resolver: yupResolver(schema)
  });

  const {register, handleSubmit, formState} = form;

  const {errors} = formState

  const submit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/listas/criar-lista', data);
      if(response.status === 200)
        setMsg('OK');
    } catch (error) {
      console.log(error.response.data);
    }
  }

  if(msg === 'OK')
    return <Navigate to='/' />

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

      <button>Criar</button>
    </form>
    <p className='server-response'>{msg}</p>
    <Link to='/'>Voltar</Link>
    </>
  )
}

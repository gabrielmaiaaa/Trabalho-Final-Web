import React, { useState } from 'react'
import {set, useForm} from 'react-hook-form'; //npm i react-hook-form
import { yupResolver } from "@hookform/resolvers/yup"; //npm i @hookform/resolvers
import * as yup from "yup"; //npm i yup
import axios from 'axios';//npm i axios
import { Navigate, Link } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required('Usuário obrigatório'),
  email: yup.string().email('Email invalido').required('Email obrigatório'),
  password: yup.string().min(4, 'Senha com no mínimo 4 caracteres').required(),
  passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem ser iguais!'),
}).required();


export default function CreateUser() {

  const [msg, setMsg] = useState('');

  const form = useForm({
    resolver: yupResolver(schema)
  });

  const {register, handleSubmit, formState} = form;
  
  const {errors} = formState;

  const submit = async (data) => {
    try{
      const response = await axios.post('', data);
      if(response.status === 200)
        setMsg('OK');
    }catch (error){
      console.log(error.response.data);
    }
  }

  if(msg === 'OK')
    return <Navigate to='/' />

  return (
    <>
      <h2>Criar Usuário</h2>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <label htmlFor="username">Nome</label>
        <input type="text" id='username' {...register('username')} />
        <p className='erro'> {errors.username?.message} </p>
        <label htmlFor="email">Email</label>
        <input type="text" id='email' {...register('email')} />
        <p className='erro'> {errors.email?.message} </p>
        <label htmlFor="password">Senha</label>
        <input type="password" id='password' {...register('password')} />
        <p className='erro'> {errors.password?.message} </p>
        <label htmlFor="passwordConf">Confirmar Senha</label>
        <input type="password" id='passwordConf' {...register('passwordConf')} />
        <p className='erro'> {errors.passwordConf?.message} </p>

        <button>Registrar</button>
      </form>
      <Link to='/'>Voltar</Link>
    </>
  )
}

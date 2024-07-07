import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreateUser from './componentes/auth/CreateUser.jsx'
import LoginUser from './componentes/auth/LoginUser.jsx'
import Configuracao from './componentes/Site/Configuracao.jsx'
import Votacao from './componentes/ListasVotacao/Votacao.jsx'
import ListaJogos from './componentes/ListasVotacao/ListaJogos.jsx'
import PaginaInicial from './componentes/Site/PaginaInicial.jsx'
import CriarListaJogos from './componentes/ListasVotacao/CriarListaJogos.jsx'
import VerListaJogo from './componentes/ListasVotacao/VerListaJogo.jsx'
import Resultados from './componentes/ListasVotacao/Resultados.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LoginUser />
      },
      {
        path: 'criar-user',
        element: <CreateUser />
      }
    ]
  },
  {
    path: '/paginaInicial',
    element: <PaginaInicial />
  },
  {
    path: '/configuracao',
    element: <Configuracao />
  },
  {
    path: '/listajogos',
    element: <ListaJogos />
  },
  {
    path: '/criarListaJogos',
    element: <CriarListaJogos />
  },
  {
    path: '/verListaJogo',
    element: <VerListaJogo />
  },
  {
    path: '/votacao',
    element: <Votacao />
  },
  {
    path: '/resultados',
    element: <Resultados />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)

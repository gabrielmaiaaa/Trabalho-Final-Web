import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreateUser from './componentes/auth/CreateUser.jsx'
import LoginUser from './componentes/auth/LoginUser.jsx'
import Configuracao from './componentes/Site/Configuracao.jsx'
import ListaJogos from './componentes/ListasVotacao/ListaJogos.jsx'
import PaginaInicial from './componentes/Site/PaginaInicial.jsx'
import CriarListaJogos from './componentes/ListasVotacao/CriarListaJogos.jsx'
import VerListaJogo from './componentes/ListasVotacao/VerListaJogo.jsx'
import Resultados from './componentes/ListasVotacao/Resultados.jsx'
import IdentidadeVisual from './componentes/Categorias/IdentidadeVisual.jsx'
import Polimento from './componentes/Categorias/Polimento.jsx'
import GameDesign from './componentes/Categorias/GameDesign.jsx'
import Jogabilidade from './componentes/Categorias/Jogabilidade.jsx'
import Originalidade from './componentes/Categorias/Originalidade.jsx'
import Tema from './componentes/Categorias/Tema.jsx'

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
    path: '/identidade-visual',
    element: <IdentidadeVisual />
  },
  {
    path: '/polimento',
    element: <Polimento />
  },
  {
    path: '/game-design',
    element: <GameDesign />
  },
  {
    path: '/jogabilidade',
    element: <Jogabilidade />
  },
  {
    path: '/originalidade',
    element: <Originalidade />
  },
  {
    path: '/tema',
    element: <Tema />
  },
  {
    path: '/resultados',
    element: <Resultados />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)

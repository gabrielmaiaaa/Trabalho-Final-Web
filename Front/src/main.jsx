import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreateUser from './componentes/auth/CreateUser.jsx'
import LoginUser from './componentes/auth/LoginUser.jsx'
import Configuração from './componentes/Configuração.jsx'
import Votação from './componentes/Votação.jsx'
import ListaJogos from './componentes/ListaJogos.jsx'

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
    path: '/listajogos',
    element: <ListaJogos />
  },
  {
    path: '/votação',
    element: <Votação />
  },
  {
    path: '/configuração',
    element: <Configuração />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)

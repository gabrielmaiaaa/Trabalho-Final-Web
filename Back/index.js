//importar libs externas
const express = require('express'); //npm i express
const cors = require('cors'); //npm i cors

//Instância do servidor
const app = express();

//Liberar rota cors
app.use(cors());
//Função para extrair os dados do pacote IP
app.use(express.json())

//importar rota das votações
const votacoesRoutes = require('./router/votacoes');

//importar rotas autenticacao
const authRoutes = require('./router/auth');

//importar rotas autenticacao
const atualizarDadosRoutes = require('./router/atualizarDados');

//rotas para os dois serviços
app.use('/auth', authRoutes);
app.use('/votacoes', votacoesRoutes);
app.use('/atualizarDados', atualizarDadosRoutes);

app.listen(3000, ()=>{
    console.log('Servidor Online');
});
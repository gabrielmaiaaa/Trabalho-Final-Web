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
const authRoutes = require('./router/auth');
const listasRoutes = require('./router/listas');
const jogosRoutes = require('./router/jogos');

//rotas para os dois serviços
app.use('/auth', authRoutes);
app.use('/votacoes', votacoesRoutes);
app.use('/listas', listasRoutes);
app.use('/jogos', jogosRoutes);

app.listen(3000, ()=>{
    console.log('Servidor Online');
});
//importar libs externas
const express = require('express'); //npm i express

//O router permite separar nosso servidor em rotas
const router = express.Router();

//libs para banco de dados
const fs = require('fs');
const path = require('path');

//Validação do token
const jwt = require('jsonwebtoken');


//Conexao com banco de dados
const bdPath = path.join(__dirname,'..','db','votos.json');
const votacoes = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

//Rota para buscar as votacoes
router.get('/votacoes', autenticarToken,(req,res) =>{

    //Devolve as votacoes em formato JSON
    res.status(200).json(votacoes);

});

router.post('/adicionar-votacao', autenticarToken, (req,res) => {

    // const {id, nome, preco, avaliacao} = req.body;

    // const novaVotacao = {
    //     id, 
    //     nome,
    //     preco,
    //     avaliacao
    // }
    propriedades.push(novaVotacao);

    fs.writeFileSync(bdPath, JSON.stringify(propriedades,null,2));

    res.status(200).send('OK');
    
});


router.delete('/deletar-votacao/:id', autenticarToken, (req,res) => {

    const {id} = req.params;

    const acharIndex = (p) => {
        return p.id === Number(id)
    }

    const index = propriedades.findIndex(acharIndex);

    propriedades.splice(index,1);

    fs.writeFileSync(bdPath, JSON.stringify(propriedades,null,2));

    res.status(200).send("Votação Removida");

});


function autenticarToken(req,res,next){
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1];
    if(token === null) return res.status(401).send('Token não encontrado');
    
    //verificando o token
    try {
        const user = jwt.verify(token, process.env.TOKEN);
        req.user = user;
        next(); //Se token é válido, avança chamando next()
    } catch (error) {
        res.status(403).send('Token inválido');
    }
   
}

module.exports = router;
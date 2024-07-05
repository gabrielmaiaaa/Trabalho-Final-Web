const express = require('express');

const router =express.Router();

const fs = require('fs');
const path = require('path');

const jwt = require('jsonwebtoken');

const bdPath = path.join(__dirname, '..', 'db', 'usuario.json');
const usauarios = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

router.put('/atualizar-dados', autenticadorToken, (req,res) => {
    const {id, username, email, password} = req.body;

    const novoDados = {
        id,
        username,
        email,
        password
    }

    const acharUser = (p) => {
        return p.id === Number(id);
    }

    const index = usauarios.findIndex(acharUser);

    usauarios.splice(index, 1, novoDados);

    fs.writeFileSync(bdPath, JSON.stringify(usauarios,null,2));

    res.status(200).send('Usuário Atualizado');
});

router.delete('/deletar-dados/:id', autenticadorToken, (req,res) => {
    const {id} = req.params;

    const acharIndex = (p) => {
        return p.id = Number(id);
    }

    const index = usauarios.findIndex(acharIndex);

    usauarios.splice(index, 1);

    fs.writeFileSync(bdPath, JSON.stringify(usauarios, null, 2));

    res.status(200).send('Usuário Removido');
});

function autenticadorToken(req, res, next){
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1];
    if(token === null) return res.status(401).send('Token não encontrado');
    
    try{
        const user = jwt.verify(token, process.env.TOKEN);
        req.user = user;
        next();  //Se token é válido, avança chamando next()
    } catch (error) {
        res.status(403).send('Token inválido')
    }
}

module.exports = router;
const express = require('express');
const router =express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const bdPath = path.join(__dirname, '..', 'db', 'usuario.json');
const usuarios = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

router.get('/pegar-dados', autenticadorToken, (req, res) => {
    const userId = req.user.id; // Assume que o ID do usuário está no token decodificado

  const user = usuarios.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.json({
    id: user.id,
  });
})

router.put('/atualizar-dados', autenticadorToken, (req,res) => {
    const {id, username, email, password, admin} = req.body;

    const novoDados = {
        id,
        username,
        email,
        password,
        admin
    }

    const acharUser = (p) => {
        return p.email === email;
    }

    const index = usuarios.findIndex(acharUser);

    usuarios.splice(index, 1, novoDados);
    fs.writeFileSync(bdPath, JSON.stringify(usuarios,null,2));
    res.status(200).send('Usuário Atualizado');
});

router.delete('/deletar-dados/:email', autenticadorToken, (req,res) => {
    const {email} = req.params;

    const acharIndex = (p) => {
        return p.email === email;
    }

    const index = usuarios.findIndex(acharIndex);

    usuarios.splice(index, 1);
    fs.writeFileSync(bdPath, JSON.stringify(usuarios, null, 2));
    return res.status(200).send('Usuário Removido');
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
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bdPath = path.join(__dirname, '..', 'db', 'listas.json');
const listaEncontrada = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));
const votoBDPath = path.join(__dirname, '..', 'db', 'votos.json');
const votoEncontrado = JSON.parse(fs.readFileSync(votoBDPath, {encoding: 'utf-8'}));

const Lista = require('../models/Lista');

router.get('/dados', (req,res) =>{
    res.status(200).json(listaEncontrada);
})

router.post('/criar-lista', async (req,res) => {
    const {titulo, descricao, url, jogos} = req.body;

    for (let listas of listaEncontrada){
        if(listas.titulo === titulo){
            return res.status(409).send(`Jam ${titulo} já existe`);
        }
    }

    let id = Date.now();
    

    const lista = new Lista(id, titulo, descricao, url);
    console.log(jogos);
    jogos.forEach(jogo => {
        lista.adicionarJogo(jogo);
    }); 
    
    listaEncontrada.push(lista);
    fs.writeFileSync(bdPath,JSON.stringify(listaEncontrada, null, 2));
    return res.status(200).send(`Lista criada com sucesso. ${id}`);
})

router.delete('/deletar-lista/:id', async (req, res) => {
    const {id} = req.params;
    
    const acharIndex = (p) => {
        return p.id === parseInt(id);
    }
    const index = listaEncontrada.findIndex(acharIndex);
    const indexVoto = votoEncontrado.findIndex(acharIndex);

    listaEncontrada.splice(index, 1);
    fs.writeFileSync(bdPath, JSON.stringify(listaEncontrada,null,2));
    votoEncontrado.splice(indexVoto, 1);
    fs.writeFileSync(votoBDPath, JSON.stringify(votoEncontrado,null,2));
    return res.status(200).send('Lista removida');
})

module.exports = router;
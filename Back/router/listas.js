const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bdPath = path.join(__dirname, '..', 'db', 'listas.json');
const listaEncontrada = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

const Lista = require('../models/Lista');

router.get('/dados', (req,res) =>{
    res.status(200).json(listaEncontrada);
})

router.post('/criar-lista', async (req,res) => {
    const {titulo, descricao} = req.body;

    for (let listas of listaEncontrada){
        if(listas.titulo === titulo){
            return res.status(409).send(`Jam ${titulo} já existe`);
        }
    }

    const id = listaEncontrada.length + 1;

    const lista = new Lista(id, titulo, descricao);
    
    listaEncontrada.push(lista);
    fs.writeFileSync(bdPath,JSON.stringify(listaEncontrada, null, 2));
    return res.status(200).send(`Lista criada com sucesso. ${id}`);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bdPath = path.join(__dirname, '..', 'db', 'listas.json');
const listaEncontrada = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));
const votoBDPath = path.join(__dirname, '..', 'db', 'votos.json');
const votoEncontrado = JSON.parse(fs.readFileSync(votoBDPath, {encoding: 'utf-8'}));

router.get('/resultados', (req, res) => {
    const {id} = req.body;

    const acharIndex = (p) => {
        return p.id === parseInt(id);
    }
    const index = listaEncontrada.findIndex(acharIndex);
    const indexVoto = votoEncontrado.findIndex(acharIndex);

    console.log(listaEncontrada[index]);
    console.log(votoEncontrado[indexVoto]);
    
})
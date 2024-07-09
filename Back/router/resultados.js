const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bdPath = path.join(__dirname, '..', 'db', 'listas.json');
const listaEncontrada = JSON.parse(fs.readFileSync(bdPath, { encoding: 'utf-8' }));
const votoBDPath = path.join(__dirname, '..', 'db', 'votos.json');
const votoEncontrado = JSON.parse(fs.readFileSync(votoBDPath, { encoding: 'utf-8' }));

router.get('/resultado/:id', (req, res) => {
    const { id } = req.params;

    const acharIndex = (p) => p.id === parseInt(id);

    const index = listaEncontrada.findIndex(acharIndex);
    const indexVoto = votoEncontrado.findIndex(acharIndex);

    const resultado = votoEncontrado[indexVoto].categorias.map(categoria => {
        const votosLista = Object.entries(categoria.votos).sort((a, b) => b[1] - a[1]);
        const [idGanhador, _] = votosLista[0] || [];
        const nomeGanhador = listaEncontrada[index].jogos[Number(idGanhador)] || '';
    
        return {
            categoria: categoria.name,
            ganhador: nomeGanhador
        };
    });    

    return res.status(200).json(resultado);
});

module.exports = router;

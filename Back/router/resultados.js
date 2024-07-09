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

    if (index === -1 || indexVoto === -1) {
        return res.status(404).json({ error: "ID não encontrado" });
    }

    console.log('Lista:');
    console.log(index);
    console.log(listaEncontrada[index]?.jogos[1]);
    console.log('Votos:');
    console.log(indexVoto);
    console.log(votoEncontrado[indexVoto]);

    const resultado = votoEncontrado[indexVoto].categorias.map(categoria => {
        const votos = categoria.votos;
        const votosArray = Object.entries(votos); // Converte os votos em um array de pares [gameIndex, votos]

        let jogoIndexMaisVotos = null;
        let nomeGanhador = '';
        if (votosArray.length > 0) {
            [jogoIndexMaisVotos] = votosArray.sort((a, b) => b[1] - a[1])[0]; // Ordena por votos e pega o índice do jogo com mais votos
            const ganhador = listaEncontrada[index].jogos[parseInt(jogoIndexMaisVotos)];
            nomeGanhador = ganhador || '';
        }

        return {
            categoria: categoria.name,
            ganhador: nomeGanhador
        };
    });

    console.log('Resultado:', resultado);

    return res.status(200).json(resultado);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bdPath = path.join(__dirname, '..', 'db', 'jogo.json');
const jogoEncontrada = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

router.get('/dados', (req,res) =>{
    res.status(200).json(jogoEncontrada);
})

router.get('/jogoEspecifico/:jogos', (req,res) => {
    const { jogos } = req.params;
    const nomesJogos = jogos.split(','); // Se os jogos estão sendo passados separados por vírgula

    const jogoDaJam = [];

    nomesJogos.forEach(nomeJogo => {
        const jogo = jogoEncontrada.find(jogo => jogo.name === nomeJogo);

        if (jogo) {
            jogoDaJam.push({
                name: jogo.name,
                image: jogo.image
            });
        }
    });
   

    res.status(200).json(jogoDaJam);

})

module.exports = router;
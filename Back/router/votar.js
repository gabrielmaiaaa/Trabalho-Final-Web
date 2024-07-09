const express = require('express');
const router =express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const Votacao = require('../models/Votacao');
const { stringify } = require('querystring');

const bdPath = path.join(__dirname, '..', 'db', 'votos.json');
const votos = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

router.post('/votando', (req,res) => {
    const {competicaoId, categoria, gameId}= req.body;

    let votacao = votos.find(v => v.id === competicaoId);

    if(!votacao){
        console.log("Votação ainda não existe");
        //se ainda nao existe, cria ela
        votacao = new Votacao(competicaoId);
        votos.push(votacao);
    }

    votacao.registrarVoto(categoria, gameId);

    fs.writeFileSync(bdPath, JSON.stringify(votos, null, 2));
    res.status(200).json({success: true, message: 'Voto registrado com sucesso!'});





})

module.exports = router;
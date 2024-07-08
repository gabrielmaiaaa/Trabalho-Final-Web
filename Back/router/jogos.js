const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const bdPath = path.join(__dirname, '..', 'db', 'jogo.json');
const jogoEncontrada = JSON.parse(fs.readFileSync(bdPath, {encoding: 'utf-8'}));

router.get('/dados', (req,res) =>{
    res.status(200).json(jogoEncontrada);
})

module.exports = router;
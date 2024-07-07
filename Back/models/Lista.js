class Lista {
    constructor(id, titulo, descricao){
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.jogos = [];
    }

    adicionarJogo(jogo){
        this.jogos.push(jogo);
    }

    removerJogo(jogoID){
        this.jogos = this.jogos.filter(jogo => jogo.id === jogoID);
    }
}

module.exports = Lista;
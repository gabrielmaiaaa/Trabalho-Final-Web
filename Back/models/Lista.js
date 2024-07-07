class Lista {
    constructor(id, titulo, tipo, descricao){
        this.id = id;
        this.titulo = titulo;
        this.tipo = tipo;
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
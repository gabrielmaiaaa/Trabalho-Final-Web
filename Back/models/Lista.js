class Lista {
    constructor(id, titulo, descricao, url){
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.url = url;
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
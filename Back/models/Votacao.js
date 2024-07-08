class Votacao {
    constructor(id){
        this.id = id;
        this.categorias = [
            {name: 'gameDesign', votos: {}},
            {name: 'identidadeVisual', votos: {}},
        ];
    }        

 

  registrarVoto(nomeCategoria, gameId) {
    const categoria = this.categorias.find(c => c.name === nomeCategoria);
    if (categoria) {
      if (!categoria.votos[gameId]) {
        categoria.votos[gameId] = 0;
      }
      categoria.votos[gameId]++;
      return true; // Indica que o voto foi registrado com sucesso
    }
    return false; // Categoria não encontrada
  }

}
module.exports = Votacao;
class Votacao {
    constructor(id){
        this.id = id;
        this.categorias = [
            {name: 'Game Design', votos: {}},
            {name: 'Identidade Visual', votos: {}},
            {name: 'Jogabilidade', votos: {}},
            {name: 'Originalidade', votos: {}},
            {name: 'Polimento', votos: {}},
            {name: 'Tema', votos: {}}
        ];
    }        

  registrarVoto(nomeCategoria, gameId) {
    const categoria = this.categorias.find(c => c.name === nomeCategoria);
    if (categoria) {
      if (!categoria.votos[gameId]) {
        categoria.votos[gameId] = 0;
      }
      categoria.votos[gameId]++;
      return true; 
    }
    return false; 
  }

}
module.exports = Votacao;
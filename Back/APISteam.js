const axios = require('axios');
const fs = require('fs');

const apiSteam = async (limite) => {
  try {
    const resposta = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
    const listaJogos = resposta.data.listaJogos.apps.slice(0, limite);

    const datalhes = [];

    for (let i = 0; i < listaJogos.length; i++) {
      const jogo = listaJogos[i];

      try {
        const respostaDoDetalhes = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${jogo.appid}`);
        const jogoDetalhado = respostaDoDetalhes.data[jogo.appid].data;

        if (jogoDetalhado) {
          datalhes.push({
            id: jogoDetalhado.steam_appid,
            name: jogoDetalhado.name,
            image: jogoDetalhado.header_image,
          });
          console.log(`Jogo ${jogoDetalhado.name} adiquirido`);
        }

      } catch (erro) {
        console.log(erro);
      }
    }

    fs.writeFile('jogo.json', JSON.stringify(datalhes, null, 2));
  } catch (erros) {
    console.log(erros);
  }
};

apiSteam(100);


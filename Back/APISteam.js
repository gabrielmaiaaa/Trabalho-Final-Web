const axios = require('axios');
const fs = require('fs');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); // Função para adicionar um atraso entre as requisições

const fetchSteamGames = async (limit = 100) => { // Limitar para os primeiros 100 jogos
  try {
    // Obter a lista completa de jogos
    const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
    const appList = response.data.applist.apps.slice(0, limit); // Limitar para os primeiros 'limit' jogos

    const detailedGames = [];

    for (let i = 0; i < appList.length; i++) {
      const app = appList[i];

      try {
        // Obter detalhes de cada jogo usando o AppID
        const detailsResponse = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${app.appid}`);
        const gameDetails = detailsResponse.data[app.appid].data;

        // Verificar se os detalhes do jogo existem
        if (gameDetails) {
          // Adicionar informações detalhadas do jogo à lista
          detailedGames.push({
            id: gameDetails.steam_appid,
            name: gameDetails.name,
            image: gameDetails.header_image,
          });
          console.log(`Obtido detalhes do jogo: ${gameDetails.name}`);
        }

        // Adicionar um atraso para evitar limites de taxa da API
        await delay(200); // Ajuste o atraso conforme necessário

      } catch (detailsError) {
        console.error(`Erro ao obter detalhes para o AppID ${app.appid}:`, detailsError);
      }
    }

    // Salvar os dados detalhados em um arquivo JSON
    fs.writeFile('jogo.json', JSON.stringify(detailedGames, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar os dados:', err);
      } else {
        console.log('Dados detalhados salvos com sucesso em steamDetailedGames.json');
      }
    });
  } catch (error) {
    console.error('Erro ao obter os dados da Steam API:', error);
  }
};

fetchSteamGames(100); // Limite para os primeiros 100 jogos


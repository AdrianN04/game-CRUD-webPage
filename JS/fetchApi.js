 class FetchApi {
  constructor() {
    this.baseUrl = "https://games-project-9abf4-default-rtdb.europe-west1.firebasedatabase.app/";
  }

  getAllGames() {
    return fetch(this.baseUrl + ".json")
          .then(response => response.json())
          .then(gamesListFromServer => {
              let convertedGames = [];
              let gamesIds = Object.keys(gamesListFromServer);
              gamesIds.forEach(gameId => {
               convertedGames.push(Game.fromServerGameModel(gamesListFromServer[gameId], gameId));
              }) 
             return convertedGames;
           });
  }

  getGame(id) {
    return fetch(this.baseUrl + id +'.json')
           .then(response => response.json())
  }

  postGame(game) {
    return fetch(this.baseUrl +'.json', {
              method: "POST",
              body: JSON.stringify(game)
            })
            .then(response => response.json())
  }

  updateGame(game) {
    return fetch(this.baseUrl + game.id +'.json',{ 
              method: "PUT",
              body: JSON.stringify(game)
            })
          .then(response => response.json());
  }

  deleteGames(id) {
    return fetch(this.baseUrl + id + '.json', {
             method: 'DELETE',
           })
          .then(response => response.json())
  }

}

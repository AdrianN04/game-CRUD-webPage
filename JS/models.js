class Game {
  constructor( title, imageUrl, genre, publishingStudio, releaseDate, id) {
    this.id = id;
    this.title = title;
    this.releaseDate = releaseDate;
    this.genre = genre;
    this.publishingStudio = publishingStudio;
    this.imageUrl = imageUrl;
  }

  static fromServerGameModel(gameFromServer, id) {
    return new Game( //actual id from server
      gameFromServer.title, 
      gameFromServer.imageUrl,
      gameFromServer.genre, 
      gameFromServer.publishingStudio, 
      gameFromServer.releaseDate,       
      id);
  }
}
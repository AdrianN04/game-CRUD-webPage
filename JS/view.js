var gamesForm = document.getElementById("gamesForm");
var mainContent = document.getElementById("mainContent");
const carouselContainer = document.getElementById("carouselContainer");

const form = document.querySelector('form');
const inputFields = document.querySelector('input');
const addGameBtn = document.getElementById('addGame');
const editGameBtn = document.getElementById('editGame');
let gameTitle = document.getElementById('gameTitle');
let gameImage = document.getElementById('gameImage');
let gameGenre = document.getElementById('gameGenre');
let gamePublisher = document.getElementById('gamePublisher');
let gameReleaseDate = document.getElementById('gameReleaseDate');



var fetchApi = new FetchApi();
var gamesList = [];

//Event Listener to get all games from server
window.addEventListener("load", getAndDisplayGames);

//Event listener for saving the new game!
addGameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  postAndSaveGame();
});


//Function to get all games from the server
function getAndDisplayGames() {

  fetchApi.getAllGames()
    .then(games => {
      gamesList = games;
      gamesList.forEach(game => addGameElementToDom(game));
    });
}

//function to display retrieved games from server on the web page
function addGameElementToDom(game) {

  let gameContainer = document.createElement("div");
  gameContainer.setAttribute("id", game.id);
  gameContainer.setAttribute("class", "carousel-item");

  let elementsContainer = document.createElement('div');
  elementsContainer.setAttribute('class', "container-fluid d-flex flex-column align-items-center justify-content-center w-auto");

  let titleContainer = document.createElement('h3');
  titleContainer.setAttribute("class", "fs-1.2");
  titleContainer.setAttribute("id", "title-" + game.id);
  titleContainer.innerText = `Title: ${game.title}`;

  let imageContainer = document.createElement('img');
  imageContainer.setAttribute('class', "d-block mt-2");
  imageContainer.setAttribute('id', "img-" + game.id);
  imageContainer.setAttribute('src', game.imageUrl);

  let buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class', "btn-group mt-3");
  buttonContainer.setAttribute('role', "group");
  buttonContainer.setAttribute('aria-label', "Basic Example");

  let editBtn = document.createElement('button');
  editBtn.setAttribute('class', "btn btn-primary");
  editBtn.innerText = "Edit";
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    editGameById(game.id);
  });

  let detailsBtn = document.createElement('button');
  detailsBtn.setAttribute('class', "btn btn-primary");
  detailsBtn.innerText = "Details";
  detailsBtn.addEventListener("click", () => {
    openDetailsPage(game.id);
  });

  let deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', "btn btn-primary");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (gamesList.length < 3) {
      console.log("You cannot delete games")
    }else {
      deleteSelectedGame(game.id);
    };
  });

  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(detailsBtn);
  buttonContainer.appendChild(deleteBtn);

  elementsContainer.appendChild(titleContainer);
  elementsContainer.appendChild(imageContainer);
  elementsContainer.appendChild(buttonContainer);

  gameContainer.appendChild(elementsContainer);

  carouselContainer.appendChild(gameContainer);
}


//Function to post and save a game
function postAndSaveGame() {

  let validInput = validateForm();
  if (validInput === true) {
    let addedGame = addInputsValueToGame();

    fetchApi.postGame(addedGame)
    gamesList.push(addedGame);
    getAndDisplayGames();
    resetForm();
  }
}

//Function to add the values from the input to the game model
function addInputsValueToGame() {
  let title = gameTitle.value.trim();
  let img = gameImage.value.trim();
  let genre = gameGenre.value.trim();
  let publishingStudio = gamePublisher.value.trim();
  let releaseDate = gameReleaseDate.value.trim();
  let game = new Game(title, img, genre, publishingStudio, releaseDate);

  return game;
}

//Function to check if the inputs are filled
function validateForm() {
  let validInput = true;
  for (let i = 0; i < form.length; i++) {
    let answer = inputIsValid(form[i]);
    if (answer === false) {
      validInput = false;
    };
  };
  return validInput;
}

//Function to validate input fields
function inputIsValid(inputField) {
  let validation;
  if (inputField.value === "") {
    validation = false;
    inputField.classList.add("invalid");
  } else {
    validation = true;
    inputField.classList.remove("invalid")
  };
  return validation;
};

//Function to reset the form after the form is submitted
function resetForm() {
  for (let i = 0; i < form.length; i++) {
    form[i].value = "";
  };
};


//Function to edit the game when clicking on edit button
function editGameById(id) {
  for (let i = 0; i < gamesList.length; i++) {
    if (gamesList[i].id === id) {
      displayFormContent(gamesList[i]);

      //Event listener to update the game
      editGameBtn.addEventListener('click', (e) => {
        e.preventDefault();
        saveEditedGame(gamesList[i]);
      });

    };
  };
};


//Function to save the modifications of the game on the server
function saveEditedGame(game) {

  let validInput = validateForm();

  if (validInput === true) {
    let editedGame = addInputsValueToGame();
    editedGame.id = game.id;

    fetchApi.updateGame(editedGame)
      .then(() => {
        resetForm();
        addGameBtn.classList.remove("collapse");
        editGameBtn.classList.add("collapse");
        game.title = editedGame.title;
        game.imageUrl = editedGame.imageUrl;
        game.imageUrl = editedGame.imageUrl;
        game.genre = editedGame.genre;
        game.publishingStudio = editedGame.publishingStudio;
        game.releaseDate = editedGame.releaseDate;
        document.getElementById("title-" + game.id).innerText = "Title:" + editedGame.title;
        document.getElementById("img-" + game.id).setAttribute("src", editedGame.imageUrl);
      });
  };
};


//Function to display he contet of a game in the form inputs when edit button is pressed
function displayFormContent(game) {
  gameTitle.value = game.title;
  gameImage.value = game.imageUrl;
  gameGenre.value = game.genre;
  gamePublisher.value = game.publishingStudio;
  gameReleaseDate.value = game.releaseDate;
  addGameBtn.classList.add("collapse");
  editGameBtn.classList.remove("collapse");
};

//Function to open the page for details
function openDetailsPage(idBtn) {
  window.open("game.html?id=" + idBtn);
}

//Function to delete the selected game
function deleteSelectedGame(gameId) {
  fetchApi.deleteGames(gameId)
    .then((removeGameById(gameId)));
};

//Function to remove the game from the server and web page
function removeGameById(id) {
  for (let i = 0; i < gamesList.length; i++) {
    if (gamesList[i].id === id) {
      gamesList.splice(i, 1);
    };
  };
  document.getElementById("nextSlide").click();
  let node = document.getElementById(id);
  node.parentNode.removeChild(node);
};
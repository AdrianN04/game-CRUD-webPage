// import { FetchApi } from "./fetchApi";
//global variables
const queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let idRecieved = urlParam.get('id');
console.log(idRecieved)
// HTML variables
const gameDetailsContainer = document.getElementById('gameDetailsContainer');
let pageTitle = document.getElementById('detailsTitle');
let fetchGameApi = new FetchApi();

window.addEventListener('load', getResourcesFromPage);

//fetch API
function getResourcesFromPage() {
  fetchGameApi.getGame(idRecieved)
 .then(responseItem => {
    displayDetails(responseItem);
  })
}

function displayDetails(item) {
  pageTitle.innerText = `Details about: ${item.title}`

  let imageContainer = document.createElement('div');
  imageContainer.innerHTML = "<img src='" + item.imageUrl + "'>";
  imageContainer.setAttribute('class', "img");
  gameDetailsContainer.appendChild(imageContainer);

  let genreContainer = document.createElement('p');
  genreContainer.innerHTML = "<span>Genre:</span> " + item.genre;
  gameDetailsContainer.appendChild(genreContainer);

  let publisherContainer = document.createElement('p');
  publisherContainer.innerHTML = "<span>Publisher:</span> " + item.publishingStudio;
  gameDetailsContainer.appendChild(publisherContainer);

  let releaseDateContainer = document.createElement('p');
  releaseDateContainer.innerHTML = "<span>Release date:</span> " + item.releaseDate;
  gameDetailsContainer.appendChild(releaseDateContainer);
}

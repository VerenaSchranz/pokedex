let pokemonMap = {};
let allFetchedPokemon = [];
let allSearchedPokemon = [];
let pokemonOffSet = 1;
let pokemonNumber = 15;
let currentOpenPopupIndex = null;


const typeColors = {
  grass: "bgGreen",
  fire: "bgRed",
  water: "bgBlue",
  bug: "bgLiteGreen",
  normal: "bgGray",
  poison: "bgPurple",
  flying: "bgLitePurple",
  electric: "bgYellow",
  ground: "bgOrange",
};

async function init() {
  loader();
  let initialPokemonNumber = 15;

  await loadAllPokemon(initialPokemonNumber);
  loaderEnd();
}


function loader() {
  let pokedex = document.getElementById("pokemon-cards");
  pokedex.classList.add("d-none");
}


function loaderEnd() {
  let pokedex = document.getElementById("pokemon-cards");
  let loaderSpinner = document.getElementById("loader");
  let loadingBg = document.getElementById("loading");
  loaderSpinner.classList.add("d-none");
  loadingBg.classList.add("d-none");
  loadingBg.classList.remove("spinner-flex");

  pokedex.classList.remove("d-none");
  document.getElementById("load-more").classList.remove("d-none");
}


async function filterPokemon() {
  let searchTerm = document.getElementById("search").value.toLowerCase();
  document.getElementById("pokemon-cards").innerHTML = "";
  allSearchedPokemon = allFetchedPokemon.filter((pokemon) => pokemon.name.startsWith(searchTerm));

  let loadMoreBtn = document.getElementById("loadMorePokemon");

  if (searchTerm === "") {
    loadMoreBtn.classList.remove("d-none");
    searchedSinglePokemon(allSearchedPokemon); 
  } else {
    loadMoreBtn.classList.add("d-none");
    searchedSinglePokemon(allSearchedPokemon); 
  }
}


async function loadAllPokemon(numberOfPokemon) {
  for (let i = pokemonOffSet; i < numberOfPokemon + pokemonOffSet; i++) {
    let singleUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let singleResponse = await fetch(singleUrl);
    let singleResponseAsJson = await singleResponse.json();
    pokemonMap[i - 1] = singleResponseAsJson;
    allFetchedPokemon.push(singleResponseAsJson);
    let pokemonCards = document.getElementById("pokemon-cards");

    pokemonCards.innerHTML += renderSinglePokemon(i - 1);
  }
}

function searchedSinglePokemon(allSearchedPokemon) {
  for (let i = 0; i < allSearchedPokemon.length; i++) {
    const currentPokemon = allSearchedPokemon[i]["name"];
    let currentPokemonImageSrc = allSearchedPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"];
    let currentPokemonImageSrcLittle = allSearchedPokemon[i]["sprites"]["front_default"];
    let capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);

    let pokemonCardHtml = generatePokemonCardHtml(
      allFetchedPokemon.indexOf(allSearchedPokemon[i]),
      currentPokemonImageSrcLittle,
      capitalizedType,
      currentPokemonImageSrc
    );

    document.getElementById("pokemon-cards").innerHTML += pokemonCardHtml;
  }
}


function renderSinglePokemon(i) {
  let currentPokemon = pokemonMap[i]["name"];
  let currentPokemonImageSrc = pokemonMap[i]["sprites"]["other"]["official-artwork"]["front_default"];
  let currentPokemonImageSrcLittle = pokemonMap[i]["sprites"]["front_default"];

  capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);

  return generatePokemonCardHtml(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc);
}


function getTypesHtml(i) {
  let templateText = "";
  if (pokemonMap[i] && pokemonMap[i]["types"]) {
    for (let j = 0; j < pokemonMap[i]["types"].length; j++) {
      let currentPokemonType = pokemonMap[i]["types"][j]["type"]["name"];

      if (typeColors[currentPokemonType]) {
        templateText += `<div class="types popupflex ${typeColors[currentPokemonType]}">${currentPokemonType}</div>`;
      }
    }
  }
  return templateText;
}


function getStats(i) {
  let templateText = "";
  if (pokemonMap[i]["stats"]) {
    for (let l = 0; l < pokemonMap[i]["stats"].length; l++) {
      let currentPokemonValue = pokemonMap[i]["stats"][l]["base_stat"];
      let currentPokemonName = pokemonMap[i]["stats"][l]["stat"]["name"];
      templateText += `
        <div class="stats">${currentPokemonName}</div>
        <progress id="progressBar" max="100" value="${currentPokemonValue}"><span></span></progress>
      `;
    }
  }

  return templateText;
}

function getAbility(i) {
  let templateText = "";
  if (pokemonMap[i]["abilities"]) {
    for (let k = 0; k < pokemonMap[i]["abilities"].length; k++) {
      let currentPokemonAbility = pokemonMap[i]["abilities"][k]["ability"]["name"];
      templateText += `<div class="ability popupflex">${currentPokemonAbility}</div>`;
    }
  }

  return templateText;
}


function showPopup(i) {
  let currentPokemon = pokemonMap[i]["name"];
  let currentPokemonImageSrc = pokemonMap[i]["sprites"]["other"]["official-artwork"]["front_default"];
  let currentPokemonImageSrcLittle = pokemonMap[i]["sprites"]["front_default"];
  let capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
  let currentPokemonHeight = pokemonMap[i]["height"];
  let currentPokemonWeight = pokemonMap[i]["weight"];
  let popupContent = popupSingleCard(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc, currentPokemonHeight, currentPokemonWeight);
  document.body.innerHTML += popupContent;

  document.getElementById("container").classList.add("container-popup-fixed");
  document.getElementById("container").classList.add("popup-open");
  document.getElementById("single-card").classList.add("single-bg-card");
  document.getElementById("single-card").addEventListener("click", closePopup);
}


function closePopup() {
  let popupContainer = document.getElementById("popup-container");
  if (popupContainer) {
    popupContainer.remove();
    document.getElementById("container").classList.remove("container-popup-fixed");
  }
  document.getElementById("container").classList.remove("popup-open");
  document.getElementById("single-card").classList.remove("single-bg-card");
}


async function loadMorePokemon() {
  let loaderSpinner = document.getElementById("loader-more-spinner");
  let loadMoreBtn = document.getElementById("loadMorePokemon");
  let loadMore = document.getElementById("load-more");

  loadmorePokemonStyles(loaderSpinner, loadMoreBtn, loadMore);
  pokemonOffSet += pokemonNumber;
  let numberOfPokemonToLoad = 15;
  pokemonNumber = numberOfPokemonToLoad;

  let newPokemonHtml = await pokemonFetchLoadMore(numberOfPokemonToLoad);
  let pokemonCards = document.getElementById("pokemon-cards");
  pokemonCards.innerHTML += newPokemonHtml;
  loadMorePokemonEnd();
}

function loadmorePokemonStyles(loaderSpinner, loadMoreBtn, loadMore) {
  loaderSpinner.classList.remove("d-none");
  loadMoreBtn.classList.add("d-none");
  loadMore.classList.remove("d-none");
}

async function pokemonFetchLoadMore(numberOfPokemonToLoad) {
  let newPokemonHtml = "";
  for (let i = pokemonOffSet; i < numberOfPokemonToLoad + pokemonOffSet; i++) {
    let singleUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let singleResponse = await fetch(singleUrl);
    let singleResponseAsJson = await singleResponse.json();
    pokemonMap[i] = singleResponseAsJson;
    currentPokemon = singleResponseAsJson["name"];
    allFetchedPokemon.push(singleResponseAsJson);

    newPokemonHtml += renderSinglePokemon(i);
  }
  return newPokemonHtml;
}


function loadMorePokemonEnd() {
  let loaderSpinner = document.getElementById("loader-more-spinner");
  let loadMore = document.getElementById("load-more");
  let loadMoreBtn = document.getElementById("loadMorePokemon");

  loaderSpinner.classList.add("d-none");
  loadMore.classList.add("d-none");
  loadMoreBtn.classList.remove("d-none");
}

function next(i) {
  if (i == allFetchedPokemon.length - 1) {
    let i = 0;
    closePopup(i);
    showPopup(i);
  } else {
    i++
    closePopup(i);
    showPopup(i);
  }
}

function previous(i) {
  if (i == 0) {    
    let i = allFetchedPokemon.length - 1;
    closePopup(i);
    showPopup(i);

  } else {
    closePopup(i);
    showPopup(i - 1);
  }
}
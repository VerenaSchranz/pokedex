let pokemonMap = {};
let allFetchedPokemon = [];
let allPokemon = []
let allSearchedPokemon = [];
let pokemonOffSet = 1;
let pokemonNumber = 15;


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
    searchedSinglePokemon(allFetchedPokemon); 
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
    pokemonMap[i] = singleResponseAsJson;
    currentPokemon = singleResponseAsJson["name"];
    allFetchedPokemon.push(singleResponseAsJson);
    let pokemonCards = document.getElementById("pokemon-cards");

    pokemonCards.innerHTML += renderSinglePokemon(i);
  }
}


function searchedSinglePokemon(pokemon) {
  for (let i = 0; i < pokemon.length; i++) {
    const currentPokemon = pokemon[i]["name"];
    let currentPokemonImageSrc =
      pokemon[i]["sprites"]["other"]["official-artwork"]["front_default"];
    let currentPokemonImageSrcLittle = pokemon[i]["sprites"]["front_default"];
    let capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
    let pokemonCardHtml = generatePokemonCardHtml(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc);

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
  capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
  let currentPokemonHeight = pokemonMap[i]["height"];
  let currentPokemonWeight = pokemonMap[i]["weight"];
  let popupContent = popupSingleCard(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc, currentPokemonHeight, currentPokemonWeight);
  document.body.innerHTML += popupContent;

  document.getElementById("container").classList.add("container-popup-fixed");
  document.getElementById("container").classList.add("popup-open");
  document.getElementById("single-card").classList.add("single-bg-card");
  document.getElementById("single-card").addEventListener("click", closePopup);
}


// Remove the popup container
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
  loaderSpinner.classList.remove("d-none");
  loadMoreBtn.classList.add("d-none");
  loadMore.classList.remove("d-none");

  pokemonOffSet += pokemonNumber;

  let numberOfPokemonToLoad = 15;
  pokemonNumber = numberOfPokemonToLoad;

  let newPokemonHtml = await pokemonFetchLoadMore(numberOfPokemonToLoad);
  let pokemonCards = document.getElementById("pokemon-cards");
  pokemonCards.innerHTML += newPokemonHtml;

  loadMorePokemonEnd();
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


function loadMorePokemonEnd() {
  let loaderSpinner = document.getElementById("loader-more-spinner");
  let loadMore = document.getElementById("load-more");
  let loadMoreBtn = document.getElementById("loadMorePokemon");

  loaderSpinner.classList.add("d-none");
  loadMore.classList.add("d-none");
  loadMoreBtn.classList.remove("d-none");
}
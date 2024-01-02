let pokemonMap = {};
let allFetchedPokemon = [];
let allSearchedPokemon = [];
pokemonOffSet = 0;

// Add an event listener to the search input
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("search").addEventListener("input", filterPokemon);
});


window.addEventListener('load', function() {
  // Verstecke das Ladeelement
  let loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
});



/* window.addEventListener('load', function() {
  let loadingElement = document.getElementById('loading');
  let pokemonCards = document.getElementById('pokemon-cards');
  if (pokemonCards) {
    loadingElement.style.display = 'none'; 
  }
}); */

async function filterPokemon() {
  let searchTerm = document.getElementById("search").value.toLowerCase();

  // Clear existing Pokemon cards
  document.getElementById("pokemon-cards").innerHTML = "";

  // Clear previous searched data
  allSearchedPokemon = [];

  // Filter Pokemon based on the search term
  for (let i = 0; i < allPokemon.length; i++) {
    let currentPokemon = allPokemon[i].name;

    if (currentPokemon.toLowerCase().includes(searchTerm)) {
      let index = i + 1 + pokemonOffSet;
      let singleUrl = `https://pokeapi.co/api/v2/pokemon/${index}`;
      let singleResponse = await fetch(singleUrl);
      let singleResponseAsJson = await singleResponse.json();
      pokemonMap[index] = singleResponseAsJson;

      // Check if the Pokemon name is already in allSearchedPokemon
      if (!allSearchedPokemon.includes(singleResponseAsJson.name)) {
        allSearchedPokemon.push(singleResponseAsJson.name);
        document.getElementById("pokemon-cards").innerHTML +=
          renderSinglePokemon(index);
      }
    }
  }
}

async function loadAllPokemon() {
  // Render each Pokemon
  for (let i = 1 + pokemonOffSet; i < 30 + pokemonOffSet; i++) {
    let singleUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let singleResponse = await fetch(singleUrl);
    let singleResponseAsJson = await singleResponse.json();
    pokemonMap[i] = singleResponseAsJson;
    currentPokemon = singleResponseAsJson["name"];
    allFetchedPokemon.push(currentPokemon);
    let pokemonCards = document.getElementById("pokemon-cards");
    pokemonCards.innerHTML += renderSinglePokemon(i);
  }
}

function renderSinglePokemon(i) {
  let currentPokemon = pokemonMap[i]["name"];
  let currentPokemonImageSrc =
    pokemonMap[i]["sprites"]["other"]["official-artwork"]["front_default"];
  let currentPokemonImageSrcLittle = pokemonMap[i]["sprites"]["front_default"];

  capitalizedType =
    currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
  return `
    <div onclick="showPopup(${i})" class="pokemon-single-card" id="pokemon-single-card-${i}">
        <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
        <h2>${capitalizedType}</h2>
        <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
        <div id="types" class="types-container types-desc-wrapper">${getTypesHtml(
          i
        )}</div>
    </div>
    `;
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

  for (let j = 0; j < pokemonMap[i]["types"].length; j++) {
    let currentPokemonType = pokemonMap[i]["types"][j]["type"]["name"];
    if (typeColors[currentPokemonType]) {
      templateText += `<div class="types popupflex ${typeColors[currentPokemonType]}">${currentPokemonType}</div>`;
    }
  }
  return templateText;
}

function getStats(i) {
  let templateText = "";

  for (let l = 0; l < pokemonMap[i]["stats"].length; l++) {
    let currentPokemonValue = pokemonMap[i]["stats"][l]["base_stat"];
    let currentPokemonName = pokemonMap[i]["stats"][l]["stat"]["name"];
    templateText += `
        <div class="stats">${currentPokemonName}</div>
        <progress id="progressBar" max="100" value="${currentPokemonValue}"><span></span></progress>

        `;
  }
  return templateText;
}
function getAbility(i) {
  let templateText = "";

  for (let k = 0; k < pokemonMap[i]["abilities"].length; k++) {
    let currentPokemonAbility =
      pokemonMap[i]["abilities"][k]["ability"]["name"];

    templateText += `<div class="ability popupflex">${currentPokemonAbility}</div>`;
  }
  return templateText;
}

function showPopup(i) {
  let currentPokemon = pokemonMap[i]["name"];
  let currentPokemonImageSrc =
    pokemonMap[i]["sprites"]["other"]["official-artwork"]["front_default"];
  let currentPokemonImageSrcLittle = pokemonMap[i]["sprites"]["front_default"];
  capitalizedType =
    currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
  let currentPokemonHeight = pokemonMap[i]["height"];
  let currentPokemonWeight = pokemonMap[i]["weight"];
  let popupContent = popupSingleCard(
    i,
    currentPokemonImageSrcLittle,
    capitalizedType,
    currentPokemonImageSrc,
    currentPokemonHeight,
    currentPokemonWeight
  );
  document.body.innerHTML += popupContent;
  document.getElementById("container").classList.add("container-popup-fixed");
  document.getElementById("container").classList.add("popup-open");
  document.getElementById("single-card").classList.add("single-bg-card");
  document.getElementById("single-card").addEventListener("click", closePopup);
}

function closePopup() {
  // Remove the popup container
  let popupContainer = document.getElementById("popup-container");
  if (popupContainer) {
    popupContainer.remove();
    document.getElementById("container").classList.remove("container-popup-fixed");

  }

  document.getElementById("container").classList.remove("popup-open");
  document.getElementById("single-card").classList.remove("single-bg-card");
}

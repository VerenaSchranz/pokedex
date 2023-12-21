let pokemonMap = {};
let allFetchedPokemon = [];
pokemonOffSet = 0;




// JavaScript
async function searchPokemon() {
    let search = document.getElementById("search").value.toLowerCase();
    let pokemonCard = document.getElementById("pokemon-cards");
    pokemonCard.innerHTML = "";

    for (let i = 1 + pokemonOffSet; i < 30 + pokemonOffSet; i++) {
        let pokemonName = pokemonMap[i]["name"];

        if (pokemonName.toLowerCase().includes(search)) {
            renderSinglePokemon(i);
        }
    }
}



async function loadPokemon() {
  // Render each Pokemon
  for (let i = 1 + pokemonOffSet; i < 30 + pokemonOffSet; i++) {
    let singleUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let singleResponse = await fetch(singleUrl);
    let singleResponseAsJson = await singleResponse.json();
    pokemonMap[i] = singleResponseAsJson;

    let pokemonCards = document.getElementById("pokemon-cards");
    pokemonCards.innerHTML += renderSinglePokemon(i);
  }
}

function renderSinglePokemon(i) {
  let currentPokemon = pokemonMap[i]["name"];
  let currentPokemonImageSrc = pokemonMap[i]["sprites"]["other"]["official-artwork"]["front_default"];
  let currentPokemonImageSrcLittle = pokemonMap[i]["sprites"]["front_default"];

  capitalizedType =
    currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
    renderSinglePokemonCard(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc);
  return `
    <div onclick="showPopup(${i})" class="pokemon-single-card" id="pokemon-single-card-${i}">
        <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
        <h2>${capitalizedType}</h2>
        <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
        <div id="types" class="types-container types-desc-wrapper">${getTypesHtml(i)}</div>
    </div>
    `;
}

function getTypesHtml(i) {
  const typeColors = {
    grass: 'bgGreen',
    fire: 'bgRed',
    water: 'bgBlue',
    bug: 'bgLiteGreen',
    normal: 'bgGray',
    poison: 'bgPurple',
    flying: 'bgLitePurple',
    electric: 'bgYellow',
    ground: 'bgOrange',
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

  document.getElementById("container").classList.add("popup-open");
  document.getElementById("single-card").classList.add("single-bg-card");
  document.getElementById("single-card").addEventListener("click", closePopup);
}

function closePopup() {
  // Remove the popup container
  let popupContainer = document.getElementById("popup-container");
  if (popupContainer) {
    popupContainer.remove();
  }

  document.getElementById("container").classList.remove("popup-open");
  document.getElementById("single-card").classList.remove("single-bg-card");
}


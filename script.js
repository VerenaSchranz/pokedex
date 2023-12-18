let pokemonMap = {};

pokemonOffSet = 0;

async function searchPokemon() {
  let search = document.getElementById("search").value.toLowerCase();
  let pokemonCard = document.getElementById("pokemon-cards");
  pokemonCard.innerHTML = "";

  if (search.trim() === "") {
    // if the search bar is empty, show all pokemon
    for (let i = 0; i < allFetchedPokemon.length; i++) {
      loadPokemon();
    }
  } else {
    // searching
    for (let i = 0; i < allFetchedPokemon.length; i++) {
      let pokemonName = allFetchedPokemon[i];

      if (pokemonName.toLowerCase().includes(search)) {
        loadPokemon(i);
      }
    }
  }
}

async function loadPokemon() {
  // Render each Pokemon
  for (let i = 1 + pokemonOffSet; i < 30 + pokemonOffSet; i++) {
    let singleUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let singleResponse = await fetch(singleUrl);
    let singleResponseAsJson = await singleResponse.json();
    pokemonMap[i] = singleResponseAsJson; // Neuer part

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
        <div id="types" class="types-container">${getTypesHtml(i)}</div>
    </div>
    `;
}

function getTypesHtml(i) {
  let templateText = "";

  for (let j = 0; j < pokemonMap[i]["types"].length; j++) {
    let currentPokemonType = pokemonMap[i]["types"][j]["type"]["name"];
    /*  templateText += `
            <div id="types" class="types">${currentPokemonType}</div>
        `; */
    /*   setTypeColor(currentPokemonType); */
    if (currentPokemonType === "grass") {
      templateText += `<div class="types bgGreen">${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "fire") {
      templateText += `<div class="types bgRed"{>${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "water") {
      templateText += `<div class="types bgBlue">${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "bug") {
      templateText += `<div class="types bgLiteGreen">${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "normal") {
      templateText += `<div class="types bgGray">${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "poison") {
      templateText += `<div class="types bgPurple">${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "flying") {
      templateText += `<div class="types bgLitePurple">${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "electric") {
      templateText += `<div class="types bgYellow">${currentPokemonType}</div>`;
    }
    if (currentPokemonType === "ground") {
      templateText += `<div class="types bgOrange">${currentPokemonType}</div>`;
    }
  }

  return templateText;
}

function getAbility(i) {
  let templateText = "";

  for (let k = 0; k < pokemonMap[i]["abilities"].length; k++) {
    let currentPokemonAbility =
      pokemonMap[i]["abilities"][k]["ability"]["name"];
    /*  templateText += `
            <div id="types" class="types">${currentPokemonType}</div>
        `; */
    /*   setTypeColor(currentPokemonType); */
    templateText += `<div class="ability">${currentPokemonAbility}</div>`;
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

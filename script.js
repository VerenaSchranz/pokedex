let currentPokemon;
let allFetchedPokemon = [];

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
      allFetchedPokemon.push(singleResponseAsJson);
  
      
      let pokemonCards = document.getElementById("pokemon-cards");
      pokemonCards.innerHTML += renderSinglePokemon(i, singleResponseAsJson);
    }
  }
  
  function renderSinglePokemon(i, singleResponseAsJson) {
    let currentPokemon = singleResponseAsJson["name"];
    let currentPokemonImageSrc = singleResponseAsJson["sprites"]["other"]["official-artwork"]["front_default"];
    let currentPokemonImageSrcLittle = singleResponseAsJson["sprites"]["front_default"];
    capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
  
    return `
    <div onclick="showPopup(${i} ${singleResponseAsJson})" class="pokemon-single-card" id="pokemon-single-card-${i}">
    <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
    <h2>${capitalizedType}</h2>
    <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
    <div id="types" class="types-container">${getTypesHtml(singleResponseAsJson)}
    </div>
</div>
    `
    ;
  }
  
  function getTypesHtml(singleResponseAsJson) {
    let templateText = "";
  
    for (let j = 0; j < singleResponseAsJson["types"].length; j++) {
      let currentPokemonType = singleResponseAsJson["types"][j]["type"]["name"];
      templateText += `
        <div id="types" class="types">${currentPokemonType}</div>
      `;
  
  /*     if (currentPokemonType === "grass") {
        document.getElementById('types').classList.add("bgGreen");
      }
    } */
  
    return templateText;
  }
}
  
function showPopup(i, singleResponseAsJson) {
    let currentPokemon = singleResponseAsJson["name"];
    let currentPokemonImageSrc = singleResponseAsJson["sprites"]["other"]["official-artwork"]["front_default"];
    let currentPokemonImageSrcLittle = singleResponseAsJson["sprites"]["front_default"];
    capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
    let popupContent = `
      <div id="popup-container" class="single-card">
        <div id="pokemon-popup" class="pokemon-popup">
          Pokemon Number ${i}
          <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
          <h2>${capitalizedType}</h2>
          <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
          <div id="popup-pokemon-type" class="types-container">
            <div id="types" class="types">${getTypesHtml(i)}</div>
          </div>
        </div>
      </div>
    `;
  
    document.body.innerHTML += popupContent;
    document.getElementById('container').classList.add("popup-open");
    document.getElementById('single-card').classList.add("single-bg-card");
    document.getElementById('single-card').addEventListener('click', closePopup);
  }
  
  function closePopup() {
    // Remove the popup container
    let popupContainer = document.getElementById('popup-container');
    if (popupContainer) {
      popupContainer.remove();
    }
  
    document.getElementById('container').classList.remove("popup-open");
    document.getElementById('single-card').classList.remove("single-bg-card");
  }
let currentPokemon;
let allFetchedPokemon = [];


async function getSynonyms() {
    let query = document.getElementById('searchQuery').value;
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let synsets = responseAsJson['synsets'];
    renderSynsets(synsets);
}

function renderSynsets(synsets) {
    let container = document.getElementById('container');

    container.innerHTML = `<div> Es wurden <b>${synsets.length}</b>Synonym-Sets geladen.</div>`;

    for (let i = 0; i < synsets.length; i++) {
        const synset = synsets[i];
        let terms = synset['terms']; // ist ein Array

        container.innerHTML += `<h2>Synonym- Set mit ID ${synset['id']}</h2>`;

        for (let j = 0; j < terms.length; j++) {
            const term = terms[j];
            container.innerHTML += `<div> ${term['term']}</h2>`;
        }
    }
}

async function pokedexHome() {
    // all Pokemons
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson['results'];
    allFetchedPokemon.push(pokemonList);
    
    for (let i = 1; i < pokemonList.length; i++) {
    let singleUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let singleResponse = await fetch(singleUrl);
    let singleResponseAsJson = await singleResponse.json();
    let currentPokemon = singleResponseAsJson['name'];
    let currentPokemonImageSrc = singleResponseAsJson['sprites']['other']['official-artwork']['front_default'];
    let currentPokemonImageSrcLittle = singleResponseAsJson['sprites']['front_default'];
    capitalizedType = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1)
    document.getElementById('pokemon-cards').innerHTML += renderSinglePokemon(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc);
        for (let j = 0; j < singleResponseAsJson['types'].length; j++) {

            let currentPokemonType = singleResponseAsJson['types'][j]['type']['name'];
            document.getElementById(`pokemon-type-${i}`).innerHTML += `
           
            <div class="types">${currentPokemonType}</div>
            </div>`;
        }
    }
}

function renderSinglePokemon(i,currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc) {
    return `
    <div class="pokemon-single-card" id="pokemon-single-card-${i}">
        <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
        <h2>${capitalizedType}</h2>
        <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
        <div id="pokemon-type-${i}" class="types-container">
        </div>
    </div>
    `;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkType(typeContainer, pokemonType) {
    let typeColors = {
      grass: "bg_green",
      poison: "bg_lightGreen",
      flying: "bg_gray",
      fire: "bg_red",
      electric: "bg_yellow",
      ground: "bg_brown",
      normal: "bg_beige",
      water: "bg_blue",
      bug: "bg_lime",
      fairy: "bg_pink",
      fighting: "bg_orange",
      psychic: "bg_purple",
      rock: "bg_ligthGray",
      steel: "bg_silver",
      ice: "bg_lightBlue",
      ghost: "bg_lightPurple",
    };
    let colorClass = typeColors[pokemonType] || "bg_default";
    typeContainer.classList.add(colorClass);
  }

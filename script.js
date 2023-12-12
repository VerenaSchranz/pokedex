let currentPokemon = [];
let allFetchedPokemon = [];

async function pokedexHome() {
    // all Pokemons
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson['results'];

    for (let i = 1; i < pokemonList.length; i++) {
    let singleUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let singleResponse = await fetch(singleUrl);
    let singleResponseAsJson = await singleResponse.json();
    let pokemonName = singleResponseAsJson['name'];
    document.getElementById('pokemon-cards').innerHTML += `<div class="pokemon-single-card" id="pokemon-single-card-${i}"><h2>${pokemonName}</h2></div>`;
    }
}

/* async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let currentPokemonImage = currentPokemon['sprites']['other']['dream_world']['front_default'];
    console.log('Loaded Pokemon', currentPokemon);
    renderPokemonInfo(currentPokemon, currentPokemonImage);
}

function renderPokemonInfo(currentPokemon, currentPokemonImage) {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemonImage;
}
    

 */
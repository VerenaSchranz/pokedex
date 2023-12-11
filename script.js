
async function pokedexHome() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'; // all Pokemons
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson['results'];
 
    for (let i = 0; i < pokemonList.length; i++) {
        let pokemonNumber = [pokemonList[i]['name']];
        document.getElementById('pokemon-cards').innerHTML += `
        <div id="pokemon-card-${i}">${pokemonNumber}</div>
        <img id="pokemonImage-${i}" src=""></img>`;
    }
}

async function loadPokemon() {
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
    


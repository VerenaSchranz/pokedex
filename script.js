


async function pokedexHome() {
    // all Pokemons
    
    for (let i = 0; i < pokemonList.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJson = await response.json();
        let pokemonList = responseAsJson['abilities']['ability']['name'];
        let pokemonNumber = [pokemonList[i]];
        document.getElementById('pokemon-cards').innerHTML += `
        <div id="pokemon-card-${i}" class="pokemon-card"><h2>${pokemonNumber}</h2>
        <img src=""/>
        </div>
        `;
    }
}
async function loadPokemonSingle(index) {
 // all Pokemons

 for (let index = 0; index < pokemonList.length; index++) {
    let url = pokeapi + index; 
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson['results'];
    let pokemonNumber = [pokemonList[index]['name']];
      document.getElementById('pokemon-cards').innerHTML += `
     <div id="pokemon-card-${index}" class="pokemon-card"><h2>${pokemonNumber}</h2>
     <img src=""/>
     </div>
     `;
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
    


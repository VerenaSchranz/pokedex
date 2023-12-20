function popupSingleCard(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc, currentPokemonHeight, currentPokemonWeight){
    return `
      <div id="popup-container" class="single-card">
        <div id="pokemon-popup" class="pokemon-popup">
        <b>Pokemon Number</b> ${i}
          <div class="popupflex">
          <p><b>Height</b>: ${currentPokemonHeight}</p>
          <p><b>Weight</b>: ${currentPokemonWeight}</p>
        </div>
          <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
          <h2>${capitalizedType}</h2>
    
          <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
          <div><h3>Type</h3><div>
          <div id="popup-pokemon-type" class="types-container">
            ${getTypesHtml(i)}
          </div>
 
          <div><h3>Abilites</h3><div>
          <div class="popupflex">
          ${getAbility(i)}
          </div>
        </div>
      </div>
    `
}
function renderSinglePokemonCard(i, currentPokemonImageSrcLittle, capitalizedType, currentPokemonImageSrc) {
    return `
    <div onclick="showPopup(${i})" class="pokemon-single-card" id="pokemon-single-card-${i}">
        <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
        <h2>${capitalizedType}</h2>
        <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
        <div id="types" class="types-container">${getTypesHtml(i)}</div>
    </div>
    `;
}

function generatePokemonCardHtml(
  i, 
  currentPokemonImageSrcLittle, 
  capitalizedType, 
  currentPokemonImageSrc) {
  return `
    <div onclick="showPopup(${i})" class="pokemon-single-card" id="pokemon-single-card-${i}">
        <img class="pokemon-image-little" src="${currentPokemonImageSrcLittle}"/>
        <h2>${capitalizedType}</h2>
        <img class="pokemon-image" src="${currentPokemonImageSrc}"/>
        <div id="type" class="types-container types-desc-wrapper">${getTypesHtml(i)}</div>
    </div>
  `;
}


function popupSingleCard(
  i,
  currentPokemonImageSrcLittle,
  capitalizedType,
  currentPokemonImageSrc,
  currentPokemonHeight,
  currentPokemonWeight
) {
  return `
      <div id="popup-container" class="single-card">
        <div id="pokemon-popup" class="pokemon-popup">
          <img class="desktop-hide" src="${currentPokemonImageSrcLittle}"/>
          <div class="pokemon-image-little">
          <img onclick ="closePopup()" class="pokemon-mobile-close" src="./img/close.png"/>
          </div>          
          <h2 class="h2-popup">${capitalizedType}</h2>
          <img class="pokemon-image pokemon-image-popup" src="${currentPokemonImageSrc}"/>
          <div class="tab-btns">
          <button id="tab1" class="btn-primary tab-active" onclick="getTabInfo(${i}, ${currentPokemonHeight}, ${currentPokemonWeight})">Type/Abilities</button>
        <button id="tab2" class="btn-primary" onclick="getTabStats(${i})">Open Stats</button>
        </div>
          <div id="pokemon-tab-info" class="pokemon-tab-info">
          <h3>Pokemon Number #${i}</h3> 
            <div class="height-weight-wrapper">
              <p><b>Height</b>: ${currentPokemonHeight}</p>
              <p><b>Weight</b>: ${currentPokemonWeight}</p>
            </div>
          <h3>Type</h3>
          <div class="popupflex types-container">
          ${getTypesHtml(i)}
          </div>
          <h3>Abilites</h3>
          <div class="popupflex types-container">
          ${getAbility(i)}
          </div>
          </div>
          </div>
        </div>
      </div>
    `;
}

function getTabInfo(i, currentPokemonHeight, currentPokemonWeight) {
  document.getElementById("tab1").classList.add("tab-active");
  document.getElementById("tab2").classList.remove("tab-active");
  document.getElementById("pokemon-tab-info").innerHTML = `
  <h3>Pokemon Number #${i}</h3> 
  <div class="height-weight-wrapper">
    <p><b>Height</b>: ${currentPokemonHeight}</p>
    <p><b>Weight</b>: ${currentPokemonWeight}</p>
  </div>
          <h3>Type</h3>
          <div id="popup-pokemon-type" class="popupflex types-container">
            ${getTypesHtml(i)}
          </div>
 
          <h3>Abilites</h3>
          <div class="popupflex types-container">
          ${getAbility(i)}
          </div>
    `;
}

function getTabStats(i) {
  document.getElementById("tab1").classList.remove("tab-active");
  document.getElementById("tab2").classList.add("tab-active");
  document.getElementById("pokemon-tab-info").innerHTML = `
    <h3>Stats</h3>
    <div class="progress">
    ${getStats(i)}
    </div>
    `;
}

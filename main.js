const mainForm = window.document.getElementById("mainForm");
const inputPokemonName = window.document.getElementById("inputPokemonName");
const searchButton = window.document.getElementById("searchButton");
const pokemonImgHolder = window.document.getElementById("pokemonImgHolder");
const pokemonName = window.document.getElementById("pokemonName");
let VALID_POKEMON_NAME = false;
mainForm.addEventListener("submit", event => { event.preventDefault(); });
const getPokemon = async _ => {
    try {
        const mainUrl = `https://pokeapi.co/api/v2/pokemon/${inputPokemonName.value || "bulbasaur"}`;
        const pokemonAPIRequest = await window.fetch(mainUrl, {
            method: "GET", headers: { Accept: "application/json" },
        });
        const response = await pokemonAPIRequest.json();
        console.log(response);
        console.log(response.sprites.front_default);
        pokemonImgHolder.setAttribute("src", response.sprites.front_default);
        pokemonName.innerHTML = response.name
    } catch (errorMessage) {
        throw new Error(errorMessage);
    }
};
const getAndCheckPokemonName = async _ => {
    try {
        const REQUEST_API = await window.fetch("https://pokeapi.co/api/v2/pokemon/", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });
        const RESPONSE = await REQUEST_API.json();
        const NAMES = RESPONSE.results.map(element => element.name);
        if (NAMES.includes(`${inputPokemonName.value}`)) {
            VALID_POKEMON_NAME = true;
            return true;
        } else {
            VALID_POKEMON_NAME = false;
            return false;
        }
    } catch (errorMessage) {
        showAlert("Enter a valid pokemon name!", "danger", false);
        inputPokemonName.value = String("");
        throw new Error(errorMessage);
    }
}
window.addEventListener("DOMContentLoaded", getPokemon);
// inputPokemonName.addEventListener("keypress", getAndCheckPokemonName);
searchButton.addEventListener("click", async _ => {
    await getAndCheckPokemonName();
    if (VALID_POKEMON_NAME) {
        await getPokemon();
        showAlert(`${inputPokemonName.value} appeared successfully!`, "success");
        inputPokemonName.value = String("");
    } else {
        showAlert("Enter a valid pokemon name!", "danger", false);
        inputPokemonName.value = String("");
    }
});
inputPokemonName.addEventListener("keydown", event => {
    // event.preventDefault();
    console.log(inputPokemonName.value);
});
function showAlert(message, type, autoDismiss = true) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
    alertDiv.setAttribute('role', 'alert');
    const messageNode = document.createTextNode(message);
    alertDiv.appendChild(messageNode);
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
    alertDiv.appendChild(closeButton);
    document.getElementById('alert-container').appendChild(alertDiv);
    if (autoDismiss) {
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
        }, 2000);
    }
}
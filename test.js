let VALID_POKEMON_NAME = false;
const getAndCheckPokemonName = async _ => {
    try {
        const TEST_POKEMON_NAME = "bulbasaur";
        const REQUEST_API = await window.fetch("https://pokeapi.co/api/v2/pokemon/", {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        });
        const RESPONSE = await REQUEST_API.json();
        const NAMES = RESPONSE.results.map(element => element.name);
        console.log(RESPONSE);
        console.log(NAMES);
        if (NAMES.includes(TEST_POKEMON_NAME)) {
            VALID_POKEMON_NAME = Boolean(true);
            return true;
        } else {
            VALID_POKEMON_NAME = Boolean(false);
            return false;
        }
        console.log(VALID_POKEMON_NAME);
    } catch (errorMessage) {
        showAlert("Enter a valid pokemon name!", "danger", false);
        inputPokemonName.value = String("");
        throw new Error(errorMessage);
    }
};
window.addEventListener("DOMContentLoaded", _ => {
    getAndCheckPokemonName();
});
console.log(VALID_POKEMON_NAME);
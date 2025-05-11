//1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

document.addEventListener("DOMContentLoaded", function() {
    
    let baseURL = "https://pokeapi.co/api/v2/pokemon/";
    let btn = document.querySelector("button");

    async function getPokemon() {
        try {
            let response = await fetch(`${baseURL}?limit=1000`); // fetch all pokemon data with a limit of 1000
            let data = await response.json(); // convert the response to json
            console.log(data); // log the data to see names and URLs
        } catch (err) {
            console.log("Error:", err);
        }
    }
    btn.addEventListener("click", getPokemon);
});
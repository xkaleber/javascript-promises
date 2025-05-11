// BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.

document.addEventListener("DOMContentLoaded", function() {
    let baseURL = "https://pokeapi.co/api/v2/pokemon/";
    let btn = document.querySelector("button");
    let outputDiv = document.getElementsByClassName("pokemon-container")[0];

    async function getPokemonData() {
        try {
            let allData = await fetch(`${baseURL}?limit=1000`); // fetch all pokemon data with a limit of 1000
            let allPokemon = await allData.json(); // convert the response to json
            let randomPokemonUrls = []; // array to store random pokemon urls
            
            for (let i = 0; i < 3; i++) {
                let randomIdx = Math.floor(Math.random() * allPokemon.results.length); // get a random index to select a pokemon
                let url = allPokemon.results.splice(randomIdx, 1)[0].url; // remove the selected pokemon from the array to avoid duplicates
                randomPokemonUrls.push(url); // add the url to the array
            }

            let pokemonData = await Promise.all(
                randomPokemonUrls.map(url => fetch(url).then(res => res.json()))  // fetch each pokemon data then convert to json
            );

            outputDiv.innerHTML = ""; // clear previous output

            for (let p of pokemonData) {
                let speciesResponse = await fetch(p.species.url); // fetch species data using the species URL
                let speciesData = await speciesResponse.json(); // convert the response to json

                // Find the English description in flavor_text_entries
                let descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
                
                if (descriptionEntry) {
                    outputDiv.innerHTML += `<h3>${p.name}</h3><img src="${p.sprites.front_default}" alt="${p.name}"><p>${descriptionEntry.flavor_text}</p>`;
                }
            }

        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    }

    btn.addEventListener("click", getPokemonData); // add event listener to the button to call the function when clicked
});
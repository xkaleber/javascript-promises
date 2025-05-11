// Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

document.addEventListener("DOMContentLoaded", function() {
    let baseURL = "https://pokeapi.co/api/v2/pokemon/";
    let btn = document.querySelector("button");

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

        for (let p of pokemonData) {
            let speciesResponse = await fetch(p.species.url); // fetch species data using the species URL
            let speciesData = await speciesResponse.json(); // convert the response to json

            // Find the English description in flavor_text_entries
            let descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
            if (descriptionEntry) {
                console.log(`${p.name}: ${descriptionEntry.flavor_text}`); // log the name and description if found
            }
        }

    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
    }
}
    btn.addEventListener("click", getPokemonData); // add event listener to the button to call the function when clicked
});
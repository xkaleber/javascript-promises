// 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

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

        pokemonData.forEach(p => console.log(p)); // log each pokemon's data

    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
    }
}
    btn.addEventListener("click", getPokemonData); // add event listener to the button to call the function when clicked
});
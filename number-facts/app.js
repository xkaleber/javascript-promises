//1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

const favNumber = 11;
const baseURL = 'http://numbersapi.com';

async function getNumberFact() {
  try {
    let response = await fetch(`${baseURL}/${favNumber}?json`); //?json is a query string that tells the API to return JSON data
    console.log(response);
  } catch(err) {
    console.log('Error:', err);
  }
}
getNumberFact();

//2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
const favNumbers = [3, 6, 9];

async function getMultipleNumberFacts() {
  try {
    let response = await fetch(`${baseURL}/${favNumbers}?json`);
    let data = await response.json();
    console.log(data);
  } catch(err) {
    console.log('Error:', err);
  }
}
getMultipleNumberFacts();

//3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function getMultipleFacts() {
  const button = document.querySelector('button');
  button.addEventListener('click', clickAndDisplayData);

  async function clickAndDisplayData() {
    try {
      let facts = await Promise.all(
        Array.from({ length: 4 }, () => fetch(`${baseURL}/${favNumber}?json`))
      );
      
      facts.forEach(async (fact) => { // for each fact
        let data = await fact.json(); // convert to JSON
        const factElement = document.createElement('p'); // create a new paragraph element
        factElement.innerText = data.text; // set the text of the paragraph to the fact
        document.body.appendChild(factElement); // append the paragraph to the body
      }
      );
    }
    catch (err) {
      console.log('Error:', err);
    }
  }
}
getMultipleFacts();
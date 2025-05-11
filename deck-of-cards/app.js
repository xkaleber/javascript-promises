//1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'https://deckofcardsapi.com/api/deck';

    // async function drawOne() {
    //     try {
    //         const response = await fetch(`${baseURL}/new/draw/`); // Request a single card from a newly shuffled deck
    //         const data = await response.json(); // Convert the response to JSON
    //         const card = data.cards[0]; // Get the first card from the response
    //         const suit = card.suit; // Get the suit of the card
    //         const value = card.value; // Get the value of the card
    //         console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`); // Log the value and suit of the card
    //     }   catch (err) {
    //         console.error('Error:', err);
    //     }
    // }
    // drawOne();

//2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck. 
// Once you have both cards, ***console.log*** the values and suits of both cards.

    // async function drawTwo() {
    //     try {
    //         const response = await fetch(`${baseURL}/new/draw/`); // Request a single card from a newly shuffled deck
    //         const data = await response.json(); // Convert the response to JSON
    //         const deckId = data.deck_id; // Get the deck ID from the first response
    //         const card1 = data.cards[0]; // Get the first card from the first response
    //         const suit1 = card1.suit; // Get the suit of the first card
    //         const value1 = card1.value; // Get the value of the first card

    //         const response2 = await fetch(`${baseURL}/${deckId}/draw/`); // Request a second card from the same deck using the deck ID
    //         const data2 = await response2.json(); // Convert the second response to JSON
    //         const card2 = data2.cards[0]; // Get the second card from the second response
    //         const suit2 = card2.suit; // Get the suit of the second card
    //         const value2 = card2.value; // Get the value of the second card

    //         console.log(`${value1.toLowerCase()} of ${suit1.toLowerCase()}`); // Log the value and suit of the first card
    //         console.log(`${value2.toLowerCase()} of ${suit2.toLowerCase()}`); // Log the value and suit of the second card
    //     } catch (err) {
    //         console.error('Error:', err);
    //     }
    // }
    // drawTwo();

//3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

    async function setup() {
        try {
            const btn = document.querySelector('button'); 
            const cardArea = document.querySelector('.card-container');

            const deckResponse = await fetch(`${baseURL}/new/shuffle/`); // Create a new shuffled deck
            const deckData = await deckResponse.json(); // Convert the response to JSON
            const deckId = deckData.deck_id; // Get the deck ID from the response

            btn.style.display = 'block'; // Show the button to draw a card
            btn.addEventListener('click', async () => {
                try {
                    const cardResponse = await fetch(`${baseURL}/${deckId}/draw/`); // Draw a card from the deck using the deck ID
                    const cardData = await cardResponse.json(); // Convert the response to JSON
                    const card = cardData.cards[0]; // Get the drawn card from the response

                    if (card) { // Check if there are cards left in the deck
                        const remaining = cardData.remaining; // Get the number of cards remaining in the deck
                        console.log(`Cards remaining: ${remaining}`); // Log the number of cards remaining
                        const suit = card.suit; // Get the suit of the drawn card
                        const value = card.value; // Get the value of the drawn card
                        const img = document.createElement('img'); // Create an image element
                        img.src = card.image; // Set the source of the image to the card image URL
                        img.alt = `${value.toLowerCase()} of ${suit.toLowerCase()}`; // Set the alt text for accessibility
                        cardArea.appendChild(img); // Append the image to the card area
                    } else {
                        btn.style.display = 'none'; // Hide the button if there are no cards left
                    }
                } catch (err) {
                    console.error('Error drawing card', err);
                }
            });
        }
        catch (err) {
            console.error('Error setting up deck', err);
        }
    }
    setup();
});




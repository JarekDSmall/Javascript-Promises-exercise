const deckAPIBaseURL = 'https://deckofcardsapi.com/api/deck';
let deckId = '';

// Function to fetch a new shuffled deck using async/await
const fetchNewShuffledDeck = async () => {
  const url = `${deckAPIBaseURL}/new/shuffle/?deck_count=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.deck_id;
};

// Function to draw a card from the deck using async/await
const drawCardFromDeck = async () => {
  const url = `${deckAPIBaseURL}/${deckId}/draw/?count=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.cards[0];
};

// Function to display the card
const displayCard = (card) => {
  const cardDisplay = document.getElementById('card-display');
  const cardImage = document.createElement('img');
  cardImage.src = card.image;
  cardDisplay.appendChild(cardImage);
};

// Event listener for the draw card button
const drawCardButton = document.getElementById('draw-card-button');
drawCardButton.addEventListener('click', async () => {
  try {
    if (!deckId) {
      deckId = await fetchNewShuffledDeck();
    }

    const card = await drawCardFromDeck();
    displayCard(card);
  } catch (error) {
    console.error('Error:', error);
  }
});


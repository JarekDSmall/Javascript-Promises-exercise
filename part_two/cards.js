const deckAPIBaseURL = 'https://deckofcardsapi.com/api/deck';
let deckId = '';

// Function to fetch a new shuffled deck
const fetchNewShuffledDeck = () => {
  const url = `${deckAPIBaseURL}/new/shuffle/?deck_count=1`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data.deck_id);
};

// Function to draw a card from the deck
const drawCardFromDeck = () => {
  const url = `${deckAPIBaseURL}/${deckId}/draw/?count=1`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data.cards[0]);
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
drawCardButton.addEventListener('click', () => {
  if (!deckId) {
    fetchNewShuffledDeck()
      .then(newDeckId => {
        deckId = newDeckId;
        return drawCardFromDeck();
      })
      .then(card => displayCard(card))
      .catch(error => console.error('Error:', error));
  } else {
    drawCardFromDeck()
      .then(card => displayCard(card))
      .catch(error => console.error('Error:', error));
  }
});

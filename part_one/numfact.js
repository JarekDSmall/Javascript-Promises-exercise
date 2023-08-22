const favoriteNumber = 7;
const numberOfFacts = 4;

// Helper function to fetch a fact for a given number
const fetchNumberFact = (number) => {
  const url = `http://numbersapi.com/${number}?json`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data.text);
};

// Fetch facts for the favorite number
const fetchFavoriteNumberFacts = async (number, count) => {
  const factPromises = [];
  for (let i = 0; i < count; i++) {
    factPromises.push(fetchNumberFact(number));
  }
  return Promise.all(factPromises);
};

// Display facts on the page
const displayFacts = (facts) => {
  const factList = document.getElementById('fact-list');
  facts.forEach(fact => {
    const li = document.createElement('li');
    li.textContent = fact;
    factList.appendChild(li);
  });
};

// Fetch and display facts
fetchFavoriteNumberFacts(favoriteNumber, numberOfFacts)
  .then(facts => displayFacts(facts))
  .catch(error => console.error(error));

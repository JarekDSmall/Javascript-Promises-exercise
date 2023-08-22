// Helper function to fetch a fact for a given number
const fetchNumberFact = async (number) => {
  const url = `http://numbersapi.com/${number}?json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.text;
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

// Fetch and display facts using async/await
(async () => {
  try {
    const favoriteNumber = 7;
    const numberOfFacts = 4;
    const facts = await fetchFavoriteNumberFacts(favoriteNumber, numberOfFacts);
    displayFacts(facts);
  } catch (error) {
    console.error('Error:', error);
  }
})();
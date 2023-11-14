// Get references to HTML elements
const characterListElement = document.getElementById("character-list");
const characterDetailsElement = document.getElementById("character-details");
const searchInput = document.getElementById("search-input");

// Function to display a list of characters
function displayCharacterList(characters) {
  characterListElement.innerHTML = ""; // Clear previous content

  // Create a card element for each character
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = `${character.name} (DOB: ${
      character.dateOfBirth || "Unknown"
    })`;

    // Add click event listener to display details when a card is clicked
    card.addEventListener("click", () => {
      displayCharacterDetails(character);
    });

    characterListElement.appendChild(card);
  });
}

// Function to display detailed information about a character
function displayCharacterDetails(character) {
  characterDetailsElement.innerHTML = `
        <h2>${character.name}</h2>
        <p>Role: ${character.role || "Unknown"}</p>
        <p>House: ${character.house || "Unknown"}</p>
        <p>Wand: ${character.wand || "Unknown"}</p>
        <p>Patronus: ${character.patronus || "Unknown"}</p>
        <p>Species: ${character.species || "Unknown"}</p>
    `;
}
// Function to search for characters based on the input query
function searchCharacters(query) {
  fetch(`https://hp-api.onrender.com/api/characters?name=${query}`)
    .then((response) => response.json())
    .then((data) => {
      displayCharacterList(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Event listener for input changes in the search bar
searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  // Perform a search when the query is long enough
  if (query.length >= 3) {
    searchCharacters(query);
  } else {
    // Clear the character list and details if the query is too short
    characterListElement.innerHTML = "";
    characterDetailsElement.innerHTML = "";
  }
});

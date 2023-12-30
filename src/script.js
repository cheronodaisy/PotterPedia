// Get references to HTML elements
const characterListElement = document.getElementById("character-list");
const characterDetailsElement = document.getElementById("character-details");
const searchInput = document.getElementById("search-input");

// Function to display a list of characters with photos
function displayCharacterList(characters) {
  characterListElement.innerHTML = ""; // Clear previous content

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Create an image element for the character's photo
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const image = document.createElement("img");
    image.src = character.image; // Assuming the API provides an 'image' field
    image.alt = character.name; // Adding alt text for accessibility
    imageContainer.appendChild(image);

    // Add click event listener to display details when a card is clicked
    card.addEventListener("click", () => {
      displayCharacterDetails(character);
    });

    card.appendChild(imageContainer);

    characterListElement.appendChild(card);
  });
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

// Function to display detailed information about a character
function displayCharacterDetails(character) {
  characterDetailsElement.innerHTML = `
    <div class="character-details">
        <h2>${character.name}</h2>
        <p>Role: ${character.role || "Unknown"}</p>
        <p>House: ${character.house || "Unknown"}</p>
        <p>Wand: ${character.wand || "Unknown"}</p>
        <p>Patronus: ${character.patronus || "Unknown"}</p>
        <p>Species: ${character.species || "Unknown"}</p>
    </div>
  `;
}

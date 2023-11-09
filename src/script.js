const characterListElement = document.getElementById("character-list");
const characterDetailsElement = document.getElementById("character-details");
const searchInput = document.getElementById("search-input");

function displayCharacterList(characters) {
  characterListElement.innerHTML = "";
  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = `${character.name} (DOB: ${
      character.dateOfBirth || "Unknown"
    })`;

    card.addEventListener("click", () => {
      displayCharacterDetails(character);
    });

    characterListElement.appendChild(card);
  });
}

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

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query.length >= 3) {
    searchCharacters(query);
  } else {
    characterListElement.innerHTML = "";
    characterDetailsElement.innerHTML = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Récupérer les favoris depuis le stockage local
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContainer = document.getElementById("favorites-container");

  // Afficher les cartes favorites
  favorites.forEach((favoriteId) => {
    fetch("https://hp-api.lainocs.fr/characters")
      .then((response) => response.json())
      .then((data) => {
        const character = data.find((character) => character.id === favoriteId);
        if (character) {
          const card = document.createElement("div");
          card.classList.add("card");

          card.innerHTML = `
                        <a href="details.html?name=${encodeURIComponent(character.name)}">
                            <img src="${character.image}" alt="${character.name}">
                            <h2>${character.name}</h2>
                            <p><strong>House:</strong> ${character.house}</p>
                            <p><strong>Role:</strong> ${character.role}</p>
                            <p><strong>Actor:</strong> ${character.actor}</p>
                        </a>
                    `;

          favoritesContainer.appendChild(card);
        }
      })
      .catch((error) => console.log("Error fetching data:", error));
  });
});

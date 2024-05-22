fetch("https://hp-api.lainocs.fr/characters")
  .then((response) => response.json())
  .then((data) => {
    const cardsContainer = document.getElementById("cards-container");

    const filterCharacters = (searchTerm) => {
      return data.filter((character) => {
        const actorMatch = character.actor
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const nameMatch = character.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const houseMatch = character.house
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return actorMatch || nameMatch || houseMatch;
      });
    };

    const displayCharacters = (characters) => {
      cardsContainer.innerHTML = "";
      characters.forEach((character) => {
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
          <button class="heart-btn" aria-label="Ajouter aux favoris" data-id="${character.id}"><i class="far fa-heart"></i></button>
        `;

        cardsContainer.appendChild(card);
      });

      document.querySelectorAll(".heart-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const characterId = this.dataset.id;
          const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          const index = favorites.indexOf(characterId);
          if (index === -1) {
            // Ajouter aux favoris
            favorites.push(characterId);
            this.classList.add("active");
          } else {
            // Supprimer des favoris
            favorites.splice(index, 1);
            this.classList.remove("active");
          }
          localStorage.setItem("favorites", JSON.stringify(favorites));
        });
      });
    };

    // Affiche tous les personnages
    displayCharacters(data);

    document
      .getElementById("searchInput")
      .addEventListener("input", (event) => {
        const searchTerm = event.target.value;
        const filteredCharacters = filterCharacters(searchTerm);
        displayCharacters(filteredCharacters);
      });
  })
  .catch((error) => console.log("Error fetching data:", error));

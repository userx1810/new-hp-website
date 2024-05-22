document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");

  if (name) {
    fetch("https://hp-api.lainocs.fr/characters")
      .then((response) => response.json())
      .then((data) => {
        const character = data.find((char) => char.name === name);
        const cardDetails = document.getElementById("card-details");

        if (character) {
          cardDetails.innerHTML = `
                <div class="card-detail">
                  <img src="${character.image}" alt="${character.name}">
                  <h2>${character.name}</h2>
                  <p><strong>House:</strong> ${character.house}</p>
                  <p><strong>Role:</strong> ${character.role}</p>
                  <p><strong>Actor:</strong> ${character.actor}</p>
                  <p><strong>Date of Birth:</strong> ${character.dateOfBirth}</p>
                  <p><strong>Patronus:</strong> ${character.patronus}</p>
                  <p><strong>Wand:</strong> ${character.wand.wood}, ${character.wand.core}, ${character.wand.length}</p>
                </div>
              `;
        } else {
          cardDetails.innerHTML = "<p>Character not found</p>";
        }
      })
      .catch((error) => console.log("Error fetching data:", error));
  } else {
    console.log("No name found in the URL");
  }
});

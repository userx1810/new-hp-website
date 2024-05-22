const cardContainer = document.getElementById("card-container");
const openBoosterBtn = document.getElementById("open-booster");

document
  .getElementById("open-booster")
  .addEventListener("click", async function () {
    // vérifie si la date du dernier tirage est stockée
    const lastDrawDate = localStorage.getItem("lastDrawDate");
    const currentTime = new Date().getTime();

    // si le dernier tirage remonte à plus de 24 heures
    if (!lastDrawDate || currentTime - lastDrawDate >= 24 * 60 * 60 * 1000) {
      // enregistre l'heure du tirage
      localStorage.setItem("lastDrawDate", new Date().getTime());
      // cache le bouton pour ouvrir le booster
      this.style.display = "none";
      // fait le tirage
      await openBooster();
    } else {
      // Affiche une alerte pour demander de revenir dans 24 heures
      alert("Reviens dans 24 heures pour ouvrir un nouveau booster !");
    }
  });

async function fetchData() {
  try {
    const response = await fetch("https://hp-api.lainocs.fr/characters");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function openBooster() {
  cardContainer.innerHTML = "";
  const characters = await fetchData();
  if (characters) {
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const character = characters[randomIndex];
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>House: ${character.house}</p>
        <p>Role: ${character.role}</p>
      `;
      cardContainer.appendChild(cardElement);
    }
  }
}

document.dispatchEvent(new Event("DOMContentLoaded"));

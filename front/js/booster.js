const cardContainer = document.getElementById("card-container");
const openBoosterBtn = document.getElementById("open-booster");

openBoosterBtn.addEventListener("click", async function () {
  const openBoosterDate = localStorage.getItem("openBoosterDate");
  const currentTime = new Date().getTime();

  if (
    !openBoosterDate ||
    currentTime - openBoosterDate >= 24 * 60 * 60 * 1000
  ) {
    localStorage.setItem("openBoosterDate", currentTime);
    openBoosterBtn.style.display = "none";
    await openBooster();
  } else {
    alert("Revenez dans 24 heures pour ouvrir un nouveau booster.");
  }
});

async function fetchData() {
  try {
    const response = await fetch("https://hp-api.lainocs.fr/characters");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
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

      // Enregistrer la carte dans la base de données
      saveCardToDatabase(character);
    }
  }
}

async function saveCardToDatabase(character) {
  try {
    const response = await fetch("/save-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(character),
    });

    const data = await response.json();
    console.log("Carte enregistrée  :", data);
  } catch (error) {
    console.error("La carte n'a pas été enregistrée:", error);
  }
}

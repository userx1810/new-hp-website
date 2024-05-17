const cardContainer = document.getElementById("card-container");
const openBoosterBtn = document.getElementById("open-booster");

async function fetchData() {
  try {
    const response = await fetch("https://hp-api.lainocs.fr/");
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

openBoosterBtn.addEventListener("click", openBooster);

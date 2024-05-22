document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("exchangeModal");
  const openModalButton = document.getElementById("openModalButton");
  const closeButton = document.querySelector(".close-button");

  // Open the modal
  openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
    populateCardOptions();
  });

  // Close the modal
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside of modal content
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Populate card options
  function populateCardOptions() {
    const yourCardsSelect = document.getElementById("yourCards");
    const theirCardsSelect = document.getElementById("theirCards");
    const yourCards = ["Carte 1", "Carte 2", "Carte 3"]; // Replace with actual data
    const theirCards = ["Carte A", "Carte B", "Carte C"]; // Replace with actual data

    yourCardsSelect.innerHTML = "";
    theirCardsSelect.innerHTML = "";

    yourCards.forEach((card) => {
      const option = document.createElement("option");
      option.value = card;
      option.text = card;
      yourCardsSelect.appendChild(option);
    });

    theirCards.forEach((card) => {
      const option = document.createElement("option");
      option.value = card;
      option.text = card;
      theirCardsSelect.appendChild(option);
    });
  }

  // Handle form submission
  document
    .getElementById("exchangeForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const selectedYourCards = Array.from(
        document.getElementById("yourCards").selectedOptions,
      ).map((option) => option.value);
      const recipientUsername = document.getElementById("theirUsername").value;
      const selectedTheirCards = Array.from(
        document.getElementById("theirCards").selectedOptions,
      ).map((option) => option.value);

      // Handle the exchange logic here
      console.log("Your cards:", selectedYourCards);
      console.log("Recipient username:", recipientUsername);
      console.log("Their cards:", selectedTheirCards);

      // Close the modal after submission
      modal.style.display = "none";
    });
});

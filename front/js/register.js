document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
      name: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "index.html"; // Redirige si jamais ça fonctionne
      } else {
        const errorData = await response.json();
        console.error("Erreur:", errorData.message);
        alert("Erreur lors de l'inscription : " + errorData.message);
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur : " + error.message);
    }
  });

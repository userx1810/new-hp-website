document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        window.location.href = "/front/accueil.html";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});

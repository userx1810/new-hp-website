document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/users", {
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
        window.location.href = "index.html";
      } else {
        // Handle error response
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
});

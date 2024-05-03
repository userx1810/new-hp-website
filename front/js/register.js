const formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", async (event) => {
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
      // Assuming the server returns a token upon successful login
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
      // Handle error response
      console.error("Failed to fetch profile data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const userData = await response.json();

    //On récup les données
    document.getElementById("nom").innerText = userData.name;
    document.getElementById("email").innerText = userData.email;
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

const getProfile = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("ne peux pas récupérer le profil utilisateur.");
    }

    const data = await response.json();

    const emailElement = document.querySelector(".single");
    emailElement.textContent = `Email: ${data.email}`;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du profil utilisateur:",
      error,
    );
  }
};

getProfile();

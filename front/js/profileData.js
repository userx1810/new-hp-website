const getProfile = async () => {
  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Impossible de récupérer le profil utilisateur.");
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
  } else {
    console.error("localStorage n'est pas disponible dans cet environnement.");
  }
};

getProfile();

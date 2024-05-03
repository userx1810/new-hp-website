"use strict"; // Utilise le mode strict pour des contrôles supplémentaires

const menuIcon = document.getElementById("bx-menu"); // Récupère l'icône du menu dans le DOM
const menu = document.getElementById("menu"); // Récupère le menu dans le DOM
const sidebar = document.querySelector(".sidebar"); // Récupère la barre latérale dans le DOM

menuIcon.addEventListener("click", () => {
  // Ajoute un écouteur d'événements au clic sur l'icône du menu
  menu.classList.toggle("active"); // Ajoute ou supprime la classe 'active' du menu
  sidebar.classList.toggle("active"); // Ajoute ou supprime la classe 'active' de la barre latérale
});

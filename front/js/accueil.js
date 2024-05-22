// burgerMenu.js

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector(".burger-menu");
  const menuItems = document.querySelector(".menu-items");

  burgerMenu.addEventListener("click", () => {
    menuItems.classList.toggle("active");
  });
});

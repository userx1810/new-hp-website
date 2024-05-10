"use strict";

const menuIcon = document.getElementById("bx-menu");
const menu = document.getElementById("menu");
const sidebar = document.querySelector(".sidebar");

menuIcon.addEventListener("click", () => {
  menu.classList.toggle("active");
  sidebar.classList.toggle("active");
});

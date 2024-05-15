import "regenerator-runtime";
import "../styles/main.css";
import "../component/list-data";

console.log("Hello Coders! :)");

const appAppbar = document.querySelector(".app-appbar");
const mainElemnt = document.querySelector("main");

document.querySelector("#hamburger-menu").onclick = () => {
  appAppbar.classList.toggle("active");
};

document.querySelector("main, .antiHero").onclick = () => {
  appAppbar.classList.remove("active");
};

const moduleMenu = document.querySelector(".fullscreen-menu");
const openBtn = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".fullscreen-menu__close");
const body = document.body;

console.log(openBtn);
openBtn.addEventListener("click", e =>{
  e.preventDefault();
  moduleMenu.classList.add("active--menu");
  body.style.overflow = "hidden";
})

closeBtn.addEventListener("click", e =>{
  e.preventDefault();
  moduleMenu.classList.remove("active--menu");
  body.style.overflow = "visible";
})


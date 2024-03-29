const navBar = document.getElementById("nav-bar");
const mobile = document.querySelector('.mobile')


mobile.addEventListener("click", openNav);
  
  document.querySelector(".close-nav").addEventListener("click", closeNav);

  function openNav(){
    navBar.classList.add("visible");
  }

  function closeNav(){
    navBar.classList.remove("visible");

  }
const isDesktop = window.matchMedia("only screen and (min-aspect-ratio:6/5)");

window.addEventListener('load', updateBG);
window.addEventListener('resize', updateBG);

async function updateBG() {
  const background = document.getElementById('desktop-bg');
  if (isDesktop.matches) {
    background.src = 'img/desktop-bg.jpg';  
  }
  else {
    background.src = 'data:';  
  }
}
const pages = ['index', 'bot', 'rpg', 'contact'];

const isDesktop = window.matchMedia("only screen and (min-aspect-ratio:6/5)");

var navHidden = true;

window.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('nav > div').forEach(async (current, i) => {
    current.addEventListener('click', () => {nav(i)})
  });
  if (isDesktop.matches) {
    const background = document.getElementById('desktop-bg');
    background.src = 'img/desktop-bg-lq.jpg';
  }
  const nav = document.querySelector('nav');
  const navButton = document.getElementById('nav-button')
  navButton.addEventListener('click', () => {
    if (navHidden) {
      nav.style.right = '0px';
      navButton.style.right = '10rem';
      navHidden = false;
    }
    else {
      nav.style.right = '-10rem';
      navButton.style.right = '0px';
      navHidden = true;
    }
  });
});

window.addEventListener('load', updateBG);
window.addEventListener('resize', updateBG);

async function updateBG() {
  const background = document.getElementById('desktop-bg');
  if (isDesktop.matches) {
    let img = new Image();
    img.src = 'img/desktop-bg.jpg';
    img.onload = () => {
      background.src = 'img/desktop-bg.jpg';
    }
  }
}

async function nav(pageID) {
  history.pushState({pageID: pageID}, '', `${pages[pageID]}.html`);
  location.reload();
}
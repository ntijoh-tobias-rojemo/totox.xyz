const pages = ['index', 'bot', 'rpg', 'contact'];

const isDesktop = window.matchMedia("only screen and (min-aspect-ratio:6/5)");

window.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('nav > div').forEach(async (current, i) => {
    current.addEventListener('click', () => {nav(i)})
  });
  if (isDesktop.matches) {
    const background = document.getElementById('desktop-bg');
    background.src = 'img/desktop-bg-lq.jpg';
  }
});

window.addEventListener('load', updateBG);
window.addEventListener('resize', updateBG);

async function updateBG() {
  const background = document.getElementById('desktop-bg');
  if (isDesktop.matches) {
    background.src = 'img/desktop-bg.jpg';  
  }
}

async function nav(pageID) {
  history.pushState({pageID: pageID}, '', `${pages[pageID]}.html`);
  location.reload();
}
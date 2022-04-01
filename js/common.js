const pages = ['index', 'bot', 'rpg', 'contact'];

const isDesktop = window.matchMedia("only screen and (min-aspect-ratio:6/5)");

var navHidden = true;

window.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('nav > div').forEach(async (current, pageID) => {
    current.addEventListener('click', () => {
      history.pushState({pageID: pageID}, '', `${pages[pageID]}.html`);
      location.reload();
    });
  });
  if (isDesktop.matches) {
    const background = document.getElementById('desktop-bg');
    background.src = 'img/desktop-bg-lq.jpg';
  }
  const nav = document.querySelector('nav');
  const navButton = document.getElementById('nav-button')
  navButton.addEventListener('click', () => {
    if (navHidden) {
      nav.style.left = 'calc(100vw - 10rem)';
      navButton.style.left = 'calc(100vw - 13rem)';
      nav.style.visibility = 'visible';
      navHidden = false;
    }
    else {
      nav.style.left = '100vw';
      navButton.style.left = 'calc(100vw - 3rem)';
      setTimeout(() => {
        if (navHidden) {
          nav.style.visibility = 'hidden';
        }
      }, 300);
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
    img.addEventListener('load', () => {
      background.src = 'img/desktop-bg.jpg';
    });
  }
}
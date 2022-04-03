var trayIsOpen = false;

window.addEventListener('DOMContentLoaded', async () => {
  const tray = document.getElementById('chess-tray');
  const foldIcon = document.getElementById('chess-fold-icon');
  const popup = document.getElementById('chess-popup');
  foldIcon.addEventListener('click', () => {
    if (trayIsOpen) {
      tray.style.bottom = 'calc(-80vh * 0.9)';
      foldIcon.style.transform = null;
      trayIsOpen = false;
    }
    else {
      tray.style.bottom = '0px';
      foldIcon.style.transform = 'rotate(180deg)';
      trayIsOpen = true;
    }
  });

  setTimeout(() => {
    popup.style.opacity = 1;
  }, 1000);

  setTimeout(() => {
    popup.style.opacity = 0;
  }, 4000);
});
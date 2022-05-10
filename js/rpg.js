const isTall = window.matchMedia("only screen and (min-height: 500px)");

window.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('section, article').forEach(async (current) => {
    document.querySelectorAll('.fold-button').forEach(async (currentHeader) => {
      if (currentHeader.id == current.id+'-hd') {
        currentHeader.addEventListener('click', async () => {
          current.childNodes.forEach(async (currentNode) => {
            if (currentHeader.id == currentNode.id) {
              currentNode.childNodes.forEach(async (currentChild) => {
                if (currentChild.classList && currentChild.classList.contains('fold-icon')) {
                  currentChild.classList.toggle('fold-icon-unfolded');
                }
              });
              return;
            }
            if (currentNode.classList) {
              currentNode.classList.toggle('hidden');
            }
          });
        });
      }
    });
  });
  document.querySelectorAll('section:not(#rules) > article').forEach(async (current) => {
    current.classList.add('hidden');
  });
  document.querySelectorAll('section#rules > article').forEach(async (current) => {
    if (!isTall.matches) {
      current.classList.add('hidden');
    }
  });
  document.querySelectorAll('section > article > *:not(.fold-button)').forEach(async (current) => {
    current.classList.add('hidden');
  });
  if (isTall.matches) {
    document.querySelectorAll('section#rules > .fold-button > .fold-icon').forEach(async (current) => {
      current.classList.add('fold-icon-unfolded');
    });
  }
});

window.addEventListener('load', async () => {
  document.querySelectorAll('section').forEach(async (current) => {
    current.hidden = false;
  });
});
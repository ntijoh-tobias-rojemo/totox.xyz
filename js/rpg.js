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
  document.querySelectorAll('section > article, section > article > *:not(.fold-button)').forEach(async (current) => {
    current.classList.add('hidden');
  });
  document.querySelectorAll('.fold-button > img').forEach(async (current) => {
    current.classList.add('fold-icon');
  });
});

window.addEventListener('load', async () => {
  document.querySelectorAll('section').forEach(async (current) => {
    current.hidden = false;
  });
});
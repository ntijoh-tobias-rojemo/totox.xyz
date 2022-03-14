window.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('section, article').forEach((current) => {
    document.querySelectorAll('.fold-button').forEach((currentHeader) => {
      if (currentHeader.id == current.id+'-hd') {
        currentHeader.addEventListener('click', () => {
          current.childNodes.forEach((currentNode) => {
            if (currentHeader.id == currentNode.id) {
              currentNode.childNodes.forEach((currentChild) => {
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
  document.querySelectorAll('section > article, section > article > *:not(.fold-button)').forEach((current) => {
    current.classList.add('hidden');
  });
  document.querySelectorAll('.fold-button > img').forEach((current) => {
    current.classList.add('fold-icon');
  });
});

window.addEventListener('load', async () => {
  document.querySelectorAll('section').forEach((current) => {
    current.hidden = false;
  });
});
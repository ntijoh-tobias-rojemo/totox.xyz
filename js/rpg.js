window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach((current) => {
    document.querySelectorAll('section > h2').forEach((currentHeader) => {
      if (currentHeader.id == current.id+'-hd') {
        currentHeader.addEventListener('click', () => {
          current.childNodes.forEach((currentNode) => {
            if (currentHeader.id == currentNode.id) {
              return;
            }
            if (!currentNode.hidden) {
              currentNode.hidden = true;
            }
            else {
              currentNode.hidden = false;
            }
          });
        });
      }
    });
  });
  document.querySelectorAll('section > article').forEach((current) => {
    document.querySelectorAll('section > article > h3').forEach((currentHeader) => {
      if (currentHeader.id == current.id+'-hd') {
        currentHeader.addEventListener('click', () => {
          current.childNodes.forEach((currentNode) => {
            if (currentHeader.id == currentNode.id) {
              return;
            }
            if (!currentNode.hidden) {
              currentNode.hidden = true;
            }
            else {
              currentNode.hidden = false;
            }
          });
        });
      }
    });
  });
  document.querySelectorAll('section > article, section > article > *:not(h3)').forEach((current) => {
    current.hidden = true;
  })
});

window.addEventListener('load', () => {
  document.querySelectorAll('section').forEach((current) => {
    current.hidden = false;
  });
});
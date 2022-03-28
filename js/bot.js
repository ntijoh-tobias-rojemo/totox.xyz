import {commands} from '../data/commands.js';

var isHovering = false;

window.addEventListener('DOMContentLoaded', async () => {
  const tooltip = document.getElementById('command-tooltip');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipDesc = document.getElementById('tooltip-desc');
  const table = document.getElementById('command-table');
  const hoverWrapper = document.getElementById('table-hover-wrapper');
  commands.forEach((currentCommand) => {
    const newRow = document.createElement('tr');
    const newName = document.createElement('td');
    newName.innerHTML = currentCommand.name;
    newRow.appendChild(newName);
    const newPerms = document.createElement('td');
    newPerms.innerHTML = currentCommand.perms;
    newRow.appendChild(newPerms);
    const newUsage = document.createElement('td');
    newUsage.innerHTML = currentCommand.usage;
    newRow.appendChild(newUsage);
    const newShort = document.createElement('td');
    newShort.innerHTML = currentCommand.short;
    newRow.appendChild(newShort);
    table.appendChild(newRow);
    newRow.addEventListener('mouseover', async () => {
      tooltipTitle.innerHTML = currentCommand.name;
      tooltipDesc.innerHTML = currentCommand.desc;
      tooltip.classList.remove('hidden');
    });

    newRow.addEventListener('mouseleave', async () => {
      setTimeout(() => {
        if (!isHovering) {
          tooltip.classList.add('hidden');
        }
      }, 500);
    });

    newRow.childNodes.forEach((currentChild) => {
      currentChild.addEventListener('mouseover', async () => {
        tooltipTitle.innerHTML = currentCommand.name;
        tooltipDesc.innerHTML = currentCommand.desc;
        tooltip.classList.remove('hidden');
      });

      currentChild.addEventListener('mouseover', async () => {
        isHovering = true;
      });
    });
  });

  document.addEventListener('mousemove', (event) => {
    tooltip.style.left = `${event.pageX}px`;
    tooltip.style.bottom = `${innerHeight - event.pageY}px`;
  });

  hoverWrapper.addEventListener('mouseover', async () => {
    isHovering = true;
  });

  hoverWrapper.addEventListener('mouseleave', async () => {
    isHovering = false;
  });
});


import {commands} from '../data/commands.js';

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
    });
  });

  hoverWrapper.addEventListener('mouseover', () => {
    tooltip.hidden = false;
  });

  document.addEventListener('mousemove', (event) => {
    tooltip.style.left = `${event.pageX}px`;
    tooltip.style.bottom = `${innerHeight - event.pageY}px`;
  });
});


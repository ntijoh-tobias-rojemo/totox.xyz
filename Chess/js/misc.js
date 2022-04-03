Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function cloneBoard(board) {
  const clonedBoard = [];
  for (let currentRow = 0; currentRow < 8; currentRow++) {
    const rowToAdd = [];
    for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
      rowToAdd.push(board[currentRow][currentColumn]);
    }
    clonedBoard.push(rowToAdd);
  }
  return clonedBoard;
}

function shuffle(array) {
  const gen = new Math.seedrandom(String(Math.random()));
  let currentIndex = array.length, randomIndex;
  const outputArray = []

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = gen().map(0, 1, 0, array.length);
    currentIndex--;

    // And swap it with the current element.
    outputArray.push(array.splice(randomIndex, 1)[0]);
  }

  return outputArray;
}

export {cloneBoard as cloneBoard};
export {shuffle as shuffle};
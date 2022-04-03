import {cloneBoard} from "./misc.js";

const movementPatterns = {
  static: function(board, colour, fromRow, fromColumn, toRow, toColumn, movementTable) {
    const rowDifference = toRow-fromRow;
    const rowCenter = Math.floor(movementTable.length / 2);
    const columnDifference = toColumn-fromColumn;
    const columnCenter = Math.floor(movementTable[0].length / 2);
    if (rowCenter+rowDifference < 0 || rowCenter+rowDifference >= movementTable.length) {
      return false;
    }
    if (columnCenter+columnDifference < 0 || columnCenter+columnDifference >= movementTable[0].length) {
      return false;
    }
    if (movementTable[rowCenter+rowDifference][columnCenter+columnDifference]) {
      if (board[toRow][toColumn].colour != colour) {
        return true;
      }
    }
    return false;
  },
  riding: function(board, colour, fromRow, fromColumn, toRow, toColumn, stepRow, stepColumn, maxSteps, special) {
    special = special || false;
    if (board[toRow][toColumn].colour == colour) {
      return false;
    }
    for (let currentStep = 1; currentStep <= maxSteps; currentStep++) {
      const currentRow = toRow+currentStep*stepRow;
      const currentColumn = toColumn+currentStep*stepColumn;
      if (currentRow < 0 || currentRow > 7 || currentColumn < 0 || currentColumn > 7) {
        return false;
      }
      console.log(board[currentRow][currentColumn]);
      if (currentRow == fromRow && currentColumn == fromColumn) {
        return true;
      }
      else if (board[currentRow][currentColumn].colour != "Empty" && special != "Onslaught") {
        return false;
      }
    }
    return false;
  }
}

function testCheck(board, colour, fromRow, fromColumn, toRow, toColumn) {
  const testCheckBoard = cloneBoard(board);
  console.log(testCheckBoard);
  const movingPiece = board[fromRow][fromColumn];
  testCheckBoard[fromRow][fromColumn] = new pieceClasses["Empty"]("Empty");
  testCheckBoard[toRow][toColumn] = movingPiece;
  for (let currentRow = 0; currentRow < 8; currentRow++) {
    for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
      if (testCheckBoard[currentRow][currentColumn].colour == colour) {
        // Do nothing
      }
      else if (testCheckBoard[currentRow][currentColumn].movement(board, currentRow, currentColumn, toRow, toColumn)[0]) {
        return true;
      }
    }
  }
  return false;
}

const Empty = class Empty {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    return [false];
  }
  getName() {
    return "Empty";
  }
  getImage() {
    return "./img/ee.png";
  }
}
const Accursed = class Accursed {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const movementTable = [
      [false, true, true, true, false],
      [true, true, true, true, true],
      [true, true, false, true, true],
      [true, true, true, true, true],
      [false, true, true, true, false]
    ];
    if (movementPatterns.static(board, this.colour, fromRow, fromColumn, toRow, toColumn, movementTable)) {
      return [true];
    }
    return [false];
  }
  getName() {
    return `${this.colour} Accursed`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/cw.png";
    }
    else {
      return "./img/cb.png";
    }
  }
}
const Anointed = class Anointed {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = true;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const movementTable = [
      [true, false, false, false, true],
      [false, true, false, true, false],
      [false, false, false, false, false],
      [false, true, false, true, false],
      [true, false, false, false, true]
    ];
    if (movementPatterns.static(board, this.colour, fromRow, fromColumn, toRow, toColumn, movementTable)) {
      return [true];
    }
    return [false];
  }
  getName() {
    return `${this.colour} Anointed`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/aw.png";
    }
    else {
      return "./img/ab.png";
    }
  }
}
const Berserker = class Berkserker {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = true;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const colour = this.colour;
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, 0, 3, "Onslaught")) {
      return [true, "Onslaught"];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, 0, 3, "Onslaught")) {
      return [true, "Onslaught"];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 0, 1, 3, "Onslaught")) {
      return [true, "Onslaught"];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 0, -1, 3, "Onslaught")) {
      return [true, "Onslaught"];
    }
    return [false];
  }
  getName() {
    return `${this.colour} Berserker`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/uw.png";
    }
    else {
      return "./img/ub.png";
    }
  }
}
const Bishop = class Bishop {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const colour = this.colour;
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, 1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, -1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, 1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, -1, 7)) {
      return [true];
    }
    return [false];
  }
  getName() {
    return `${this.colour} Bishop`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/bw.png";
    }
    else {
      return "./img/bb.png";
    }
  }
}
const Knight = class Knight {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const movementTable = [
      [false, true, false, true, false],
      [true, false, false, false, true],
      [false, false, false, false, false],
      [true, false, false, false, true],
      [false, true, false, true, false],
    ];
    return [movementPatterns.static(board, this.colour, fromRow, fromColumn, toRow, toColumn, movementTable), false];
  }
  getName() {
    return `${this.colour} Knight`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/hw.png";
    }
    else {
      return "./img/hb.png";
    }
  }
}
const King = class King {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = true;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const movementTable = [
      [true, true, true],
      [true, false, true],
      [true, true, true]
    ];
    if (movementPatterns.static(board, this.colour, fromRow, fromColumn, toRow, toColumn, movementTable)) {
      return [true];
    }
    if (!this.hasMoved && fromRow == toRow) {
      let hasHitPiece = false;
      let currentOffset = 0;
      if (fromColumn-toColumn == -2) {
        if (board[toRow][toColumn].colour != "Empty") {
          return [false];
        }
        while(!hasHitPiece) {
          currentOffset++;
          if (board[fromRow][fromColumn+currentOffset].colour != "Empty") {
            hasHitPiece = true;
            const hitPiece = board[fromRow][fromColumn+currentOffset];
            if (hitPiece.canCastle && hitPiece.colour == this.colour && !hitPiece.hasMoved) {
              if (currentOffset < 3) {
                return [false];
              }
              if (testCheck(board, this.colour, fromRow, fromColumn, fromRow, fromColumn)) {
                return [false];
              }
              if (testCheck(board, this.colour, fromRow, fromColumn, toRow, toColumn-1)) {
                return [false];
              }
              return [true, "Castle"];
            }
          } 
        }
      }
      else if (fromColumn-toColumn == 2) {
        if (board[toRow][toColumn].colour != "Empty") {
          return [false];
        }
        while(!hasHitPiece) {
          currentOffset--;
          if (board[fromRow][fromColumn+currentOffset].colour != "Empty") {
            hasHitPiece = true;
            const hitPiece = board[fromRow][fromColumn+currentOffset];
            if (hitPiece.canCastle && hitPiece.colour == this.colour && !hitPiece.hasMoved) {
              if (currentOffset > 3) {
                return [false];
              }
              if (testCheck(board, this.colour, fromRow, fromColumn, toRow, toColumn+1)) {
                return [false];
              }
              return [true, "Castle"];
            }
          } 
        }
      }
    }
    return [false];
  }
  getName() {
    return `${this.colour} King`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/kw.png";
    }
    else {
      return "./img/kb.png";
    }
  }
}
const Missionary = class Missionary {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = true;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const colour = this.colour;
    if (colour == "White") {
      const movementTable = [
        [true, true, true],
        [false, false, false],
        [false, false, false]
      ];
      if (movementPatterns.static(board, colour, fromRow, fromColumn, toRow, toColumn, movementTable)) {
        return [true];
      }
      if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, 0, 7)) {
        return [true];
      }
    }
    else {
      const movementTable = [
        [false, false, false],
        [false, false, false],
        [true, true, true]
      ];
      if (movementPatterns.static(board, colour, fromRow, fromColumn, toRow, toColumn, movementTable)) {
        return [true];
      }
      if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, 0, 7)) {
        return [true];
      }
    }
    return [false];
  }
  getName() {
    return `${this.colour} Missionary`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/mw.png";
    }
    else {
      return "./img/mb.png";
    }
  }
}
const Nightrider = class Nightrider {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const movementTable = [
      [false, true, true, false, true, true, false],
      [true, false, false, false, false, false, true],
      [true, false, false, false, false, false, true],
      [false, false, false, false, false, false, false],
      [true, false, false, false, false, false, true],
      [true, false, false, false, false, false, true],
      [false, true, true, false, true, true, false],
    ];
    return [movementPatterns.static(board, this.colour, fromRow, fromColumn, toRow, toColumn, movementTable), false];
  }
  getName() {
    return `${this.colour} Nightrider`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/nw.png";
    }
    else {
      return "./img/nb.png";
    }
  }
}
const Pawn = class Pawn {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = true;
    this.canCastle = false;
  }
  movement(board, row, column, toRow, toColumn) {
    if (Math.abs(column-toColumn) != 0 && Math.abs(column-toColumn) != 1) {
      return [false];
    }
    let direction;
    if (this.colour == "White") {
      direction = 1;
    }
    else {
      direction = -1;
    }
    if (row-toRow == direction && Math.abs(column-toColumn) == 1 && board[toRow][toColumn].colour != "Empty" && board[toRow][toColumn].colour != this.colour) {
      return [true];
    }
    else if (row-toRow == direction && Math.abs(column-toColumn) == 1 && board[toRow][toColumn].enPassant == true) {
      return [true, "En passant"];
    }
    else if (board[toRow][toColumn].colour != "Empty") {
      return [false];
    }
    else if (Math.abs(column-toColumn) > 0) {
      return [false];
    }
    else if (row-toRow == direction) {
      return [true];
    }
    else if (row-toRow == direction*2 && ((row <= 1 && direction == -1) || (row >= 6 && direction == 1))) {
      return [true, "Double"];
    }
    return [false];
  }
  getName() {
    return `${this.colour} Pawn`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/pw.png";
    }
    else {
      return "./img/pb.png";
    }
  }
}
const Queen = class Queen {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const colour = this.colour;
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, 1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, -1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, 1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, -1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, 0, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, 0, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 0, 1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 0, -1, 7)) {
      return [true];
    }
    return [false];
  }
  getName() {
    return `${this.colour} Queen`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/qw.png";
    }
    else {
      return "./img/qb.png";
    }
  }
}
const Rook = class Rook {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = true;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const colour = this.colour;
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 1, 0, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, -1, 0, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 0, 1, 7)) {
      return [true];
    }
    if (movementPatterns.riding(board, colour, fromRow, fromColumn, toRow, toColumn, 0, -1, 7)) {
      return [true];
    }
    return [false];
  }
  getName() {
    return `${this.colour} Rook`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/rw.png";
    }
    else {
      return "./img/rb.png";
    }
  }
}
const Sphinx = class Sphinx {
  constructor(colour) {
    this.colour = colour;
    this.hasMoved = false;
    this.enPassant = false;
    this.sovereign = false;
    this.canPromote = false;
    this.canCastle = false;
  }
  movement(board, fromRow, fromColumn, toRow, toColumn) {
    const colour = this.colour;
    const movementTable = [
      [false, true, false],
      [true, false, true],
      [false, true, false]
    ];
    if (movementPatterns.static(board, colour, fromRow, fromColumn, toRow, toColumn, movementTable)) {
      return [true];
    }
    if (fromColumn != 7 && board[fromRow][fromColumn+1].colour == "Empty") {
      if (movementPatterns.riding(board, colour, fromRow, fromColumn+1, toRow, toColumn, -1, -1, 7)) {
        return [true];
      }
      if (movementPatterns.riding(board, colour, fromRow, fromColumn+1, toRow, toColumn, 1, -1, 7)) {
        return [true];
      }  
    }
    if (fromColumn != 0 && board[fromRow][fromColumn-1].colour == "Empty") {
      if (movementPatterns.riding(board, colour, fromRow, fromColumn-1, toRow, toColumn, 1, 1, 7)) {
        return [true];
      }
      if (movementPatterns.riding(board, colour, fromRow, fromColumn-1, toRow, toColumn, -1, 1, 7)) {
        return [true];
      }  
    }
    if (fromRow != 7 && board[fromRow+1][fromColumn].colour == "Empty") {
      if (movementPatterns.riding(board, colour, fromRow+1, fromColumn, toRow, toColumn, -1, -1, 7)) {
        return [true];
      }
      if (movementPatterns.riding(board, colour, fromRow+1, fromColumn, toRow, toColumn, -1, 1, 7)) {
        return [true];
      }  
    }
    if (fromRow != 0 && board[fromRow-1][fromColumn].colour == "Empty") {
      if (movementPatterns.riding(board, colour, fromRow-1, fromColumn, toRow, toColumn, 1, 1, 7)) {
        return [true];
      }
      if (movementPatterns.riding(board, colour, fromRow-1, fromColumn, toRow, toColumn, 1, -1, 7)) {
        return [true];
      }  
    }
    return [false];
  }
  getName() {
    return `${this.colour} Sphinx`;
  }
  getImage() {
    if (this.colour == "White") {
      return "./img/sw.png";
    }
    else {
      return "./img/sb.png";
    }
  }
}

const pieceClasses = {
  'Empty': Empty,
  'Accursed': Accursed,
  'Anointed': Anointed,
  'Berserker': Berserker,
  'Bishop': Bishop,
  'Knight': Knight,
  'King': King,
  'Missionary': Missionary,
  'Nightrider': Nightrider,
  'Pawn': Pawn,
  'Queen': Queen,
  'Rook': Rook,
  'Sphinx': Sphinx
}

export {pieceClasses as pieceClasses};
export {testCheck as testCheck};
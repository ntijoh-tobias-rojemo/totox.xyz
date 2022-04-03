import {shuffle} from "./misc.js";

const defaultColours = [
  ["Black", "Black", "Black", "Black", "Black", "Black", "Black", "Black"],
  ["Black", "Black", "Black", "Black", "Black", "Black", "Black", "Black"],
  ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
  ["White", "White", "White", "White", "White", "White", "White", "White"],
  ["White", "White", "White", "White", "White", "White", "White", "White"]
];
const defaultPieceList = ["Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"];
const pawnLine = ["Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn", "Pawn"];
const emptyLine = ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"]
const defaultSovereigns = {
  White: 1,
  Black: 1
};

function addEmptyLines(array, amount) {
  for (let i = 0; i < amount; i++) {
    array.push(emptyLine);
  }
  return array;
}

const setupPatterns = {
  default: function() {
    return {
      pieces: [
        defaultPieceList,
        pawnLine,
        emptyLine,
        emptyLine,
        emptyLine,
        emptyLine,
        pawnLine,
        defaultPieceList
      ],
      colours: defaultColours,
      sovereigns: defaultSovereigns
    };
  },
  double: function() {
    return {
      pieces: [
        ["Rook", "Knight", "Bishop", "King", "King", "Bishop", "Knight", "Rook"],
        pawnLine,
        emptyLine,
        emptyLine,
        emptyLine,
        emptyLine,
        pawnLine,
        ["Rook", "Knight", "Bishop", "King", "King", "Bishop", "Knight", "Rook"]
      ],
      colours: defaultColours,
      sovereigns: defaultSovereigns
    };
  },
  alternate: function() {
    return {
      pieces: [
        ["Berserker", "Nightrider", "Accursed", "Sphinx", "Anointed", "Accursed", "Nightrider", "Berserker"],
        ["Missionary", "Missionary", "Missionary", "Missionary", "Missionary", "Missionary", "Missionary", "Missionary"],
        emptyLine,
        emptyLine,
        emptyLine,
        emptyLine,
        ["Missionary", "Missionary", "Missionary", "Missionary", "Missionary", "Missionary", "Missionary", "Missionary"],
        ["Berserker", "Nightrider", "Accursed", "Sphinx", "Anointed", "Accursed", "Nightrider", "Berserker"]
      ],
      colours: defaultColours,
      sovereigns: defaultSovereigns
    };
  },
  "random (mirror)": function() {
    const pieceListClone = defaultPieceList.slice();
    const shuffledPieceList = shuffle(pieceListClone);
    let pieces = [];
    pieces.push(shuffledPieceList);
    pieces.push(pawnLine);
    pieces = addEmptyLines(pieces, 4);
    pieces.push(pawnLine);
    pieces.push(shuffledPieceList);
    return {
      pieces: pieces,
      colours: defaultColours,
      sovereigns: defaultSovereigns
    }
  },
  "random (reverse)": function() {
    const pieceListClone = defaultPieceList.slice();
    const shuffledPieceList = shuffle(pieceListClone);
    const reversePieceList = [...shuffledPieceList].reverse();
    let pieces = [];
    pieces.push(shuffledPieceList);
    pieces.push(pawnLine);
    pieces = addEmptyLines(pieces, 4);
    pieces.push(pawnLine);
    pieces.push(reversePieceList);
    return {
      pieces: pieces,
      colours: defaultColours,
      sovereigns: defaultSovereigns
    }
  },
  "random (unequal)": function() {
    let pieces = [];
    pieces.push(shuffle(defaultPieceList.slice()));
    pieces.push(pawnLine);
    pieces = addEmptyLines(pieces, 4);
    pieces.push(pawnLine);
    pieces.push(shuffle(defaultPieceList.slice()));
    return {
      pieces: pieces,
      colours: defaultColours,
      sovereigns: defaultSovereigns
    }
  }
};

export {setupPatterns as setupPatterns};
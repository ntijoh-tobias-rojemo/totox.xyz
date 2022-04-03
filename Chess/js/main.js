"use strict";

import {setupPatterns} from "./setupPatterns.js";
import {pieceClasses} from "./pieces.js";

// Declare global variables
const highlightColour = "rgba(255, 255, 0, 0.8)";
const attackColour = "rgba(255, 0, 0, 0.8)";
var latestSetupPattern = "default";
var pieceIsSelected = false;
var selectedPieceRow = null;
var selectedPieceColumn = null;
var gameIsActive = false;
var currentPlayer;
const boardHTML = [];
var board = [
  [
    null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null
  ],
  [
    null, null, null, null, null, null, null, null
  ]
];
const matchState = {
  Black: {
    remainingSovereigns: null
  },
  White: {
    remainingSovereigns: null
  }
};

// Get objects for the endscreen
const endScreen = document.getElementById("endScreen");
const winnerText = document.getElementById("winnerText");
const playAgain = document.getElementById("playAgain");

// Get objects for the settings
const setupSelector = document.getElementById("setupSelector");
const startGameButton = document.getElementById("startGame");

// Get a two-dimensional array of the board
for (let currentRow = 0; currentRow < 8; currentRow++) {
  const rowToAdd = [];
  for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
    rowToAdd.push(document.getElementById(String(currentRow)+String(currentColumn)));
  }
  boardHTML.push(rowToAdd);
}

// Add event listeners
for (let currentRow = 0; currentRow < 8; currentRow++) {
  for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
    boardHTML[currentRow][currentColumn].addEventListener("mouseenter", () => highlightPiece(currentRow, currentColumn));
    boardHTML[currentRow][currentColumn].addEventListener("mouseleave", () => unHighlightPieces());
    boardHTML[currentRow][currentColumn].addEventListener("click", () => usePiece(currentRow, currentColumn));
  }
}
playAgain.addEventListener("click", () => startGame("latest"));
startGameButton.addEventListener("click", () => startGame("selected"));

// Sets the specified space to a specified piece
function updateHTML(row, column, piece) {
  boardHTML[row][column].setAttribute("src", piece.getImage());
  boardHTML[row][column].setAttribute("alt", piece.getName());
}

// Sets the board up according to a given pattern, returning the set up board
function setup(patternName) {
  const pattern = setupPatterns[patternName]();
  console.log(pattern);
  const pieceSetup = pattern.pieces;
  const colourSetup = pattern.colours;
  const boardSetup = [];
  for (let currentRow = 0; currentRow < 8; currentRow++) {
    const rowToAdd = [];
    for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
      rowToAdd.push(new pieceClasses[pieceSetup[currentRow][currentColumn]](colourSetup[currentRow][currentColumn]));
      updateHTML(currentRow, currentColumn, rowToAdd[currentColumn]);
    }
    boardSetup.push(rowToAdd);
  }
  matchState.White.remainingSovereigns = pattern.sovereigns.White;
  matchState.Black.remainingSovereigns = pattern.sovereigns.Black;
  console.log(boardSetup);
  currentPlayer = "White";
  gameIsActive = true;
  return boardSetup;
}

// Highlights all squares the piece at the specified space can move to
function highlightPiece(row, column) {
  if (!pieceIsSelected && gameIsActive) {
    const piece = board[row][column];
    console.log(piece, row, column);
    for (let currentRow = 0; currentRow < 8; currentRow++) {
      for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
        if (row == currentRow && column == currentColumn) {
          boardHTML[currentRow][currentColumn].style.backgroundColor = highlightColour;
        }
        else if (piece.movement(board, row, column, currentRow, currentColumn)[0]) {
          if (board[currentRow][currentColumn].colour != "Empty") {
            boardHTML[currentRow][currentColumn].style.backgroundColor = attackColour;
          }
          else if (board[currentRow][currentColumn].enPassant) {
            boardHTML[currentRow][currentColumn].style.backgroundColor = attackColour;
          }
          else {
            boardHTML[currentRow][currentColumn].style.backgroundColor = highlightColour;
          }
        }
      }
    }
  }
}

// Removes all highlighting
function unHighlightPieces() {
  if (!pieceIsSelected && gameIsActive) {
    for (let currentRow = 0; currentRow < 8; currentRow++) {
      for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
        boardHTML[currentRow][currentColumn].style.backgroundColor = "transparent";
      }
    }
  }
}

// Selects or moves a piece
function usePiece(row, column) {
  if (!pieceIsSelected && board[row][column].colour != currentPlayer) {
    // Do nothing
  }
  else if (pieceIsSelected && board[selectedPieceRow][selectedPieceColumn].colour != currentPlayer) {
    // Do nothing
  }
  else if (pieceIsSelected && gameIsActive) {
    pieceIsSelected = false;
    unHighlightPieces();
    const movingPiece = board[selectedPieceRow][selectedPieceColumn];
    const movementReturn = movingPiece.movement(board, selectedPieceRow, selectedPieceColumn, row, column);
    if (movementReturn[0]) {
      const eliminatedPiece = board[row][column];
      if (eliminatedPiece.sovereign) {
        matchState[eliminatedPiece.colour].remainingSovereigns--;
        if (matchState[eliminatedPiece.colour].remainingSovereigns == 0) {
          endGame(eliminatedPiece.colour);
        }
      }
      movePiece(selectedPieceRow, selectedPieceColumn, row, column);
      for (let currentRow = 0; currentRow < 8; currentRow++) {
        for (let currentColumn = 0; currentColumn < 8; currentColumn++) {
          board[currentRow][currentColumn].enPassant = false;
        }
      }
      if (movementReturn[1] == "Castle") {
        let currentOffset = 0;
        let rookColumn;
        let hasHitRook = false;
        if (selectedPieceColumn > column) {
          while(!hasHitRook) {
            currentOffset--;
            if (board[row][column+currentOffset].canCastle) {
              hasHitRook = true;
              rookColumn = column+currentOffset;
            }
          }
          movePiece(row, rookColumn, row, column+1);
        }
        else {
          while(!hasHitRook) {
            currentOffset++;
            if (board[row][column+currentOffset].canCastle) {
              hasHitRook = true;
              rookColumn = column+currentOffset;
            } 
          }
          movePiece(row, rookColumn, row, column-1);
        }
      }
      else if (movementReturn[1] == "Double") {
        if (board[row][column].colour == "White") {
          board[row+1][column].enPassant = true;
        }
        else {
          board[row-1][column].enPassant = true;
        }
      }
      else if (movementReturn[1] == "En passant") {
        if (board[row][column].colour == "White") {
          board[row+1][column] = new pieceClasses["Empty"]("Empty");
          updateHTML(row+1, column, new pieceClasses["Empty"]("Empty"));        
        }
        else {
          board[row-1][column] = new pieceClasses["Empty"]("Empty");
          updateHTML(row-1, column, new pieceClasses["Empty"]("Empty"));        
        }
      }
      else if (movementReturn[1] == "Onslaught") {
        let stepMultiplier = 1;
        if (row == selectedPieceRow) {
          if (column < selectedPieceColumn) {
            stepMultiplier = -1;
          }
          for (let currentStep = 1; currentStep < Math.abs(column-selectedPieceColumn); currentStep++) {
            board[row][selectedPieceColumn+currentStep*stepMultiplier] = new pieceClasses["Empty"]("Empty");
            updateHTML(row, selectedPieceColumn+currentStep*stepMultiplier, new pieceClasses["Empty"]("Empty"));  
          }
        }
        else {
          if (row < selectedPieceRow) {
            stepMultiplier = -1;
          }
          for (let currentStep = 1; currentStep < Math.abs(row-selectedPieceRow); currentStep++) {
            board[selectedPieceRow+currentStep*stepMultiplier][column] = new pieceClasses["Empty"]("Empty");
            updateHTML(selectedPieceRow+currentStep*stepMultiplier, column, new pieceClasses["Empty"]("Empty"));  
          }
        }
      }
      if (currentPlayer == "White") {
        currentPlayer = "Black";
      }
      else {
        currentPlayer = "White";
      }
    }
  }
  else if (gameIsActive) {
    if (board[row][column].colour != "Empty") {
      highlightPiece(row, column)
      pieceIsSelected = true;
      selectedPieceRow = row;
      selectedPieceColumn = column;
    }
  }
}

function movePiece(fromRow, fromColumn, toRow, toColumn) {
  const movingPiece = board[fromRow][fromColumn];
  movingPiece.hasMoved = true;
  board[fromRow][fromColumn] = new pieceClasses["Empty"]("Empty");
  updateHTML(fromRow, fromColumn, new pieceClasses["Empty"]("Empty"));
  if (movingPiece.canPromote && movingPiece.colour == "White" && toRow == 0) { 
    board[toRow][toColumn] = new pieceClasses["Queen"]("White");
    updateHTML(toRow, toColumn, new pieceClasses["Queen"]("White"));
  }
  else if (movingPiece.canPromote && movingPiece.colour == "Black" && toRow == 7) { 
    board[toRow][toColumn] = new pieceClasses["Queen"]("Black");
    updateHTML(toRow, toColumn, new pieceClasses["Queen"]("Black"));
  }
  else {
    board[toRow][toColumn] = movingPiece;
    updateHTML(toRow, toColumn, movingPiece);
  }
}

function endGame(loser) {
  unHighlightPieces();
  gameIsActive = false;
  if (loser == "White") {
    winnerText.innerHTML = "Black wins!";
  }
  else if (loser == "Black") {
    winnerText.innerHTML = "White wins!";
  }
  else {
    winnerText.innerHTML = "It's a tie";
  }
  endScreen.hidden = false;
}

function startGame(setupPattern) {
  if (setupPattern == "latest") {
    endScreen.hidden = true;
    board = setup(latestSetupPattern);
  }
  else if (setupPattern == "selected") {
    endScreen.hidden = true;
    console.log(setupSelector.value);
    const input = setupSelector.value.toLowerCase();
    if (setupPatterns.hasOwnProperty(input)) {
      board = setup(input);
      latestSetupPattern = input;
    }
    else {
      board = setup("default");
      latestSetupPattern = "default";
    }
  }
  else {
    endScreen.hidden = true;
    board = setup(setupPattern);
    latestSetupPattern = setupPattern;
  }
}

// Sets the board up using the default setup
startGame("default");
import Grid from './Grid.js';
import Tile from './Tile.js';

const gameBoard = document.querySelector('#game-board');

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

function setupInput() {
  window.addEventListener('keydown', handleInput, { once: true });
  // once: true 使得keydown事件只触发一次
}

function handleInput(event) {
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
      moveUp();
      break;
    case 'ArrowRight':
    case 'd':
      moveRight();
      break;
    case 'ArrowDown':
    case 's':
      moveDown();
      break;
    case 'ArrowLeft':
    case 'a':
      moveLeft();
      break;
    default:
      setupInput();
      return;
  }

  grid.cells.forEach(cell => {
    cell.mergeTiles();
  });

  setupInput();
}

function moveUp() {
  return slideTiles(grid.cellsByColumn)
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}

function moveLeft() {
  return slideTiles(grid.cellsByRow)
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
  // 每个group是一个column或者row
  cells.forEach(group => {
    for (let i = 1; i < group.length; i++) {
      const cell = group[i];
      if (!cell.tile) continue;
      let lastValidCell = null;
      for (let j = i - 1; j >= 0; j--) {
        const moveToCell = group[j];
        if (!moveToCell.canAccept(cell.tile)) break;
        // 可以合并
        lastValidCell = moveToCell;
      }

      if (lastValidCell) {
        if (lastValidCell.tile) {
          lastValidCell.mergeTile = cell.tile;
        } else {
          lastValidCell.tile = cell.tile;
        }
        cell.tile = null;
      }
    }
  });
}
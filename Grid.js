const GRID_AMOUNT = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

// 设置css变量，包括网格数量、单元格大小、单元格间隙
export default class Grid {
  // 私有属性, ES2020 
  #cells; // 数组，存放cell对象

  constructor(gridElement) {
    gridElement.style.setProperty('--grid-amount', GRID_AMOUNT);
    gridElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
    gridElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
    const cellElements = createCellElements(gridElement);
    this.#cells = cellElements.map((cellElement, index) => {
      const x = index % GRID_AMOUNT;
      const y = Math.floor(index / GRID_AMOUNT);
      return new Cell(cellElement, x, y);
    });
  }

  get cells() {
    return this.#cells;
  }

  // 二维数组，元素0为第0列cells，元素1为第1列，以此类推
  get cellsByColumn() {
    const cellsByColumn = [];
    for (let x = 0; x < GRID_AMOUNT; x++) {
      const column = this.#cells.filter(cell => cell.x === x);
      cellsByColumn.push(column);
    }
    console.log(cellsByColumn);
    return cellsByColumn;
  }

  get cellsByRow() {
    const cellsByRow = [];
    for (let y = 0; y < GRID_AMOUNT; y++) {
      const row = this.#cells.filter(cell => cell.y === y);
      cellsByRow.push(row);
    }
    return cellsByRow;
  }


  // 没有tile的空单元格
  get #emptyCells() {
    return this.#cells.filter(cell => cell.tile == null);
  }

  // 随机返回一个空单元格
  randomEmptyCell() {
    const emptyCells = this.#emptyCells;
    if (emptyCells.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }
}

class Cell {
  #cellElement; // 单元格div元素
  #tile; // Tile对象
  #mergeTile;
  #x;
  #y;

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get tile() {
    return this.#tile;
  }

  // 传入new Tile()对象
  set tile(obj) {
    this.#tile = obj;
    
    if (!obj) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  get mergeTile() {
    return this.#mergeTile;
  }

  set mergeTile(obj) {
    this.#mergeTile = obj;

    if (!obj) return;
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  // 判断是否可以接受tile
  canAccept(tile) {
    return (
      this.#tile == null ||
      (this.#mergeTile == null && this.#tile.value === tile.value)
    )
  }

  mergeTiles() {
    if (this.#tile == null || this.#mergeTile == null) return;
    this.#tile.value *= 2;
    this.#mergeTile.remove();
    this.#mergeTile = null; 
  }

}

// 批量插入cell元素
function createCellElements(gridElement) {
  const cellElements = [];
  for (let i = 0; i < GRID_AMOUNT ** 2; i++) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    gridElement.appendChild(cellElement);
    cellElements.push(cellElement);
  }
  return cellElements;
}
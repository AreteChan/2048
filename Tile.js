export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement('div');
    this.#tileElement.classList.add('tile');
    tileContainer.appendChild(this.#tileElement);
    this.value = value;
  }

  set value(val) {
    this.#value = val;
    this.#tileElement.textContent = val;
    // 根据数值调整背景亮度
    const power = Math.log2(val);
    this.#tileElement.style.setProperty(
      '--background-lightness',
      `${100 - power * 9}%`
    )
  }

  get value() {
    return this.#value;
  }

  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty('--x', value);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty('--y', value);
  }

  remove() {
    this.#tileElement.remove();
  }

}
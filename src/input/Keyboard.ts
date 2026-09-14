export class Keyboard {
  private readonly pressedKeys = new Set<string>();
  private readonly gameKeys = new Set(["KeyW", "KeyS", "ArrowUp", "ArrowDown"]);

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  isPressed(code: string) {
    return this.pressedKeys.has(code);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.gameKeys.has(event.code)) {
      event.preventDefault();
      this.pressedKeys.add(event.code);
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    if (this.gameKeys.has(event.code)) {
      event.preventDefault();
      this.pressedKeys.delete(event.code);
    }
  };
}

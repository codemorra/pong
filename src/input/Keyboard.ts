/** Tracks the current state of the keyboard controls used by the player. */
export class Keyboard {
  private readonly pressedKeys = new Set<string>();
  private readonly gameKeys = new Set(["KeyW", "KeyS", "ArrowUp", "ArrowDown"]);

  /** Registers keyboard listeners for the supported player controls. */
  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  /**
   * Checks whether a keyboard key is currently held down.
   *
   * @param code Physical keyboard code to check.
   * @returns Whether the key is pressed.
   */
  isPressed(code: string) {
    return this.pressedKeys.has(code);
  }

  /**
   * Stores a supported key press and prevents arrow keys from scrolling the page.
   *
   * @param event Browser keyboard event.
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.gameKeys.has(event.code)) {
      event.preventDefault();
      this.pressedKeys.add(event.code);
    }
  };

  /**
   * Removes a supported key from the pressed-key set.
   *
   * @param event Browser keyboard event.
   */
  private handleKeyUp = (event: KeyboardEvent) => {
    if (this.gameKeys.has(event.code)) {
      event.preventDefault();
      this.pressedKeys.delete(event.code);
    }
  };
}

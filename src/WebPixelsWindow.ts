import { Location, Screen } from "@";

export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY: number;
}

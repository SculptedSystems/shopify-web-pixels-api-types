import { WebPixelsDocument, WebPixelsNavigator, WebPixelsWindow } from "@";

export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window: WebPixelsWindow;
}

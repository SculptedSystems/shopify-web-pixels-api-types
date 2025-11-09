import { Location } from ".";

export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title: string;
}

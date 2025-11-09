import { DomNode } from ".";

export interface PixelEventsAdvancedDomScrolledData {
  /**
   * The element that is currently being scrolled. Can be either the document or
   * an element on the page.
   */
  node: DomNode;
}

export interface GenericElement {
  /**
   * The href attribute of an element
   */
  href: string | null;

  /**
   * The id attribute of an element
   */
  id: string | null;

  /**
   * The name attribute of an element
   */
  name: string | null;

  /**
   * A string representation of the tag of an element
   */
  tagName: string | null;

  /**
   * The type attribute of an element. Often relevant for an input or button
   * element.
   */
  type: string | null;

  /**
   * The value attribute of an element. Often relevant for an input element.
   */
  value: string | null;
}

import { ClientRect } from ".";

export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes: { [key: string]: string };

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent: string;
}

import { DomNode } from "@";

export interface AdvancedMouseEventData {
  clientX: number;
  clientY: number;
  movementX: number;
  movementY: number;

  /**
   * The node object for the event target.
   */
  node: DomNode;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
}

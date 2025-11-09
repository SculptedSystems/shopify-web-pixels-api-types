import { GenericElement } from ".";

export interface MouseEventData {
  clientX: number;
  clientY: number;
  element: GenericElement;
  movementX: number;
  movementY: number;
  offsetX: number;
  offsetY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
}

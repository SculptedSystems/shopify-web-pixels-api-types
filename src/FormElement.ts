import { InputElement } from ".";

export interface FormElement {
  /**
   * The action attribute of a form element
   */
  action: string | null;
  elements: InputElement[];

  /**
   * The id attribute of an element
   */
  id: string | null;
}

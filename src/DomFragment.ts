import { DomNode } from "@";

export interface DomFragment {
  /**
   * Array of `DomFragment` representing children of the parent `DomFragment`.
   */
  children: DomFragment[];

  /**
   * The node object of the `DomFragment`.
   */
  node: DomNode;

  /**
   * The serialization ID of the parent node. -1 if there are no parents.
   */
  parentSerializationId: number;

  /**
   * The serialization ID of the previous sibling node. -1 if there are no
   * previous siblings.
   */
  prevSiblingSerializationId: number;
}

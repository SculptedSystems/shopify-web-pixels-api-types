import { DomFragment, DomNode } from ".";

export interface PixelEventsAdvancedDomChangedData {
  /**
   * Array of `DomFragment` added to the document. Each `DomFragment` represents
   * a sub-tree of the document. Use the `parentSerializationId` and the
   * `prevSiblingSerializationId` to reconstruct the document.
   */
  addedFragments: DomFragment[];

  /**
   * Array of `DomNode` that have had their attributes changed. Use the
   * `serializationId` of each to find it and update your own representation of
   * the document.
   */
  modifiedNodes: DomNode[];

  /**
   * Array of `DomNode` removed from the document. Use the `serializationId` of
   * each to find it and remove it from your own representation of the document.
   */
  removedNodes: DomNode[];
}

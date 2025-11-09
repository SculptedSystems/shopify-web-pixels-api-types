import { DomNode, PixelEventsAdvancedDomClipboardDataAction } from ".";

export interface PixelEventsAdvancedDomClipboardData {
  /**
   * The action that was taken with the clipboard.
   */
  action: PixelEventsAdvancedDomClipboardDataAction;

  /**
   * The node object for the event target.
   */
  node: DomNode;
}

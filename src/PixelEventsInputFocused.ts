import { EventType, PixelEventsInputFocusedData } from ".";

export interface PixelEventsInputFocused {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId: string;
  data: PixelEventsInputFocusedData;
  /**
   * The ID of the customer event
   */
  id: string;

  /**
   * The name of the customer event
   */
  name: string;

  /**
   * The sequence index number of the event.
   */
  seq: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp: string;
  type: EventType.Dom;
}

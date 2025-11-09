import { OrderCustomer } from ".";

export interface Order {
  /**
   * The customer that placed the order.
   */
  customer: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id: string | null;
}

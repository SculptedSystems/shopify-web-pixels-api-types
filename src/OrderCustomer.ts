import { Checkout } from "@";

export interface OrderCustomer {
  /**
   * The ID of the customer.
   */
  id: string | null;

  /**
   * Indicates if the order is the customer’s first order. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  isFirstOrder: boolean | null;
}

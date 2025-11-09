import { Attribute, CartCost, CartLine, Checkout } from "@";

export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost: CartCost;

  /**
   * A globally unique identifier.
   */
  id: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity: number;
}

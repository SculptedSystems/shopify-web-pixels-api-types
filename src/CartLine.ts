import { CartLineCost, ProductVariant } from "@";

export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity: number;
}

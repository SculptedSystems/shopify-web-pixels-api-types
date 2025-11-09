import { MoneyV2 } from ".";

export interface DeliveryOption {
  /**
   * The cost of the delivery option.
   */
  cost: MoneyV2 | null;

  /**
   * The cost of the delivery option after discounts have been applied.
   */
  costAfterDiscounts: MoneyV2 | null;

  /**
   * The description of the delivery option.
   */
  description: string | null;

  /**
   * The unique identifier of the delivery option.
   */
  handle: string;

  /**
   * The title of the delivery option.
   */
  title: string | null;

  /**
   * The type of delivery option.
   *
   * - `pickup`
   * - `pickupPoint`
   * - `shipping`
   * - `local`
   */
  type: string;
}

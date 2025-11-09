import { MoneyV2, DiscountApplication } from "@";

export interface DiscountAllocation {
  /**
   * The monetary value with currency allocated to the discount.
   */
  amount: MoneyV2;

  /**
   * The information about the intent of the discount.
   */
  discountApplication: DiscountApplication;
}

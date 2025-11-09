import { MoneyV2, PricingPercentageValue } from ".";

export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value: MoneyV2 | PricingPercentageValue;
}

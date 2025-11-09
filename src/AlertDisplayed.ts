import { AlertDisplayedType } from ".";

export interface AlertDisplayed {
  /**
   * The message that was displayed to the user.
   */
  message: string;

  /**
   * The part of the page the alert relates to.
   * Follows the [Shopify Functions target
   * format](https://shopify.dev/docs/api/functions/reference/cart-checkout-validation/graphql#supported-checkout-field-targets), for example
   * `cart.deliveryGroups[0].deliveryAddress.address1`.
   */
  target: string;

  /**
   * The type of alert that was displayed.
   */
  type: AlertDisplayedType;

  /**
   * The value of the field at the time the alert was displayed or null if the
   * alert did not relate to an individual field.
   */
  value: string | null;
}

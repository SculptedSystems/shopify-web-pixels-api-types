export enum AlertDisplayedType {
  /**
   * An alert related to general checkout issue was displayed.
   */
  CheckoutError = "CHECKOUT_ERROR",

  /**
   * An alert related to a contact information issue was displayed.
   */
  ContactError = "CONTACT_ERROR",

  /**
   * An alert related to a delivery issue was displayed.
   */
  DeliveryError = "DELIVERY_ERROR",

  /**
   * An alert related to a discount code or gift card issue was displayed.
   */
  DiscountError = "DISCOUNT_ERROR",

  /**
   * The input provided is incorrect or improperly formatted.
   */
  InputInvalid = "INPUT_INVALID",

  /**
   * A required field is empty.
   */
  InputRequired = "INPUT_REQUIRED",

  /**
   * An alert related to an inventory issue was displayed.
   */
  InventoryError = "INVENTORY_ERROR",

  /**
   * An alert related to a merchandise issue was displayed.
   */
  MerchandiseError = "MERCHANDISE_ERROR",

  /**
   * An alert related to a payment issue was displayed.
   */
  PaymentError = "PAYMENT_ERROR",
}

import { MoneyV2, Checkout, TransactionPaymentMethod } from ".";

export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod: TransactionPaymentMethod;
}

export interface TransactionPaymentMethod {
  /**
   * The name of the payment method used for the transaction. This may further
   * specify the payment method used.
   */
  name: string;

  /**
   * The type of payment method used for the transaction.
   *
   * - `creditCard`: A vaulted or manually entered credit card.
   * - `redeemable`: A redeemable payment method, such as a gift card or store
   * credit.
   * - `deferred`: A [deferred
   * payment](https://help.shopify.com/en/manual/orders/deferred-payments), such
   * as invoicing the buyer and collecting payment later.
   * - `local`: A [local payment
   * method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
   * - `manualPayment`: A manual payment method, such as an in-person retail
   * transaction.
   * - `paymentOnDelivery`: A payment that will be collected on delivery.
   * - `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay,
   * etc.
   * - `offsite`: A payment processed outside of Shopify's checkout, excluding
   * integrated wallets.
   * - `customOnSite`: A custom payment method that is processed through a
   * checkout extension with a payments app.
   * - `other`: Another type of payment not defined here.
   */
  type: string;
}

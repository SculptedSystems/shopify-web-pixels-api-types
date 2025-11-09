import {
  Attribute,
  MoneyV2,
  MailingAddress,
  Delivery,
  DiscountApplication,
  CheckoutLineItem,
  Localization,
  Order,
  ShippingRate,
  Transaction,
} from "@";

export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions: Transaction[];
}

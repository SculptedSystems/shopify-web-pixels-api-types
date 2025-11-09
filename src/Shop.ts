import { ShopPaymentSettings } from ".";

export interface Shop {
  /**
   * The shop’s country code.
   */
  countryCode: string;

  /**
   * The shop’s myshopify.com domain.
   */
  myshopifyDomain: string;

  /**
   * The shop’s name.
   */
  name: string;

  /**
   * Settings related to payments.
   */
  paymentSettings: ShopPaymentSettings;

  /**
   * The shop’s primary storefront URL.
   */
  storefrontUrl: string | null;
}

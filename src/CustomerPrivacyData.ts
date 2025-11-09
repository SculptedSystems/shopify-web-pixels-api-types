export interface CustomerPrivacyData {
  /**
   * This flag indicates whether the customer has allowed the processing of their data for analytics purposes on the initial page load.
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  analyticsProcessingAllowed: boolean;

  /**
   * This flag indicates whether the customer has allowed the processing of their data for marketing purposes on the initial page load.
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  marketingAllowed: boolean;

  /**
   * This flag indicates whether the customer has allowed the processing of their data for preferences purposes on the initial page load.
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  preferencesProcessingAllowed: boolean;

  /**
   * This flag indicates whether the customer has allowed the sale of their data on the initial page load.
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  saleOfDataAllowed: boolean;
}

export interface PurchasingCompanyLocation {
  /**
   * The external ID of the company location that can be set by the merchant.
   */
  externalId: string | null;

  /**
   * The company location ID.
   */
  id: string;

  /**
   * The name of the company location.
   */
  name: string;
}

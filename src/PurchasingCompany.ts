import { PurchasingCompanyCompany, PurchasingCompanyLocation } from "@";

export interface PurchasingCompany {
  /**
   * Includes information of the company that the business customer is
   * purchasing on behalf of.
   */
  company: PurchasingCompanyCompany;

  /**
   * Includes information of the company location that the business customer is
   * purchasing on behalf of.
   */
  location: PurchasingCompanyLocation;
}

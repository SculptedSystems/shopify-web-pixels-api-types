export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city: string | null;

  /**
   * The name of the country.
   */
  country: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode: string | null;

  /**
   * The customer’s first name.
   */
  firstName: string | null;

  /**
   * The customer’s last name.
   */
  lastName: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip: string | null;
}

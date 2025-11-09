export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode: string;
}

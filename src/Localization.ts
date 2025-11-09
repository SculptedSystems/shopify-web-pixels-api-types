import { Country, Language, Market } from ".";

export interface Localization {
  /**
   * The country of the active localized experience.
   */
  country: Country;

  /**
   * The language of the active localized experience.
   */
  language: Language;

  /**
   * The market including the country of the active localized experience.
   */
  market: Market;
}

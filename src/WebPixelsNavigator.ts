export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent: string;
}

export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search: string;
}

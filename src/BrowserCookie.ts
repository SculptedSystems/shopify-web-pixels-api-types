export interface BrowserCookie {
  /**
   * An asynchronous method to get a specific cookie by name. Takes a cookie
   * name of type `string` and returns the cookie value as a `string`
   */
  get: (name: string) => Promise<string>;

  /**
   * An asynchronous method to set a cookie by name. It takes two arguments, a string of form `key=value` as [described here](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#write_a_new_cookie) or the name of the cookie as the first argument and the value as the second argument.
   */
  set: (cookieOrName: string, value: string) => Promise<string>;
}

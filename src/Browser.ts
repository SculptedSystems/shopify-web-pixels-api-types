import { BrowserCookie, BrowserLocalStorage, BrowserSessionStorage } from ".";

export interface Browser {
  /**
   * This object replaces the native document.cookie API and provides a
   * setter/getter to set cookies on the top frame.
   */
  cookie: BrowserCookie;
  localStorage: BrowserLocalStorage;

  /**
   * @deprecated The navigator.sendBeacon() method asynchronously sends an HTTP
   * POST request containing a small amount of data to a web server. Please use
   * the standard web `fetch` api with the option `keepalive: true` to achieve
   * this functionality.
   */
  sendBeacon: (url: string, body: string) => Promise<boolean>;
  sessionStorage: BrowserSessionStorage;
}

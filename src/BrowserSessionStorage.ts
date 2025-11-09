export interface BrowserSessionStorage {
  /**
   * When invoked, will empty all keys out of the storage.
   */
  clear: () => Promise<
    ReturnType<WindowSessionStorage["sessionStorage"]["clear"]>
  >;

  /**
   * When passed a key name, will return that key's value.
   */
  getItem: (
    key: string,
  ) => Promise<ReturnType<WindowSessionStorage["sessionStorage"]["getItem"]>>;

  /**
   * When passed a number n, this method will return the name of the nth key in
   * the storage.
   */
  key: (
    index: number,
  ) => Promise<ReturnType<WindowSessionStorage["sessionStorage"]["key"]>>;

  /**
   * Returns an integer representing the number of data items stored in the
   * Storage object.
   */
  length: () => Promise<WindowSessionStorage["sessionStorage"]["length"]>;

  /**
   * When passed a key name, will remove that key from the storage.
   */
  removeItem: (
    key: string,
  ) => Promise<
    ReturnType<WindowSessionStorage["sessionStorage"]["removeItem"]>
  >;

  /**
   * When passed a key name and value, will add that key to the storage, or
   * update that key's value if it already exists.
   */
  setItem: (
    key: string,
    value: any,
  ) => Promise<ReturnType<WindowSessionStorage["sessionStorage"]["setItem"]>>;
}

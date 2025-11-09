import { UiExtensionErrorType } from ".";

export interface UiExtensionError {
  /**
   * The API version used by the extension.
   */
  apiVersion: string;

  /**
   * The unique identifier of the app that the extension belongs to.
   */
  appId: string;

  /**
   * The name of the app that the extension belongs to.
   */
  appName: string;

  /**
   * The version of the app that encountered the error.
   */
  appVersion: string;

  /**
   * The name of the extension that encountered the error.
   */
  extensionName: string;

  /**
   * The [target](https://shopify.dev/docs/api/checkout-ui-extensions/latest/targets) of the extension, for example
   * "purchase.checkout.delivery-address.render-after".
   */
  extensionTarget: string;

  /**
   * The message associated with the error that occurred.
   */
  message: string;

  /**
   * The [placement reference](https://shopify.dev/docs/apps/build/checkout/test-checkout-ui-extensions#dynamic-targets) of the extension, only populated
   * for dynamic targets.
   */
  placementReference: string | null;

  /**
   * The stack trace associated with the error that occurred.
   */
  trace: string;

  /**
   * The type of error that occurred.
   */
  type: UiExtensionErrorType;
}

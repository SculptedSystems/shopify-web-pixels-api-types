# Web Pixels API

The Web Pixels API gives you access to a set of controlled APIs for accessing browser APIs and subscribing to customer events, within one of our Lax or Strict sandboxes.

## App Web Pixels


For app developers integrating app web pixels, pixels are loaded in a strict sandbox. To initialize the web pixel extension API you can import the `@shopify/web-pixels-extension package` for stronger typing and register your pixel. Once initialized, the `api` object (the **Standard API**) has access to the following properties:

- [`analytics`](https://shopify.dev/docs/api/web-pixels-api/standard-api/analytics): Provides access to Shopify's customer event API
- [`browser`](https://shopify.dev/docs/api/web-pixels-api/standard-api/browser): Provides access to specific browser methods that asynchronously execute in the top frame (cookie, localStorage, sessionStorage)
- [`init`](https://shopify.dev/docs/api/web-pixels-api/standard-api/init): A JSON object containing a snapshot of the page at time of page render.
  - Contains a context field that provides the Context of the page at the time of page render
  - Contains a data field that provides access to the Cart and Customer objects at the time of page render
- [`settings`](https://shopify.dev/docs/api/web-pixels-api/standard-api/settings): Provides access to the settings JSON object as set by the [GraphQL Admin API](https://shopify.dev/docs/apps/marketing/pixels/getting-started#step-5-create-a-web-pixel-setting-for-the-store) (Web pixel app extensions only)

To learn more about these Standard API properties, or how to create app pixels, please view the following documentation.

```javascript
import {register} from '@shopify/web-pixels-extension';

register((api) => {
  // you can access the web pixel extension API in here
  api.analytics.subscribe('page_viewed', (event) => {
    console.log(`Event Name is: ${event.name}`);
    // Event Name is: page_viewed

    // Set a cookie with the standard API
    api.browser.cookie.set('my_user_id', 'ABCX123');

    console.log(`Customer Name: ${api.init.data.customer.firstName}`);
    // Customer Name: Bogus

    console.log(api.settings);
    /**
     * {
     *   "accountID": 234
     * }
     */
  });
});

```

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics, browser, settings, init}) => {
  // instead of accessing the `api` object, you can deconstruct the properties for convenience

  analytics.subscribe('page_viewed', (event) => {
    console.log(`Event Name is: ${event.name}`);
    // Event Name is: page_viewed

    // Set a cookie with the standard API
    browser.cookie.set('my_user_id', 'ABCX123');

    console.log(`Customer Name: ${init.data.customer.firstName}`);
    // Customer Name: Bogus

    console.log(settings);
    /**
     * {
     *   "accountID": 234
     * }
     */
  });
});

```

- [API Reference](https://shopify.dev/docs/api/web-pixels-api/standard-api): Standard API
- [API Reference](https://shopify.dev/docs/apps/marketing/pixels/getting-started): App Pixel Tutorial
- [API Reference](https://help.shopify.com/en/manual/promoting-marketing/pixels/app-pixels): App Pixel FAQ

## Custom Web Pixels

Custom Pixels are loaded within a lax sandbox and configured within the pixel manager interface in the Shopify admin. For this developer interface, the `analytics`, `browser` and the `init` variables on the `api` object have already been deconstructed for you, and you can call them without having to write any additional boilerplate code.
```javascript
// With Custom Pixels, you can simply write the following without the "register" boilerplate.

analytics.subscribe('page_viewed', (event) => {
  console.log(`Event Name is: ${event.name}`);
  // Event Name is: page_viewed

  // Set a cookie with the standard API
  browser.cookie.set('my_user_id', 'ABCX123');

  console.log(`Customer Name: ${init.data.customer.firstName}`);
  // Customer Name: Bogus
});

```

- [API Reference](https://shopify.dev/docs/api/web-pixels-api/standard-api): Standard API
- [API Reference](https://help.shopify.com/en/manual/promoting-marketing/pixels/custom-pixels): Custom Pixel Tutorial

## Customer Events Reference

After setting up your App Pixel or Custom Pixel, you can use these pixels to subscribe to additional customer events.
         We publish and maintain a list of commonly used standard events such as `page_viewed`, `product_viewed` and checkout progression events.

If you would like additional events not covered by our list, you can create, publish and subscribe to your own custom events.

To subscribe to
         multiple events at once you can use: `all_events`, `all_standard_events`, `all_custom_events`, `all_dom_events`. Please take note that
         the contents of these event subscriptions are subject to change as events are added or modified. Please view the following documentation for
         more details about customer events:
        
- [API Reference](https://shopify.dev/docs/api/web-pixels-api/standard-events): Standard Events
- [API Reference](https://shopify.dev/docs/api/web-pixels-api/emitting-data): Custom Events
- [API Reference](https://shopify.dev/docs/api/web-pixels-api/dom-events): DOM Events
- [API Reference](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events): Advanced DOM Events
- [API Reference](https://shopify.dev/docs/api/web-pixels-api/pixel-privacy): Pixel Privacy

## References

- [alert_displayed](https://shopify.dev/docs/api/web-pixels-api/standard-events/alert_displayed): The `alert_displayed` event records instances when a user encounters an alert message, whether it's an inline validation message on an input field or a warning banner.

> Note: This event is only available on checkout.
- [cart_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/cart_viewed): The `cart_viewed` event logs an instance where a customer visited the cart page.
- [checkout_address_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_address_info_submitted): The `checkout_address_info_submitted` event logs an instance of a customer submitting their mailing address. This event is only available in checkouts where Checkout Extensibility for customizations is enabled
- [checkout_completed](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed): The `checkout_completed` event logs when a visitor completes a purchase. It's triggered once for each checkout, typically on the **Thank you** page. However, for upsells and post purchases, the `checkout_completed` event is triggered on the first upsell offer page instead. The event isn't triggered again on the **Thank you** page. If the page where the event is supposed to be triggered fails to load, then the `checkout_completed` event isn't triggered at all.
- [checkout_contact_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_contact_info_submitted): The `checkout_contact_info_submitted` event logs an instance where a customer submits a checkout form. This event is only available in checkouts where Checkout Extensibility for customizations is enabled
- [checkout_shipping_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_shipping_info_submitted): The `checkout_shipping_info_submitted` event logs an instance where the customer chooses a shipping rate. This event is only available in checkouts where Checkout Extensibility for customizations is enabled
- [checkout_started](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_started): The `checkout_started` event logs an instance of a customer starting the checkout process. This event is available on the checkout page. For Checkout Extensibility, this event is triggered every time a customer enters checkout. For non-checkout extensible shops, this event is only triggered the first time a customer enters checkout.
- [collection_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/collection_viewed): The `collection_viewed` event logs an instance where a customer visited a product collection index page. This event is available on the online store page.
- [page_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/page_viewed): The `page_viewed` event logs an instance where a customer visited a page. This event is available on the online store, Checkout, **Order status** and Customer Account pages.

> Note: Customer Accounts pages will only log the `page_viewed` event if a vanity domain is set up for the store.
- [payment_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/payment_info_submitted): The `payment_info_submitted` event logs an instance of a customer submitting their payment information. This event is available on the checkout page.
- [product_added_to_cart](https://shopify.dev/docs/api/web-pixels-api/standard-events/product_added_to_cart): The `product_added_to_cart` event logs an instance where a customer adds a product to their cart. This event is available on the online store page.
- [product_removed_from_cart](https://shopify.dev/docs/api/web-pixels-api/standard-events/product_removed_from_cart): The `product_removed_from_cart` event logs an instance where a customer removes a product from their cart. This event is available on the online store page.
- [product_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/product_viewed): The `product_viewed` event logs an instance where a customer visited a product details page. This event is available on the product page.
- [search_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/search_submitted): The `search_submitted` event logs an instance where a customer performed a search on the storefront. The products returned from the search query are in this event object (the first product variant for each product is listed in the array). This event is available on the online store page.
- [ui_extension_errored](https://shopify.dev/docs/api/web-pixels-api/standard-events/ui_extension_errored): The `ui_extension_errored` event logs occurrences when an extension fails to render due to an uncaught exception in the extension code.

> Note: This event is only available on checkout.
- [analytics](https://shopify.dev/docs/api/web-pixels-api/standard-api/analytics): Provides access to Shopify's [customer event API](https://shopify.dev/docs/api/web-pixels-api/standard-events)
- [browser](https://shopify.dev/docs/api/web-pixels-api/standard-api/browser): Provides access to specific browser methods that asynchronously execute in the top frame (`cookie`, `localStorage`, `sessionStorage`)
- [customerPrivacy](https://shopify.dev/docs/api/web-pixels-api/standard-api/customerprivacy): Provides access to the [customerPrivacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not customers have given consent.
- [init](https://shopify.dev/docs/api/web-pixels-api/standard-api/init): A JSON object containing a snapshot of the page at time of page render. It will always have the present `Context` of the page, as well as the `Data` field, which provides access to the `Cart` and `Customer` objects.
- [settings](https://shopify.dev/docs/api/web-pixels-api/standard-api/settings): Provides access to the settings JSON object as set by the [GraphQL Admin API](https://shopify.dev/docs/apps/marketing/pixels/getting-started#step-5-create-a-web-pixel-setting-for-the-store) **(Web pixel app extensions only)**. The structure of this object is a string keyed hash map: `Record<string, any>`.
- [clicked](https://shopify.dev/docs/api/web-pixels-api/dom-events/clicked): The `clicked` event logs an instance where a customer clicks on a page element.
- [form_submitted](https://shopify.dev/docs/api/web-pixels-api/dom-events/form_submitted): The `form_submitted` event logs an instance where a form on a page is submitted.
- [input_blurred](https://shopify.dev/docs/api/web-pixels-api/dom-events/input_blurred): The `input_blurred` event logs an instance where an input on a page loses focus.
- [input_changed](https://shopify.dev/docs/api/web-pixels-api/dom-events/input_changed): The `input_changed` event logs an instance where an input value changes.
- [input_focused](https://shopify.dev/docs/api/web-pixels-api/dom-events/input_focused): The `input_focused` event logs an instance where an input on a page gains focus.
- [advanced_dom_available](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_available): Event published when the DOM has been loaded and is available for interaction.
- [advanced_dom_changed](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_changed): Event published when the DOM has been changed in any way, such as an element being added, removed, or modified.
- [advanced_dom_clicked](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_clicked): Event published when a customer clicks on a page element.
- [advanced_dom_clipboard](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_clipboard): Event published when a customer has cut, copied or pasted text to or from the clipboard.
- [advanced_dom_form_submitted](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_form_submitted): Event published when a form is submitted.
- [advanced_dom_input_blurred](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_input_blurred): Event published when an input loses focus.
- [advanced_dom_input_changed](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_input_changed): Event published when an input value changes.
- [advanced_dom_input_focused](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_input_focused): Event published when an input gains focus.
- [advanced_dom_mouse_moved](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_mouse_moved): Event published when a customer moves their cursor over the page.
- [advanced_dom_scrolled](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_scrolled): Event published when a customer scrolls on a page or a scrollable element.
- [advanced_dom_selection_changed](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_selection_changed): Event published when a customer uses text selection on a page.
- [advanced_dom_window_resized](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced_dom_window_resized): Event published when a customer resizes their browser window.


## alert_displayed

The `alert_displayed` event records instances when a user encounters an alert message, whether it's an inline validation message on an input field or a warning banner.

> Note: This event is only available on checkout.
[View alert_displayed](https://shopify.dev/docs/api/web-pixels-api/standard-events/alert-displayed)

## cart_viewed

The `cart_viewed` event logs an instance where a customer visited the cart page.
[View cart_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/cart-viewed)

## checkout_address_info_submitted

The `checkout_address_info_submitted` event logs an instance of a customer submitting their mailing address. This event is only available in checkouts where Checkout Extensibility for customizations is enabled
[View checkout_address_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout-address-info-submitted)

## checkout_completed

The `checkout_completed` event logs when a visitor completes a purchase. It's triggered once for each checkout, typically on the **Thank you** page. However, for upsells and post purchases, the `checkout_completed` event is triggered on the first upsell offer page instead. The event isn't triggered again on the **Thank you** page. If the page where the event is supposed to be triggered fails to load, then the `checkout_completed` event isn't triggered at all.
[View checkout_completed](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout-completed)

## checkout_contact_info_submitted

The `checkout_contact_info_submitted` event logs an instance where a customer submits a checkout form. This event is only available in checkouts where Checkout Extensibility for customizations is enabled
[View checkout_contact_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout-contact-info-submitted)

## checkout_shipping_info_submitted

The `checkout_shipping_info_submitted` event logs an instance where the customer chooses a shipping rate. This event is only available in checkouts where Checkout Extensibility for customizations is enabled
[View checkout_shipping_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout-shipping-info-submitted)

## checkout_started

The `checkout_started` event logs an instance of a customer starting the checkout process. This event is available on the checkout page. For Checkout Extensibility, this event is triggered every time a customer enters checkout. For non-checkout extensible shops, this event is only triggered the first time a customer enters checkout.
[View checkout_started](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout-started)

## collection_viewed

The `collection_viewed` event logs an instance where a customer visited a product collection index page. This event is available on the online store page.
[View collection_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/collection-viewed)

## page_viewed

The `page_viewed` event logs an instance where a customer visited a page. This event is available on the online store, Checkout, **Order status** and Customer Account pages.

> Note: Customer Accounts pages will only log the `page_viewed` event if a vanity domain is set up for the store.
[View page_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/page-viewed)

## payment_info_submitted

The `payment_info_submitted` event logs an instance of a customer submitting their payment information. This event is available on the checkout page.
[View payment_info_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/payment-info-submitted)

## product_added_to_cart

The `product_added_to_cart` event logs an instance where a customer adds a product to their cart. This event is available on the online store page.
[View product_added_to_cart](https://shopify.dev/docs/api/web-pixels-api/standard-events/product-added-to-cart)

## product_removed_from_cart

The `product_removed_from_cart` event logs an instance where a customer removes a product from their cart. This event is available on the online store page.
[View product_removed_from_cart](https://shopify.dev/docs/api/web-pixels-api/standard-events/product-removed-from-cart)

## product_viewed

The `product_viewed` event logs an instance where a customer visited a product details page. This event is available on the product page.
[View product_viewed](https://shopify.dev/docs/api/web-pixels-api/standard-events/product-viewed)

## search_submitted

The `search_submitted` event logs an instance where a customer performed a search on the storefront. The products returned from the search query are in this event object (the first product variant for each product is listed in the array). This event is available on the online store page.
[View search_submitted](https://shopify.dev/docs/api/web-pixels-api/standard-events/search-submitted)

## ui_extension_errored

The `ui_extension_errored` event logs occurrences when an extension fails to render due to an uncaught exception in the extension code.

> Note: This event is only available on checkout.
[View ui_extension_errored](https://shopify.dev/docs/api/web-pixels-api/standard-events/ui-extension-errored)

# alert_displayed

The `alert_displayed` event records instances when a user encounters an alert message, whether it's an inline validation message on an input field or a warning banner.

> Note: This event is only available on checkout.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('alert_displayed', (event) => {
    // Example for accessing event data
    const {target, type, message} = event.data.alert;

    const payload = {
      event_name: event.name,
      event_data: {
        target,
        type,
        message,
      },
    };

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('alert_displayed', (event) => {
  // Example for accessing event data
  const {target, type, message} = event.data.alert;

  const payload = {
    event_name: event.name,
    event_data: {
      target,
      type,
      message,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsAlertDisplayed

The `alert_displayed` event logs an instance of an alert being displayed to a buyer.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsAlertDisplayedData`

  - PixelEventsAlertDisplayed: export interface PixelEventsAlertDisplayed {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsAlertDisplayedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsAlertDisplayedData: export interface PixelEventsAlertDisplayedData {
  alert?: AlertDisplayed;
}
  - AlertDisplayed: export interface AlertDisplayed {
  /**
   * The message that was displayed to the user.
   */
  message?: string;

  /**
   * The part of the page the alert relates to.
   * Follows the [Shopify Functions target
   * format](https://shopify.dev/docs/api/functions/reference/cart-checkout-validation/graphql#supported-checkout-field-targets), for example
   * `cart.deliveryGroups[0].deliveryAddress.address1`.
   */
  target?: string;

  /**
   * The type of alert that was displayed.
   */
  type?: AlertDisplayedType;

  /**
   * The value of the field at the time the alert was displayed or null if the
   * alert did not relate to an individual field.
   */
  value?: string | null;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsAlertDisplayedData

### alert

value: `AlertDisplayed`

  - AlertDisplayed: export interface AlertDisplayed {
  /**
   * The message that was displayed to the user.
   */
  message?: string;

  /**
   * The part of the page the alert relates to.
   * Follows the [Shopify Functions target
   * format](https://shopify.dev/docs/api/functions/reference/cart-checkout-validation/graphql#supported-checkout-field-targets), for example
   * `cart.deliveryGroups[0].deliveryAddress.address1`.
   */
  target?: string;

  /**
   * The type of alert that was displayed.
   */
  type?: AlertDisplayedType;

  /**
   * The value of the field at the time the alert was displayed or null if the
   * alert did not relate to an individual field.
   */
  value?: string | null;
}

### AlertDisplayed

An object that contains information about an alert that was displayed to a buyer.

### message

value: `string`

The message that was displayed to the user.

### target

value: `string`

The part of the page the alert relates to. Follows the [Shopify Functions target format](https://shopify.dev/docs/api/functions/reference/cart-checkout-validation/graphql#supported-checkout-field-targets), for example `cart.deliveryGroups[0].deliveryAddress.address1`.

### type

value: `AlertDisplayedType`

  - AlertDisplayed: export interface AlertDisplayed {
  /**
   * The message that was displayed to the user.
   */
  message?: string;

  /**
   * The part of the page the alert relates to.
   * Follows the [Shopify Functions target
   * format](https://shopify.dev/docs/api/functions/reference/cart-checkout-validation/graphql#supported-checkout-field-targets), for example
   * `cart.deliveryGroups[0].deliveryAddress.address1`.
   */
  target?: string;

  /**
   * The type of alert that was displayed.
   */
  type?: AlertDisplayedType;

  /**
   * The value of the field at the time the alert was displayed or null if the
   * alert did not relate to an individual field.
   */
  value?: string | null;
}
  - AlertDisplayedType: export enum AlertDisplayedType {
  /**
   * An alert related to general checkout issue was displayed.
   */
  CheckoutError = 'CHECKOUT_ERROR',

  /**
   * An alert related to a contact information issue was displayed.
   */
  ContactError = 'CONTACT_ERROR',

  /**
   * An alert related to a delivery issue was displayed.
   */
  DeliveryError = 'DELIVERY_ERROR',

  /**
   * An alert related to a discount code or gift card issue was displayed.
   */
  DiscountError = 'DISCOUNT_ERROR',

  /**
   * The input provided is incorrect or improperly formatted.
   */
  InputInvalid = 'INPUT_INVALID',

  /**
   * A required field is empty.
   */
  InputRequired = 'INPUT_REQUIRED',

  /**
   * An alert related to an inventory issue was displayed.
   */
  InventoryError = 'INVENTORY_ERROR',

  /**
   * An alert related to a merchandise issue was displayed.
   */
  MerchandiseError = 'MERCHANDISE_ERROR',

  /**
   * An alert related to a payment issue was displayed.
   */
  PaymentError = 'PAYMENT_ERROR',
}
The type of alert that was displayed.

### value

value: `string | null`

The value of the field at the time the alert was displayed or null if the alert did not relate to an individual field.

### AlertDisplayedType

### CheckoutError

value: `CHECKOUT_ERROR`


### ContactError

value: `CONTACT_ERROR`


### DeliveryError

value: `DELIVERY_ERROR`


### DiscountError

value: `DISCOUNT_ERROR`


### InputInvalid

value: `INPUT_INVALID`


### InputRequired

value: `INPUT_REQUIRED`


### InventoryError

value: `INVENTORY_ERROR`


### MerchandiseError

value: `MERCHANDISE_ERROR`


### PaymentError

value: `PAYMENT_ERROR`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# cart_viewed

The `cart_viewed` event logs an instance where a customer visited the cart page.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('cart_viewed', (event) => {
    // Example for accessing event data
    const totalCartCost = event.data.cart.cost.totalAmount.amount;

    const firstCartLineItemName =
      event.data.cart.lines[0]?.merchandise.product.title;

    const payload = {
      event_name: event.name,
      event_data: {
        cartCost: totalCartCost,
        firstCartItemName: firstCartLineItemName,
      },
    };

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('cart_viewed', (event) => {
  // Example for accessing event data
  const totalCartCost = event.data.cart.cost.totalAmount.amount;

  const firstCartLineItemName =
    event.data.cart.lines[0]?.merchandise.product.title;

  const payload = {
    event_name: event.name,
    event_data: {
      cartCost: totalCartCost,
      firstCartItemName: firstCartLineItemName,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsCartViewed

The `cart_viewed` event logs an instance where a customer visited the cart page

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsCartViewedData`

  - PixelEventsCartViewed: export interface PixelEventsCartViewed {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsCartViewedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsCartViewedData: export interface PixelEventsCartViewedData {
  cart?: Cart | null;
}
  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsCartViewedData

### cart

value: `Cart | null`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}

### Cart

A cart represents the merchandise that a customer intends to purchase, and the estimated cost associated with the cart.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
The attributes associated with the cart. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### cost

value: `CartCost`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}
  - CartCost: export interface CartCost {
  /**
   * The total amount for the customer to pay.
   */
  totalAmount?: MoneyV2;
}
The estimated costs that the customer will pay at checkout.

### id

value: `string | null`

A globally unique identifier.

### lines

value: `CartLine[]`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}
  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}
A list of lines containing information about the items the customer intends to purchase.

### totalQuantity

value: `number`

The total number of items in the cart.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### CartCost

The costs that the customer will pay at checkout. It uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing#create-a-cart).

### totalAmount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount for the customer to pay.

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### CartLine

Information about the merchandise in the cart.

### cost

value: `CartLineCost`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}
  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}
  - CartLineCost: export interface CartLineCost {
  /**
   * The total cost of the merchandise line.
   */
  totalAmount?: MoneyV2;
}
The cost of the merchandise that the customer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout.

### merchandise

value: `ProductVariant`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The merchandise that the buyer intends to purchase.

### quantity

value: `number`

The quantity of the merchandise that the customer intends to purchase.

### CartLineCost

The cost of the merchandise line that the customer will pay at checkout.

### totalAmount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total cost of the merchandise line.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# checkout_address_info_submitted

The `checkout_address_info_submitted` event logs an instance of a customer submitting their mailing address. This event is only available in checkouts where Checkout Extensibility for customizations is enabled

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('checkout_address_info_submitted', (event) => {
    // Example for accessing event data
    const checkout = event.data.checkout;

    const payload = {
      event_name: event.name,
      event_data: {
        addressLine1: checkout.shippingAddress?.address1,
        addressLine2: checkout.shippingAddress?.address2,
        city: checkout.shippingAddress?.city,
        country: checkout.shippingAddress?.country,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('checkout_address_info_submitted', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;

  const payload = {
    event_name: event.name,
    event_data: {
      addressLine1: checkout.shippingAddress?.address1,
      addressLine2: checkout.shippingAddress?.address2,
      city: checkout.shippingAddress?.city,
      country: checkout.shippingAddress?.country,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    event_data: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsCheckoutAddressInfoSubmitted

The `checkout_address_info_submitted` event logs an instance of a customer submitting their mailing address. This event is only available in checkouts where Checkout Extensibility for customizations is enabled

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsCheckoutAddressInfoSubmittedData`

  - PixelEventsCheckoutAddressInfoSubmitted: export interface PixelEventsCheckoutAddressInfoSubmitted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsCheckoutAddressInfoSubmittedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsCheckoutAddressInfoSubmittedData: export interface PixelEventsCheckoutAddressInfoSubmittedData {
  checkout?: Checkout;
}
  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsCheckoutAddressInfoSubmittedData

### checkout

value: `Checkout`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### Checkout

A container for all the information required to add items to checkout and pay.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
A list of attributes accumulated throughout the checkout process.

### billingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The billing address to where the order will be charged.

### buyerAcceptsEmailMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via email. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### buyerAcceptsSmsMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via SMS. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### currencyCode

value: `string | null`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### delivery

value: `Delivery | null`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
Represents the selected delivery options for a checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### discountApplications

value: `DiscountApplication[]`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
A list of discount applications.

### discountsAmount

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount of the discounts applied to the price of the checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### email

value: `string | null`

The email attached to this checkout.

### lineItems

value: `CheckoutLineItem[]`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}
  - CheckoutLineItem: export interface CheckoutLineItem {
  /**
   * The discounts that have been applied to the checkout line item by a
   * discount application.
   */
  discountAllocations?: DiscountAllocation[];

  /**
   * The combined price of all of the items in the line item
   * after line-level discounts have been applied. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  finalLinePrice?: MoneyV2;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * The properties of the line item. A shop may add, or enable customers to add
   * custom information to a line item. Line item properties consist of a key
   * and value pair. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  properties?: Property[];

  /**
   * The quantity of the line item.
   */
  quantity?: number;

  /**
   * The selling plan associated with the line item and the effect that
   * each selling plan has on variants when they're purchased. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  sellingPlanAllocation?: SellingPlanAllocation | null;

  /**
   * The title of the line item. Defaults to the product's title.
   */
  title?: string | null;

  /**
   * Product variant of the line item.
   */
  variant?: ProductVariant | null;
}
A list of line item objects, each one containing information about an item in the checkout.

### localization

value: `Localization`

  - Localization: export interface Localization {
  /**
   * The country of the active localized experience.
   */
  country?: Country;

  /**
   * The language of the active localized experience.
   */
  language?: Language;

  /**
   * The market including the country of the active localized experience.
   */
  market?: Market;
}
Information about the active localized experience. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### order

value: `Order | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
The resulting order from a paid checkout.

### phone

value: `string | null`

A unique phone number for the customer. Formatted using E.164 standard. For example, *+16135551111*.

### shippingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The shipping address to where the line items will be shipped.

### shippingLine

value: `ShippingRate | null`

  - ShippingRate: export interface ShippingRate {
  /**
   * Price of this shipping rate.
   */
  price?: MoneyV2;
}
Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object.

### smsMarketingPhone

value: `string | null`

The phone number provided by the buyer after opting in to SMS marketing. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### subtotalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The price at checkout before duties, shipping, and taxes.

### token

value: `string | null`

A unique identifier for a particular checkout.

### totalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the prices of all the items in the checkout, including duties, taxes, and discounts.

### totalTax

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the taxes applied to the line items and shipping lines in the checkout.

### transactions

value: `Transaction[]`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
A list of transactions associated with a checkout or order. Certain transactions, such as credit card transactions, may only be present in the checkout_completed event.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### MailingAddress

A mailing address for customers and shipping.

### address1

value: `string | null`

The first line of the address. This is usually the street address or a P.O. Box number.

### address2

value: `string | null`

The second line of the address. This is usually an apartment, suite, or unit number.

### city

value: `string | null`

The name of the city, district, village, or town.

### country

value: `string | null`

The name of the country.

### countryCode

value: `string | null`

The two-letter code that represents the country, for example, US. The country codes generally follows ISO 3166-1 alpha-2 guidelines.

### firstName

value: `string | null`

The customer’s first name.

### lastName

value: `string | null`

The customer’s last name.

### phone

value: `string | null`

The phone number for this mailing address as entered by the customer.

### province

value: `string | null`

The region of the address, such as the province, state, or district.

### provinceCode

value: `string | null`

The two-letter code for the region. For example, ON.

### zip

value: `string | null`

The ZIP or postal code of the address.

### Delivery

The delivery information for the event.

### selectedDeliveryOptions

value: `DeliveryOption[]`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
  - DeliveryOption: export interface DeliveryOption {
  /**
   * The cost of the delivery option.
   */
  cost?: MoneyV2 | null;

  /**
   * The cost of the delivery option after discounts have been applied.
   */
  costAfterDiscounts?: MoneyV2 | null;

  /**
   * The description of the delivery option.
   */
  description?: string | null;

  /**
   * The unique identifier of the delivery option.
   */
  handle?: string;

  /**
   * The title of the delivery option.
   */
  title?: string | null;

  /**
   * The type of delivery option.
   *
   * - `pickup`
   * - `pickupPoint`
   * - `shipping`
   * - `local`
   */
  type?: string;
}
The selected delivery options for the event.

### DeliveryOption

Represents a delivery option that the customer can choose from.

### cost

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option.

### costAfterDiscounts

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option after discounts have been applied.

### description

value: `string | null`

The description of the delivery option.

### handle

value: `string`

The unique identifier of the delivery option.

### title

value: `string | null`

The title of the delivery option.

### type

value: `string`

The type of delivery option.

- `pickup`
- `pickupPoint`
- `shipping`
- `local`

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### DiscountApplication

The information about the intent of the discount.

### allocationMethod

value: `string`

The method by which the discount's value is applied to its entitled items.

- `ACROSS`: The value is spread across all entitled lines.
- `EACH`: The value is applied onto every entitled line.

### targetSelection

value: `string`

How the discount amount is distributed on the discounted lines.

- `ALL`: The discount is allocated onto all the lines.
- `ENTITLED`: The discount is allocated onto only the lines that it's entitled for.
- `EXPLICIT`: The discount is allocated onto explicitly chosen lines.

### targetType

value: `string`

The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.

- `LINE_ITEM`: The discount applies onto line items.
- `SHIPPING_LINE`: The discount applies onto shipping lines.

### title

value: `string`

The customer-facing name of the discount. If the type of discount is a `DISCOUNT_CODE`, this `title` attribute represents the code of the discount.

### type

value: `string`

The type of the discount.

- `AUTOMATIC`: A discount automatically at checkout or in the cart without the need for a code.
- `DISCOUNT_CODE`: A discount applied onto checkouts through the use of a code.
- `MANUAL`: A discount that is applied to an order by a merchant or store owner manually, rather than being automatically applied by the system or through a script.
- `SCRIPT`: A discount applied to a customer's order using a script

### value

value: `MoneyV2 | PricingPercentageValue`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
  - PricingPercentageValue: export interface PricingPercentageValue {
  /**
   * The percentage value of the object.
   */
  percentage?: number;
}
The value of the discount. Fixed discounts return a `Money` Object, while Percentage discounts return a `PricingPercentageValue` object.

### PricingPercentageValue

A value given to a customer when a discount is applied to an order. The application of a discount with this value gives the customer the specified percentage off a specified item.

### percentage

value: `number`

The percentage value of the object.

### CheckoutLineItem

A single line item in the checkout, grouped by variant and attributes.

### discountAllocations

value: `DiscountAllocation[]`

  - DiscountAllocation: export interface DiscountAllocation {
  /**
   * The monetary value with currency allocated to the discount.
   */
  amount?: MoneyV2;

  /**
   * The information about the intent of the discount.
   */
  discountApplication?: DiscountApplication;
}
The discounts that have been applied to the checkout line item by a discount application.

### finalLinePrice

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The combined price of all of the items in the line item after line-level discounts have been applied. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### id

value: `string | null`

A globally unique identifier.

### properties

value: `Property[]`

  - Property: export interface Property {
  /**
   * The key for the property.
   */
  key?: string;

  /**
   * The value for the property.
   */
  value?: string;
}
The properties of the line item. A shop may add, or enable customers to add custom information to a line item. Line item properties consist of a key and value pair. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### quantity

value: `number`

The quantity of the line item.

### sellingPlanAllocation

value: `SellingPlanAllocation | null`

  - SellingPlanAllocation: export interface SellingPlanAllocation {
  /**
   * A representation of how products and variants can be sold and purchased.
   * For example, an individual selling plan could be '6 weeks of prepaid
   * granola, delivered weekly'.
   */
  sellingPlan?: SellingPlan;
}
  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
The selling plan associated with the line item and the effect that each selling plan has on variants when they're purchased. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### title

value: `string | null`

The title of the line item. Defaults to the product's title.

### variant

value: `ProductVariant | null`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
Product variant of the line item.

### DiscountAllocation

The discount that has been applied to the checkout line item.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the discount.

### discountApplication

value: `DiscountApplication`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
The information about the intent of the discount.

### Property

The line item additional custom properties.

### key

value: `string`

The key for the property.

### value

value: `string`

The value for the property.

### SellingPlanAllocation

Represents an association between a variant and a selling plan.

### sellingPlan

value: `SellingPlan`

  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'.

### SellingPlan

Represents how products and variants can be sold and purchased.

### id

value: `string`

A globally unique identifier.

### name

value: `string`

The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### Localization

Information about the active localized experience.

### country

value: `Country`

  - Country: export interface Country {
  /**
   * The ISO-3166-1 code for this country, for example, "US".
   */
  isoCode?: string | null;
}
The country of the active localized experience.

### language

value: `Language`

  - Language: export interface Language {
  /**
   * The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1
   * alpha-2 region code, for example, "en-US".
   */
  isoCode?: string;
}
The language of the active localized experience.

### market

value: `Market`

  - Market: export interface Market {
  /**
   * A human-readable, shop-scoped identifier.
   */
  handle?: string | null;

  /**
   * A globally unique identifier.
   */
  id?: string | null;
}
The market including the country of the active localized experience.

### Country

A country.

### isoCode

value: `string | null`

The ISO-3166-1 code for this country, for example, "US".

### Language

A language.

### isoCode

value: `string`

The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1 alpha-2 region code, for example, "en-US".

### Market

A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [this](https://shopify.dev/docs/apps/markets) conceptual overview.

### handle

value: `string | null`

A human-readable, shop-scoped identifier.

### id

value: `string | null`

A globally unique identifier.

### Order

An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process.

### customer

value: `OrderCustomer | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
  - OrderCustomer: export interface OrderCustomer {
  /**
   * The ID of the customer.
   */
  id?: string | null;

  /**
   * Indicates if the order is the customer’s first order. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  isFirstOrder?: boolean | null;
}
The customer that placed the order.

### id

value: `string | null`

The ID of the order. ID will be null for all events except checkout_completed.

### OrderCustomer

The customer that placed the order.

### id

value: `string | null`

The ID of the customer.

### isFirstOrder

value: `boolean | null`

Indicates if the order is the customer’s first order. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### ShippingRate

A shipping rate to be applied to a checkout.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
Price of this shipping rate.

### Transaction

A transaction associated with a checkout or order.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the transaction method.

### gateway

value: `string`

The name of the payment provider used for the transaction.

### paymentMethod

value: `TransactionPaymentMethod`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
  - TransactionPaymentMethod: export interface TransactionPaymentMethod {
  /**
   * The name of the payment method used for the transaction. This may further
   * specify the payment method used.
   */
  name?: string;

  /**
   * The type of payment method used for the transaction.
   *
   * - `creditCard`: A vaulted or manually entered credit card.
   * - `redeemable`: A redeemable payment method, such as a gift card or store
   * credit.
   * - `deferred`: A [deferred
   * payment](https://help.shopify.com/en/manual/orders/deferred-payments), such
   * as invoicing the buyer and collecting payment later.
   * - `local`: A [local payment
   * method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
   * - `manualPayment`: A manual payment method, such as an in-person retail
   * transaction.
   * - `paymentOnDelivery`: A payment that will be collected on delivery.
   * - `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay,
   * etc.
   * - `offsite`: A payment processed outside of Shopify's checkout, excluding
   * integrated wallets.
   * - `customOnSite`: A custom payment method that is processed through a
   * checkout extension with a payments app.
   * - `other`: Another type of payment not defined here.
   */
  type?: string;
}
The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### TransactionPaymentMethod

The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### name

value: `string`

The name of the payment method used for the transaction. This may further specify the payment method used.

### type

value: `string`

The type of payment method used for the transaction.

- `creditCard`: A vaulted or manually entered credit card.
- `redeemable`: A redeemable payment method, such as a gift card or store credit.
- `deferred`: A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment later.
- `local`: A [local payment method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
- `manualPayment`: A manual payment method, such as an in-person retail transaction.
- `paymentOnDelivery`: A payment that will be collected on delivery.
- `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay, etc.
- `offsite`: A payment processed outside of Shopify's checkout, excluding integrated wallets.
- `customOnSite`: A custom payment method that is processed through a checkout extension with a payments app.
- `other`: Another type of payment not defined here.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# checkout_completed

The `checkout_completed` event logs when a visitor completes a purchase. It's triggered once for each checkout, typically on the **Thank you** page. However, for upsells and post purchases, the `checkout_completed` event is triggered on the first upsell offer page instead. The event isn't triggered again on the **Thank you** page. If the page where the event is supposed to be triggered fails to load, then the `checkout_completed` event isn't triggered at all.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('checkout_completed', (event) => {
    // Example for accessing event data
    const checkout = event.data.checkout;

    const checkoutTotalPrice = checkout.totalPrice?.amount;

    const allDiscountCodes = checkout.discountApplications.map((discount) => {
      if (discount.type === 'DISCOUNT_CODE') {
        return discount.title;
      }
    });

    const firstItem = checkout.lineItems[0];

    const firstItemDiscountedValue = firstItem.discountAllocations[0]?.amount;

    const customItemPayload = {
      quantity: firstItem.quantity,
      title: firstItem.title,
      discount: firstItemDiscountedValue,
    };

    const paymentTransactions = event.data.checkout.transactions.map((transaction) => {
      return {
          paymentGateway: transaction.gateway,
          amount: transaction.amount,
        };
    });

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        discountCodesUsed: allDiscountCodes,
        firstItem: customItemPayload,
        paymentTransactions: paymentTransactions,
      },
    };

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('checkout_completed', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;

  const checkoutTotalPrice = checkout.totalPrice?.amount;

  const allDiscountCodes = checkout.discountApplications.map((discount) => {
    if (discount.type === 'DISCOUNT_CODE') {
      return discount.title;
    }
  });

  const firstItem = checkout.lineItems[0];

  const firstItemDiscountedValue = firstItem.discountAllocations[0]?.amount;

  const customItemPayload = {
    quantity: firstItem.quantity,
    title: firstItem.title,
    discount: firstItemDiscountedValue,
  };

  const paymentTransactions = event.data.checkout.transactions.map((transaction) => {
    return {
        paymentGateway: transaction.gateway,
        amount: transaction.amount,
      };
  });

  const payload = {
    event_name: event.name,
    event_data: {
      totalPrice: checkoutTotalPrice,
      discountCodesUsed: allDiscountCodes,
      firstItem: customItemPayload,
      paymentTransactions: paymentTransactions,
    },
  };

  // Example for sending event data to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsCheckoutCompleted

The `checkout_completed` event logs when a visitor completes a purchase. This event is available on the **Order status** and checkout pages

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsCheckoutCompletedData`

  - PixelEventsCheckoutCompleted: export interface PixelEventsCheckoutCompleted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsCheckoutCompletedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsCheckoutCompletedData: export interface PixelEventsCheckoutCompletedData {
  checkout?: Checkout;
}
  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsCheckoutCompletedData

### checkout

value: `Checkout`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### Checkout

A container for all the information required to add items to checkout and pay.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
A list of attributes accumulated throughout the checkout process.

### billingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The billing address to where the order will be charged.

### buyerAcceptsEmailMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via email. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### buyerAcceptsSmsMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via SMS. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### currencyCode

value: `string | null`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### delivery

value: `Delivery | null`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
Represents the selected delivery options for a checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### discountApplications

value: `DiscountApplication[]`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
A list of discount applications.

### discountsAmount

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount of the discounts applied to the price of the checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### email

value: `string | null`

The email attached to this checkout.

### lineItems

value: `CheckoutLineItem[]`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}
  - CheckoutLineItem: export interface CheckoutLineItem {
  /**
   * The discounts that have been applied to the checkout line item by a
   * discount application.
   */
  discountAllocations?: DiscountAllocation[];

  /**
   * The combined price of all of the items in the line item
   * after line-level discounts have been applied. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  finalLinePrice?: MoneyV2;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * The properties of the line item. A shop may add, or enable customers to add
   * custom information to a line item. Line item properties consist of a key
   * and value pair. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  properties?: Property[];

  /**
   * The quantity of the line item.
   */
  quantity?: number;

  /**
   * The selling plan associated with the line item and the effect that
   * each selling plan has on variants when they're purchased. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  sellingPlanAllocation?: SellingPlanAllocation | null;

  /**
   * The title of the line item. Defaults to the product's title.
   */
  title?: string | null;

  /**
   * Product variant of the line item.
   */
  variant?: ProductVariant | null;
}
A list of line item objects, each one containing information about an item in the checkout.

### localization

value: `Localization`

  - Localization: export interface Localization {
  /**
   * The country of the active localized experience.
   */
  country?: Country;

  /**
   * The language of the active localized experience.
   */
  language?: Language;

  /**
   * The market including the country of the active localized experience.
   */
  market?: Market;
}
Information about the active localized experience. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### order

value: `Order | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
The resulting order from a paid checkout.

### phone

value: `string | null`

A unique phone number for the customer. Formatted using E.164 standard. For example, *+16135551111*.

### shippingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The shipping address to where the line items will be shipped.

### shippingLine

value: `ShippingRate | null`

  - ShippingRate: export interface ShippingRate {
  /**
   * Price of this shipping rate.
   */
  price?: MoneyV2;
}
Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object.

### smsMarketingPhone

value: `string | null`

The phone number provided by the buyer after opting in to SMS marketing. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### subtotalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The price at checkout before duties, shipping, and taxes.

### token

value: `string | null`

A unique identifier for a particular checkout.

### totalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the prices of all the items in the checkout, including duties, taxes, and discounts.

### totalTax

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the taxes applied to the line items and shipping lines in the checkout.

### transactions

value: `Transaction[]`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
A list of transactions associated with a checkout or order. Certain transactions, such as credit card transactions, may only be present in the checkout_completed event.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### MailingAddress

A mailing address for customers and shipping.

### address1

value: `string | null`

The first line of the address. This is usually the street address or a P.O. Box number.

### address2

value: `string | null`

The second line of the address. This is usually an apartment, suite, or unit number.

### city

value: `string | null`

The name of the city, district, village, or town.

### country

value: `string | null`

The name of the country.

### countryCode

value: `string | null`

The two-letter code that represents the country, for example, US. The country codes generally follows ISO 3166-1 alpha-2 guidelines.

### firstName

value: `string | null`

The customer’s first name.

### lastName

value: `string | null`

The customer’s last name.

### phone

value: `string | null`

The phone number for this mailing address as entered by the customer.

### province

value: `string | null`

The region of the address, such as the province, state, or district.

### provinceCode

value: `string | null`

The two-letter code for the region. For example, ON.

### zip

value: `string | null`

The ZIP or postal code of the address.

### Delivery

The delivery information for the event.

### selectedDeliveryOptions

value: `DeliveryOption[]`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
  - DeliveryOption: export interface DeliveryOption {
  /**
   * The cost of the delivery option.
   */
  cost?: MoneyV2 | null;

  /**
   * The cost of the delivery option after discounts have been applied.
   */
  costAfterDiscounts?: MoneyV2 | null;

  /**
   * The description of the delivery option.
   */
  description?: string | null;

  /**
   * The unique identifier of the delivery option.
   */
  handle?: string;

  /**
   * The title of the delivery option.
   */
  title?: string | null;

  /**
   * The type of delivery option.
   *
   * - `pickup`
   * - `pickupPoint`
   * - `shipping`
   * - `local`
   */
  type?: string;
}
The selected delivery options for the event.

### DeliveryOption

Represents a delivery option that the customer can choose from.

### cost

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option.

### costAfterDiscounts

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option after discounts have been applied.

### description

value: `string | null`

The description of the delivery option.

### handle

value: `string`

The unique identifier of the delivery option.

### title

value: `string | null`

The title of the delivery option.

### type

value: `string`

The type of delivery option.

- `pickup`
- `pickupPoint`
- `shipping`
- `local`

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### DiscountApplication

The information about the intent of the discount.

### allocationMethod

value: `string`

The method by which the discount's value is applied to its entitled items.

- `ACROSS`: The value is spread across all entitled lines.
- `EACH`: The value is applied onto every entitled line.

### targetSelection

value: `string`

How the discount amount is distributed on the discounted lines.

- `ALL`: The discount is allocated onto all the lines.
- `ENTITLED`: The discount is allocated onto only the lines that it's entitled for.
- `EXPLICIT`: The discount is allocated onto explicitly chosen lines.

### targetType

value: `string`

The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.

- `LINE_ITEM`: The discount applies onto line items.
- `SHIPPING_LINE`: The discount applies onto shipping lines.

### title

value: `string`

The customer-facing name of the discount. If the type of discount is a `DISCOUNT_CODE`, this `title` attribute represents the code of the discount.

### type

value: `string`

The type of the discount.

- `AUTOMATIC`: A discount automatically at checkout or in the cart without the need for a code.
- `DISCOUNT_CODE`: A discount applied onto checkouts through the use of a code.
- `MANUAL`: A discount that is applied to an order by a merchant or store owner manually, rather than being automatically applied by the system or through a script.
- `SCRIPT`: A discount applied to a customer's order using a script

### value

value: `MoneyV2 | PricingPercentageValue`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
  - PricingPercentageValue: export interface PricingPercentageValue {
  /**
   * The percentage value of the object.
   */
  percentage?: number;
}
The value of the discount. Fixed discounts return a `Money` Object, while Percentage discounts return a `PricingPercentageValue` object.

### PricingPercentageValue

A value given to a customer when a discount is applied to an order. The application of a discount with this value gives the customer the specified percentage off a specified item.

### percentage

value: `number`

The percentage value of the object.

### CheckoutLineItem

A single line item in the checkout, grouped by variant and attributes.

### discountAllocations

value: `DiscountAllocation[]`

  - DiscountAllocation: export interface DiscountAllocation {
  /**
   * The monetary value with currency allocated to the discount.
   */
  amount?: MoneyV2;

  /**
   * The information about the intent of the discount.
   */
  discountApplication?: DiscountApplication;
}
The discounts that have been applied to the checkout line item by a discount application.

### finalLinePrice

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The combined price of all of the items in the line item after line-level discounts have been applied. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### id

value: `string | null`

A globally unique identifier.

### properties

value: `Property[]`

  - Property: export interface Property {
  /**
   * The key for the property.
   */
  key?: string;

  /**
   * The value for the property.
   */
  value?: string;
}
The properties of the line item. A shop may add, or enable customers to add custom information to a line item. Line item properties consist of a key and value pair. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### quantity

value: `number`

The quantity of the line item.

### sellingPlanAllocation

value: `SellingPlanAllocation | null`

  - SellingPlanAllocation: export interface SellingPlanAllocation {
  /**
   * A representation of how products and variants can be sold and purchased.
   * For example, an individual selling plan could be '6 weeks of prepaid
   * granola, delivered weekly'.
   */
  sellingPlan?: SellingPlan;
}
  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
The selling plan associated with the line item and the effect that each selling plan has on variants when they're purchased. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### title

value: `string | null`

The title of the line item. Defaults to the product's title.

### variant

value: `ProductVariant | null`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
Product variant of the line item.

### DiscountAllocation

The discount that has been applied to the checkout line item.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the discount.

### discountApplication

value: `DiscountApplication`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
The information about the intent of the discount.

### Property

The line item additional custom properties.

### key

value: `string`

The key for the property.

### value

value: `string`

The value for the property.

### SellingPlanAllocation

Represents an association between a variant and a selling plan.

### sellingPlan

value: `SellingPlan`

  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'.

### SellingPlan

Represents how products and variants can be sold and purchased.

### id

value: `string`

A globally unique identifier.

### name

value: `string`

The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### Localization

Information about the active localized experience.

### country

value: `Country`

  - Country: export interface Country {
  /**
   * The ISO-3166-1 code for this country, for example, "US".
   */
  isoCode?: string | null;
}
The country of the active localized experience.

### language

value: `Language`

  - Language: export interface Language {
  /**
   * The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1
   * alpha-2 region code, for example, "en-US".
   */
  isoCode?: string;
}
The language of the active localized experience.

### market

value: `Market`

  - Market: export interface Market {
  /**
   * A human-readable, shop-scoped identifier.
   */
  handle?: string | null;

  /**
   * A globally unique identifier.
   */
  id?: string | null;
}
The market including the country of the active localized experience.

### Country

A country.

### isoCode

value: `string | null`

The ISO-3166-1 code for this country, for example, "US".

### Language

A language.

### isoCode

value: `string`

The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1 alpha-2 region code, for example, "en-US".

### Market

A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [this](https://shopify.dev/docs/apps/markets) conceptual overview.

### handle

value: `string | null`

A human-readable, shop-scoped identifier.

### id

value: `string | null`

A globally unique identifier.

### Order

An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process.

### customer

value: `OrderCustomer | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
  - OrderCustomer: export interface OrderCustomer {
  /**
   * The ID of the customer.
   */
  id?: string | null;

  /**
   * Indicates if the order is the customer’s first order. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  isFirstOrder?: boolean | null;
}
The customer that placed the order.

### id

value: `string | null`

The ID of the order. ID will be null for all events except checkout_completed.

### OrderCustomer

The customer that placed the order.

### id

value: `string | null`

The ID of the customer.

### isFirstOrder

value: `boolean | null`

Indicates if the order is the customer’s first order. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### ShippingRate

A shipping rate to be applied to a checkout.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
Price of this shipping rate.

### Transaction

A transaction associated with a checkout or order.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the transaction method.

### gateway

value: `string`

The name of the payment provider used for the transaction.

### paymentMethod

value: `TransactionPaymentMethod`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
  - TransactionPaymentMethod: export interface TransactionPaymentMethod {
  /**
   * The name of the payment method used for the transaction. This may further
   * specify the payment method used.
   */
  name?: string;

  /**
   * The type of payment method used for the transaction.
   *
   * - `creditCard`: A vaulted or manually entered credit card.
   * - `redeemable`: A redeemable payment method, such as a gift card or store
   * credit.
   * - `deferred`: A [deferred
   * payment](https://help.shopify.com/en/manual/orders/deferred-payments), such
   * as invoicing the buyer and collecting payment later.
   * - `local`: A [local payment
   * method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
   * - `manualPayment`: A manual payment method, such as an in-person retail
   * transaction.
   * - `paymentOnDelivery`: A payment that will be collected on delivery.
   * - `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay,
   * etc.
   * - `offsite`: A payment processed outside of Shopify's checkout, excluding
   * integrated wallets.
   * - `customOnSite`: A custom payment method that is processed through a
   * checkout extension with a payments app.
   * - `other`: Another type of payment not defined here.
   */
  type?: string;
}
The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### TransactionPaymentMethod

The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### name

value: `string`

The name of the payment method used for the transaction. This may further specify the payment method used.

### type

value: `string`

The type of payment method used for the transaction.

- `creditCard`: A vaulted or manually entered credit card.
- `redeemable`: A redeemable payment method, such as a gift card or store credit.
- `deferred`: A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment later.
- `local`: A [local payment method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
- `manualPayment`: A manual payment method, such as an in-person retail transaction.
- `paymentOnDelivery`: A payment that will be collected on delivery.
- `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay, etc.
- `offsite`: A payment processed outside of Shopify's checkout, excluding integrated wallets.
- `customOnSite`: A custom payment method that is processed through a checkout extension with a payments app.
- `other`: Another type of payment not defined here.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# checkout_contact_info_submitted

The `checkout_contact_info_submitted` event logs an instance where a customer submits a checkout form. This event is only available in checkouts where Checkout Extensibility for customizations is enabled

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('checkout_contact_info_submitted', (event) => {
    // Example for accessing event data
    const checkout = event.data.checkout;

    const email = checkout.email;
    const phone = checkout.phone;

    const payload = {
      event_name: event.name,
      event_data: {
        email: email,
        phone: phone,
      },
    };

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('checkout_contact_info_submitted', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;

  const email = checkout.email;
  const phone = checkout.phone;

  const payload = {
    event_name: event.name,
    event_data: {
      email: email,
      phone: phone,
    },
  };

  // Example for sending event data to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsCheckoutContactInfoSubmitted

The `checkout_contact_info_submitted` event logs an instance where a customer submits a checkout form. This event is only available in checkouts where Checkout Extensibility for customizations is enabled

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsCheckoutContactInfoSubmittedData`

  - PixelEventsCheckoutContactInfoSubmitted: export interface PixelEventsCheckoutContactInfoSubmitted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsCheckoutContactInfoSubmittedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsCheckoutContactInfoSubmittedData: export interface PixelEventsCheckoutContactInfoSubmittedData {
  checkout?: Checkout;
}
  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsCheckoutContactInfoSubmittedData

### checkout

value: `Checkout`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### Checkout

A container for all the information required to add items to checkout and pay.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
A list of attributes accumulated throughout the checkout process.

### billingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The billing address to where the order will be charged.

### buyerAcceptsEmailMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via email. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### buyerAcceptsSmsMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via SMS. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### currencyCode

value: `string | null`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### delivery

value: `Delivery | null`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
Represents the selected delivery options for a checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### discountApplications

value: `DiscountApplication[]`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
A list of discount applications.

### discountsAmount

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount of the discounts applied to the price of the checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### email

value: `string | null`

The email attached to this checkout.

### lineItems

value: `CheckoutLineItem[]`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}
  - CheckoutLineItem: export interface CheckoutLineItem {
  /**
   * The discounts that have been applied to the checkout line item by a
   * discount application.
   */
  discountAllocations?: DiscountAllocation[];

  /**
   * The combined price of all of the items in the line item
   * after line-level discounts have been applied. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  finalLinePrice?: MoneyV2;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * The properties of the line item. A shop may add, or enable customers to add
   * custom information to a line item. Line item properties consist of a key
   * and value pair. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  properties?: Property[];

  /**
   * The quantity of the line item.
   */
  quantity?: number;

  /**
   * The selling plan associated with the line item and the effect that
   * each selling plan has on variants when they're purchased. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  sellingPlanAllocation?: SellingPlanAllocation | null;

  /**
   * The title of the line item. Defaults to the product's title.
   */
  title?: string | null;

  /**
   * Product variant of the line item.
   */
  variant?: ProductVariant | null;
}
A list of line item objects, each one containing information about an item in the checkout.

### localization

value: `Localization`

  - Localization: export interface Localization {
  /**
   * The country of the active localized experience.
   */
  country?: Country;

  /**
   * The language of the active localized experience.
   */
  language?: Language;

  /**
   * The market including the country of the active localized experience.
   */
  market?: Market;
}
Information about the active localized experience. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### order

value: `Order | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
The resulting order from a paid checkout.

### phone

value: `string | null`

A unique phone number for the customer. Formatted using E.164 standard. For example, *+16135551111*.

### shippingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The shipping address to where the line items will be shipped.

### shippingLine

value: `ShippingRate | null`

  - ShippingRate: export interface ShippingRate {
  /**
   * Price of this shipping rate.
   */
  price?: MoneyV2;
}
Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object.

### smsMarketingPhone

value: `string | null`

The phone number provided by the buyer after opting in to SMS marketing. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### subtotalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The price at checkout before duties, shipping, and taxes.

### token

value: `string | null`

A unique identifier for a particular checkout.

### totalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the prices of all the items in the checkout, including duties, taxes, and discounts.

### totalTax

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the taxes applied to the line items and shipping lines in the checkout.

### transactions

value: `Transaction[]`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
A list of transactions associated with a checkout or order. Certain transactions, such as credit card transactions, may only be present in the checkout_completed event.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### MailingAddress

A mailing address for customers and shipping.

### address1

value: `string | null`

The first line of the address. This is usually the street address or a P.O. Box number.

### address2

value: `string | null`

The second line of the address. This is usually an apartment, suite, or unit number.

### city

value: `string | null`

The name of the city, district, village, or town.

### country

value: `string | null`

The name of the country.

### countryCode

value: `string | null`

The two-letter code that represents the country, for example, US. The country codes generally follows ISO 3166-1 alpha-2 guidelines.

### firstName

value: `string | null`

The customer’s first name.

### lastName

value: `string | null`

The customer’s last name.

### phone

value: `string | null`

The phone number for this mailing address as entered by the customer.

### province

value: `string | null`

The region of the address, such as the province, state, or district.

### provinceCode

value: `string | null`

The two-letter code for the region. For example, ON.

### zip

value: `string | null`

The ZIP or postal code of the address.

### Delivery

The delivery information for the event.

### selectedDeliveryOptions

value: `DeliveryOption[]`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
  - DeliveryOption: export interface DeliveryOption {
  /**
   * The cost of the delivery option.
   */
  cost?: MoneyV2 | null;

  /**
   * The cost of the delivery option after discounts have been applied.
   */
  costAfterDiscounts?: MoneyV2 | null;

  /**
   * The description of the delivery option.
   */
  description?: string | null;

  /**
   * The unique identifier of the delivery option.
   */
  handle?: string;

  /**
   * The title of the delivery option.
   */
  title?: string | null;

  /**
   * The type of delivery option.
   *
   * - `pickup`
   * - `pickupPoint`
   * - `shipping`
   * - `local`
   */
  type?: string;
}
The selected delivery options for the event.

### DeliveryOption

Represents a delivery option that the customer can choose from.

### cost

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option.

### costAfterDiscounts

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option after discounts have been applied.

### description

value: `string | null`

The description of the delivery option.

### handle

value: `string`

The unique identifier of the delivery option.

### title

value: `string | null`

The title of the delivery option.

### type

value: `string`

The type of delivery option.

- `pickup`
- `pickupPoint`
- `shipping`
- `local`

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### DiscountApplication

The information about the intent of the discount.

### allocationMethod

value: `string`

The method by which the discount's value is applied to its entitled items.

- `ACROSS`: The value is spread across all entitled lines.
- `EACH`: The value is applied onto every entitled line.

### targetSelection

value: `string`

How the discount amount is distributed on the discounted lines.

- `ALL`: The discount is allocated onto all the lines.
- `ENTITLED`: The discount is allocated onto only the lines that it's entitled for.
- `EXPLICIT`: The discount is allocated onto explicitly chosen lines.

### targetType

value: `string`

The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.

- `LINE_ITEM`: The discount applies onto line items.
- `SHIPPING_LINE`: The discount applies onto shipping lines.

### title

value: `string`

The customer-facing name of the discount. If the type of discount is a `DISCOUNT_CODE`, this `title` attribute represents the code of the discount.

### type

value: `string`

The type of the discount.

- `AUTOMATIC`: A discount automatically at checkout or in the cart without the need for a code.
- `DISCOUNT_CODE`: A discount applied onto checkouts through the use of a code.
- `MANUAL`: A discount that is applied to an order by a merchant or store owner manually, rather than being automatically applied by the system or through a script.
- `SCRIPT`: A discount applied to a customer's order using a script

### value

value: `MoneyV2 | PricingPercentageValue`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
  - PricingPercentageValue: export interface PricingPercentageValue {
  /**
   * The percentage value of the object.
   */
  percentage?: number;
}
The value of the discount. Fixed discounts return a `Money` Object, while Percentage discounts return a `PricingPercentageValue` object.

### PricingPercentageValue

A value given to a customer when a discount is applied to an order. The application of a discount with this value gives the customer the specified percentage off a specified item.

### percentage

value: `number`

The percentage value of the object.

### CheckoutLineItem

A single line item in the checkout, grouped by variant and attributes.

### discountAllocations

value: `DiscountAllocation[]`

  - DiscountAllocation: export interface DiscountAllocation {
  /**
   * The monetary value with currency allocated to the discount.
   */
  amount?: MoneyV2;

  /**
   * The information about the intent of the discount.
   */
  discountApplication?: DiscountApplication;
}
The discounts that have been applied to the checkout line item by a discount application.

### finalLinePrice

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The combined price of all of the items in the line item after line-level discounts have been applied. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### id

value: `string | null`

A globally unique identifier.

### properties

value: `Property[]`

  - Property: export interface Property {
  /**
   * The key for the property.
   */
  key?: string;

  /**
   * The value for the property.
   */
  value?: string;
}
The properties of the line item. A shop may add, or enable customers to add custom information to a line item. Line item properties consist of a key and value pair. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### quantity

value: `number`

The quantity of the line item.

### sellingPlanAllocation

value: `SellingPlanAllocation | null`

  - SellingPlanAllocation: export interface SellingPlanAllocation {
  /**
   * A representation of how products and variants can be sold and purchased.
   * For example, an individual selling plan could be '6 weeks of prepaid
   * granola, delivered weekly'.
   */
  sellingPlan?: SellingPlan;
}
  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
The selling plan associated with the line item and the effect that each selling plan has on variants when they're purchased. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### title

value: `string | null`

The title of the line item. Defaults to the product's title.

### variant

value: `ProductVariant | null`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
Product variant of the line item.

### DiscountAllocation

The discount that has been applied to the checkout line item.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the discount.

### discountApplication

value: `DiscountApplication`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
The information about the intent of the discount.

### Property

The line item additional custom properties.

### key

value: `string`

The key for the property.

### value

value: `string`

The value for the property.

### SellingPlanAllocation

Represents an association between a variant and a selling plan.

### sellingPlan

value: `SellingPlan`

  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'.

### SellingPlan

Represents how products and variants can be sold and purchased.

### id

value: `string`

A globally unique identifier.

### name

value: `string`

The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### Localization

Information about the active localized experience.

### country

value: `Country`

  - Country: export interface Country {
  /**
   * The ISO-3166-1 code for this country, for example, "US".
   */
  isoCode?: string | null;
}
The country of the active localized experience.

### language

value: `Language`

  - Language: export interface Language {
  /**
   * The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1
   * alpha-2 region code, for example, "en-US".
   */
  isoCode?: string;
}
The language of the active localized experience.

### market

value: `Market`

  - Market: export interface Market {
  /**
   * A human-readable, shop-scoped identifier.
   */
  handle?: string | null;

  /**
   * A globally unique identifier.
   */
  id?: string | null;
}
The market including the country of the active localized experience.

### Country

A country.

### isoCode

value: `string | null`

The ISO-3166-1 code for this country, for example, "US".

### Language

A language.

### isoCode

value: `string`

The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1 alpha-2 region code, for example, "en-US".

### Market

A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [this](https://shopify.dev/docs/apps/markets) conceptual overview.

### handle

value: `string | null`

A human-readable, shop-scoped identifier.

### id

value: `string | null`

A globally unique identifier.

### Order

An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process.

### customer

value: `OrderCustomer | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
  - OrderCustomer: export interface OrderCustomer {
  /**
   * The ID of the customer.
   */
  id?: string | null;

  /**
   * Indicates if the order is the customer’s first order. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  isFirstOrder?: boolean | null;
}
The customer that placed the order.

### id

value: `string | null`

The ID of the order. ID will be null for all events except checkout_completed.

### OrderCustomer

The customer that placed the order.

### id

value: `string | null`

The ID of the customer.

### isFirstOrder

value: `boolean | null`

Indicates if the order is the customer’s first order. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### ShippingRate

A shipping rate to be applied to a checkout.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
Price of this shipping rate.

### Transaction

A transaction associated with a checkout or order.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the transaction method.

### gateway

value: `string`

The name of the payment provider used for the transaction.

### paymentMethod

value: `TransactionPaymentMethod`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
  - TransactionPaymentMethod: export interface TransactionPaymentMethod {
  /**
   * The name of the payment method used for the transaction. This may further
   * specify the payment method used.
   */
  name?: string;

  /**
   * The type of payment method used for the transaction.
   *
   * - `creditCard`: A vaulted or manually entered credit card.
   * - `redeemable`: A redeemable payment method, such as a gift card or store
   * credit.
   * - `deferred`: A [deferred
   * payment](https://help.shopify.com/en/manual/orders/deferred-payments), such
   * as invoicing the buyer and collecting payment later.
   * - `local`: A [local payment
   * method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
   * - `manualPayment`: A manual payment method, such as an in-person retail
   * transaction.
   * - `paymentOnDelivery`: A payment that will be collected on delivery.
   * - `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay,
   * etc.
   * - `offsite`: A payment processed outside of Shopify's checkout, excluding
   * integrated wallets.
   * - `customOnSite`: A custom payment method that is processed through a
   * checkout extension with a payments app.
   * - `other`: Another type of payment not defined here.
   */
  type?: string;
}
The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### TransactionPaymentMethod

The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### name

value: `string`

The name of the payment method used for the transaction. This may further specify the payment method used.

### type

value: `string`

The type of payment method used for the transaction.

- `creditCard`: A vaulted or manually entered credit card.
- `redeemable`: A redeemable payment method, such as a gift card or store credit.
- `deferred`: A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment later.
- `local`: A [local payment method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
- `manualPayment`: A manual payment method, such as an in-person retail transaction.
- `paymentOnDelivery`: A payment that will be collected on delivery.
- `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay, etc.
- `offsite`: A payment processed outside of Shopify's checkout, excluding integrated wallets.
- `customOnSite`: A custom payment method that is processed through a checkout extension with a payments app.
- `other`: Another type of payment not defined here.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# checkout_shipping_info_submitted

The `checkout_shipping_info_submitted` event logs an instance where the customer chooses a shipping rate. This event is only available in checkouts where Checkout Extensibility for customizations is enabled

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('checkout_shipping_info_submitted', (event) => {
    // Example for accessing event data
    const checkout = event.data.checkout;
    const shippingLine = checkout.shippingLine;

    const price = shippingLine.price.amount;
    const currency = shippingLine.price.currencyCode;

    const payload = {
      event_name: event.name,
      event_data: {
        price: price,
        currency: currency,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('checkout_shipping_info_submitted', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;
  const shippingLine = checkout.shippingLine;

  const price = shippingLine.price.amount;
  const currency = shippingLine.price.currencyCode;

  const payload = {
    event_name: event.name,
    event_data: {
      price: price,
      currency: currency,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsCheckoutShippingInfoSubmitted

The `checkout_shipping_info_submitted` event logs an instance where the customer chooses a shipping rate. This event is only available in checkouts where Checkout Extensibility for customizations is enabled

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsCheckoutShippingInfoSubmittedData`

  - PixelEventsCheckoutShippingInfoSubmitted: export interface PixelEventsCheckoutShippingInfoSubmitted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsCheckoutShippingInfoSubmittedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsCheckoutShippingInfoSubmittedData: export interface PixelEventsCheckoutShippingInfoSubmittedData {
  checkout?: Checkout;
}
  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsCheckoutShippingInfoSubmittedData

### checkout

value: `Checkout`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### Checkout

A container for all the information required to add items to checkout and pay.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
A list of attributes accumulated throughout the checkout process.

### billingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The billing address to where the order will be charged.

### buyerAcceptsEmailMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via email. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### buyerAcceptsSmsMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via SMS. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### currencyCode

value: `string | null`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### delivery

value: `Delivery | null`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
Represents the selected delivery options for a checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### discountApplications

value: `DiscountApplication[]`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
A list of discount applications.

### discountsAmount

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount of the discounts applied to the price of the checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### email

value: `string | null`

The email attached to this checkout.

### lineItems

value: `CheckoutLineItem[]`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}
  - CheckoutLineItem: export interface CheckoutLineItem {
  /**
   * The discounts that have been applied to the checkout line item by a
   * discount application.
   */
  discountAllocations?: DiscountAllocation[];

  /**
   * The combined price of all of the items in the line item
   * after line-level discounts have been applied. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  finalLinePrice?: MoneyV2;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * The properties of the line item. A shop may add, or enable customers to add
   * custom information to a line item. Line item properties consist of a key
   * and value pair. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  properties?: Property[];

  /**
   * The quantity of the line item.
   */
  quantity?: number;

  /**
   * The selling plan associated with the line item and the effect that
   * each selling plan has on variants when they're purchased. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  sellingPlanAllocation?: SellingPlanAllocation | null;

  /**
   * The title of the line item. Defaults to the product's title.
   */
  title?: string | null;

  /**
   * Product variant of the line item.
   */
  variant?: ProductVariant | null;
}
A list of line item objects, each one containing information about an item in the checkout.

### localization

value: `Localization`

  - Localization: export interface Localization {
  /**
   * The country of the active localized experience.
   */
  country?: Country;

  /**
   * The language of the active localized experience.
   */
  language?: Language;

  /**
   * The market including the country of the active localized experience.
   */
  market?: Market;
}
Information about the active localized experience. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### order

value: `Order | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
The resulting order from a paid checkout.

### phone

value: `string | null`

A unique phone number for the customer. Formatted using E.164 standard. For example, *+16135551111*.

### shippingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The shipping address to where the line items will be shipped.

### shippingLine

value: `ShippingRate | null`

  - ShippingRate: export interface ShippingRate {
  /**
   * Price of this shipping rate.
   */
  price?: MoneyV2;
}
Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object.

### smsMarketingPhone

value: `string | null`

The phone number provided by the buyer after opting in to SMS marketing. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### subtotalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The price at checkout before duties, shipping, and taxes.

### token

value: `string | null`

A unique identifier for a particular checkout.

### totalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the prices of all the items in the checkout, including duties, taxes, and discounts.

### totalTax

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the taxes applied to the line items and shipping lines in the checkout.

### transactions

value: `Transaction[]`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
A list of transactions associated with a checkout or order. Certain transactions, such as credit card transactions, may only be present in the checkout_completed event.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### MailingAddress

A mailing address for customers and shipping.

### address1

value: `string | null`

The first line of the address. This is usually the street address or a P.O. Box number.

### address2

value: `string | null`

The second line of the address. This is usually an apartment, suite, or unit number.

### city

value: `string | null`

The name of the city, district, village, or town.

### country

value: `string | null`

The name of the country.

### countryCode

value: `string | null`

The two-letter code that represents the country, for example, US. The country codes generally follows ISO 3166-1 alpha-2 guidelines.

### firstName

value: `string | null`

The customer’s first name.

### lastName

value: `string | null`

The customer’s last name.

### phone

value: `string | null`

The phone number for this mailing address as entered by the customer.

### province

value: `string | null`

The region of the address, such as the province, state, or district.

### provinceCode

value: `string | null`

The two-letter code for the region. For example, ON.

### zip

value: `string | null`

The ZIP or postal code of the address.

### Delivery

The delivery information for the event.

### selectedDeliveryOptions

value: `DeliveryOption[]`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
  - DeliveryOption: export interface DeliveryOption {
  /**
   * The cost of the delivery option.
   */
  cost?: MoneyV2 | null;

  /**
   * The cost of the delivery option after discounts have been applied.
   */
  costAfterDiscounts?: MoneyV2 | null;

  /**
   * The description of the delivery option.
   */
  description?: string | null;

  /**
   * The unique identifier of the delivery option.
   */
  handle?: string;

  /**
   * The title of the delivery option.
   */
  title?: string | null;

  /**
   * The type of delivery option.
   *
   * - `pickup`
   * - `pickupPoint`
   * - `shipping`
   * - `local`
   */
  type?: string;
}
The selected delivery options for the event.

### DeliveryOption

Represents a delivery option that the customer can choose from.

### cost

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option.

### costAfterDiscounts

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option after discounts have been applied.

### description

value: `string | null`

The description of the delivery option.

### handle

value: `string`

The unique identifier of the delivery option.

### title

value: `string | null`

The title of the delivery option.

### type

value: `string`

The type of delivery option.

- `pickup`
- `pickupPoint`
- `shipping`
- `local`

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### DiscountApplication

The information about the intent of the discount.

### allocationMethod

value: `string`

The method by which the discount's value is applied to its entitled items.

- `ACROSS`: The value is spread across all entitled lines.
- `EACH`: The value is applied onto every entitled line.

### targetSelection

value: `string`

How the discount amount is distributed on the discounted lines.

- `ALL`: The discount is allocated onto all the lines.
- `ENTITLED`: The discount is allocated onto only the lines that it's entitled for.
- `EXPLICIT`: The discount is allocated onto explicitly chosen lines.

### targetType

value: `string`

The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.

- `LINE_ITEM`: The discount applies onto line items.
- `SHIPPING_LINE`: The discount applies onto shipping lines.

### title

value: `string`

The customer-facing name of the discount. If the type of discount is a `DISCOUNT_CODE`, this `title` attribute represents the code of the discount.

### type

value: `string`

The type of the discount.

- `AUTOMATIC`: A discount automatically at checkout or in the cart without the need for a code.
- `DISCOUNT_CODE`: A discount applied onto checkouts through the use of a code.
- `MANUAL`: A discount that is applied to an order by a merchant or store owner manually, rather than being automatically applied by the system or through a script.
- `SCRIPT`: A discount applied to a customer's order using a script

### value

value: `MoneyV2 | PricingPercentageValue`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
  - PricingPercentageValue: export interface PricingPercentageValue {
  /**
   * The percentage value of the object.
   */
  percentage?: number;
}
The value of the discount. Fixed discounts return a `Money` Object, while Percentage discounts return a `PricingPercentageValue` object.

### PricingPercentageValue

A value given to a customer when a discount is applied to an order. The application of a discount with this value gives the customer the specified percentage off a specified item.

### percentage

value: `number`

The percentage value of the object.

### CheckoutLineItem

A single line item in the checkout, grouped by variant and attributes.

### discountAllocations

value: `DiscountAllocation[]`

  - DiscountAllocation: export interface DiscountAllocation {
  /**
   * The monetary value with currency allocated to the discount.
   */
  amount?: MoneyV2;

  /**
   * The information about the intent of the discount.
   */
  discountApplication?: DiscountApplication;
}
The discounts that have been applied to the checkout line item by a discount application.

### finalLinePrice

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The combined price of all of the items in the line item after line-level discounts have been applied. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### id

value: `string | null`

A globally unique identifier.

### properties

value: `Property[]`

  - Property: export interface Property {
  /**
   * The key for the property.
   */
  key?: string;

  /**
   * The value for the property.
   */
  value?: string;
}
The properties of the line item. A shop may add, or enable customers to add custom information to a line item. Line item properties consist of a key and value pair. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### quantity

value: `number`

The quantity of the line item.

### sellingPlanAllocation

value: `SellingPlanAllocation | null`

  - SellingPlanAllocation: export interface SellingPlanAllocation {
  /**
   * A representation of how products and variants can be sold and purchased.
   * For example, an individual selling plan could be '6 weeks of prepaid
   * granola, delivered weekly'.
   */
  sellingPlan?: SellingPlan;
}
  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
The selling plan associated with the line item and the effect that each selling plan has on variants when they're purchased. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### title

value: `string | null`

The title of the line item. Defaults to the product's title.

### variant

value: `ProductVariant | null`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
Product variant of the line item.

### DiscountAllocation

The discount that has been applied to the checkout line item.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the discount.

### discountApplication

value: `DiscountApplication`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
The information about the intent of the discount.

### Property

The line item additional custom properties.

### key

value: `string`

The key for the property.

### value

value: `string`

The value for the property.

### SellingPlanAllocation

Represents an association between a variant and a selling plan.

### sellingPlan

value: `SellingPlan`

  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'.

### SellingPlan

Represents how products and variants can be sold and purchased.

### id

value: `string`

A globally unique identifier.

### name

value: `string`

The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### Localization

Information about the active localized experience.

### country

value: `Country`

  - Country: export interface Country {
  /**
   * The ISO-3166-1 code for this country, for example, "US".
   */
  isoCode?: string | null;
}
The country of the active localized experience.

### language

value: `Language`

  - Language: export interface Language {
  /**
   * The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1
   * alpha-2 region code, for example, "en-US".
   */
  isoCode?: string;
}
The language of the active localized experience.

### market

value: `Market`

  - Market: export interface Market {
  /**
   * A human-readable, shop-scoped identifier.
   */
  handle?: string | null;

  /**
   * A globally unique identifier.
   */
  id?: string | null;
}
The market including the country of the active localized experience.

### Country

A country.

### isoCode

value: `string | null`

The ISO-3166-1 code for this country, for example, "US".

### Language

A language.

### isoCode

value: `string`

The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1 alpha-2 region code, for example, "en-US".

### Market

A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [this](https://shopify.dev/docs/apps/markets) conceptual overview.

### handle

value: `string | null`

A human-readable, shop-scoped identifier.

### id

value: `string | null`

A globally unique identifier.

### Order

An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process.

### customer

value: `OrderCustomer | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
  - OrderCustomer: export interface OrderCustomer {
  /**
   * The ID of the customer.
   */
  id?: string | null;

  /**
   * Indicates if the order is the customer’s first order. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  isFirstOrder?: boolean | null;
}
The customer that placed the order.

### id

value: `string | null`

The ID of the order. ID will be null for all events except checkout_completed.

### OrderCustomer

The customer that placed the order.

### id

value: `string | null`

The ID of the customer.

### isFirstOrder

value: `boolean | null`

Indicates if the order is the customer’s first order. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### ShippingRate

A shipping rate to be applied to a checkout.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
Price of this shipping rate.

### Transaction

A transaction associated with a checkout or order.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the transaction method.

### gateway

value: `string`

The name of the payment provider used for the transaction.

### paymentMethod

value: `TransactionPaymentMethod`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
  - TransactionPaymentMethod: export interface TransactionPaymentMethod {
  /**
   * The name of the payment method used for the transaction. This may further
   * specify the payment method used.
   */
  name?: string;

  /**
   * The type of payment method used for the transaction.
   *
   * - `creditCard`: A vaulted or manually entered credit card.
   * - `redeemable`: A redeemable payment method, such as a gift card or store
   * credit.
   * - `deferred`: A [deferred
   * payment](https://help.shopify.com/en/manual/orders/deferred-payments), such
   * as invoicing the buyer and collecting payment later.
   * - `local`: A [local payment
   * method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
   * - `manualPayment`: A manual payment method, such as an in-person retail
   * transaction.
   * - `paymentOnDelivery`: A payment that will be collected on delivery.
   * - `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay,
   * etc.
   * - `offsite`: A payment processed outside of Shopify's checkout, excluding
   * integrated wallets.
   * - `customOnSite`: A custom payment method that is processed through a
   * checkout extension with a payments app.
   * - `other`: Another type of payment not defined here.
   */
  type?: string;
}
The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### TransactionPaymentMethod

The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### name

value: `string`

The name of the payment method used for the transaction. This may further specify the payment method used.

### type

value: `string`

The type of payment method used for the transaction.

- `creditCard`: A vaulted or manually entered credit card.
- `redeemable`: A redeemable payment method, such as a gift card or store credit.
- `deferred`: A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment later.
- `local`: A [local payment method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
- `manualPayment`: A manual payment method, such as an in-person retail transaction.
- `paymentOnDelivery`: A payment that will be collected on delivery.
- `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay, etc.
- `offsite`: A payment processed outside of Shopify's checkout, excluding integrated wallets.
- `customOnSite`: A custom payment method that is processed through a checkout extension with a payments app.
- `other`: Another type of payment not defined here.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# checkout_started

The `checkout_started` event logs an instance of a customer starting the checkout process. This event is available on the checkout page. For Checkout Extensibility, this event is triggered every time a customer enters checkout. For non-checkout extensible shops, this event is only triggered the first time a customer enters checkout.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('checkout_started', (event) => {
    // Example for accessing event data
    const checkout = event.data.checkout;

    const checkoutTotalPrice = checkout.totalPrice?.amount;

    const allDiscountCodes = checkout.discountApplications.map((discount) => {
      if (discount.type === 'DISCOUNT_CODE') {
        return discount.title;
      }
    });

    const firstItem = checkout.lineItems[0];

    const firstItemDiscountedValue = firstItem.discountAllocations[0]?.amount;

    const customItemPayload = {
      quantity: firstItem.quantity,
      title: firstItem.title,
      discount: firstItemDiscountedValue,
    };

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        discountCodesUsed: allDiscountCodes,
        firstItem: customItemPayload,
      },
    };

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('checkout_started', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;

  const checkoutTotalPrice = checkout.totalPrice?.amount;

  const allDiscountCodes = checkout.discountApplications.map((discount) => {
    if (discount.type === 'DISCOUNT_CODE') {
      return discount.title;
    }
  });

  const firstItem = checkout.lineItems[0];

  const firstItemDiscountedValue = firstItem.discountAllocations[0]?.amount;

  const customItemPayload = {
    quantity: firstItem.quantity,
    title: firstItem.title,
    discount: firstItemDiscountedValue,
  };

  const payload = {
    event_name: event.name,
    event_data: {
      totalPrice: checkoutTotalPrice,
      discountCodesUsed: allDiscountCodes,
      firstItem: customItemPayload,
    },
  };

  // Example for sending event data to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsCheckoutStarted

The `checkout_started` event logs an instance of a customer starting the checkout process. This event is available on the checkout page. For Checkout Extensibility, this event is triggered every time a customer enters checkout. For non-checkout extensible shops, this event is only triggered the first time a customer enters checkout.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsCheckoutStartedData`

  - PixelEventsCheckoutStarted: export interface PixelEventsCheckoutStarted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsCheckoutStartedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsCheckoutStartedData: export interface PixelEventsCheckoutStartedData {
  checkout?: Checkout;
}
  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsCheckoutStartedData

### checkout

value: `Checkout`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### Checkout

A container for all the information required to add items to checkout and pay.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
A list of attributes accumulated throughout the checkout process.

### billingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The billing address to where the order will be charged.

### buyerAcceptsEmailMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via email. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### buyerAcceptsSmsMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via SMS. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### currencyCode

value: `string | null`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### delivery

value: `Delivery | null`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
Represents the selected delivery options for a checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### discountApplications

value: `DiscountApplication[]`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
A list of discount applications.

### discountsAmount

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount of the discounts applied to the price of the checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### email

value: `string | null`

The email attached to this checkout.

### lineItems

value: `CheckoutLineItem[]`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}
  - CheckoutLineItem: export interface CheckoutLineItem {
  /**
   * The discounts that have been applied to the checkout line item by a
   * discount application.
   */
  discountAllocations?: DiscountAllocation[];

  /**
   * The combined price of all of the items in the line item
   * after line-level discounts have been applied. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  finalLinePrice?: MoneyV2;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * The properties of the line item. A shop may add, or enable customers to add
   * custom information to a line item. Line item properties consist of a key
   * and value pair. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  properties?: Property[];

  /**
   * The quantity of the line item.
   */
  quantity?: number;

  /**
   * The selling plan associated with the line item and the effect that
   * each selling plan has on variants when they're purchased. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  sellingPlanAllocation?: SellingPlanAllocation | null;

  /**
   * The title of the line item. Defaults to the product's title.
   */
  title?: string | null;

  /**
   * Product variant of the line item.
   */
  variant?: ProductVariant | null;
}
A list of line item objects, each one containing information about an item in the checkout.

### localization

value: `Localization`

  - Localization: export interface Localization {
  /**
   * The country of the active localized experience.
   */
  country?: Country;

  /**
   * The language of the active localized experience.
   */
  language?: Language;

  /**
   * The market including the country of the active localized experience.
   */
  market?: Market;
}
Information about the active localized experience. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### order

value: `Order | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
The resulting order from a paid checkout.

### phone

value: `string | null`

A unique phone number for the customer. Formatted using E.164 standard. For example, *+16135551111*.

### shippingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The shipping address to where the line items will be shipped.

### shippingLine

value: `ShippingRate | null`

  - ShippingRate: export interface ShippingRate {
  /**
   * Price of this shipping rate.
   */
  price?: MoneyV2;
}
Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object.

### smsMarketingPhone

value: `string | null`

The phone number provided by the buyer after opting in to SMS marketing. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### subtotalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The price at checkout before duties, shipping, and taxes.

### token

value: `string | null`

A unique identifier for a particular checkout.

### totalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the prices of all the items in the checkout, including duties, taxes, and discounts.

### totalTax

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the taxes applied to the line items and shipping lines in the checkout.

### transactions

value: `Transaction[]`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
A list of transactions associated with a checkout or order. Certain transactions, such as credit card transactions, may only be present in the checkout_completed event.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### MailingAddress

A mailing address for customers and shipping.

### address1

value: `string | null`

The first line of the address. This is usually the street address or a P.O. Box number.

### address2

value: `string | null`

The second line of the address. This is usually an apartment, suite, or unit number.

### city

value: `string | null`

The name of the city, district, village, or town.

### country

value: `string | null`

The name of the country.

### countryCode

value: `string | null`

The two-letter code that represents the country, for example, US. The country codes generally follows ISO 3166-1 alpha-2 guidelines.

### firstName

value: `string | null`

The customer’s first name.

### lastName

value: `string | null`

The customer’s last name.

### phone

value: `string | null`

The phone number for this mailing address as entered by the customer.

### province

value: `string | null`

The region of the address, such as the province, state, or district.

### provinceCode

value: `string | null`

The two-letter code for the region. For example, ON.

### zip

value: `string | null`

The ZIP or postal code of the address.

### Delivery

The delivery information for the event.

### selectedDeliveryOptions

value: `DeliveryOption[]`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
  - DeliveryOption: export interface DeliveryOption {
  /**
   * The cost of the delivery option.
   */
  cost?: MoneyV2 | null;

  /**
   * The cost of the delivery option after discounts have been applied.
   */
  costAfterDiscounts?: MoneyV2 | null;

  /**
   * The description of the delivery option.
   */
  description?: string | null;

  /**
   * The unique identifier of the delivery option.
   */
  handle?: string;

  /**
   * The title of the delivery option.
   */
  title?: string | null;

  /**
   * The type of delivery option.
   *
   * - `pickup`
   * - `pickupPoint`
   * - `shipping`
   * - `local`
   */
  type?: string;
}
The selected delivery options for the event.

### DeliveryOption

Represents a delivery option that the customer can choose from.

### cost

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option.

### costAfterDiscounts

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option after discounts have been applied.

### description

value: `string | null`

The description of the delivery option.

### handle

value: `string`

The unique identifier of the delivery option.

### title

value: `string | null`

The title of the delivery option.

### type

value: `string`

The type of delivery option.

- `pickup`
- `pickupPoint`
- `shipping`
- `local`

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### DiscountApplication

The information about the intent of the discount.

### allocationMethod

value: `string`

The method by which the discount's value is applied to its entitled items.

- `ACROSS`: The value is spread across all entitled lines.
- `EACH`: The value is applied onto every entitled line.

### targetSelection

value: `string`

How the discount amount is distributed on the discounted lines.

- `ALL`: The discount is allocated onto all the lines.
- `ENTITLED`: The discount is allocated onto only the lines that it's entitled for.
- `EXPLICIT`: The discount is allocated onto explicitly chosen lines.

### targetType

value: `string`

The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.

- `LINE_ITEM`: The discount applies onto line items.
- `SHIPPING_LINE`: The discount applies onto shipping lines.

### title

value: `string`

The customer-facing name of the discount. If the type of discount is a `DISCOUNT_CODE`, this `title` attribute represents the code of the discount.

### type

value: `string`

The type of the discount.

- `AUTOMATIC`: A discount automatically at checkout or in the cart without the need for a code.
- `DISCOUNT_CODE`: A discount applied onto checkouts through the use of a code.
- `MANUAL`: A discount that is applied to an order by a merchant or store owner manually, rather than being automatically applied by the system or through a script.
- `SCRIPT`: A discount applied to a customer's order using a script

### value

value: `MoneyV2 | PricingPercentageValue`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
  - PricingPercentageValue: export interface PricingPercentageValue {
  /**
   * The percentage value of the object.
   */
  percentage?: number;
}
The value of the discount. Fixed discounts return a `Money` Object, while Percentage discounts return a `PricingPercentageValue` object.

### PricingPercentageValue

A value given to a customer when a discount is applied to an order. The application of a discount with this value gives the customer the specified percentage off a specified item.

### percentage

value: `number`

The percentage value of the object.

### CheckoutLineItem

A single line item in the checkout, grouped by variant and attributes.

### discountAllocations

value: `DiscountAllocation[]`

  - DiscountAllocation: export interface DiscountAllocation {
  /**
   * The monetary value with currency allocated to the discount.
   */
  amount?: MoneyV2;

  /**
   * The information about the intent of the discount.
   */
  discountApplication?: DiscountApplication;
}
The discounts that have been applied to the checkout line item by a discount application.

### finalLinePrice

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The combined price of all of the items in the line item after line-level discounts have been applied. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### id

value: `string | null`

A globally unique identifier.

### properties

value: `Property[]`

  - Property: export interface Property {
  /**
   * The key for the property.
   */
  key?: string;

  /**
   * The value for the property.
   */
  value?: string;
}
The properties of the line item. A shop may add, or enable customers to add custom information to a line item. Line item properties consist of a key and value pair. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### quantity

value: `number`

The quantity of the line item.

### sellingPlanAllocation

value: `SellingPlanAllocation | null`

  - SellingPlanAllocation: export interface SellingPlanAllocation {
  /**
   * A representation of how products and variants can be sold and purchased.
   * For example, an individual selling plan could be '6 weeks of prepaid
   * granola, delivered weekly'.
   */
  sellingPlan?: SellingPlan;
}
  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
The selling plan associated with the line item and the effect that each selling plan has on variants when they're purchased. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### title

value: `string | null`

The title of the line item. Defaults to the product's title.

### variant

value: `ProductVariant | null`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
Product variant of the line item.

### DiscountAllocation

The discount that has been applied to the checkout line item.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the discount.

### discountApplication

value: `DiscountApplication`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
The information about the intent of the discount.

### Property

The line item additional custom properties.

### key

value: `string`

The key for the property.

### value

value: `string`

The value for the property.

### SellingPlanAllocation

Represents an association between a variant and a selling plan.

### sellingPlan

value: `SellingPlan`

  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'.

### SellingPlan

Represents how products and variants can be sold and purchased.

### id

value: `string`

A globally unique identifier.

### name

value: `string`

The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### Localization

Information about the active localized experience.

### country

value: `Country`

  - Country: export interface Country {
  /**
   * The ISO-3166-1 code for this country, for example, "US".
   */
  isoCode?: string | null;
}
The country of the active localized experience.

### language

value: `Language`

  - Language: export interface Language {
  /**
   * The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1
   * alpha-2 region code, for example, "en-US".
   */
  isoCode?: string;
}
The language of the active localized experience.

### market

value: `Market`

  - Market: export interface Market {
  /**
   * A human-readable, shop-scoped identifier.
   */
  handle?: string | null;

  /**
   * A globally unique identifier.
   */
  id?: string | null;
}
The market including the country of the active localized experience.

### Country

A country.

### isoCode

value: `string | null`

The ISO-3166-1 code for this country, for example, "US".

### Language

A language.

### isoCode

value: `string`

The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1 alpha-2 region code, for example, "en-US".

### Market

A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [this](https://shopify.dev/docs/apps/markets) conceptual overview.

### handle

value: `string | null`

A human-readable, shop-scoped identifier.

### id

value: `string | null`

A globally unique identifier.

### Order

An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process.

### customer

value: `OrderCustomer | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
  - OrderCustomer: export interface OrderCustomer {
  /**
   * The ID of the customer.
   */
  id?: string | null;

  /**
   * Indicates if the order is the customer’s first order. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  isFirstOrder?: boolean | null;
}
The customer that placed the order.

### id

value: `string | null`

The ID of the order. ID will be null for all events except checkout_completed.

### OrderCustomer

The customer that placed the order.

### id

value: `string | null`

The ID of the customer.

### isFirstOrder

value: `boolean | null`

Indicates if the order is the customer’s first order. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### ShippingRate

A shipping rate to be applied to a checkout.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
Price of this shipping rate.

### Transaction

A transaction associated with a checkout or order.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the transaction method.

### gateway

value: `string`

The name of the payment provider used for the transaction.

### paymentMethod

value: `TransactionPaymentMethod`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
  - TransactionPaymentMethod: export interface TransactionPaymentMethod {
  /**
   * The name of the payment method used for the transaction. This may further
   * specify the payment method used.
   */
  name?: string;

  /**
   * The type of payment method used for the transaction.
   *
   * - `creditCard`: A vaulted or manually entered credit card.
   * - `redeemable`: A redeemable payment method, such as a gift card or store
   * credit.
   * - `deferred`: A [deferred
   * payment](https://help.shopify.com/en/manual/orders/deferred-payments), such
   * as invoicing the buyer and collecting payment later.
   * - `local`: A [local payment
   * method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
   * - `manualPayment`: A manual payment method, such as an in-person retail
   * transaction.
   * - `paymentOnDelivery`: A payment that will be collected on delivery.
   * - `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay,
   * etc.
   * - `offsite`: A payment processed outside of Shopify's checkout, excluding
   * integrated wallets.
   * - `customOnSite`: A custom payment method that is processed through a
   * checkout extension with a payments app.
   * - `other`: Another type of payment not defined here.
   */
  type?: string;
}
The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### TransactionPaymentMethod

The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### name

value: `string`

The name of the payment method used for the transaction. This may further specify the payment method used.

### type

value: `string`

The type of payment method used for the transaction.

- `creditCard`: A vaulted or manually entered credit card.
- `redeemable`: A redeemable payment method, such as a gift card or store credit.
- `deferred`: A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment later.
- `local`: A [local payment method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
- `manualPayment`: A manual payment method, such as an in-person retail transaction.
- `paymentOnDelivery`: A payment that will be collected on delivery.
- `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay, etc.
- `offsite`: A payment processed outside of Shopify's checkout, excluding integrated wallets.
- `customOnSite`: A custom payment method that is processed through a checkout extension with a payments app.
- `other`: Another type of payment not defined here.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# collection_viewed

The `collection_viewed` event logs an instance where a customer visited a product collection index page. This event is available on the online store page.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('collection_viewed', (event) => {
    // Example for accessing event data
    const collection = event.data.collection;

    const collectionTitle = collection.title;

    const priceOfFirstProductInCollection =
      collection.productVariants[0]?.price.amount;

    const payload = {
      event_name: event.name,
      event_data: {
        collectionTitle: collectionTitle,
        priceFirstItem: priceOfFirstProductInCollection,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('collection_viewed', (event) => {
  // Example for accessing event data
  const collection = event.data.collection;

  const collectionTitle = collection.title;

  const priceOfFirstProductInCollection =
    collection.productVariants[0]?.price.amount;

  const payload = {
    event_name: event.name,
    event_data: {
      collectionTitle: collectionTitle,
      priceFirstItem: priceOfFirstProductInCollection,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsCollectionViewed

The `collection_viewed` event logs an instance where a customer visited a product collection index page. This event is available on the online store page

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsCollectionViewedData`

  - PixelEventsCollectionViewed: export interface PixelEventsCollectionViewed {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsCollectionViewedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsCollectionViewedData: export interface PixelEventsCollectionViewedData {
  collection?: Collection;
}
  - Collection: export interface Collection {
  /**
   * A globally unique identifier.
   */
  id?: string;
  productVariants?: ProductVariant[];

  /**
   * The collection’s name. Maximum length: 255 characters.
   */
  title?: string;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsCollectionViewedData

### collection

value: `Collection`

  - Collection: export interface Collection {
  /**
   * A globally unique identifier.
   */
  id?: string;
  productVariants?: ProductVariant[];

  /**
   * The collection’s name. Maximum length: 255 characters.
   */
  title?: string;
}

### Collection

A collection is a group of products that a shop owner can create to organize them or make their shops easier to browse.

### id

value: `string`

A globally unique identifier.

### productVariants

value: `ProductVariant[]`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}

### title

value: `string`

The collection’s name. Maximum length: 255 characters.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# page_viewed

The `page_viewed` event logs an instance where a customer visited a page. This event is available on the online store, Checkout, **Order status** and Customer Account pages.

> Note: Customer Accounts pages will only log the `page_viewed` event if a vanity domain is set up for the store.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('page_viewed', (event) => {
    // Example for accessing event data
    const timeStamp = event.timestamp;

    const pageEventId = event.id;

    const payload = {
      event_name: event.name,
      event_data: {
        pageEventId: pageEventId,
        timeStamp: timeStamp,
      },
    };

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('page_viewed', (event) => {
  // Example for accessing event data
  const timeStamp = event.timestamp;

  const pageEventId = event.id;

  const payload = {
    event_name: event.name,
    event_data: {
      pageEventId: pageEventId,
      timeStamp: timeStamp,
    },
  };

  // Example for sending event data to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsPageViewed

The `page_viewed` event logs an instance where a customer visited a page. This event is available on the online store, checkout, and **Order status** pages

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsPageViewedData`

  - PixelEventsPageViewed: export interface PixelEventsPageViewed {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;

  /**
   * No additional data is provided by design. Use the event context to get the
   * page metadata. E.g. `event.context.document.location.href`
   */
  data?: PixelEventsPageViewedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsPageViewedData: export interface PixelEventsPageViewedData {}
No additional data is provided by design. Use the event context to get the page metadata. E.g. `event.context.document.location.href`

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# payment_info_submitted

The `payment_info_submitted` event logs an instance of a customer submitting their payment information. This event is available on the checkout page.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('payment_info_submitted', (event) => {
    // Example for accessing event data
    const checkout = event.data.checkout;

    const checkoutTotalPrice = checkout.totalPrice?.amount;

    const firstDiscountType = checkout.discountApplications[0]?.type;

    const discountCode =
      firstDiscountType === 'DISCOUNT_CODE'
        ? checkout.discountApplications[0]?.title
        : null;

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        firstDiscountCode: discountCode,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('payment_info_submitted', (event) => {
  // Example for accessing event data
  const checkout = event.data.checkout;

  const checkoutTotalPrice = checkout.totalPrice?.amount;

  const firstDiscountType = checkout.discountApplications[0]?.type;

  const discountCode =
    firstDiscountType === 'DISCOUNT_CODE'
      ? checkout.discountApplications[0]?.title
      : null;

  const payload = {
    event_name: event.name,
    event_data: {
      totalPrice: checkoutTotalPrice,
      firstDiscountCode: discountCode,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsPaymentInfoSubmitted

The `payment_info_submitted` event logs an instance of a customer submitting their payment information. This event is available on the checkout page

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsPaymentInfoSubmittedData`

  - PixelEventsPaymentInfoSubmitted: export interface PixelEventsPaymentInfoSubmitted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsPaymentInfoSubmittedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsPaymentInfoSubmittedData: export interface PixelEventsPaymentInfoSubmittedData {
  checkout?: Checkout;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsPaymentInfoSubmittedData

### checkout

value: `Checkout`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}

### Checkout

A container for all the information required to add items to checkout and pay.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
A list of attributes accumulated throughout the checkout process.

### billingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The billing address to where the order will be charged.

### buyerAcceptsEmailMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via email. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### buyerAcceptsSmsMarketing

value: `boolean`

Indicates whether the customer has consented to be sent marketing material via SMS. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### currencyCode

value: `string | null`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### delivery

value: `Delivery | null`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
Represents the selected delivery options for a checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### discountApplications

value: `DiscountApplication[]`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
A list of discount applications.

### discountsAmount

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount of the discounts applied to the price of the checkout. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### email

value: `string | null`

The email attached to this checkout.

### lineItems

value: `CheckoutLineItem[]`

  - Checkout: export interface Checkout {
  /**
   * A list of attributes accumulated throughout the checkout process.
   */
  attributes?: Attribute[];

  /**
   * The billing address to where the order will be charged.
   */
  billingAddress?: MailingAddress | null;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via email. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsEmailMarketing?: boolean;

  /**
   * Indicates whether the customer has consented to be sent marketing material
   * via SMS. This property is only available if the shop has [upgraded to
   * Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  buyerAcceptsSmsMarketing?: boolean;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string | null;

  /**
   * Represents the selected delivery options for a checkout. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  delivery?: Delivery | null;

  /**
   * A list of discount applications.
   */
  discountApplications?: DiscountApplication[];

  /**
   * The total amount of the discounts applied to the price of the checkout.
   * This property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  discountsAmount?: MoneyV2 | null;

  /**
   * The email attached to this checkout.
   */
  email?: string | null;

  /**
   * A list of line item objects, each one containing information about an item
   * in the checkout.
   */
  lineItems?: CheckoutLineItem[];

  /**
   * Information about the active localized experience. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  localization?: Localization;

  /**
   * The resulting order from a paid checkout.
   */
  order?: Order | null;

  /**
   * A unique phone number for the customer. Formatted using E.164 standard. For
   * example, *+16135551111*.
   */
  phone?: string | null;

  /**
   * The shipping address to where the line items will be shipped.
   */
  shippingAddress?: MailingAddress | null;

  /**
   * Once a shipping rate is selected by the customer it is transitioned to a
   * `shipping_line` object.
   */
  shippingLine?: ShippingRate | null;

  /**
   * The phone number provided by the buyer after opting in to SMS
   * marketing. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  smsMarketingPhone?: string | null;

  /**
   * The price at checkout before duties, shipping, and taxes.
   */
  subtotalPrice?: MoneyV2 | null;

  /**
   * A unique identifier for a particular checkout.
   */
  token?: string | null;

  /**
   * The sum of all the prices of all the items in the checkout, including
   * duties, taxes, and discounts.
   */
  totalPrice?: MoneyV2 | null;

  /**
   * The sum of all the taxes applied to the line items and shipping lines in
   * the checkout.
   */
  totalTax?: MoneyV2;

  /**
   * A list of transactions associated with a checkout or order. Certain
   * transactions, such as credit card transactions, may only be present in the
   * checkout_completed event.
   */
  transactions?: Transaction[];
}
  - CheckoutLineItem: export interface CheckoutLineItem {
  /**
   * The discounts that have been applied to the checkout line item by a
   * discount application.
   */
  discountAllocations?: DiscountAllocation[];

  /**
   * The combined price of all of the items in the line item
   * after line-level discounts have been applied. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  finalLinePrice?: MoneyV2;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * The properties of the line item. A shop may add, or enable customers to add
   * custom information to a line item. Line item properties consist of a key
   * and value pair. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  properties?: Property[];

  /**
   * The quantity of the line item.
   */
  quantity?: number;

  /**
   * The selling plan associated with the line item and the effect that
   * each selling plan has on variants when they're purchased. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  sellingPlanAllocation?: SellingPlanAllocation | null;

  /**
   * The title of the line item. Defaults to the product's title.
   */
  title?: string | null;

  /**
   * Product variant of the line item.
   */
  variant?: ProductVariant | null;
}
A list of line item objects, each one containing information about an item in the checkout.

### localization

value: `Localization`

  - Localization: export interface Localization {
  /**
   * The country of the active localized experience.
   */
  country?: Country;

  /**
   * The language of the active localized experience.
   */
  language?: Language;

  /**
   * The market including the country of the active localized experience.
   */
  market?: Market;
}
Information about the active localized experience. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### order

value: `Order | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
The resulting order from a paid checkout.

### phone

value: `string | null`

A unique phone number for the customer. Formatted using E.164 standard. For example, *+16135551111*.

### shippingAddress

value: `MailingAddress | null`

  - MailingAddress: export interface MailingAddress {
  /**
   * The first line of the address. This is usually the street address or a P.O.
   * Box number.
   */
  address1?: string | null;

  /**
   * The second line of the address. This is usually an apartment, suite, or
   * unit number.
   */
  address2?: string | null;

  /**
   * The name of the city, district, village, or town.
   */
  city?: string | null;

  /**
   * The name of the country.
   */
  country?: string | null;

  /**
   * The two-letter code that represents the country, for example, US.
   * The country codes generally follows ISO 3166-1 alpha-2 guidelines.
   */
  countryCode?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The phone number for this mailing address as entered by the customer.
   */
  phone?: string | null;

  /**
   * The region of the address, such as the province, state, or district.
   */
  province?: string | null;

  /**
   * The two-letter code for the region.
   * For example, ON.
   */
  provinceCode?: string | null;

  /**
   * The ZIP or postal code of the address.
   */
  zip?: string | null;
}
The shipping address to where the line items will be shipped.

### shippingLine

value: `ShippingRate | null`

  - ShippingRate: export interface ShippingRate {
  /**
   * Price of this shipping rate.
   */
  price?: MoneyV2;
}
Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object.

### smsMarketingPhone

value: `string | null`

The phone number provided by the buyer after opting in to SMS marketing. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### subtotalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The price at checkout before duties, shipping, and taxes.

### token

value: `string | null`

A unique identifier for a particular checkout.

### totalPrice

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the prices of all the items in the checkout, including duties, taxes, and discounts.

### totalTax

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The sum of all the taxes applied to the line items and shipping lines in the checkout.

### transactions

value: `Transaction[]`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
A list of transactions associated with a checkout or order. Certain transactions, such as credit card transactions, may only be present in the checkout_completed event.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### MailingAddress

A mailing address for customers and shipping.

### address1

value: `string | null`

The first line of the address. This is usually the street address or a P.O. Box number.

### address2

value: `string | null`

The second line of the address. This is usually an apartment, suite, or unit number.

### city

value: `string | null`

The name of the city, district, village, or town.

### country

value: `string | null`

The name of the country.

### countryCode

value: `string | null`

The two-letter code that represents the country, for example, US. The country codes generally follows ISO 3166-1 alpha-2 guidelines.

### firstName

value: `string | null`

The customer’s first name.

### lastName

value: `string | null`

The customer’s last name.

### phone

value: `string | null`

The phone number for this mailing address as entered by the customer.

### province

value: `string | null`

The region of the address, such as the province, state, or district.

### provinceCode

value: `string | null`

The two-letter code for the region. For example, ON.

### zip

value: `string | null`

The ZIP or postal code of the address.

### Delivery

The delivery information for the event.

### selectedDeliveryOptions

value: `DeliveryOption[]`

  - Delivery: export interface Delivery {
  /**
   * The selected delivery options for the event.
   */
  selectedDeliveryOptions?: DeliveryOption[];
}
  - DeliveryOption: export interface DeliveryOption {
  /**
   * The cost of the delivery option.
   */
  cost?: MoneyV2 | null;

  /**
   * The cost of the delivery option after discounts have been applied.
   */
  costAfterDiscounts?: MoneyV2 | null;

  /**
   * The description of the delivery option.
   */
  description?: string | null;

  /**
   * The unique identifier of the delivery option.
   */
  handle?: string;

  /**
   * The title of the delivery option.
   */
  title?: string | null;

  /**
   * The type of delivery option.
   *
   * - `pickup`
   * - `pickupPoint`
   * - `shipping`
   * - `local`
   */
  type?: string;
}
The selected delivery options for the event.

### DeliveryOption

Represents a delivery option that the customer can choose from.

### cost

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option.

### costAfterDiscounts

value: `MoneyV2 | null`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The cost of the delivery option after discounts have been applied.

### description

value: `string | null`

The description of the delivery option.

### handle

value: `string`

The unique identifier of the delivery option.

### title

value: `string | null`

The title of the delivery option.

### type

value: `string`

The type of delivery option.

- `pickup`
- `pickupPoint`
- `shipping`
- `local`

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### DiscountApplication

The information about the intent of the discount.

### allocationMethod

value: `string`

The method by which the discount's value is applied to its entitled items.

- `ACROSS`: The value is spread across all entitled lines.
- `EACH`: The value is applied onto every entitled line.

### targetSelection

value: `string`

How the discount amount is distributed on the discounted lines.

- `ALL`: The discount is allocated onto all the lines.
- `ENTITLED`: The discount is allocated onto only the lines that it's entitled for.
- `EXPLICIT`: The discount is allocated onto explicitly chosen lines.

### targetType

value: `string`

The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.

- `LINE_ITEM`: The discount applies onto line items.
- `SHIPPING_LINE`: The discount applies onto shipping lines.

### title

value: `string`

The customer-facing name of the discount. If the type of discount is a `DISCOUNT_CODE`, this `title` attribute represents the code of the discount.

### type

value: `string`

The type of the discount.

- `AUTOMATIC`: A discount automatically at checkout or in the cart without the need for a code.
- `DISCOUNT_CODE`: A discount applied onto checkouts through the use of a code.
- `MANUAL`: A discount that is applied to an order by a merchant or store owner manually, rather than being automatically applied by the system or through a script.
- `SCRIPT`: A discount applied to a customer's order using a script

### value

value: `MoneyV2 | PricingPercentageValue`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
  - PricingPercentageValue: export interface PricingPercentageValue {
  /**
   * The percentage value of the object.
   */
  percentage?: number;
}
The value of the discount. Fixed discounts return a `Money` Object, while Percentage discounts return a `PricingPercentageValue` object.

### PricingPercentageValue

A value given to a customer when a discount is applied to an order. The application of a discount with this value gives the customer the specified percentage off a specified item.

### percentage

value: `number`

The percentage value of the object.

### CheckoutLineItem

A single line item in the checkout, grouped by variant and attributes.

### discountAllocations

value: `DiscountAllocation[]`

  - DiscountAllocation: export interface DiscountAllocation {
  /**
   * The monetary value with currency allocated to the discount.
   */
  amount?: MoneyV2;

  /**
   * The information about the intent of the discount.
   */
  discountApplication?: DiscountApplication;
}
The discounts that have been applied to the checkout line item by a discount application.

### finalLinePrice

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The combined price of all of the items in the line item after line-level discounts have been applied. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### id

value: `string | null`

A globally unique identifier.

### properties

value: `Property[]`

  - Property: export interface Property {
  /**
   * The key for the property.
   */
  key?: string;

  /**
   * The value for the property.
   */
  value?: string;
}
The properties of the line item. A shop may add, or enable customers to add custom information to a line item. Line item properties consist of a key and value pair. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### quantity

value: `number`

The quantity of the line item.

### sellingPlanAllocation

value: `SellingPlanAllocation | null`

  - SellingPlanAllocation: export interface SellingPlanAllocation {
  /**
   * A representation of how products and variants can be sold and purchased.
   * For example, an individual selling plan could be '6 weeks of prepaid
   * granola, delivered weekly'.
   */
  sellingPlan?: SellingPlan;
}
  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
The selling plan associated with the line item and the effect that each selling plan has on variants when they're purchased. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### title

value: `string | null`

The title of the line item. Defaults to the product's title.

### variant

value: `ProductVariant | null`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
Product variant of the line item.

### DiscountAllocation

The discount that has been applied to the checkout line item.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the discount.

### discountApplication

value: `DiscountApplication`

  - DiscountApplication: export interface DiscountApplication {
  /**
   * The method by which the discount's value is applied to its entitled items.
   *
   * - `ACROSS`: The value is spread across all entitled lines.
   * - `EACH`: The value is applied onto every entitled line.
   */
  allocationMethod?: string;

  /**
   * How the discount amount is distributed on the discounted lines.
   *
   * - `ALL`: The discount is allocated onto all the lines.
   * - `ENTITLED`: The discount is allocated onto only the lines that it's
   * entitled for.
   * - `EXPLICIT`: The discount is allocated onto explicitly chosen lines.
   */
  targetSelection?: string;

  /**
   * The type of line (i.e. line item or shipping line) on an order that the
   * discount is applicable towards.
   *
   * - `LINE_ITEM`: The discount applies onto line items.
   * - `SHIPPING_LINE`: The discount applies onto shipping lines.
   */
  targetType?: string;

  /**
   * The customer-facing name of the discount. If the type of discount is
   * a `DISCOUNT_CODE`, this `title` attribute represents the code of the
   * discount.
   */
  title?: string;

  /**
   * The type of the discount.
   *
   * - `AUTOMATIC`: A discount automatically at checkout or in the cart without
   * the need for a code.
   * - `DISCOUNT_CODE`: A discount applied onto checkouts through the use of
   * a code.
   * - `MANUAL`: A discount that is applied to an order by a merchant or store
   * owner manually, rather than being automatically applied by the system or
   * through a script.
   * - `SCRIPT`: A discount applied to a customer's order using a script
   */
  type?: string;

  /**
   * The value of the discount. Fixed discounts return a `Money` Object, while
   * Percentage discounts return a `PricingPercentageValue` object.
   */
  value?: MoneyV2 | PricingPercentageValue;
}
The information about the intent of the discount.

### Property

The line item additional custom properties.

### key

value: `string`

The key for the property.

### value

value: `string`

The value for the property.

### SellingPlanAllocation

Represents an association between a variant and a selling plan.

### sellingPlan

value: `SellingPlan`

  - SellingPlan: export interface SellingPlan {
  /**
   * A globally unique identifier.
   */
  id?: string;

  /**
   * The name of the selling plan. For example, '6 weeks of prepaid granola,
   * delivered weekly'.
   */
  name?: string;
}
A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'.

### SellingPlan

Represents how products and variants can be sold and purchased.

### id

value: `string`

A globally unique identifier.

### name

value: `string`

The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### Localization

Information about the active localized experience.

### country

value: `Country`

  - Country: export interface Country {
  /**
   * The ISO-3166-1 code for this country, for example, "US".
   */
  isoCode?: string | null;
}
The country of the active localized experience.

### language

value: `Language`

  - Language: export interface Language {
  /**
   * The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1
   * alpha-2 region code, for example, "en-US".
   */
  isoCode?: string;
}
The language of the active localized experience.

### market

value: `Market`

  - Market: export interface Market {
  /**
   * A human-readable, shop-scoped identifier.
   */
  handle?: string | null;

  /**
   * A globally unique identifier.
   */
  id?: string | null;
}
The market including the country of the active localized experience.

### Country

A country.

### isoCode

value: `string | null`

The ISO-3166-1 code for this country, for example, "US".

### Language

A language.

### isoCode

value: `string`

The BCP-47 language tag. It may contain a dash followed by an ISO 3166-1 alpha-2 region code, for example, "en-US".

### Market

A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [this](https://shopify.dev/docs/apps/markets) conceptual overview.

### handle

value: `string | null`

A human-readable, shop-scoped identifier.

### id

value: `string | null`

A globally unique identifier.

### Order

An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process.

### customer

value: `OrderCustomer | null`

  - Order: export interface Order {
  /**
   * The customer that placed the order.
   */
  customer?: OrderCustomer | null;

  /**
   * The ID of the order. ID will be null for all events except
   * checkout_completed.
   */
  id?: string | null;
}
  - OrderCustomer: export interface OrderCustomer {
  /**
   * The ID of the customer.
   */
  id?: string | null;

  /**
   * Indicates if the order is the customer’s first order. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  isFirstOrder?: boolean | null;
}
The customer that placed the order.

### id

value: `string | null`

The ID of the order. ID will be null for all events except checkout_completed.

### OrderCustomer

The customer that placed the order.

### id

value: `string | null`

The ID of the customer.

### isFirstOrder

value: `boolean | null`

Indicates if the order is the customer’s first order. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### ShippingRate

A shipping rate to be applied to a checkout.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
Price of this shipping rate.

### Transaction

A transaction associated with a checkout or order.

### amount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The monetary value with currency allocated to the transaction method.

### gateway

value: `string`

The name of the payment provider used for the transaction.

### paymentMethod

value: `TransactionPaymentMethod`

  - Transaction: export interface Transaction {
  /**
   * The monetary value with currency allocated to the transaction method.
   */
  amount?: MoneyV2;

  /**
   * The name of the payment provider used for the transaction.
   */
  gateway?: string;

  /**
   * The payment method used for the transaction. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  paymentMethod?: TransactionPaymentMethod;
}
  - TransactionPaymentMethod: export interface TransactionPaymentMethod {
  /**
   * The name of the payment method used for the transaction. This may further
   * specify the payment method used.
   */
  name?: string;

  /**
   * The type of payment method used for the transaction.
   *
   * - `creditCard`: A vaulted or manually entered credit card.
   * - `redeemable`: A redeemable payment method, such as a gift card or store
   * credit.
   * - `deferred`: A [deferred
   * payment](https://help.shopify.com/en/manual/orders/deferred-payments), such
   * as invoicing the buyer and collecting payment later.
   * - `local`: A [local payment
   * method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
   * - `manualPayment`: A manual payment method, such as an in-person retail
   * transaction.
   * - `paymentOnDelivery`: A payment that will be collected on delivery.
   * - `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay,
   * etc.
   * - `offsite`: A payment processed outside of Shopify's checkout, excluding
   * integrated wallets.
   * - `customOnSite`: A custom payment method that is processed through a
   * checkout extension with a payments app.
   * - `other`: Another type of payment not defined here.
   */
  type?: string;
}
The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### TransactionPaymentMethod

The payment method used for the transaction. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### name

value: `string`

The name of the payment method used for the transaction. This may further specify the payment method used.

### type

value: `string`

The type of payment method used for the transaction.

- `creditCard`: A vaulted or manually entered credit card.
- `redeemable`: A redeemable payment method, such as a gift card or store credit.
- `deferred`: A [deferred payment](https://help.shopify.com/en/manual/orders/deferred-payments), such as invoicing the buyer and collecting payment later.
- `local`: A [local payment method](https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods) specific to the current region or market.
- `manualPayment`: A manual payment method, such as an in-person retail transaction.
- `paymentOnDelivery`: A payment that will be collected on delivery.
- `wallet`: An integrated wallet, such as PayPal, Google Pay, Apple Pay, etc.
- `offsite`: A payment processed outside of Shopify's checkout, excluding integrated wallets.
- `customOnSite`: A custom payment method that is processed through a checkout extension with a payments app.
- `other`: Another type of payment not defined here.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# product_added_to_cart

The `product_added_to_cart` event logs an instance where a customer adds a product to their cart. This event is available on the online store page.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('product_added_to_cart', (event) => {
    // Example for accessing event data
    const cartLine = event.data.cartLine;

    const cartLineCost = cartLine.cost.totalAmount.amount;

    const cartLineCostCurrency = cartLine.cost.totalAmount.currencyCode;

    const merchandiseVariantTitle = cartLine.merchandise.title;

    const payload = {
      event_name: event.name,
      event_data: {
        cartLineCost: cartLineCost,
        cartLineCostCurrency: cartLineCostCurrency,
        merchandiseVariantTitle: merchandiseVariantTitle,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('product_added_to_cart', (event) => {
  // Example for accessing event data
  const cartLine = event.data.cartLine;

  const cartLineCost = cartLine.cost.totalAmount.amount;

  const cartLineCostCurrency = cartLine.cost.totalAmount.currencyCode;

  const merchandiseVariantTitle = cartLine.merchandise.title;

  const payload = {
    event_name: event.name,
    event_data: {
      cartLineCost: cartLineCost,
      cartLineCostCurrency: cartLineCostCurrency,
      merchandiseVariantTitle: merchandiseVariantTitle,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsProductAddedToCart

The `product_added_to_cart` event logs an instance where a customer adds a product to their cart. This event is available on the online store page

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsProductAddedToCartData`

  - PixelEventsProductAddedToCart: export interface PixelEventsProductAddedToCart {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsProductAddedToCartData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsProductAddedToCartData: export interface PixelEventsProductAddedToCartData {
  cartLine?: CartLine | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsProductAddedToCartData

### cartLine

value: `CartLine | null`

  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}

### CartLine

Information about the merchandise in the cart.

### cost

value: `CartLineCost`

  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}
  - CartLineCost: export interface CartLineCost {
  /**
   * The total cost of the merchandise line.
   */
  totalAmount?: MoneyV2;
}
The cost of the merchandise that the customer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout.

### merchandise

value: `ProductVariant`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The merchandise that the buyer intends to purchase.

### quantity

value: `number`

The quantity of the merchandise that the customer intends to purchase.

### CartLineCost

The cost of the merchandise line that the customer will pay at checkout.

### totalAmount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total cost of the merchandise line.

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# product_removed_from_cart

The `product_removed_from_cart` event logs an instance where a customer removes a product from their cart. This event is available on the online store page.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('product_removed_from_cart', (event) => {
    // Example for accessing event data
    const cartLine = event.data.cartLine;

    const cartLineCost = cartLine.cost.totalAmount.amount;

    const cartLineCostCurrency = cartLine.cost.totalAmount.currencyCode;

    const merchandiseVariantTitle = cartLine.merchandise.title;

    const payload = {
      event_name: event.name,
      event_data: {
        cartLineCost: cartLineCost,
        cartLineCostCurrency: cartLineCostCurrency,
        merchandiseVariantTitle: merchandiseVariantTitle,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('product_removed_from_cart', (event) => {
  // Example for accessing event data
  const cartLine = event.data.cartLine;

  const cartLineCost = cartLine.cost.totalAmount.amount;

  const cartLineCostCurrency = cartLine.cost.totalAmount.currencyCode;

  const merchandiseVariantTitle = cartLine.merchandise.title;

  const payload = {
    event_name: event.name,
    event_data: {
      cartLineCost: cartLineCost,
      cartLineCostCurrency: cartLineCostCurrency,
      merchandiseVariantTitle: merchandiseVariantTitle,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsProductRemovedFromCart

The `product_removed_from_cart` event logs an instance where a customer removes a product from their cart. This event is available on the online store page

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsProductRemovedFromCartData`

  - PixelEventsProductRemovedFromCart: export interface PixelEventsProductRemovedFromCart {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsProductRemovedFromCartData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsProductRemovedFromCartData: export interface PixelEventsProductRemovedFromCartData {
  cartLine?: CartLine | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsProductRemovedFromCartData

### cartLine

value: `CartLine | null`

  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}

### CartLine

Information about the merchandise in the cart.

### cost

value: `CartLineCost`

  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}
  - CartLineCost: export interface CartLineCost {
  /**
   * The total cost of the merchandise line.
   */
  totalAmount?: MoneyV2;
}
The cost of the merchandise that the customer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout.

### merchandise

value: `ProductVariant`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The merchandise that the buyer intends to purchase.

### quantity

value: `number`

The quantity of the merchandise that the customer intends to purchase.

### CartLineCost

The cost of the merchandise line that the customer will pay at checkout.

### totalAmount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total cost of the merchandise line.

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# product_viewed

The `product_viewed` event logs an instance where a customer visited a product details page. This event is available on the product page.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('product_viewed', (event) => {
    // Example for accessing event data
    const productPrice = event.data.productVariant.price.amount;

    const productTitle = event.data.productVariant.title;

    const payload = {
      event_name: event.name,
      event_data: {
        productPrice: productPrice,
        productTitle: productTitle,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('product_viewed', (event) => {
  // Example for accessing event data
  const productPrice = event.data.productVariant.price.amount;

  const productTitle = event.data.productVariant.title;

  const payload = {
    event_name: event.name,
    event_data: {
      productPrice: productPrice,
      productTitle: productTitle,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsProductViewed

The `product_viewed` event logs an instance where a customer visited a product details page. This event is available on the product page

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsProductViewedData`

  - PixelEventsProductViewed: export interface PixelEventsProductViewed {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsProductViewedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsProductViewedData: export interface PixelEventsProductViewedData {
  productVariant?: ProductVariant;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsProductViewedData

### productVariant

value: `ProductVariant`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# search_submitted

The `search_submitted` event logs an instance where a customer performed a search on the storefront. The products returned from the search query are in this event object (the first product variant for each product is listed in the array). This event is available on the online store page.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('search_submitted', (event) => {
    // Example for accessing event data
    const searchResult = event.data.searchResult;

    const searchQuery = searchResult.query;

    const firstProductReturnedFromSearch =
      searchResult.productVariants[0]?.product.title;

    const payload = {
      event_name: event.name,
      event_data: {
        searchQuery: searchQuery,
        firstProductTitle: firstProductReturnedFromSearch,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('search_submitted', (event) => {
  // Example for accessing event data
  const searchResult = event.data.searchResult;

  const searchQuery = searchResult.query;

  const firstProductReturnedFromSearch =
    searchResult.productVariants[0]?.product.title;

  const payload = {
    event_name: event.name,
    event_data: {
      searchQuery: searchQuery,
      firstProductTitle: firstProductReturnedFromSearch,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsSearchSubmitted

The `search_submitted` event logs an instance where a customer performed a search on the storefront. This event is available on the online store page

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsSearchSubmittedData`

  - PixelEventsSearchSubmitted: export interface PixelEventsSearchSubmitted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsSearchSubmittedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsSearchSubmittedData: export interface PixelEventsSearchSubmittedData {
  searchResult?: SearchResult;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsSearchSubmittedData

### searchResult

value: `SearchResult`

  - SearchResult: export interface SearchResult {
  productVariants?: ProductVariant[];

  /**
   * The search query that was executed
   */
  query?: string;
}

### SearchResult

An object that contains the metadata of when a search has been performed.

### productVariants

value: `ProductVariant[]`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}

### query

value: `string`

The search query that was executed

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# ui_extension_errored

The `ui_extension_errored` event logs occurrences when an extension fails to render due to an uncaught exception in the extension code.

> Note: This event is only available on checkout.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('ui_extension_errored', (event) => {
    // Example for accessing event data
    const {apiVersion, appId, appName, appVersion, trace} = event.data.alert;

    const payload = {
      event_name: event.name,
      event_data: {
        apiVersion,
        appId,
        appName,
        appVersion,
        trace,
      },
    };

    // Example for sending event data to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('ui_extension_errored', (event) => {
  // Example for accessing event data
  const {apiVersion, appId, appName, appVersion, trace} = event.data.alert;

  const payload = {
    event_name: event.name,
    event_data: {
      apiVersion,
      appId,
      appName,
      appVersion,
      trace,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsUiExtensionErrored

The `ui_extension_errored` event logs an instance of a UI extension encountering an error.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### data

value: `PixelEventsUiExtensionErroredData`

  - PixelEventsUiExtensionErrored: export interface PixelEventsUiExtensionErrored {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  context?: Context;
  data?: PixelEventsUiExtensionErroredData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Standard;
}
  - PixelEventsUiExtensionErroredData: export interface PixelEventsUiExtensionErroredData {
  error?: UiExtensionError;
}
  - UiExtensionError: export interface UiExtensionError {
  /**
   * The API version used by the extension.
   */
  apiVersion?: string;

  /**
   * The unique identifier of the app that the extension belongs to.
   */
  appId?: string;

  /**
   * The name of the app that the extension belongs to.
   */
  appName?: string;

  /**
   * The version of the app that encountered the error.
   */
  appVersion?: string;

  /**
   * The name of the extension that encountered the error.
   */
  extensionName?: string;

  /**
   * The [target](https://shopify.dev/docs/api/checkout-ui-extensions/latest/targets) of the extension, for example
   * "purchase.checkout.delivery-address.render-after".
   */
  extensionTarget?: string;

  /**
   * The message associated with the error that occurred.
   */
  message?: string;

  /**
   * The [placement reference](https://shopify.dev/docs/apps/build/checkout/test-checkout-ui-extensions#dynamic-targets) of the extension, only populated
   * for dynamic targets.
   */
  placementReference?: string | null;

  /**
   * The stack trace associated with the error that occurred.
   */
  trace?: string;

  /**
   * The type of error that occurred.
   */
  type?: UiExtensionErrorType;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Standard`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### PixelEventsUiExtensionErroredData

### error

value: `UiExtensionError`

  - UiExtensionError: export interface UiExtensionError {
  /**
   * The API version used by the extension.
   */
  apiVersion?: string;

  /**
   * The unique identifier of the app that the extension belongs to.
   */
  appId?: string;

  /**
   * The name of the app that the extension belongs to.
   */
  appName?: string;

  /**
   * The version of the app that encountered the error.
   */
  appVersion?: string;

  /**
   * The name of the extension that encountered the error.
   */
  extensionName?: string;

  /**
   * The [target](https://shopify.dev/docs/api/checkout-ui-extensions/latest/targets) of the extension, for example
   * "purchase.checkout.delivery-address.render-after".
   */
  extensionTarget?: string;

  /**
   * The message associated with the error that occurred.
   */
  message?: string;

  /**
   * The [placement reference](https://shopify.dev/docs/apps/build/checkout/test-checkout-ui-extensions#dynamic-targets) of the extension, only populated
   * for dynamic targets.
   */
  placementReference?: string | null;

  /**
   * The stack trace associated with the error that occurred.
   */
  trace?: string;

  /**
   * The type of error that occurred.
   */
  type?: UiExtensionErrorType;
}

### UiExtensionError

An object that contains data about a UI Extension error that occurred.

### apiVersion

value: `string`

The API version used by the extension.

### appId

value: `string`

The unique identifier of the app that the extension belongs to.

### appName

value: `string`

The name of the app that the extension belongs to.

### appVersion

value: `string`

The version of the app that encountered the error.

### extensionName

value: `string`

The name of the extension that encountered the error.

### extensionTarget

value: `string`

The [target](https://shopify.dev/docs/api/checkout-ui-extensions/latest/targets) of the extension, for example "purchase.checkout.delivery-address.render-after".

### message

value: `string`

The message associated with the error that occurred.

### placementReference

value: `string | null`

The [placement reference](https://shopify.dev/docs/apps/build/checkout/test-checkout-ui-extensions#dynamic-targets) of the extension, only populated for dynamic targets.

### trace

value: `string`

The stack trace associated with the error that occurred.

### type

value: `UiExtensionErrorType`

  - UiExtensionError: export interface UiExtensionError {
  /**
   * The API version used by the extension.
   */
  apiVersion?: string;

  /**
   * The unique identifier of the app that the extension belongs to.
   */
  appId?: string;

  /**
   * The name of the app that the extension belongs to.
   */
  appName?: string;

  /**
   * The version of the app that encountered the error.
   */
  appVersion?: string;

  /**
   * The name of the extension that encountered the error.
   */
  extensionName?: string;

  /**
   * The [target](https://shopify.dev/docs/api/checkout-ui-extensions/latest/targets) of the extension, for example
   * "purchase.checkout.delivery-address.render-after".
   */
  extensionTarget?: string;

  /**
   * The message associated with the error that occurred.
   */
  message?: string;

  /**
   * The [placement reference](https://shopify.dev/docs/apps/build/checkout/test-checkout-ui-extensions#dynamic-targets) of the extension, only populated
   * for dynamic targets.
   */
  placementReference?: string | null;

  /**
   * The stack trace associated with the error that occurred.
   */
  trace?: string;

  /**
   * The type of error that occurred.
   */
  type?: UiExtensionErrorType;
}
  - UiExtensionErrorType: export enum UiExtensionErrorType {
  /**
   * An error caused by incorrect usage of extension APIs or UI components.
   */
  ExtensionUsageError = 'EXTENSION_USAGE_ERROR',
}
The type of error that occurred.

### UiExtensionErrorType

### ExtensionUsageError

value: `EXTENSION_USAGE_ERROR`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


## analytics

Provides access to Shopify's [customer event API](https://shopify.dev/docs/api/web-pixels-api/standard-events)
[View analytics](https://shopify.dev/docs/api/web-pixels-api/standard-api/analytics)

## browser

Provides access to specific browser methods that asynchronously execute in the top frame (`cookie`, `localStorage`, `sessionStorage`)
[View browser](https://shopify.dev/docs/api/web-pixels-api/standard-api/browser)

## customerPrivacy

Provides access to the [customerPrivacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not customers have given consent.
[View customerPrivacy](https://shopify.dev/docs/api/web-pixels-api/standard-api/customerprivacy)

## init

A JSON object containing a snapshot of the page at time of page render. It will always have the present `Context` of the page, as well as the `Data` field, which provides access to the `Cart` and `Customer` objects.
[View init](https://shopify.dev/docs/api/web-pixels-api/standard-api/init)

## settings

Provides access to the settings JSON object as set by the [GraphQL Admin API](https://shopify.dev/docs/apps/marketing/pixels/getting-started#step-5-create-a-web-pixel-setting-for-the-store) **(Web pixel app extensions only)**. The structure of this object is a string keyed hash map: `Record<string, any>`.
[View settings](https://shopify.dev/docs/api/web-pixels-api/standard-api/settings)

# analytics

Provides access to Shopify's [customer event API](https://shopify.dev/docs/api/web-pixels-api/standard-events)

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics, browser, settings, init}) => {
  analytics.subscribe('page_viewed', (event) => {
    // subscribe to page_viewed events
  });

  analytics.subscribe('all_events', (event) => {
    // subscribe to all events
  });

  analytics.subscribe('all_standard_events', (event) => {
    // subscribe to all standard events
  });

  analytics.subscribe('all_custom_events', (event) => {
    // subscribe to all custom events
  });
});

```

```javascript
analytics.subscribe('page_viewed', (event) => {
  // subscribe to page_viewed events
});

analytics.subscribe('all_events', (event) => {
  // subscribe to all events
});

analytics.subscribe('all_standard_events', (event) => {
  // subscribe to all standard events
});

analytics.subscribe('all_custom_events', (event) => {
  // subscribe to all custom events
});

```

## Properties

### Analytics

### subscribe

value: `(eventName: string, event_callback: Function) => Promise<undefined>`

  - Name: string

# browser

Provides access to specific browser methods that asynchronously execute in the top frame (`cookie`, `localStorage`, `sessionStorage`)

```javascript
/**
 * browser.cookie.get(name)
 *
 * @param {name} - String representing the name of the cookie
 * @return {Promise} - Promise of type string
 */

const user_id = await browser.cookie.get('my_user_id');

/**
 * browser.cookie.set(name)
 *
 * @param {name} - String representing the name of the cookie
 * @param {value} - String representing the value of the cookie
 * @return {Promise} - Promise of type string
 */

browser.cookie.set('my_user_id', 'ABCX123');
browser.cookie.set('my_user_id=ABCX123; expires=Thu, 18 Dec 2013 12:00:00');

```

```javascript
/**
 * browser.localStorage.getItem(url, data)
 *
 * @param {keyName} - String containing the name of the key you want to retrieve the value of.
 * @return {Promise} - Promise of type string.
 */
browser.localStorage.getItem('foo');

/**
 * browser.localStorage.setItem(url, data)
 *
 * @param {keyName} - A string containing the name of the key you want to retrieve the value of.
 * @param {keyValue} - A string containing the value you want to give the key you are creating or updating.
 * @return {Promise} - Promise of type string.
 */
browser.localStorage.setItem('foo', 'bar');

/**
 * browser.localStorage.removeItem(keyName)
 *
 * @param {keyName} - A string containing the name of the key you want to remove.
 * @return {Promise} - Promise of undefined.
 */
browser.localStorage.removeItem('foo');

/**
 * browser.localStorage.key(index)
 *
 * @param {index} - An integer representing the number of the key you want to get the name of. This is a zero-based index.
 * @return {Promise} - Promise of type string.
 */
browser.localStorage.key(2);

/**
 * browser.localStorage.length()
 *
 * @return {Promise} - Promise of type integer.
 */
browser.localStorage.length();

/**
 * browser.localStorage.clear()
 *
 * @return {Promise} - Promise of undefined.
 */
browser.localStorage.clear();

```

```javascript
/**
 * browser.sessionStorage.getItem(url, data)
 *
 * @param {keyName} - A string containing the name of the key you want to retrieve the value of.
 * @return {Promise} - Promise of type string.
 */
browser.sessionStorage.getItem('foo');

/**
 * browser.sessionStorage.setItem(url, data)
 *
 * @param {keyName} - A string containing the name of the key you want to retrieve the value of.
 * @param {keyValue} - A string containing the value you want to give the key you are creating or updating.
 * @return {Promise} - Promise of type string.
 */
browser.sessionStorage.setItem('foo', 'bar');

/**
 * browser.sessionStorage.removeItem(keyName)
 *
 * @param {keyName} - A string containing the name of the key you want to remove.
 * @return {Promise} - Promise of undefined.
 */
browser.sessionStorage.removeItem('foo');

/**
 * browser.sessionStorage.key(index)
 *
 * @param {index} - An integer representing the number of the key you want to get the name of. This is a zero-based index.
 * @return {Promise} - Promise of type string.
 */
browser.sessionStorage.key(2);

/**
 * browser.sessionStorage.length()
 *
 * @return {Promise} - Promise of type integer.
 */
browser.sessionStorage.length();

/**
 * browser.sessionStorage.clear()
 *
 * @return {Promise} - Promise of undefined.
 */
browser.sessionStorage.clear();

```

## Properties

### Browser

### cookie

value: `BrowserCookie`

  - Browser: export interface Browser {
  /**
   * This object replaces the native document.cookie API and provides a
   * setter/getter to set cookies on the top frame.
   */
  cookie?: BrowserCookie;
  localStorage?: BrowserLocalStorage;

  /**
   * @deprecated The navigator.sendBeacon() method asynchronously sends an HTTP
   * POST request containing a small amount of data to a web server. Please use
   * the standard web `fetch` api with the option `keepalive: true` to achieve
   * this functionality.
   */
  sendBeacon?: (url: string, body?: string) => Promise<boolean>;
  sessionStorage?: BrowserSessionStorage;
}
  - BrowserCookie: export interface BrowserCookie {
  /**
   * An asynchronous method to get a specific cookie by name. Takes a cookie
   * name of type `string` and returns the cookie value as a `string`
   */
  get?: (name?: string) => Promise<string>;

  /**
   * An asynchronous method to set a cookie by name. It takes two arguments, a string of form `key=value` as [described here](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#write_a_new_cookie) or the name of the cookie as the first argument and the value as the second argument.
   */
  set?: (cookieOrName: string, value?: string) => Promise<string>;
}
This object replaces the native document.cookie API and provides a setter/getter to set cookies on the top frame.

### localStorage

value: `BrowserLocalStorage`

  - Browser: export interface Browser {
  /**
   * This object replaces the native document.cookie API and provides a
   * setter/getter to set cookies on the top frame.
   */
  cookie?: BrowserCookie;
  localStorage?: BrowserLocalStorage;

  /**
   * @deprecated The navigator.sendBeacon() method asynchronously sends an HTTP
   * POST request containing a small amount of data to a web server. Please use
   * the standard web `fetch` api with the option `keepalive: true` to achieve
   * this functionality.
   */
  sendBeacon?: (url: string, body?: string) => Promise<boolean>;
  sessionStorage?: BrowserSessionStorage;
}
  - BrowserLocalStorage: export interface BrowserLocalStorage {
  /**
   * When invoked, will empty all keys out of the storage.
   */
  clear?: () => Promise<ReturnType<WindowLocalStorage['localStorage']['clear']>>;

  /**
   * When passed a key name, will return that key's value.
   */
  getItem?: (
    key: string,
  ) => Promise<ReturnType<WindowLocalStorage['localStorage']['getItem']>>;

  /**
   * When passed a number n, this method will return the name of the nth key in
   * the storage.
   */
  key?: (
    index: number,
  ) => Promise<ReturnType<WindowLocalStorage['localStorage']['key']>>;

  /**
   * Returns an integer representing the number of data items stored in the
   * Storage object.
   */
  length?: () => Promise<WindowLocalStorage['localStorage']['length']>;

  /**
   * When passed a key name, will remove that key from the storage.
   */
  removeItem?: (
    key: string,
  ) => Promise<ReturnType<WindowLocalStorage['localStorage']['removeItem']>>;

  /**
   * When passed a key name and value, will add that key to the storage, or
   * update that key's value if it already exists.
   */
  setItem?: (
    key: string,
    value: any,
  ) => Promise<ReturnType<WindowLocalStorage['localStorage']['setItem']>>;
}

### sendBeacon

value: `(url: string, body?: string) => Promise<boolean>`


### sessionStorage

value: `BrowserSessionStorage`

  - Browser: export interface Browser {
  /**
   * This object replaces the native document.cookie API and provides a
   * setter/getter to set cookies on the top frame.
   */
  cookie?: BrowserCookie;
  localStorage?: BrowserLocalStorage;

  /**
   * @deprecated The navigator.sendBeacon() method asynchronously sends an HTTP
   * POST request containing a small amount of data to a web server. Please use
   * the standard web `fetch` api with the option `keepalive: true` to achieve
   * this functionality.
   */
  sendBeacon?: (url: string, body?: string) => Promise<boolean>;
  sessionStorage?: BrowserSessionStorage;
}
  - BrowserSessionStorage: export interface BrowserSessionStorage {
  /**
   * When invoked, will empty all keys out of the storage.
   */
  clear?: () => Promise<
    ReturnType<WindowSessionStorage['sessionStorage']['clear']>
  >;

  /**
   * When passed a key name, will return that key's value.
   */
  getItem?: (
    key: string,
  ) => Promise<ReturnType<WindowSessionStorage['sessionStorage']['getItem']>>;

  /**
   * When passed a number n, this method will return the name of the nth key in
   * the storage.
   */
  key?: (
    index: number,
  ) => Promise<ReturnType<WindowSessionStorage['sessionStorage']['key']>>;

  /**
   * Returns an integer representing the number of data items stored in the
   * Storage object.
   */
  length?: () => Promise<WindowSessionStorage['sessionStorage']['length']>;

  /**
   * When passed a key name, will remove that key from the storage.
   */
  removeItem?: (
    key: string,
  ) => Promise<
    ReturnType<WindowSessionStorage['sessionStorage']['removeItem']>
  >;

  /**
   * When passed a key name and value, will add that key to the storage, or
   * update that key's value if it already exists.
   */
  setItem?: (
    key: string,
    value: any,
  ) => Promise<ReturnType<WindowSessionStorage['sessionStorage']['setItem']>>;
}

### BrowserCookie

This object replaces the native document.cookie API and provides a setter/getter to set cookies on the top frame.

### get

value: `(name?: string) => Promise<string>`

An asynchronous method to get a specific cookie by name. Takes a cookie name of type `string` and returns the cookie value as a `string`

### set

value: `(cookieOrName: string, value?: string) => Promise<string>`

An asynchronous method to set a cookie by name. It takes two arguments, a string of form `key=value` as [described here](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#write_a_new_cookie) or the name of the cookie as the first argument and the value as the second argument.

### BrowserLocalStorage

### clear

value: `() => Promise<void>`

When invoked, will empty all keys out of the storage.

### getItem

value: `(key: string) => Promise<string>`

When passed a key name, will return that key's value.

### key

value: `(index: number) => Promise<string>`

When passed a number n, this method will return the name of the nth key in the storage.

### length

value: `() => Promise<number>`

Returns an integer representing the number of data items stored in the Storage object.

### removeItem

value: `(key: string) => Promise<void>`

When passed a key name, will remove that key from the storage.

### setItem

value: `(key: string, value: any) => Promise<void>`

When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.

### BrowserSessionStorage

### clear

value: `() => Promise<void>`

When invoked, will empty all keys out of the storage.

### getItem

value: `(key: string) => Promise<string>`

When passed a key name, will return that key's value.

### key

value: `(index: number) => Promise<string>`

When passed a number n, this method will return the name of the nth key in the storage.

### length

value: `() => Promise<number>`

Returns an integer representing the number of data items stored in the Storage object.

### removeItem

value: `(key: string) => Promise<void>`

When passed a key name, will remove that key from the storage.

### setItem

value: `(key: string, value: any) => Promise<void>`

When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.

# customerPrivacy

Provides access to the [customerPrivacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not customers have given consent.

```js
import {register} from '@shopify/web-pixels-extension';

register(({analytics, init, customerPrivacy}) => {
  // Use the init.customerPrivacy object to get the initial customer privacy status
  let customerPrivacyStatus = init.customerPrivacy;

  // Use the customerPrivacy Standard API to subscribe to consent collected events and update the status
  customerPrivacy.subscribe('visitorConsentCollected', (event) => {
    customerPrivacyStatus = event.customerPrivacy;
    /**
     * {
     *   "analyticsProcessingAllowed": boolean,
     *   "marketingAllowed": boolean,
     *   "preferencesProcessingAllowed": boolean,
     *   "saleOfDataAllowed": boolean,
     * }
     */
  })

  // Every product added to cart event will have the most up to date customer privacy status
  analytics.subscribe("product_added_to_cart", event => { 
    const payload = {
      eventName: event.name,
      customerPrivacyStatus: customerPrivacyStatus,
    };

    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```js
let customerPrivacyStatus = init.customerPrivacy;

// Use the customerPrivacy Standard API to subscribe to consent collected events and update the status
api.customerPrivacy.subscribe('visitorConsentCollected', (event) => {
  customerPrivacyStatus = event.customerPrivacy;
  /**
   * {
   *   "analyticsProcessingAllowed": boolean,
   *   "marketingAllowed": boolean,
   *   "preferencesProcessingAllowed": boolean,
   *   "saleOfDataAllowed": boolean,
   * }
   */
})

// Every product added to cart event will have the most up to date customer privacy status
analytics.subscribe("product_added_to_cart", event => { 
  const payload = {
    eventName: event.name,
    customerPrivacyStatus: customerPrivacyStatus,
  };

  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### CustomerPrivacySubscribe

### subscribe

value: `(eventName: string, event_callback: Function) => Promise<undefined>`

  - Name: string

# init

A JSON object containing a snapshot of the page at time of page render. It will always have the present `Context` of the page, as well as the `Data` field, which provides access to the `Cart` and `Customer` objects.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics, init}) => {
  analytics.subscribe('page_viewed', (event) => {
    // On every page view, get the current state of the cart

    const customer = init.data.customer;
    const cart = init.data.cart;
    const shop = init.data.shop;
    const purchasingCompany = init.data.purchasingCompany;

    console.log(`Customer Name: ${customer.firstName}`);
    // Customer Name: Bogus

    console.log(`Total Number of Items in Cart: ${cart.totalQuantity}`);
    // Total Number of Items in Cart: 3

    console.log(`Total Cost of Cart: ${cart.cost.totalAmount.amount}`);
    // Total Cost of Cart: 50.82

    console.log(`Shop name: ${shop.name}`);
    // Shop name: Shop 123

    console.log(`Shop currency code: ${shop.paymentSettings.currencyCode}`);
    // Shop currency code: CAD

    console.log(`Purchasing company name: ${purchasingCompany.company.name}`);
    // Purchasing company name: Acme Corporation

    console.log(
      `Purchasing company location name: ${purchasingCompany.location.name}`,
    );
    // Purchasing company location name: Toronto fulfillment center
  });
});

```

```javascript
analytics.subscribe('page_viewed', (event) => {
  // On every page view, get the current state of the cart

  const customer = init.data.customer;
  const cart = init.data.cart;
  const shop = init.data.shop;
  const purchasingCompany = init.data.purchasingCompany;

  console.log(`Customer Name: ${customer.firstName}`);
  // Customer Name: Bogus

  console.log(`Total Number of Items in Cart: ${cart.totalQuantity}`);
  // Total Number of Items in Cart: 3

  console.log(`Total Cost of Cart: ${cart.cost.totalAmount.amount}`);
  // Total Cost of Cart: 50.82

  console.log(`Shop name: ${shop.name}`);
  // Shop name: Shop 123

  console.log(`Shop currency code: ${shop.paymentSettings.currencyCode}`);
  // Shop currency code: CAD

  console.log(`Purchasing company name: ${purchasingCompany.company.name}`);
  // Purchasing company name: Acme Corporation

  console.log(
    `Purchasing company location name: ${purchasingCompany.location.name}`,
  );
  // Purchasing company location name: Toronto fulfillment center
});

```

## Properties

### Init

### context

value: `Context`

  - Context: export interface Context {
  /**
   * Snapshot of a subset of properties of the `document` object in the top
   * frame of the browser
   */
  document?: WebPixelsDocument;

  /**
   * Snapshot of a subset of properties of the `navigator` object in the top
   * frame of the browser
   */
  navigator?: WebPixelsNavigator;

  /**
   * Snapshot of a subset of properties of the `window` object in the top frame
   * of the browser
   */
  window?: WebPixelsWindow;
}

### customerPrivacy

value: `CustomerPrivacyData`

  - CustomerPrivacyData: interface CustomerPrivacyData {
  /**
   * This flag indicates whether the customer has allowed the processing of their data for analytics purposes on the initial page load. 
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  analyticsProcessingAllowed?: boolean;

  /**
   * This flag indicates whether the customer has allowed the processing of their data for marketing purposes on the initial page load.
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  marketingAllowed?: boolean;

  /**
   * This flag indicates whether the customer has allowed the processing of their data for preferences purposes on the initial page load.
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  preferencesProcessingAllowed?: boolean;

  /**
   * This flag indicates whether the customer has allowed the sale of their data on the initial page load.
   * If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.
   */
  saleOfDataAllowed?: boolean;
}
  - Customer: export interface Customer {
  /**
   * The customer’s email address.
   */
  email?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The ID of the customer.
   */
  id?: string;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The total number of orders that the customer has placed.
   */
  ordersCount?: number | null;

  /**
   * The customer’s phone number.
   */
  phone?: string | null;
}

### data

value: `RegisterInitData`

  - Init: export interface Init {
  context?: Context;
  data?: RegisterInitData;
  customerPrivacy?: CustomerPrivacyData;
}
  - RegisterInitData: interface RegisterInitData {
  /**
   * A customer represents a customer account with the shop. Customer accounts
   * store contact information for the customer, saving logged-in customers the
   * trouble of having to provide it at every checkout.
   */
  customer?: Customer | null;

  /**
   * A cart represents the merchandise that a customer intends to purchase, and
   * the estimated cost associated with the cart.
   */
  cart?: Cart | null;

  /**
   * The shop represents information about the store, such as the store name and
   * currency.
   */
  shop?: Shop;

  /**
   * Provides details of the company and the company location that the business customer is
   * purchasing on behalf of. This includes information that can be used to identify the company
   * and the company location that the business customer belongs to.
   */
  purchasingCompany?: PurchasingCompany | null;
}

### Context

A snapshot of various read-only properties of the browser at the time of event

### document

value: `WebPixelsDocument`

  - WebPixelsDocument: export interface WebPixelsDocument {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the character set being used by the document
   */
  characterSet?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the current document
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the URI of the page that linked to this page
   */
  referrer?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document),
   * returns the title of the current document
   */
  title?: string;
}
Snapshot of a subset of properties of the `document` object in the top frame of the browser

### navigator

value: `WebPixelsNavigator`

  - WebPixelsNavigator: export interface WebPixelsNavigator {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns `false` if setting a cookie will be ignored and true otherwise
   */
  cookieEnabled?: boolean;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns a string representing the preferred language of the user, usually
   * the language of the browser UI. The `null` value is returned when this
   * is unknown
   */
  language?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns an array of strings representing the languages known to the user,
   * by order of preference
   */
  languages?: ReadonlyArray<string>;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator),
   * returns the user agent string for the current browser
   */
  userAgent?: string;
}
Snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### window

value: `WebPixelsWindow`

  - WebPixelsWindow: export interface WebPixelsWindow {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window),
   * gets the height of the content area of the browser window including, if
   * rendered, the horizontal scrollbar
   */
  innerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the content area of the browser window including, if rendered,
   * the vertical scrollbar
   */
  innerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * location, or current URL, of the window object
   */
  location?: Location;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * global object's origin, serialized as a string
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the height of the outside of the browser window
   */
  outerHeight?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets
   * the width of the outside of the browser window
   */
  outerWidth?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollX
   */
  pageXOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an
   * alias for window.scrollY
   */
  pageYOffset?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the
   * interface representing a screen, usually the one on which the current
   * window is being rendered
   */
  screen?: Screen;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * horizontal distance from the left border of the user's browser viewport to
   * the left side of the screen
   */
  screenX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * vertical distance from the top border of the user's browser viewport to the
   * top side of the screen
   */
  screenY?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled horizontally
   */
  scrollX?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the
   * number of pixels that the document has already been scrolled vertically
   */
  scrollY?: number;
}
Snapshot of a subset of properties of the `window` object in the top frame of the browser

### WebPixelsDocument

A snapshot of a subset of properties of the `document` object in the top frame of the browser

### characterSet

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the character set being used by the document

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the current document

### referrer

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the URI of the page that linked to this page

### title

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document), returns the title of the current document

### Location

A snapshot of a subset of properties of the `location` object in the top frame of the browser

### hash

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'#'` followed by the fragment identifier of the URL

### host

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the host, that is the hostname, a `':'`, and the port of the URL

### hostname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the domain of the URL

### href

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the entire URL

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the canonical form of the origin of the specific location

### pathname

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing an initial `'/'` followed by the path of the URL, not including the query string or fragment

### port

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the port number of the URL

### protocol

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing the protocol scheme of the URL, including the final `':'`

### search

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a string containing a `'?'` followed by the parameters or "querystring" of the URL

### WebPixelsNavigator

A snapshot of a subset of properties of the `navigator` object in the top frame of the browser

### cookieEnabled

value: `boolean`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns `false` if setting a cookie will be ignored and true otherwise

### language

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns a string representing the preferred language of the user, usually the language of the browser UI. The `null` value is returned when this is unknown

### languages

value: `ReadonlyArray<string>`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns an array of strings representing the languages known to the user, by order of preference

### userAgent

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), returns the user agent string for the current browser

### WebPixelsWindow

A snapshot of a subset of properties of the `window` object in the top frame of the browser

### innerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the content area of the browser window including, if rendered, the horizontal scrollbar

### innerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the content area of the browser window including, if rendered, the vertical scrollbar

### location

value: `Location`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the location, or current URL, of the window object

### origin

value: `string`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the global object's origin, serialized as a string

### outerHeight

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the height of the outside of the browser window

### outerWidth

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), gets the width of the outside of the browser window

### pageXOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollX

### pageYOffset

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), an alias for window.scrollY

### screen

value: `Screen`

  - Screen: export interface Screen {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height),
   * the height of the screen
   */
  height?: number;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width),
   * the width of the screen
   */
  width?: number;
}
Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen), the interface representing a screen, usually the one on which the current window is being rendered

### screenX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the horizontal distance from the left border of the user's browser viewport to the left side of the screen

### screenY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the vertical distance from the top border of the user's browser viewport to the top side of the screen

### scrollX

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled horizontally

### scrollY

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), the number of pixels that the document has already been scrolled vertically

### Screen

The interface representing a screen, usually the one on which the current window is being rendered

### height

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/height), the height of the screen

### width

value: `number`

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Screen/width), the width of the screen

### CustomerPrivacyData

### analyticsProcessingAllowed

value: `boolean`

This flag indicates whether the customer has allowed the processing of their data for analytics purposes on the initial page load.  If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.

### marketingAllowed

value: `boolean`

This flag indicates whether the customer has allowed the processing of their data for marketing purposes on the initial page load. If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.

### preferencesProcessingAllowed

value: `boolean`

This flag indicates whether the customer has allowed the processing of their data for preferences purposes on the initial page load. If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.

### saleOfDataAllowed

value: `boolean`

This flag indicates whether the customer has allowed the sale of their data on the initial page load. If a customer submits consent, you can use the [customer privacy API](/api/web-pixels-api/pixel-privacy#customer-privacy-api) to track whether or not the privacy permissions have changed.

### RegisterInitData

### cart

value: `Cart | null`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}
A cart represents the merchandise that a customer intends to purchase, and the estimated cost associated with the cart.

### customer

value: `Customer | null`

  - Customer: export interface Customer {
  /**
   * The customer’s email address.
   */
  email?: string | null;

  /**
   * The customer’s first name.
   */
  firstName?: string | null;

  /**
   * The ID of the customer.
   */
  id?: string;

  /**
   * The customer’s last name.
   */
  lastName?: string | null;

  /**
   * The total number of orders that the customer has placed.
   */
  ordersCount?: number | null;

  /**
   * The customer’s phone number.
   */
  phone?: string | null;
}
A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout.

### purchasingCompany

value: `PurchasingCompany | null`

  - PurchasingCompany: export interface PurchasingCompany {
  /**
   * Includes information of the company that the business customer is
   * purchasing on behalf of.
   */
  company?: PurchasingCompanyCompany;

  /**
   * Includes information of the company location that the business customer is
   * purchasing on behalf of.
   */
  location?: PurchasingCompanyLocation;
}
Provides details of the company and the company location that the business customer is purchasing on behalf of. This includes information that can be used to identify the company and the company location that the business customer belongs to.

### shop

value: `Shop`

  - Shop: export interface Shop {
  /**
   * The shop’s country code.
   */
  countryCode?: string;

  /**
   * The shop’s myshopify.com domain.
   */
  myshopifyDomain?: string;

  /**
   * The shop’s name.
   */
  name?: string;

  /**
   * Settings related to payments.
   */
  paymentSettings?: ShopPaymentSettings;

  /**
   * The shop’s primary storefront URL.
   */
  storefrontUrl?: string | null;
}
The shop represents information about the store, such as the store name and currency.

### Cart

A cart represents the merchandise that a customer intends to purchase, and the estimated cost associated with the cart.

### attributes

value: `Attribute[]`

  - Attribute: export interface Attribute {
  /**
   * The key for the attribute.
   */
  key?: string;

  /**
   * The value for the attribute.
   */
  value?: string;
}
The attributes associated with the cart. This property is only available if the shop has [upgraded to Checkout Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).

### cost

value: `CartCost`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}
  - CartCost: export interface CartCost {
  /**
   * The total amount for the customer to pay.
   */
  totalAmount?: MoneyV2;
}
The estimated costs that the customer will pay at checkout.

### id

value: `string | null`

A globally unique identifier.

### lines

value: `CartLine[]`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}
  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}
A list of lines containing information about the items the customer intends to purchase.

### totalQuantity

value: `number`

The total number of items in the cart.

### Attribute

Custom attributes associated with the cart or checkout.

### key

value: `string`

The key for the attribute.

### value

value: `string`

The value for the attribute.

### CartCost

The costs that the customer will pay at checkout. It uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing#create-a-cart).

### totalAmount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total amount for the customer to pay.

### MoneyV2

A monetary value with currency.

### amount

value: `number`

The decimal money amount.

### currencyCode

value: `string`

The three-letter code that represents the currency, for example, USD. Supported codes include standard ISO 4217 codes, legacy codes, and non- standard codes.

### CartLine

Information about the merchandise in the cart.

### cost

value: `CartLineCost`

  - Cart: export interface Cart {
  /**
   * The attributes associated with the cart. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/en/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  attributes?: Attribute[];

  /**
   * The estimated costs that the customer will pay at checkout.
   */
  cost?: CartCost;

  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * A list of lines containing information about the items the customer intends
   * to purchase.
   */
  lines?: CartLine[];

  /**
   * The total number of items in the cart.
   */
  totalQuantity?: number;
}
  - CartLine: export interface CartLine {
  /**
   * The cost of the merchandise that the customer will pay for at checkout. The
   * costs are subject to change and changes will be reflected at checkout.
   */
  cost?: CartLineCost;

  /**
   * The merchandise that the buyer intends to purchase.
   */
  merchandise?: ProductVariant;

  /**
   * The quantity of the merchandise that the customer intends to purchase.
   */
  quantity?: number;
}
  - CartLineCost: export interface CartLineCost {
  /**
   * The total cost of the merchandise line.
   */
  totalAmount?: MoneyV2;
}
The cost of the merchandise that the customer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout.

### merchandise

value: `ProductVariant`

  - ProductVariant: export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id?: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image?: Image | null;

  /**
   * The product variant’s price.
   */
  price?: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product?: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku?: string | null;

  /**
   * The product variant’s title.
   */
  title?: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle?: string | null;
}
  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The merchandise that the buyer intends to purchase.

### quantity

value: `number`

The quantity of the merchandise that the customer intends to purchase.

### CartLineCost

The cost of the merchandise line that the customer will pay at checkout.

### totalAmount

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The total cost of the merchandise line.

### ProductVariant

A product variant represents a different version of a product, such as differing sizes or differing colors.

### id

value: `string | null`

A globally unique identifier.

### image

value: `Image | null`

  - Image: export interface Image {
  /**
   * The location of the image as a URL.
   */
  src?: string | null;
}
Image associated with the product variant. This field falls back to the product image if no image is available.

### price

value: `MoneyV2`

  - MoneyV2: export interface MoneyV2 {
  /**
   * The decimal money amount.
   */
  amount?: number;

  /**
   * The three-letter code that represents the currency, for example, USD.
   * Supported codes include standard ISO 4217 codes, legacy codes, and non-
   * standard codes.
   */
  currencyCode?: string;
}
The product variant’s price.

### product

value: `Product`

  - Product: export interface Product {
  /**
   * The ID of the product.
   */
  id?: string | null;

  /**
   * The product’s title.
   */
  title?: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type?: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle?: string | null;

  /**
   * The relative URL of the product.
   */
  url?: string | null;

  /**
   * The product’s vendor name.
   */
  vendor?: string;
}
The product object that the product variant belongs to.

### sku

value: `string | null`

The SKU (stock keeping unit) associated with the variant.

### title

value: `string | null`

The product variant’s title.

### untranslatedTitle

value: `string | null`

The product variant’s untranslated title.

### Image

An image resource.

### src

value: `string | null`

The location of the image as a URL.

### Product

A product is an individual item for sale in a Shopify store.

### id

value: `string | null`

The ID of the product.

### title

value: `string`

The product’s title.

### type

value: `string | null`

The [product type](https://help.shopify.com/en/manual/products/details/product-type) specified by the merchant.

### untranslatedTitle

value: `string | null`

The product’s untranslated title.

### url

value: `string | null`

The relative URL of the product.

### vendor

value: `string`

The product’s vendor name.

### Customer

A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout.

### email

value: `string | null`

The customer’s email address.

### firstName

value: `string | null`

The customer’s first name.

### id

value: `string`

The ID of the customer.

### lastName

value: `string | null`

The customer’s last name.

### ordersCount

value: `number | null`

The total number of orders that the customer has placed.

### phone

value: `string | null`

The customer’s phone number.

### PurchasingCompany

Provides details of the company and the company location that the business customer is purchasing on behalf of.

### company

value: `PurchasingCompanyCompany`

  - PurchasingCompany: export interface PurchasingCompany {
  /**
   * Includes information of the company that the business customer is
   * purchasing on behalf of.
   */
  company?: PurchasingCompanyCompany;

  /**
   * Includes information of the company location that the business customer is
   * purchasing on behalf of.
   */
  location?: PurchasingCompanyLocation;
}
  - PurchasingCompanyCompany: export interface PurchasingCompanyCompany {
  /**
   * The external ID of the company that can be set by the merchant.
   */
  externalId?: string | null;

  /**
   * The company ID.
   */
  id?: string;

  /**
   * The name of the company.
   */
  name?: string;
}
Includes information of the company that the business customer is purchasing on behalf of.

### location

value: `PurchasingCompanyLocation`

  - Location: export interface Location {
  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'#'` followed by the fragment identifier of the URL
   */
  hash?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the host, that is the hostname, a `':'`, and the port of
   * the URL
   */
  host?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the domain of the URL
   */
  hostname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the entire URL
   */
  href?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the canonical form of the origin of the specific location
   */
  origin?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing an initial `'/'` followed by the path of the URL, not
   * including the query string or fragment
   */
  pathname?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the port number of the URL
   */
  port?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing the protocol scheme of the URL, including the final `':'`
   */
  protocol?: string;

  /**
   * Per [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Location), a
   * string containing a `'?'` followed by the parameters or "querystring" of
   * the URL
   */
  search?: string;
}
  - PurchasingCompany: export interface PurchasingCompany {
  /**
   * Includes information of the company that the business customer is
   * purchasing on behalf of.
   */
  company?: PurchasingCompanyCompany;

  /**
   * Includes information of the company location that the business customer is
   * purchasing on behalf of.
   */
  location?: PurchasingCompanyLocation;
}
  - PurchasingCompanyLocation: export interface PurchasingCompanyLocation {
  /**
   * The external ID of the company location that can be set by the merchant.
   */
  externalId?: string | null;

  /**
   * The company location ID.
   */
  id?: string;

  /**
   * The name of the company location.
   */
  name?: string;
}
Includes information of the company location that the business customer is purchasing on behalf of.

### PurchasingCompanyCompany

Includes information of the company that the business customer is purchasing on behalf of.

### externalId

value: `string | null`

The external ID of the company that can be set by the merchant.

### id

value: `string`

The company ID.

### name

value: `string`

The name of the company.

### PurchasingCompanyLocation

Includes information of the company location that the business customer is purchasing on behalf of.

### externalId

value: `string | null`

The external ID of the company location that can be set by the merchant.

### id

value: `string`

The company location ID.

### name

value: `string`

The name of the company location.

### Shop

The shop represents information about the store, such as the store name and currency.

### countryCode

value: `string`

The shop’s country code.

### myshopifyDomain

value: `string`

The shop’s myshopify.com domain.

### name

value: `string`

The shop’s name.

### paymentSettings

value: `ShopPaymentSettings`

  - Shop: export interface Shop {
  /**
   * The shop’s country code.
   */
  countryCode?: string;

  /**
   * The shop’s myshopify.com domain.
   */
  myshopifyDomain?: string;

  /**
   * The shop’s name.
   */
  name?: string;

  /**
   * Settings related to payments.
   */
  paymentSettings?: ShopPaymentSettings;

  /**
   * The shop’s primary storefront URL.
   */
  storefrontUrl?: string | null;
}
  - ShopPaymentSettings: export interface ShopPaymentSettings {
  /**
   * The three-letter code for the shop’s primary currency.
   */
  currencyCode?: string;
}
Settings related to payments.

### storefrontUrl

value: `string | null`

The shop’s primary storefront URL.

### ShopPaymentSettings

Settings related to payments.

### currencyCode

value: `string`

The three-letter code for the shop’s primary currency.

# settings

Provides access to the settings JSON object as set by the [GraphQL Admin API](https://shopify.dev/docs/apps/marketing/pixels/getting-started#step-5-create-a-web-pixel-setting-for-the-store) **(Web pixel app extensions only)**. The structure of this object is a string keyed hash map: `Record<string, any>`.

```javascript
// ONLY AVAILABLE IN APP PIXELS

import {register} from '@shopify/web-pixels-extension';

register(({analytics, settings}) => {
  analytics.subscribe('page_viewed', (event) => {
    console.log(settings);
    /**
     * {
     *   "accountID": 234
     * }
     */
  });
});

```

# DOM Pixel Events API

## clicked

The `clicked` event logs an instance where a customer clicks on a page element.
[View clicked](https://shopify.dev/docs/api/web-pixels-api/dom-events/clicked)

## form_submitted

The `form_submitted` event logs an instance where a form on a page is submitted.
[View form_submitted](https://shopify.dev/docs/api/web-pixels-api/dom-events/form-submitted)

## input_blurred

The `input_blurred` event logs an instance where an input on a page loses focus.
[View input_blurred](https://shopify.dev/docs/api/web-pixels-api/dom-events/input-blurred)

## input_changed

The `input_changed` event logs an instance where an input value changes.
[View input_changed](https://shopify.dev/docs/api/web-pixels-api/dom-events/input-changed)

## input_focused

The `input_focused` event logs an instance where an input on a page gains focus.
[View input_focused](https://shopify.dev/docs/api/web-pixels-api/dom-events/input-focused)

# clicked

The `clicked` event logs an instance where a customer clicks on a page element.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('clicked', (event) => {
    // Example for accessing event data
    const element = event.data.element;

    const elementId = element.id;
    const elementValue = element.value;
    const elementHref = element.href;

    const payload = {
      event_name: event.name,
      event_data: {
        id: elementId,
        value: elementValue,
        url: elementHref,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('clicked', (event) => {
  // Example for accessing event data
  const element = event.data.element;

  const elementId = element.id;
  const elementValue = element.value;
  const elementHref = element.href;

  const payload = {
    event_name: event.name,
    event_data: {
      id: elementId,
      value: elementValue,
      url: elementHref,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsClicked

The `clicked` event logs an instance where any element on the page has been clicked

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `MouseEventData`

  - MouseEventData: export interface MouseEventData {
  clientX?: number;
  clientY?: number;
  element?: GenericElement;
  movementX?: number;
  movementY?: number;
  offsetX?: number;
  offsetY?: number;
  pageX?: number;
  pageY?: number;
  screenX?: number;
  screenY?: number;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Dom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### MouseEventData

An object that contains data about a mouse event

### clientX

value: `number`


### clientY

value: `number`


### element

value: `GenericElement`

  - GenericElement: export interface GenericElement {
  /**
   * The href attribute of an element
   */
  href?: string | null;

  /**
   * The id attribute of an element
   */
  id?: string | null;

  /**
   * The name attribute of an element
   */
  name?: string | null;

  /**
   * A string representation of the tag of an element
   */
  tagName?: string | null;

  /**
   * The type attribute of an element. Often relevant for an input or button
   * element.
   */
  type?: string | null;

  /**
   * The value attribute of an element. Often relevant for an input element.
   */
  value?: string | null;
}

### movementX

value: `number`


### movementY

value: `number`


### offsetX

value: `number`


### offsetY

value: `number`


### pageX

value: `number`


### pageY

value: `number`


### screenX

value: `number`


### screenY

value: `number`


### GenericElement

An object that contains data about a generic element type

### href

value: `string | null`

The href attribute of an element

### id

value: `string | null`

The id attribute of an element

### name

value: `string | null`

The name attribute of an element

### tagName

value: `string | null`

A string representation of the tag of an element

### type

value: `string | null`

The type attribute of an element. Often relevant for an input or button element.

### value

value: `string | null`

The value attribute of an element. Often relevant for an input element.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# form_submitted

The `form_submitted` event logs an instance where a form on a page is submitted.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('form_submitted', (event) => {
    // Example for accessing event data
    const element = event.data.element;

    const elementId = element.id;
    const formAction = element.action;
    const emailRegex = /email/i;
    const [email] = element.elements
      .filter((item) => emailRegex.test(item.id) || emailRegex.test(item.name))
      .map((item) => item.value);
    const formDetails = element.elements.map((item) => {
      return {
        id: item.id,
        name: item.name,
        value: item.value,
      };
    });

    const payload = {
      event_name: event.name,
      event_data: {
        id: elementId,
        url: formAction,
        email: email,
        formDetails: formDetails,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('form_submitted', (event) => {
  // Example for accessing event data
  const element = event.data.element;

  const elementId = element.id;
  const formAction = element.action;
  const emailRegex = /email/i;
  const [email] = element.elements
    .filter((item) => emailRegex.test(item.id) || emailRegex.test(item.name))
    .map((item) => item.value);
  const formDetails = element.elements.map((item) => {
    return {
      id: item.id,
      name: item.name,
      value: item.value,
    };
  });

  const payload = {
    event_name: event.name,
    event_data: {
      id: elementId,
      url: formAction,
      email: email,
      formDetails: formDetails,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsFormSubmitted

The `form_submitted` event logs an instance where a form element on the page has been submitted

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsFormSubmittedData`

  - PixelEventsFormSubmitted: export interface PixelEventsFormSubmitted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsFormSubmittedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Dom;
}
  - PixelEventsFormSubmittedData: export interface PixelEventsFormSubmittedData {
  element?: FormElement;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Dom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsFormSubmittedData

### element

value: `FormElement`

  - FormElement: export interface FormElement {
  /**
   * The action attribute of a form element
   */
  action?: string | null;
  elements?: InputElement[];

  /**
   * The id attribute of an element
   */
  id?: string | null;
}

### FormElement

An object that contains data about a form element type

### action

value: `string | null`

The action attribute of a form element

### elements

value: `InputElement[]`

  - InputElement: export interface InputElement {
  /**
   * The id attribute of an element
   */
  id?: string | null;

  /**
   * The name attribute of an element
   */
  name?: string | null;

  /**
   * A string representation of the tag of an element
   */
  tagName?: string | null;

  /**
   * The type attribute of an element. Often relevant for an input or button
   * element.
   */
  type?: string | null;

  /**
   * The value attribute of an element. Often relevant for an input element.
   */
  value?: string | null;
}

### id

value: `string | null`

The id attribute of an element

### InputElement

An object that contains data about an input element type

### id

value: `string | null`

The id attribute of an element

### name

value: `string | null`

The name attribute of an element

### tagName

value: `string | null`

A string representation of the tag of an element

### type

value: `string | null`

The type attribute of an element. Often relevant for an input or button element.

### value

value: `string | null`

The value attribute of an element. Often relevant for an input element.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# input_blurred

The `input_blurred` event logs an instance where an input on a page loses focus.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('input_blurred', (event) => {
    // Example for accessing event data
    const element = event.data.element;

    const elementId = element.id;
    const elementValue = element.value;

    const payload = {
      event_name: event.name,
      event_data: {
        id: elementId,
        value: elementValue,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('input_blurred', (event) => {
  // Example for accessing event data
  const element = event.data.element;

  const elementId = element.id;
  const elementValue = element.value;

  const payload = {
    event_name: event.name,
    event_data: {
      id: elementId,
      value: elementValue,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsInputBlurred

The `input_blurred` event logs an instance where an input, textarea, or select element on the page has lost focus

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsInputBlurredData`

  - PixelEventsInputBlurred: export interface PixelEventsInputBlurred {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsInputBlurredData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Dom;
}
  - PixelEventsInputBlurredData: export interface PixelEventsInputBlurredData {
  element?: InputElement;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Dom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsInputBlurredData

### element

value: `InputElement`

  - InputElement: export interface InputElement {
  /**
   * The id attribute of an element
   */
  id?: string | null;

  /**
   * The name attribute of an element
   */
  name?: string | null;

  /**
   * A string representation of the tag of an element
   */
  tagName?: string | null;

  /**
   * The type attribute of an element. Often relevant for an input or button
   * element.
   */
  type?: string | null;

  /**
   * The value attribute of an element. Often relevant for an input element.
   */
  value?: string | null;
}

### InputElement

An object that contains data about an input element type

### id

value: `string | null`

The id attribute of an element

### name

value: `string | null`

The name attribute of an element

### tagName

value: `string | null`

A string representation of the tag of an element

### type

value: `string | null`

The type attribute of an element. Often relevant for an input or button element.

### value

value: `string | null`

The value attribute of an element. Often relevant for an input element.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# input_changed

The `input_changed` event logs an instance where an input value changes.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('input_changed', (event) => {
    // Example for accessing event data
    const element = event.data.element;

    const elementId = element.id;
    const elementValue = element.value;

    const payload = {
      event_name: event.name,
      event_data: {
        id: elementId,
        value: elementValue,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('input_changed', (event) => {
  // Example for accessing event data
  const element = event.data.element;

  const elementId = element.id;
  const elementValue = element.value;

  const payload = {
    event_name: event.name,
    event_data: {
      id: elementId,
      value: elementValue,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsInputChanged

The `input_changed` event logs an instance where an input, textarea, or select element on the page has changed

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsInputChangedData`

  - PixelEventsInputChanged: export interface PixelEventsInputChanged {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsInputChangedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Dom;
}
  - PixelEventsInputChangedData: export interface PixelEventsInputChangedData {
  element?: InputElement;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Dom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsInputChangedData

### element

value: `InputElement`

  - InputElement: export interface InputElement {
  /**
   * The id attribute of an element
   */
  id?: string | null;

  /**
   * The name attribute of an element
   */
  name?: string | null;

  /**
   * A string representation of the tag of an element
   */
  tagName?: string | null;

  /**
   * The type attribute of an element. Often relevant for an input or button
   * element.
   */
  type?: string | null;

  /**
   * The value attribute of an element. Often relevant for an input element.
   */
  value?: string | null;
}

### InputElement

An object that contains data about an input element type

### id

value: `string | null`

The id attribute of an element

### name

value: `string | null`

The name attribute of an element

### tagName

value: `string | null`

A string representation of the tag of an element

### type

value: `string | null`

The type attribute of an element. Often relevant for an input or button element.

### value

value: `string | null`

The value attribute of an element. Often relevant for an input element.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# input_focused

The `input_focused` event logs an instance where an input on a page gains focus.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('input_focused', (event) => {
    // Example for accessing event data
    const element = event.data.element;

    const elementId = element.id;
    const elementValue = element.value;

    const payload = {
      event_name: event.name,
      event_data: {
        id: elementId,
        value: elementValue,
      },
    };

    // Example for sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

```javascript
analytics.subscribe('input_focused', (event) => {
  // Example for accessing event data
  const element = event.data.element;

  const elementId = element.id;
  const elementValue = element.value;

  const payload = {
    event_name: event.name,
    event_data: {
      id: elementId,
      value: elementValue,
    },
  };

  // Example for sending event to third party servers
  fetch('https://example.com/pixel', {
    method: 'POST',
    body: JSON.stringify(payload),
    keepalive: true,
  });
});

```

## Properties

### PixelEventsInputFocused

The `input_focused` event logs an instance where an input, textarea, or select element on the page has received focus

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsInputFocusedData`

  - PixelEventsInputFocused: export interface PixelEventsInputFocused {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsInputFocusedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.Dom;
}
  - PixelEventsInputFocusedData: export interface PixelEventsInputFocusedData {
  element?: InputElement;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.Dom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsInputFocusedData

### element

value: `InputElement`

  - InputElement: export interface InputElement {
  /**
   * The id attribute of an element
   */
  id?: string | null;

  /**
   * The name attribute of an element
   */
  name?: string | null;

  /**
   * A string representation of the tag of an element
   */
  tagName?: string | null;

  /**
   * The type attribute of an element. Often relevant for an input or button
   * element.
   */
  type?: string | null;

  /**
   * The value attribute of an element. Often relevant for an input element.
   */
  value?: string | null;
}

### InputElement

An object that contains data about an input element type

### id

value: `string | null`

The id attribute of an element

### name

value: `string | null`

The name attribute of an element

### tagName

value: `string | null`

A string representation of the tag of an element

### type

value: `string | null`

The type attribute of an element. Often relevant for an input or button element.

### value

value: `string | null`

The value attribute of an element. Often relevant for an input element.

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# Advanced DOM Pixel Events API

## advanced_dom_available

The `advanced_dom_available` event is published when the DOM has been loaded and is available for interaction.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_available](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-available)

## advanced_dom_changed

The `advanced_dom_changed` event is published when the DOM has been changed in any way, such as an element being added, removed, or modified.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_changed](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-changed)

## advanced_dom_clicked

The `advanced_dom_clicked` event is published when a customer clicks on a page element.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_clicked](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-clicked)

## advanced_dom_clipboard

The `advanced_dom_clipboard` event is published when a customer has cut, copied or pasted text to or from the clipboard.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_clipboard](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-clipboard)

## advanced_dom_form_submitted

The `advanced_dom_form_submitted` event is published when a form on a page is submitted.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_form_submitted](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-form-submitted)

## advanced_dom_input_blurred

The `advanced_dom_input_blurred` event is published when an input on a page loses focus.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_input_blurred](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-input-blurred)

## advanced_dom_input_changed

The `advanced_dom_input_changed` event is published when an input value changes.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_input_changed](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-input-changed)

## advanced_dom_input_focused

The `advanced_dom_input_focused` event is published when an input on a page gains focus.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_input_focused](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-input-focused)

## advanced_dom_mouse_moved

The `advanced_dom_mouse_moved` event is published when a customer moves their cursor over the page.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_mouse_moved](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-mouse-moved)

## advanced_dom_scrolled

The `advanced_dom_scrolled` event is published when a customer scrolls on a page or in a scrollable element.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_scrolled](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-scrolled)

## advanced_dom_selection_changed

The `advanced_dom_selection_changed` event is published when a customer uses text selection on a page.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_selection_changed](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-selection-changed)

## advanced_dom_window_resized

The `advanced_dom_window_resized` event is published when a customer resizes their browser window.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.
[View advanced_dom_window_resized](https://shopify.dev/docs/api/web-pixels-api/advanced-dom-events/advanced-dom-window-resized)

# advanced_dom_available

The `advanced_dom_available` event is published when the DOM has been loaded and is available for interaction.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

const domFragmentMap = new Map();

function buildHtml(fragment) {
  const node = fragment.node;

  if (!domFragmentMap.has(node.serializationId)) {
    domFragmentMap.set(node.serializationId, fragment);
  }

  // Handle text nodes (nodeType === 3)
  if (node.nodeType === 3) {
    return node.textContent || '';
  }

  // Handle document node
  if (node.nodeType === 9) {
    return fragment.children.reduce(
      (html, childFragment) => `${html}${buildHtml(childFragment)}`,
      '',
    );
  }

  // Doctype node
  if (node.nodeType === 10) {
    const attrs = node.attributes;
    let html = '<!DOCTYPE';
    if (attrs.name) {
      html += ` ${attrs.name}`;
    }
    if (attrs.publicId) {
      html += ` PUBLIC "${attrs.publicId}"`;
    }
    if (attrs.systemId) {
      html += ` "${attrs.systemId}"`;
    }
    return `${html}>`;
  }

  if (!node.tagName) return '';

  // Handle element nodes
  const tagName = node.tagName.toLowerCase();
  const attributes = Object.keys(node.attributes)
    .filter((attr) => node.attributes[attr])
    .map((attr) => ` ${attr}="${node.attributes[attr]}"`)
    .join('');

  // Start tag
  let html = `<${tagName}${attributes}${voidElements.has(tagName) ? ' /' : ''}>`;

  // Add children recursively
  fragment.children.forEach((childFragment) => {
    html += buildHtml(childFragment);
  });

  // End tag
  if (!voidElements.has(tagName)) {
    html += `</${tagName}>`;
  }

  return html;
}

register(({analytics}) => {
  let root;
  analytics.subscribe('advanced_dom_available', (event) => {
    root = event.data.root;

    // E.g. rebuilds the HTML string of the whole document.
    buildHtml(root);
  });
});

```

## Properties

### PixelEventsAdvancedDomAvailable

The `advanced_dom_available` event logs an instance where the DOM has been loaded and is available for interaction.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomAvailableData`

  - PixelEventsAdvancedDomAvailable: export interface PixelEventsAdvancedDomAvailable {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomAvailableData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event.
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomAvailableData: export interface PixelEventsAdvancedDomAvailableData {
  /**
   * A fragment that contains the entire DOM tree, starting with the document
   * node.
   */
  root?: DomFragment;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event.

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomAvailableData

### root

value: `DomFragment`

  - DomFragment: export interface DomFragment {
  /**
   * Array of `DomFragment` representing children of the parent `DomFragment`.
   */
  children?: DomFragment[];

  /**
   * The node object of the `DomFragment`.
   */
  node?: DomNode;

  /**
   * The serialization ID of the parent node. -1 if there are no parents.
   */
  parentSerializationId?: number;

  /**
   * The serialization ID of the previous sibling node. -1 if there are no
   * previous siblings.
   */
  prevSiblingSerializationId?: number;
}
A fragment that contains the entire DOM tree, starting with the document node.

### DomFragment

Representation of a sub-tree of the host document.

### children

value: `DomFragment[]`

  - DomFragment: export interface DomFragment {
  /**
   * Array of `DomFragment` representing children of the parent `DomFragment`.
   */
  children?: DomFragment[];

  /**
   * The node object of the `DomFragment`.
   */
  node?: DomNode;

  /**
   * The serialization ID of the parent node. -1 if there are no parents.
   */
  parentSerializationId?: number;

  /**
   * The serialization ID of the previous sibling node. -1 if there are no
   * previous siblings.
   */
  prevSiblingSerializationId?: number;
}
Array of `DomFragment` representing children of the parent `DomFragment`.

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object of the `DomFragment`.

### parentSerializationId

value: `number`

The serialization ID of the parent node. -1 if there are no parents.

### prevSiblingSerializationId

value: `number`

The serialization ID of the previous sibling node. -1 if there are no previous siblings.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_changed

The `advanced_dom_changed` event is published when the DOM has been changed in any way, such as an element being added, removed, or modified.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

const domFragmentMap = new Map();

register(({analytics}) => {
  let root;

  // Get the root node when it becomes available.
  analytics.subscribe('advanced_dom_available', (event) => {
    root = event.data.root;
  });

  // Keep the domFragmentMap up to date for reference with other events.
  analytics.subscribe('advanced_dom_changed', (event) => {
    // Handle added fragments
    event.data.addedFragments.forEach((addedFragment) => {
      const parentFragment = domFragmentMap.get(
        addedFragment.parentSerializationId,
      );
      if (parentFragment) {
        // Find the correct insertion index based on prevSiblingSerializationId
        // Default to end if no prev sibling found
        let insertIndex = parentFragment.children.length;
        if (addedFragment.prevSiblingSerializationId !== -1) {
          const prevSiblingIndex = parentFragment.children.findIndex(
            (childFragment) =>
              childFragment.node.serializationId ===
              addedFragment.prevSiblingSerializationId,
          );
          // Insert after the previous sibling
          insertIndex = prevSiblingIndex + 1;
        }
        // Insert at the calculated index
        parentFragment.children.splice(insertIndex, 0, addedFragment);
        domFragmentMap.set(addedFragment.node.serializationId, addedFragment);
      }
    });

    // Handle removed nodes
    event.data.removedNodes.forEach((removedNode) => {
      const removedFragment = domFragmentMap.get(removedNode.serializationId);
      const parentFragment = domFragmentMap.get(
        removedFragment.parentSerializationId,
      );
      if (parentFragment) {
        parentFragment.children = parentFragment.children.filter(
          (childFragment) =>
            childFragment.node.serializationId !== removedNode.serializationId,
        );
        domFragmentMap.delete(removedNode.serializationId);
      }
    });

    // Handle modified nodes
    event.data.modifiedNodes.forEach((modifiedNode) => {
      const fragment = domFragmentMap.get(modifiedNode.serializationId);
      if (fragment) {
        fragment.node = modifiedNode;
      }
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomChanged

The `advanced_dom_changed` event logs an instance where the DOM has been changed in any way, such as an element being added, removed, or modified.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomChangedData`

  - PixelEventsAdvancedDomChanged: export interface PixelEventsAdvancedDomChanged {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomChangedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event.
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomChangedData: export interface PixelEventsAdvancedDomChangedData {
  /**
   * Array of `DomFragment` added to the document. Each `DomFragment` represents
   * a sub-tree of the document. Use the `parentSerializationId` and the
   * `prevSiblingSerializationId` to reconstruct the document.
   */
  addedFragments?: DomFragment[];

  /**
   * Array of `DomNode` that have had their attributes changed. Use the
   * `serializationId` of each to find it and update your own representation of
   * the document.
   */
  modifiedNodes?: DomNode[];

  /**
   * Array of `DomNode` removed from the document. Use the `serializationId` of
   * each to find it and remove it from your own representation of the document.
   */
  removedNodes?: DomNode[];
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event.

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomChangedData

### addedFragments

value: `DomFragment[]`

  - DomFragment: export interface DomFragment {
  /**
   * Array of `DomFragment` representing children of the parent `DomFragment`.
   */
  children?: DomFragment[];

  /**
   * The node object of the `DomFragment`.
   */
  node?: DomNode;

  /**
   * The serialization ID of the parent node. -1 if there are no parents.
   */
  parentSerializationId?: number;

  /**
   * The serialization ID of the previous sibling node. -1 if there are no
   * previous siblings.
   */
  prevSiblingSerializationId?: number;
}
Array of `DomFragment` added to the document. Each `DomFragment` represents a sub-tree of the document. Use the `parentSerializationId` and the `prevSiblingSerializationId` to reconstruct the document.

### modifiedNodes

value: `DomNode[]`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
Array of `DomNode` that have had their attributes changed. Use the `serializationId` of each to find it and update your own representation of the document.

### removedNodes

value: `DomNode[]`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
Array of `DomNode` removed from the document. Use the `serializationId` of each to find it and remove it from your own representation of the document.

### DomFragment

Representation of a sub-tree of the host document.

### children

value: `DomFragment[]`

  - DomFragment: export interface DomFragment {
  /**
   * Array of `DomFragment` representing children of the parent `DomFragment`.
   */
  children?: DomFragment[];

  /**
   * The node object of the `DomFragment`.
   */
  node?: DomNode;

  /**
   * The serialization ID of the parent node. -1 if there are no parents.
   */
  parentSerializationId?: number;

  /**
   * The serialization ID of the previous sibling node. -1 if there are no
   * previous siblings.
   */
  prevSiblingSerializationId?: number;
}
Array of `DomFragment` representing children of the parent `DomFragment`.

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object of the `DomFragment`.

### parentSerializationId

value: `number`

The serialization ID of the parent node. -1 if there are no parents.

### prevSiblingSerializationId

value: `number`

The serialization ID of the previous sibling node. -1 if there are no previous siblings.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_clicked

The `advanced_dom_clicked` event is published when a customer clicks on a page element.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_clicked', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        url: node.attributes?.href,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomClicked

The `advanced_dom_clicked` event logs an instance where any element on the page has been clicked

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `AdvancedMouseEventData`

  - AdvancedMouseEventData: export interface AdvancedMouseEventData {
  clientX?: number;
  clientY?: number;
  movementX?: number;
  movementY?: number;

  /**
   * The node object for the event target.
   */
  node?: DomNode;
  offsetX?: number;
  offsetY?: number;
  pageX?: number;
  pageY?: number;
  screenX?: number;
  screenY?: number;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### AdvancedMouseEventData

An object that contains data about a mouse event.

### clientX

value: `number`


### clientY

value: `number`


### movementX

value: `number`


### movementY

value: `number`


### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target.

### offsetX

value: `number`


### offsetY

value: `number`


### pageX

value: `number`


### pageY

value: `number`


### screenX

value: `number`


### screenY

value: `number`


### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_clipboard

The `advanced_dom_clipboard` event is published when a customer has cut, copied or pasted text to or from the clipboard.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_clipboard', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        value: node.attributes?.value,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomClipboard

The `clipboard` event logs an instance where the user has cut, copied or pasted text to or from the clipboard.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomClipboardData`

  - PixelEventsAdvancedDomClipboard: export interface PixelEventsAdvancedDomClipboard {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomClipboardData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event.
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomClipboardData: export interface PixelEventsAdvancedDomClipboardData {
  /**
   * The action that was taken with the clipboard.
   */
  action?: PixelEventsAdvancedDomClipboardDataAction;

  /**
   * The node object for the event target.
   */
  node?: DomNode;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event.

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomClipboardData

### action

value: `PixelEventsAdvancedDomClipboardDataAction`

  - PixelEventsAdvancedDomClipboard: export interface PixelEventsAdvancedDomClipboard {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomClipboardData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event.
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomClipboardData: export interface PixelEventsAdvancedDomClipboardData {
  /**
   * The action that was taken with the clipboard.
   */
  action?: PixelEventsAdvancedDomClipboardDataAction;

  /**
   * The node object for the event target.
   */
  node?: DomNode;
}
  - PixelEventsAdvancedDomClipboardDataAction: export enum PixelEventsAdvancedDomClipboardDataAction {
  Copy = 'copy',
  Cut = 'cut',
  Paste = 'paste',
}
The action that was taken with the clipboard.

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target.

### PixelEventsAdvancedDomClipboardDataAction

### Copy

value: `copy`


### Cut

value: `cut`


### Paste

value: `paste`


### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_form_submitted

The `advanced_dom_form_submitted` event is published when a form on a page is submitted.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_form_submitted', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        action: node.attributes?.action,
        method: node.attributes?.method,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomFormSubmitted

The `advanced_dom_form_submitted` event logs an instance where a form element on the page has been submitted

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomFormSubmittedData`

  - PixelEventsAdvancedDomFormSubmitted: export interface PixelEventsAdvancedDomFormSubmitted {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomFormSubmittedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomFormSubmittedData: export interface PixelEventsAdvancedDomFormSubmittedData {
  /**
   * The node object for the event target. In this case, it is the form element
   * that was submitted.
   */
  node?: DomNode;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomFormSubmittedData

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target. In this case, it is the form element that was submitted.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_input_blurred

The `advanced_dom_input_blurred` event is published when an input on a page loses focus.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_input_blurred', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        value: node.attributes?.value,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomInputBlurred

The `advanced_dom_input_blurred` event logs an instance where an input, textarea, or select element on the page has lost focus

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomInputBlurredData`

  - PixelEventsAdvancedDomInputBlurred: export interface PixelEventsAdvancedDomInputBlurred {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomInputBlurredData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomInputBlurredData: export interface PixelEventsAdvancedDomInputBlurredData {
  /**
   * The node object for the event target.
   */
  node?: DomNode;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomInputBlurredData

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_input_changed

The `advanced_dom_input_changed` event is published when an input value changes.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_input_changed', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        value: node.attributes?.value,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomInputChanged

The `advanced_dom_input_changed` event logs an instance where an input, textarea, or select element on the page has changed

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomInputChangedData`

  - PixelEventsAdvancedDomInputChanged: export interface PixelEventsAdvancedDomInputChanged {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomInputChangedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomInputChangedData: export interface PixelEventsAdvancedDomInputChangedData {
  /**
   * The node object for the event target.
   */
  node?: DomNode;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomInputChangedData

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_input_focused

The `advanced_dom_input_focused` event is published when an input on a page gains focus.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_input_focused', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        value: node.attributes?.value,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomInputFocused

The `advanced_dom_input_focused` event logs an instance where an input, textarea, or select element on the page has received focus

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomInputFocusedData`

  - PixelEventsAdvancedDomInputFocused: export interface PixelEventsAdvancedDomInputFocused {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomInputFocusedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomInputFocusedData: export interface PixelEventsAdvancedDomInputFocusedData {
  /**
   * The node object for the event target.
   */
  node?: DomNode;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomInputFocusedData

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_mouse_moved

The `advanced_dom_mouse_moved` event is published when a customer moves their cursor over the page.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_mouse_moved', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        clientX: event.data.clientX,
        clientY: event.data.clientY,
        movementX: event.data.movementX,
        movementY: event.data.movementY,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomMouseMoved

The `advanced_dom_mouse_moved` event logs an instance where the user has moved the mouse on the page.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `AdvancedMouseEventData`

  - AdvancedMouseEventData: export interface AdvancedMouseEventData {
  clientX?: number;
  clientY?: number;
  movementX?: number;
  movementY?: number;

  /**
   * The node object for the event target.
   */
  node?: DomNode;
  offsetX?: number;
  offsetY?: number;
  pageX?: number;
  pageY?: number;
  screenX?: number;
  screenY?: number;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### AdvancedMouseEventData

An object that contains data about a mouse event.

### clientX

value: `number`


### clientY

value: `number`


### movementX

value: `number`


### movementY

value: `number`


### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target.

### offsetX

value: `number`


### offsetY

value: `number`


### pageX

value: `number`


### pageY

value: `number`


### screenX

value: `number`


### screenY

value: `number`


### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_scrolled

The `advanced_dom_scrolled` event is published when a customer scrolls on a page or in a scrollable element.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_scrolled', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        x: node.scroll.x,
        y: node.scroll.y,
        width: node.scroll.width,
        height: node.scroll.height,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomScrolled

The `advanced_dom_scrolled` event logs an instance where the user has scrolled the page or an element on the page.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomScrolledData`

  - PixelEventsAdvancedDomScrolled: export interface PixelEventsAdvancedDomScrolled {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomScrolledData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event.
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomScrolledData: export interface PixelEventsAdvancedDomScrolledData {
  /**
   * The element that is currently being scrolled. Can be either the document or
   * an element on the page.
   */
  node?: DomNode;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event.

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomScrolledData

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The element that is currently being scrolled. Can be either the document or an element on the page.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_selection_changed

The `advanced_dom_selection_changed` event is published when a customer uses text selection on a page.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_selection_changed', (event) => {
    // Accessing event payload
    const node = event.data.node;

    if (node?.nodeType !== Node.ELEMENT_NODE) return;

    const payload = {
      event_name: event.name,
      event_data: {
        id: node.serializationId,
        value: node.attributes?.value,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomSelectionChanged

The `advanced_dom_selection_changed` event logs an instance where the user has changed the selection of text on the page.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomSelectionChangedData`

  - PixelEventsAdvancedDomSelectionChanged: export interface PixelEventsAdvancedDomSelectionChanged {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;
  data?: PixelEventsAdvancedDomSelectionChangedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event.
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomSelectionChangedData: export interface PixelEventsAdvancedDomSelectionChangedData {
  /**
   * The node object for the event target.
   */
  node?: DomNode;
}

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event.

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### PixelEventsAdvancedDomSelectionChangedData

### node

value: `DomNode`

  - DomNode: export interface DomNode {
  /**
   * The type of node based on the native DOM API's
   * [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of
   * nodes from each other, such as elements, text and comments.
   */
  nodeType?: number;

  /**
   * The serialization id of the node. This is a unique identifier for the node
   * based on its stable reference in the host DOM tree.
   */
  serializationId?: number;

  /**
   * A dictionary of attributes of an element. Only available on element nodes.
   */
  attributes?: {[key: string]: string};

  /**
   * The checked state of an element. Only available on input element nodes.
   */
  checked?: boolean;

  /**
   * The coordinates of the element in the viewport. Only available on element
   * nodes.
   */
  clientRect?: ClientRect;

  /**
   * The scroll coordinates of the element in the viewport. Only available on
   * element nodes.
   */
  scroll?: ClientRect;

  /**
   * A string representation of the tag of a node. Only available on element
   * nodes.
   */
  tagName?: string;

  /**
   * The text content of an element. Only available on text nodes.
   */
  textContent?: string;
}
The node object for the event target.

### DomNode

Representation of a node in the document.

### attributes

value: `{ [key: string]: string; }`

A dictionary of attributes of an element. Only available on element nodes.

### checked

value: `boolean`

The checked state of an element. Only available on input element nodes.

### clientRect

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The coordinates of the element in the viewport. Only available on element nodes.

### nodeType

value: `number`

The type of node based on the native DOM API's [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType) values. It distinguishes different kind of nodes from each other, such as elements, text and comments.

### scroll

value: `ClientRect`

  - ClientRect: export interface ClientRect {
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}
The scroll coordinates of the element in the viewport. Only available on element nodes.

### serializationId

value: `number`

The serialization id of the node. This is a unique identifier for the node based on its stable reference in the host DOM tree.

### tagName

value: `string`

A string representation of the tag of a node. Only available on element nodes.

### textContent

value: `string`

The text content of an element. Only available on text nodes.

### ClientRect

An object that contains data about an element coordinates in a viewport.

### height

value: `number`


### width

value: `number`


### x

value: `number`


### y

value: `number`


### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


# advanced_dom_window_resized

The `advanced_dom_window_resized` event is published when a customer resizes their browser window.

> Shopify Plus:
> This event is limited on [checkout](https://help.shopify.com/manual/checkout-settings) to stores on the [Shopify Plus](https://www.shopify.com/plus) plan.

```javascript
import {register} from '@shopify/web-pixels-extension';

register(({analytics}) => {
  analytics.subscribe('advanced_dom_window_resized', (event) => {
    // Accessing event payload
    const payload = {
      event_name: event.name,
      event_data: {
        width: event.context.window.innerWidth,
        height: event.context.window.innerHeight,
      },
    };

    // E.g. sending event to third party servers
    fetch('https://example.com/pixel', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
    });
  });
});

```

## Properties

### PixelEventsAdvancedDomWindowResized

The `advanced_dom_window_resized` event logs an instance where the browser window has been resized.

### clientId

value: `string`

The client-side ID of the customer, provided by Shopify

### data

value: `PixelEventsAdvancedDomWindowResizedData`

  - PixelEventsAdvancedDomWindowResized: export interface PixelEventsAdvancedDomWindowResized {
  /**
   * The client-side ID of the customer, provided by Shopify
   */
  clientId?: string;

  /**
   * No additional data is provided by design. Use the event context to get the
   * latest window size.
   */
  data?: PixelEventsAdvancedDomWindowResizedData;
  /**
   * The ID of the customer event
   */
  id?: string;

  /**
   * The name of the customer event.
   */
  name?: string;

  /**
   * The sequence index number of the event.
   */
  seq?: number;
  /**
   * The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
   */
  timestamp?: string;
  type?: EventType.AdvancedDom;
}
  - PixelEventsAdvancedDomWindowResizedData: export interface PixelEventsAdvancedDomWindowResizedData {}
No additional data is provided by design. Use the event context to get the latest window size.

### id

value: `string`

The ID of the customer event

### name

value: `string`

The name of the customer event.

### seq

value: `number`

The sequence index number of the event.

### timestamp

value: `string`

The timestamp of when the customer event occurred, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format

### type

value: `EventType.AdvancedDom`

  - EventType: export enum EventType {
  AdvancedDom = 'advanced-dom',
  Custom = 'custom',
  Dom = 'dom',
  Meta = 'meta',
  Standard = 'standard',
}

### EventType

### AdvancedDom

value: `advanced-dom`


### Custom

value: `custom`


### Dom

value: `dom`


### Meta

value: `meta`


### Standard

value: `standard`


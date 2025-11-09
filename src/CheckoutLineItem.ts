import {
  MoneyV2,
  ProductVariant,
  Product,
  Checkout,
  DiscountAllocation,
  Property,
  SellingPlanAllocation,
} from "@";

export interface CheckoutLineItem {
  /**
   * The discounts that have been applied to the checkout line item by a
   * discount application.
   */
  discountAllocations: DiscountAllocation[];

  /**
   * The combined price of all of the items in the line item
   * after line-level discounts have been applied. This property
   * is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  finalLinePrice: MoneyV2;

  /**
   * A globally unique identifier.
   */
  id: string | null;

  /**
   * The properties of the line item. A shop may add, or enable customers to add
   * custom information to a line item. Line item properties consist of a key
   * and value pair. This property is only available if the shop has [upgraded
   * to Checkout Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  properties: Property[];

  /**
   * The quantity of the line item.
   */
  quantity: number;

  /**
   * The selling plan associated with the line item and the effect that
   * each selling plan has on variants when they're purchased. This
   * property is only available if the shop has [upgraded to Checkout
   * Extensibility](https://help.shopify.com/manual/checkout-settings/checkout-extensibility/checkout-upgrade).
   */
  sellingPlanAllocation: SellingPlanAllocation | null;

  /**
   * The title of the line item. Defaults to the product's title.
   */
  title: string | null;

  /**
   * Product variant of the line item.
   */
  variant: ProductVariant | null;
}

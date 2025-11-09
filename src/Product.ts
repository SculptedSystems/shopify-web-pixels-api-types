export interface Product {
  /**
   * The ID of the product.
   */
  id: string | null;

  /**
   * The product’s title.
   */
  title: string;

  /**
   * The [product
   * type](https://help.shopify.com/en/manual/products/details/product-type)
   * specified by the merchant.
   */
  type: string | null;

  /**
   * The product’s untranslated title.
   */
  untranslatedTitle: string | null;

  /**
   * The relative URL of the product.
   */
  url: string | null;

  /**
   * The product’s vendor name.
   */
  vendor: string;
}

import { MoneyV2, Product, Image } from ".";

export interface ProductVariant {
  /**
   * A globally unique identifier.
   */
  id: string | null;

  /**
   * Image associated with the product variant. This field falls back to the
   * product image if no image is available.
   */
  image: Image | null;

  /**
   * The product variant’s price.
   */
  price: MoneyV2;

  /**
   * The product object that the product variant belongs to.
   */
  product: Product;

  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku: string | null;

  /**
   * The product variant’s title.
   */
  title: string | null;

  /**
   * The product variant’s untranslated title.
   */
  untranslatedTitle: string | null;
}

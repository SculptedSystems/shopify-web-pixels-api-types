import { ProductVariant } from "@";

export interface Collection {
  /**
   * A globally unique identifier.
   */
  id: string;
  productVariants: ProductVariant[];

  /**
   * The collection’s name. Maximum length: 255 characters.
   */
  title: string;
}

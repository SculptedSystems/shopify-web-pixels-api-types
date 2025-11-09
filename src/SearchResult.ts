import { ProductVariant } from ".";

export interface SearchResult {
  productVariants: ProductVariant[];

  /**
   * The search query that was executed
   */
  query: string;
}

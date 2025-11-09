import { SellingPlan } from ".";

export interface SellingPlanAllocation {
  /**
   * A representation of how products and variants can be sold and purchased.
   * For example, an individual selling plan could be '6 weeks of prepaid
   * granola, delivered weekly'.
   */
  sellingPlan: SellingPlan;
}

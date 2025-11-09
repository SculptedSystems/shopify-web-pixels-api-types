import { Cart, Customer, PurchasingCompany, Shop } from "@";

export interface RegisterInitData {
  /**
   * A customer represents a customer account with the shop. Customer accounts
   * store contact information for the customer, saving logged-in customers the
   * trouble of having to provide it at every checkout.
   */
  customer: Customer | null;

  /**
   * A cart represents the merchandise that a customer intends to purchase, and
   * the estimated cost associated with the cart.
   */
  cart: Cart | null;

  /**
   * The shop represents information about the store, such as the store name and
   * currency.
   */
  shop: Shop;

  /**
   * Provides details of the company and the company location that the business customer is
   * purchasing on behalf of. This includes information that can be used to identify the company
   * and the company location that the business customer belongs to.
   */
  purchasingCompany: PurchasingCompany | null;
}

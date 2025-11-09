export interface Customer {
  /**
   * The customer’s email address.
   */
  email: string | null;

  /**
   * The customer’s first name.
   */
  firstName: string | null;

  /**
   * The ID of the customer.
   */
  id: string;

  /**
   * The customer’s last name.
   */
  lastName: string | null;

  /**
   * The total number of orders that the customer has placed.
   */
  ordersCount: number | null;

  /**
   * The customer’s phone number.
   */
  phone: string | null;
}

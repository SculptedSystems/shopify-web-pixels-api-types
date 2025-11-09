import { Context, CustomerPrivacyData, RegisterInitData } from ".";

export interface Init {
  context: Context;
  data: RegisterInitData;
  customerPrivacy: CustomerPrivacyData;
}

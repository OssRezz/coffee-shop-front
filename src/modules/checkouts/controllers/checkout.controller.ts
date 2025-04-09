import { CheckoutInterface } from "../interfaces/checkout-interface";
import { HttpClient } from "../../../services/httpClient";
import { CheckoutModel } from "../models/checkout.mode";
import { mapApiErrors } from "../../../utils/mapApiErrors";
import { TransactionResponse } from "../interfaces/transaction-response";

export const CheckoutController = async (
  data: CheckoutInterface
): Promise<{
  success: boolean;
  data?: TransactionResponse | null;
  errors?: string[];
}> => {
  const checkoutModel = new CheckoutModel(new HttpClient());

  try {
    const res = await checkoutModel.checkout(data);

    return {
      success: true,
      data: res.data,
    };
  } catch (err: any) {
    const errorMessages = mapApiErrors(err);
    return { success: false, errors: errorMessages };
  }
};

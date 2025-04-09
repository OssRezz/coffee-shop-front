import { HttpClient } from "../../../services/httpClient";
import { mapApiErrors } from "../../../utils/mapApiErrors";
import { TransactionInterface } from "../interfaces/transaction-interface";
import { TransactionModel } from "../models/transaction.model";

export const GetByTransactionId = async (
  transactionId: string
): Promise<{
  success: boolean;
  data?: TransactionInterface;
  errors?: string[];
}> => {
  const transactionModel = new TransactionModel(new HttpClient());

  try {
    const data = await transactionModel.getByTransactionId(transactionId);
    return data
      ? { success: true, data }
      : { success: false, errors: ["Transacción no encontrada."] };
  } catch (error: any) {
    const errorMessages = mapApiErrors(error);
    return { success: false, errors: errorMessages };
  }
};

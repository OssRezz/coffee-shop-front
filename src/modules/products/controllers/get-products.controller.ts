import { ProductModel } from "../models/product.model";
import { HttpClient } from "../../../services/httpClient";


export const getProducts = async () => {
  const productModel = new ProductModel(new HttpClient());

  return await productModel.getAll();
};

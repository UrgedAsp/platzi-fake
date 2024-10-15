import { Product } from "../interfaces/Product";

export const getProducts = async (): Promise<Product[]> => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  if (!BASE_URL) {
    throw new Error("Url no encontrada");
  }
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response) {
      throw new Error("Error en la solicitud", response);
    }
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    throw error;
  }
};

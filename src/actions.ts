import { Product } from './types/Product';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: number;
}

export type ProductActionTypes = AddProductAction | DeleteProductAction;

export const addProduct = (newProduct: Product): ProductActionTypes => {
  return {
    type: ADD_PRODUCT,
    payload: newProduct,
  };
};

export const deleteProduct = (productId: number): ProductActionTypes => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

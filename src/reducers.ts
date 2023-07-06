import { Product } from './types/Product';
import { ADD_PRODUCT, DELETE_PRODUCT, ProductActionTypes } from './actions';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;

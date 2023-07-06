import { createStore } from 'redux';
import { ProductActionTypes } from './actions';
import productReducer from './reducers';

const store = createStore(productReducer);

export default store;
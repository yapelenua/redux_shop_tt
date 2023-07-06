import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct } from './actions';
import { Link } from 'react-router-dom';
import { RootState } from './types/root';
import { Product } from './types/Product';
import React from 'react';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const [isAdd, setIsAdd] = useState(false);
  const [productCount, setProductCount] = useState('');
  const [productName, setProductName] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [isError, setIsError] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [sortBy, setSortBy] = useState('alph');

  const addNewProduct = () => {
    const newProduct: Product = {
      id: +(Math.random() * 100).toFixed(0),
      imageUrl: 'some url here',
      name: productName,
      count: productCount,
      size: {
        width: 200,
        height: 200,
      },
      weight: productWeight + 'g',
      comments: ['CommentModel', 'CommentModel'],
    };

    if (productCount && productName && productWeight) {
      dispatch(addProduct(newProduct));
      setIsAdd(false);
      setProductCount('');
      setProductName('');
      setProductWeight('');
      setIsError(false);
    }

    if (!productCount && !productName && !productWeight) {
      setIsError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        const fetchedProducts: Product[] = response.data;
        fetchedProducts.forEach((product) => dispatch(addProduct(product)));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="main">
      <button onClick={() => setIsAdd(true)} className="button">
        Add product
      </button>
      <div>
        <div className="productTable__selects__text">Sort by</div>

        <select
          name="sortBy"
          id="sortBy"
          className="select productTable__selects__sortby"
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <option value="alph">Alph</option>
          <option value="oldest">Count</option>
        </select>
      </div>
      {isAdd && (
        <div className="modal-add">
          <label htmlFor="name">
            Product name
            <input
              type="text"
              id="name"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
          </label>
          <label htmlFor="count">
            Product count
            <input
              type="number"
              name="count"
              id="count"
              value={productCount}
              onChange={(event) => setProductCount(event.target.value)}
            />
          </label>
          <label htmlFor="weight">
            Product weight
            <input
              type="text"
              id="weight"
              value={productWeight}
              onChange={(event) => setProductWeight(event.target.value)}
            />
          </label>
          <div className="modal-button">
            <button className="button" onClick={() => addNewProduct()}>
              Confirm
            </button>
            <button onClick={() => setIsAdd(false)} className="button">
              Cancel
            </button>
          </div>
          {isError && (
            <div>You shouldn't add an empty product. Please, write product information</div>
          )}
        </div>
      )}
      <div className="products">
        {products
          .slice()
          .sort((a, b) => {
            if (sortBy === 'alph') {
              return a.name.localeCompare(b.name);
            } else if (sortBy === 'count') {
              return +a.count - +b.count;
            }
            return 0;
          })
          .map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="products__item">
                <div>Name: {product.name}</div>
                <div>Count: {product.count}</div>
                <div>Weight: {product.weight}</div>
                <button onClick={() => setIsDelete(true)}>Delete</button>
                {isDelete && (
                  <div>
                    <button onClick={() => dispatch(deleteProduct(product.id))}>Confirm</button>
                    <button onClick={() => setIsDelete(false)}>Cancel</button>
                  </div>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import Product from './Product';

const Products = ({ products }) => {
  return (
    <div className="products">
      {products.length 
        ? products?.map(product => <Product key={product.id} {...product} />) 
        : <h2>There's no items to show</h2>}
    </div>
  );
};

export default Products;

import React from 'react';
import Product from './Product';
import { FormattedMessage } from 'react-intl'

const Products = ({ products }) => {
  return (
    <div className="products">
      {products.length 
        ? products?.map(product => <Product key={product.id} {...product} />) 
        : <h2><FormattedMessage id="app.show-products" defaultMessage="There are no products to show"/></h2>}
    </div>
  );
};

export default Products;

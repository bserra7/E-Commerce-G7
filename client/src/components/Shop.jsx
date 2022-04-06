import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions';
import Products from './Products';
import Paginate from './Paginate';
import WhatsApp from './WhatsApp';
import { FormattedMessage } from 'react-intl';

const Shop = () => {
  const dispatch = useDispatch();
  const { products, pag } = useSelector((state) => state);
  const stock = Array.isArray(products) && products?.filter(product => product.stock > 0)
  const top = useRef(null)

  const [productsPerPage, setProductsPerPage] = useState(6);
  const indexOfLastProduct = pag * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(products) && stock.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []); //eslint-disable-line



  return (
    <>
      <div ref={top} className="container shop">
        <h2 className="shop__title"><FormattedMessage id="app.shop-title" defaultMessage="SHOP" /></h2>

        {!Array.isArray(stock) ? (
          <h2><FormattedMessage id="app.no-results" defaultMessage="No results found" /></h2>
        ) : (
          <div>
            <Products products={currentProducts} />
            <div className="pagination">
              <Paginate productsPerPage={productsPerPage} currentPage={pag} productsAmount={stock.length} top={top} />
            </div>
          </div>
        )}
      </div>
      <WhatsApp />
    </>
  )
}

export default Shop;

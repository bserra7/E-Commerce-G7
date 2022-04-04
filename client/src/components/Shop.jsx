import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions';
import Products from './Products';
import Paginate from './Paginate';
import WhatsApp from './WhatsApp';

const Shop = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const stock = Array.isArray(products) && products?.filter(product => product.stock > 0)

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(products) && stock.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []); //eslint-disable-line



  return (
    <>
      <div className="container shop">
        <h2 className="shop__title">SHOP</h2>

        {!Array.isArray(stock) ? (
          <h2>No results found</h2>
        ) : (
          <div>
            <Products products={currentProducts} />
            <div className="pagination">
              <Paginate productsPerPage={productsPerPage} currentPage={currentPage} productsAmount={stock.length} paginate={paginate} />
            </div>
          </div>
        )}
      </div>
      <WhatsApp />
    </>
  )
}

export default Shop;

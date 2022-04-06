import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCategories, getSearchProducts } from "../redux/actions";
import { FormattedMessage, useIntl } from 'react-intl'

export default function SearchBar() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const intl = useIntl();

  const { categories, products } = useSelector(state => state);

  const mapProducts = async () => {
    const product = products?.map(product => ({
      name: product.name,
      images: product.images
    })
    );
    setOptions(product);
  }

  useEffect(() => {
    mapProducts()
  }, [display]); //eslint-disable-line

  useEffect(() =>{
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllProducts());
  }, []); //eslint-disable-line

  const updateProduct = prod => {
    setSearch(prod);
    setDisplay(false);
    dispatch(getSearchProducts(prod, filter))
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(getSearchProducts(search, filter))
  }

  const cleanState = e => {
    e.preventDefault();
    setSearch('');
    setFilter('');
    setDisplay(false);
    dispatch(getSearchProducts('', ''))
  }

  const handleSelect = e => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(getSearchProducts(search, e.target.value))
  }

  return (
    <div className="container">
      <div ref={wrapperRef} className="searchBar">
        <div className="autoComplete">
        <input value={search} placeholder={intl.formatMessage({ id: 'placeholderSearch' })} onClick={() => setDisplay(!display)} onChange={e => setSearch(e.target.value)} className="searchBar__searching"/>
        {display && (
          <div className="autoContainer">
            {options.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())).slice(0,5).map((value, i) => 
                  <div
                    onClick={() => updateProduct(value.name)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <img src={value.images} alt="product" />
                    <span>{value.name}</span>   
                  </div>
              )}
          </div>
        )}
        </div>
        <select onChange={handleSelect} value={filter}>
          <option value=''>{intl.formatMessage({ id: 'placeholderAllCategories' })}</option>
        {categories?.map((ca,i) => {
          return <option key={i} value={ca.name}>
            {ca.name}
          </option>
        })}
        </select>
        <button type='submit' onClick={e => handleSubmit(e)} className="searchBar__btn"><FormattedMessage id="app.search" defaultMessage="Search"/></button>
        <button type='reset' onClick={e => cleanState(e)} className="searchBar__btn" ><FormattedMessage id="app.reset" defaultMessage="Reset filters"/></button>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getAllProducts, getAllUsers, getCategories, getSearchProducts, getSearchUsers, } from "../redux/actions";
import { FormattedMessage, useIntl } from 'react-intl'

export default function AdminSearchBar(props) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state)
  const intl = useIntl();

  useEffect(() =>{
    dispatch(getCategories())
  }, [dispatch])

  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    lastName: ''
  });
  const [order, setOrder] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');

  let value;
  if(props.search === 'users') value = user;
  if(props.search === 'orders') value = order;
  if(props.search === 'products') value = product;

  const handleInputChange = e => {
    e.preventDefault();
    if(props.search === 'orders') setOrder(e.target.value);
    if(props.search === 'products') setProduct(e.target.value);
  }

  const handleUserChange = e => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(props.search === 'users') dispatch(getSearchUsers(user));
    if(props.search === 'orders') dispatch(getAllOrders(order, status));
    if(props.search === 'products') dispatch(getSearchProducts(product, category));
  }

  const cleanState = e => {
    e.preventDefault();
    setUser({
      username: '',
      email: '',
      name: '',
      lastName: ''
    });
    setOrder('');
    setStatus('');
    setProduct('');
    if(props.search === 'users') dispatch(getAllUsers());
    if(props.search === 'orders') dispatch(getAllOrders());
    if(props.search === 'products') dispatch(getAllProducts());
  }

  const handleSelect = (event) => {
    if(props.search === 'orders') setStatus(event.target.value)
    if(props.search === 'products') setCategory(event.target.value)
  }

  return (
    <div className="container">
      <div className="searchBar">
        {props.search === 'users' && <>
        <input name="username" value={user.username} placeholder={intl.formatMessage({ id: 'placeholderSearch-username' })} onChange= {handleUserChange} className="searchBar__searching"/>
        <input name="email" value={user.email} placeholder={intl.formatMessage({ id: 'placeholderSearch-email' })} onChange= {handleUserChange} className="searchBar__searching"/>
        <input name="name" value={user.name} placeholder={intl.formatMessage({ id: 'placeholderSearch-name' })} onChange= {handleUserChange} className="searchBar__searching"/>
        <input name="lastName" value={user.lastName} placeholder={intl.formatMessage({ id: 'placeholderSearch-lastname' })} onChange= {handleUserChange} className="searchBar__searching"/>
        </>}

        {props.search !== 'users' && <input value={value} placeholder={intl.formatMessage({ id: 'placeholderSearch' })} onChange= {handleInputChange} className="searchBar__searching"/>}
        {props.search === 'orders' && <select onChange={handleSelect} value={status}>
          <option value='' hidden disabled>{intl.formatMessage({ id: "app.option-status" })}</option>
        <option key='pending' value='pending'>{intl.formatMessage({ id: "app.status-pending" })}</option>
        <option key='processing' value='processing'>{intl.formatMessage({ id: "app.btn-processing" })}</option>
        <option key='complete' value='complete'>{intl.formatMessage({ id: "app.btn-complete" })}</option>
        <option key='canceled' value='canceled'>{intl.formatMessage({ id: "app.btn-cancelled" })}</option>
        </select>}
        {props.search === 'products' && <select onChange={handleSelect} value={category}>
          <option value=''>{intl.formatMessage({ id: 'placeholderAllCategories' })}</option>
          {categories?.map((ca,i) => <option key={i} value={ca.name}>{ca.name}</option>)}
        </select>}
        <button type='submit' onClick={e => handleSubmit(e)} className="searchBar__btn"><FormattedMessage id="app.search" defaultMessage="Search"/></button>
        <button type='reset' onClick={e => cleanState(e)} className="searchBar__btn" ><FormattedMessage id="app.reset" defaultMessage="Reset Filters"/></button>
      </div>
    </div>
  )
}

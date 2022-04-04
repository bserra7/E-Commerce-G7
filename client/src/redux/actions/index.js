import axios from 'axios';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const ADD_PRODUCT = "ADD_PRODUCT";
export const RESTORE_CART = "RESTORE_CART"
export const PRODUCT_REMOVE = "PRODUCT_REMOVE";
export const PRODUCT_AMOUNT_REST = "PRODUCT_AMOUNT_REST";
export const PRODUCT_AMOUNT_SUM = "PRODUCT_AMOUNT_SUM";
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const GET_FILTERED_PRODUCTS = 'GET_FILTERED_PRODUCTS';
export const GET_SEARCH_PRODUCTS = 'GET_SEARCH_PRODUCTS';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER_DETAIL = 'GET_USER_DETAIL';
export const GET_SEARCH_USERS = 'GET_SEARCH_USERS';
export const GET_ROLES = 'GET_ROLES';
export const GET_ORDER = "GET_ORDER";
export const CLEAR_CART = "CLEAR_CART";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";
export const GET_REVIEWS = "GET_REVIEWS";
export const CLEAR_REVIEWS = "CLEAR_REVIEWS";
export const VERIFY_TWO_FA = "VERIFY_TWO_FA";
export const GET_VISITED_PRODUCTS = "GET_VISITED_PRODUCTS";
export const GET_WISHLIST = "GET_WISHLIST";
export const GET_ALL_STORES = "GET_ALL_STORES";
export const GET_STORE_DETAIL = "GET_STORE_DETAIL";
export const GET_ALL_DISCOUNTS = "GET_ALL_DISCOUNTS";
export const GET_PAYMENT_DETAIL = "GET_PAYMENT_DETAIL";


export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/products');
      const data = await response.data;

      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log('NOT FOUND', error);
    }
  };
};

export function getCategories() {
  return function (dispatch) {
    return axios.get('/categories')
    .then((response) => response.data)
    .then((data) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('NOT FOUND', error);
    });
  };
}

export function getProductDetail(idProduct) {
  return function (dispatch) {
    return axios.get(`/product/${idProduct}`)
    .then((response) => response.data)
    .then((data) => {
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: data,
      });
    })
    .catch((error) => {
      console.log('NOT FOUND', error);
    });
  };
}

export function getReviews(idProduct) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/reviews/?productId=${idProduct}`);
      const data = await response.data;

      dispatch({
        type: GET_REVIEWS,
        payload: data,
      });
    } catch (error) {
      console.log('REVIEW NOT FOUND', error);
    }
  };
};

export function clearReviews() {
  return{
    type: CLEAR_REVIEWS
  }
}

//CART
export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const restoreCart = (cart) => {
  return {
    type: RESTORE_CART,
    payload: cart
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
}

export const productAmountRest = (productAmount) => {
  return {
    type: PRODUCT_AMOUNT_REST,
    payload: productAmount,
  };
};

export const productAmountSum = (productAmount) => {
  return {
    type: PRODUCT_AMOUNT_SUM,
    payload: productAmount,
  };
};

export const productRemove = (product) => {
  return {
    type: PRODUCT_REMOVE,
    payload: product,
  };
};

export function getSearchProducts(productName, category){
  return function (dispatch) {
    return axios.get(`/products?name=${productName}&category=${category}`)
    .then((response) => response.data)
    .then((data) => {
      dispatch({
        type: GET_SEARCH_PRODUCTS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log("Not Found", error)
    })
  }
}

export function getSearchUsers(user){
  return function (dispatch) {
    return axios.get(`/users?username=${user.username}&email=${user.email}&name=${user.name}&lastName=${user.lastName}`)
    .then((response) => response.data)
    .then((data) => {
      dispatch({
        type: GET_SEARCH_USERS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log("Not Found", error)
    })
  }
}

export function userLogin(payload){
  return{
    type: USER_LOGIN,
    payload
  }
}

export function userLogout(){
  return{
    type: USER_LOGOUT
  }
}

export function verifyTwoFA(){
  return{
    type: VERIFY_TWO_FA
  }
}

export function getAllOrders(id = '', status = ''){
  return async function (dispatch){
    try {
      const orders = await axios.get(`/orders?orderId=${id}&status=${status}`);
      dispatch({type: GET_ALL_ORDERS, payload: orders.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getOrderDetail(id = '', status = ''){
  return async function (dispatch){
    try {
      const order = await axios.get(`/orders?orderId=${id}&status=${status}`);
      dispatch({type: GET_ORDER_DETAIL, payload: order.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getPaymentDetail(id){
  return async function (dispatch){
    try {
      const payment = await axios.get(`/payment/${id}`);
      dispatch({type: GET_PAYMENT_DETAIL, payload: payment.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getAllRoles(token){
  return async function (dispatch){
    try {
      const orders = await axios.get(`/roles`, {token});
      dispatch({type: GET_ROLES, payload: orders.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getAllUsers(){
  return async function (dispatch){
    try {
      const users = await axios.get('/users');
      dispatch({type: GET_ALL_USERS, payload: users.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getAllStores(){
  return async function (dispatch){
    try {
      const stores = await axios.get('/stores');
      dispatch({type: GET_ALL_STORES, payload: stores.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getStoreDetail(id){
  return async function (dispatch){
    try {
      const store = await axios.get(`/stores?storeId=${id}`);
      dispatch({type: GET_STORE_DETAIL, payload: store.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getAllDiscounts(){
  return async function (dispatch){
    try {
      const discounts = await axios.get('/discount');
      dispatch({type: GET_ALL_DISCOUNTS, payload: discounts.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export function getUserDetail(id){
  return async function (dispatch){
    try {
      const user = await axios.get(`/users?userId=${id}`);
      dispatch({type: GET_USER_DETAIL, payload: user.data})
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}

export const getOrderByUserId = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/orders?userId=${userId}`);
      const data = await response.data;
      dispatch({
        type: GET_ORDER,
        payload: data,
      });
    } catch (error) {
      console.log('Error', error);
    }
  };
};

export const getVisitedProducts = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/visited?userId=${userId}`);
      const data = await response.data;
      dispatch({
        type: GET_VISITED_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.log('Error', error);
    }
  };
};

// WISHLIST

export const getUserWishlist = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/wishlist?userId=${userId}`);
      const data = await response.data;
      dispatch({
        type: GET_WISHLIST,
        payload: data,
      });
    } catch (error) {
      console.log('Error', error);
    }
  };
};

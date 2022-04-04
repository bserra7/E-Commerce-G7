import {
  GET_CATEGORIES,
  GET_PRODUCT_DETAIL,
  GET_ALL_PRODUCTS,
  ADD_PRODUCT,
  RESTORE_CART,
  PRODUCT_AMOUNT_REST,
  PRODUCT_AMOUNT_SUM,
  PRODUCT_REMOVE,
  USER_LOGIN,
  USER_LOGOUT,
  GET_SEARCH_PRODUCTS,
  GET_ALL_ORDERS,
  GET_ALL_USERS,
  GET_USER_DETAIL,
  GET_SEARCH_USERS,
  GET_ROLES,
  GET_ORDER,
  CLEAR_CART,
  GET_REVIEWS,
  CLEAR_REVIEWS,
  GET_ORDER_DETAIL,
  VERIFY_TWO_FA,
  GET_VISITED_PRODUCTS,
  GET_WISHLIST,
  GET_ALL_STORES,
  GET_STORE_DETAIL,
  GET_ALL_DISCOUNTS,
  GET_PAYMENT_DETAIL

} from '../actions';

const initialState = {
  products: [],
  filtered: [],
  categories: [],
  details: [],
  cart: [],
  user: null,
  orders: [],
  allUsers: [],
  userDetail: {},
  allRoles: [],
  user_order: [],
  reviews: [],
  orderDetail: [],
  visitedProducts: [],
  wishlist: [],
  stores: [],
  storeDetail: {},
  discounts: [],
  paymentDetail: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        details: action.payload,
      };

    case GET_REVIEWS:
        return {
          ...state,
          reviews: action.payload,
        };
    
    case CLEAR_REVIEWS:
          return {
            ...state,
            reviews: [],
          };
  
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    case ADD_PRODUCT:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case RESTORE_CART:
      return {
        ...state,
        cart: action.payload
      }

    case PRODUCT_AMOUNT_SUM:
      return {
        ...state,
        cart: [...state.cart.map((product) => {
          return product.id === action.payload
          ? { ...product, amount: product.amount + 1 } : product;
        })]
      };

    case PRODUCT_AMOUNT_REST:
      return {
        ...state,
        cart: [...state.cart.map((product) => {
          return product.id === action.payload && product.amount > 1
          ? { ...product, amount: product.amount - 1 } : product;
        })]
      };

    case PRODUCT_REMOVE:
      return {
        ...state,
        cart: [...state.cart.filter((product) => product.id !== action.payload)],
      };
    
    case USER_LOGIN:
      return{
        ...state,
        user: action.payload
      }
    
    case USER_LOGOUT:
        return{
          ...state,
          user: null
        }
    
    case VERIFY_TWO_FA:
        return{
          ...state,
          user: {
            ...state.user,
            two_fa_verified: true
          }
        }

    case GET_ROLES:
        return{
          ...state,
          allRoles: action.payload?.filter(role => role.id > 1)
        }

    case GET_SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.length ? action.payload : "No results found"
      }

    case GET_SEARCH_USERS:
      return {
        ...state,
        allUsers: action.payload.length ? action.payload : "No results found"
      }
    
    case GET_ALL_ORDERS:
      const orders = action.payload.sort((orderA, orderB) => orderA.id > orderB.id ? 1 : -1);
      return {
        ...state,
        orders: orders.length ? orders : "No orders found"
      }
    
    case GET_ORDER_DETAIL:
        return {
          ...state,
          orderDetail: action.payload.length ? action.payload[0] : "No order found"
        }

    case GET_PAYMENT_DETAIL:
          return {
            ...state,
            paymentDetail: action.payload ? action.payload : "No payment found"
          }
    
    case GET_ALL_USERS:
        return {
          ...state,
          allUsers: action.payload.length ? action.payload : "No users found"
        }

    case GET_ALL_DISCOUNTS:
        return {
          ...state,
          discounts: action.payload.length ? action.payload : "No discounts found"
        }

    case GET_ALL_STORES:
        return {
          ...state,
          stores: action.payload.length ? action.payload : "No stores found"
        }

    case GET_STORE_DETAIL:
          return {
            ...state,
            storeDetail: action.payload ? action.payload : "No store found"
          }
    
    case GET_USER_DETAIL:
          return {
            ...state,
            userDetail: action.payload.length ? action.payload[0] : "No user found"
          }
      
    case GET_ORDER:
      return {
        ...state,
        user_order: action.payload
      }
    
    case GET_VISITED_PRODUCTS:
        return {
          ...state,
          visitedProducts: action.payload
        }
    
    case CLEAR_CART:
        return {
          ...state,
          cart: []
        }

    case GET_WISHLIST:
        return {
          ...state,
          wishlist: action.payload
        }
    default:
      return state;
  }
}

export default rootReducer;

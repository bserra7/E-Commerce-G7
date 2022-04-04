import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, BrowserRouter as Router, useHistory, useParams } from 'react-router-dom';
import { UserContextProvider } from './components/Login/context/userContext';
import { userLogin, restoreCart } from './redux/actions';
import swal from 'sweetalert';

// styles
import './styles/styles.scss';

//components
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Home from './components/Home';
import Shop from './components/Shop';
import CreateUser from './components/CreateUser';
import Login from './components/Login/Login.jsx';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import ProductDetail from './components/ProductDetail';
import OrderCheckout from './components/OrderCheckout';
import AdminPanel from './admincp/AdminPanel';
import ResetPassword from './components/ResetPassword';
import DashboardUser from './components/DashboardUser';
import UserAccount from './components/UserAccount';
import Orders from './components/Orders';
import Payment from './components/Payment';
import OrderDetail from './components/OrderDetail.jsx';
import UpdateAccount from './components/UpdateAccount';
import TwoFaVerify from './components/TwoFaVerify';
import Wishlist from './components/Wishlist';
import PaymentDetail from './components/PaymentDetail';

export const alert2FA = () => {
  swal({
    title: "2FA Verification",
    text: "We sent to your email 2FA Code",
    icon: "warning",
    buttons: "Ok"
  })
}


function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state)
  const userLogged = useSelector(state => state?.user);

  const resetPasswordAlert = () => {
    swal({
      title: "Password Reset",
      text: "Your password have been force to reset, please proceed",
      icon: "warning",
      buttons: "Ok"
    })
  }

  useEffect(() => {
    if(cart.length && localStorage.getItem("cart")){
      localStorage.removeItem("cart")
      return localStorage.setItem("cart", JSON.stringify(cart))
    }
    cart.length && localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  useEffect(()=> {
    if(localStorage.getItem("cart")){
      let cartStorage = localStorage.getItem('cart')
      cartStorage = JSON.parse(cartStorage)
      dispatch(restoreCart(cartStorage))
    }
    if(sessionStorage.getItem('jwt')){
      axios.post('/authenticate', {token: sessionStorage.getItem('jwt')})
      .then(res => {
        dispatch(userLogin(res.data.user))
      })
      .catch(res => sessionStorage.removeItem('jwt'))
    }
    if(localStorage.getItem('jwt')){
      axios.post('/authenticate', {token: localStorage.getItem('jwt')})
      .then(res => {
        dispatch(userLogin(res.data.user))
      })
      .catch(res => localStorage.removeItem('jwt'))
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if(userLogged?.reset_password) resetPasswordAlert()
  }, [userLogged])

  useEffect(() => {
    if(userLogged?.is_two_fa && !userLogged?.two_fa_verified){
      alert2FA();
      history.push('/')
    }
  },[history, userLogged])

  return (
    <div className="App">
      <UserContextProvider>
      {userLogged?.is_two_fa && !userLogged?.two_fa_verified ? 
      <>
        <Navbar />
        <TwoFaVerify /> 
      </> : userLogged?.reset_password ? 
      <>
      <Navbar />
      <ResetPassword />
      </> :
        <Router>
          <Navbar />
          <Route path='/user/account' component={DashboardUser}/>
          <Route path='/admincp' component={AdminPanel}/>
          
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/shop'>
              <SearchBar />
              <Shop />
            </Route>
            <Route exact path='/register' component={CreateUser}/>
            <Route exact path='/admincp/product/add' component={CreateProduct}/>
            <Route exact path='/product/update/:id' component={UpdateProduct}/>
            <Route exact path='/product/:id' component={ProductDetail}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/checkout' component={OrderCheckout}/>
            <Route exact path='/user/account/profile' component={UserAccount}/>
            <Route exact path='/user/account/reset-password' component={ResetPassword}/>
            <Route exact path='/user/account/wishlist' component={Wishlist}/>
            <Route exact path='/user/account/twofa' component={TwoFaVerify}/>
            <Route exact path='/user/account/edit' component={UpdateAccount}/>
            <Route exact path='/user/account/orders' component={Orders}/>
            <Route exact path='/user/account/order/detail/:id' component={OrderDetail}/>
            <Route exact path='/payment/:paymentStatus' component={Payment}/>
            <Route exact path='/user/account/order/payment/:id' component={PaymentDetail}/>
          </Switch> 
        </Router>}
      </UserContextProvider>
    </div>
  );
}

export default App;

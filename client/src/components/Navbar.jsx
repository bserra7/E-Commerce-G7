import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/images/logo.jpg';
import cart from '../assets/images/icon-cart.svg';
import avatar from '../assets/images/image-avatar.png';
import menu from '../assets/images/icon-menu.svg';
import close from '../assets/images/icon-close.svg';
import avatar1 from '../assets/images/avatar.png'
import ShoppingCart from './ShoppingCart';
import useUser from './Login/hooks/useUser';
import ukflag from '../assets/images/UK-flag.png'
import spflag from '../assets/images/SPAIN-flag.png'
import { FormattedMessage } from 'react-intl'
import { langContext } from './../context/langContext';
import useCurrency from '../context/useCurrency';

const Navbar = () => {
  const iconMenuRef = useRef(null);
  const iconCloseRef = useRef(null);
  const listRef = useRef(null);
  const [showCart, setShowCart] = useState(false);
  const { isLogged, logout } = useUser();
  const user = useSelector(state => state?.user);
  const shopCart = useSelector(state => state?.cart);
  const idioma = useContext(langContext);
  const { setCurrency } = useCurrency();


  const handleMenu = () => {
    iconCloseRef.current.style.display = 'block';
    iconMenuRef.current.style.display = 'none';
    listRef.current.style.display = 'block';
  };

  const handleClose = () => {
    iconCloseRef.current.style.display = 'none';
    iconMenuRef.current.style.display = 'block';
    listRef.current.style.display = 'none';
  };

  useEffect(() => {
    if (!showCart && shopCart?.length) cartShow()
  }, [shopCart])

  const cartShow = () => {
    setShowCart(!showCart);
  };

  if(localStorage.getItem('lang') === 'en-UK'){
    document.querySelector(".language-english")?.classList.add("active")
  }else{
    document.querySelector(".language-spanish")?.classList.add("active")
  }

  if(localStorage.getItem('currency') === 'USD'){
    document.querySelector(".currency-usd")?.classList.add("active")
  }else{
    document.querySelector(".currency-ars")?.classList.add("active")
  }

  const handleEnglish = () => {
    idioma.setLanguage('en-UK');
    document.querySelector(".language-english")?.classList.add("active")
    document.querySelector(".language-spanish")?.classList.remove("active")
  }
  const handleSpanish = () => {
    idioma.setLanguage('es-ES')
    document.querySelector(".language-spanish")?.classList.add("active")
    document.querySelector(".language-english")?.classList.remove("active")
  }

  const handleCurrencyUSD = () => {
    setCurrency('USD');
    document.querySelector(".currency-usd")?.classList.add("active")
    document.querySelector(".currency-ars")?.classList.remove("active")
  }

  const handleCurrencyARS = () => {
    setCurrency('ARS');
    document.querySelector(".currency-ars")?.classList.add("active")
    document.querySelector(".currency-usd")?.classList.remove("active")
  }

  return (
    <div className="container">
      <div className="navbar">
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="logo" />
        </Link>

        <nav className="navbar__navigation">
          <button className="icon-menu" onClick={handleMenu} ref={iconMenuRef}>
            <img src={menu} alt="menu" />
          </button>
          <button
            className="icon-close"
            onClick={handleClose}
            ref={iconCloseRef}
          >
            <img src={close} alt="close" />
          </button>

          <ul className="list" ref={listRef}>
            <li className="list__item" onClick={handleClose}>
              <NavLink
                to="/shop"
                className="list__link"
                activeClassName="active"
              >
                <FormattedMessage
                  id="app.shop"
                  defaultMessage="Shop"
                />
              </NavLink>
            </li>
            <li className="list__item" onClick={handleClose}>
              <NavLink
                to="/stores"
                className="list__link"
                activeClassName="active"
              >
                <FormattedMessage
                  id="app.stores"
                  defaultMessage="Stores"
                />
              </NavLink>
            </li>
            <li className="list__item" onClick={handleClose}>
              <NavLink
                to="/about"
                className="list__link"
                activeClassName="active"
              >
                <FormattedMessage
                  id="app.about"
                  defaultMessage="About"
                />
              </NavLink>
            </li>
            <li className="list__item" onClick={handleClose}>
              <NavLink
                to="/contact"
                className="list__link"
                activeClassName="active"
              >
                <FormattedMessage
                  id="app.contact"
                  defaultMessage="Contact"
                />
              </NavLink>
            </li>
            <li className="list__item" onClick={handleClose}>
              <NavLink
                to="/register"
                className="list__link"
                activeClassName="active"
              >
                <FormattedMessage
                  id="app.sign-up"
                  defaultMessage="Sign Up"
                />
              </NavLink>
            </li>
          </ul>
        </nav>
        

        <div className="navbar__cart">
        <figure className='navbar__currency'>
                <span className='currency-usd' onClick={handleCurrencyUSD} alt='USD' height="20px" width="50px">USD</span>
                <span className='currency-ars' onClick={handleCurrencyARS} alt='ARS' height="20px" width="50px">ARS</span>
              </figure>
          <figure>
            <div style={{ position: "relative" }}>
              {shopCart.length !== 0 && <div className='cart__notifi' >{shopCart.length}</div>}
              <img src={cart} alt="shoping cart" onClick={cartShow} />
            </div>
            {showCart && <ShoppingCart cartShow={cartShow} />}
          </figure>
          {isLogged
            ? <div className='navbarLogin'>
              <figure className='navbarLogin__logged'>
                <Link to='/user/account/profile'><img src={avatar} alt="avatar" /></Link>
              </figure>
              <div className='wrapper-isLogged'>
                <h3><FormattedMessage id="app.sign-in" defaultMessage="Signed in as" /><span>{user?.name} {user?.last_name}</span></h3>
                <Link to="/user/account/profile" className='navbarLogin__button'><FormattedMessage id="app.account-title" defaultMessage="Account" /></Link>
                {user?.roleId < 3 && <Link to="/admincp" className='admButton'><FormattedMessage id="app.admin" defaultMessage="AdminCP" /></Link>}
                <Link to="/" className='navbarLogin__button' onClick={logout}><FormattedMessage id="app.log-out" defaultMessage="Logout" /></Link>
              </div>
            </div>
            : <div className='navbarLogin'>
              <figure>
                <Link to='/login'><img src={avatar1} alt="avatar" /></Link>
              </figure>
              <div className='wrapper-isLogged login'>
                <Link to="/login" className='navbarLogin__button'><FormattedMessage id="app.login" defaultMessage="Login" /></Link>
              </div>
            </div>}
            {/* () => idioma.setLanguage('en-UK') */}
          <figure className='navbar__language'>
            <img className='language-english' src={ukflag} onClick={handleEnglish} alt='EN-LANG' height="20px" width="50px" />
            <img className='language-spanish' src={spflag} onClick={handleSpanish} alt='ES-LANG' height="20px" width="50px" />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

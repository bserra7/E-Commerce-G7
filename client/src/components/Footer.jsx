import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import iconFacebok from '../assets/images/icon-facebookl.png'
import iconInstagram from '../assets/images/icon-instagram.png'
import iconMercadoPago from '../assets/images/mercado-pago.jpg'

import { FormattedMessage } from 'react-intl'

const Footer = () => {
  const [showHistory, setShowHistory] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [showBuy, setShowBuy] = useState(false)

  const handleHistory = () => {
    setShowHistory(!showHistory)
  }
  const handleSupport = () => {
    setShowSupport(!showSupport)
  }
  const handleBuy = () => {
    setShowBuy(!showBuy)
  }

  return (
    <footer className='footer'>
      <ul className='footer__list'>
        <button className='footer__btn' onClick={handleHistory}><FormattedMessage id= "app.history" defaultMessage="Our History"/></button>
        {
          showHistory && <div className='footer__history'>
            <li className='footer__item'>
              <Link to="/about" className='footer__link'><FormattedMessage id="app.history" defaultMessage="Our History"/></Link>
            </li>
            <li className='footer__item'>
              <Link to="/contact" className='footer__link'><FormattedMessage id="app.contact-us" defaultMessage="Contact Us"/></Link>
            </li>
            <li className='footer__item'>
              <Link to="/user/account/profile" className='footer__link'><FormattedMessage id="app.my-account" defaultMessage="My Account"/></Link>
            </li>
          </div>
        }

        <div className='footer__history desktop'>
          <li className='footer__item'>
            <Link to="/about#" className='footer__link'><FormattedMessage id="app.history" defaultMessage="Our History"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/contact" className='footer__link'><FormattedMessage id="app.contact-us" defaultMessage="Contact Us"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/user/account/profile" className='footer__link'><FormattedMessage id="app.my-account" defaultMessage="My Account"/></Link>
          </li>
        </div>

        <button className='footer__btn' onClick={handleSupport}><FormattedMessage id="app.support" defaultMessage="Support"/></button>
        {
          showSupport && <div className='footer__support'>
            <li className='footer__item'>
              <Link to="/" className='footer__link'><FormattedMessage id="app.promotions" defaultMessage="Promotions"/></Link>
            </li>
          </div>
        }

        <div className='footer__support desktop'>
          <li className='footer__item'>
            <Link to="/" className='footer__link'><FormattedMessage id="app.promotions" defaultMessage="Promotions"/></Link>
          </li>
        </div>

        <button className='footer__btn' onClick={handleBuy}><FormattedMessage id="app.buy" defaultMessage="Buy"/></button>
        {showBuy && <div className='footer__buy'>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.monitors" defaultMessage="Monitors"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.wireless" defaultMessage="Wireless Headphones"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.accessories" defaultMessage="Accessories"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.laptops" defaultMessage="Laptops"/></Link>
          </li>
        </div>
        }

        <div className='footer__buy desktop'>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.monitors" defaultMessage="Monitors"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.wireless" defaultMessage="Wireless Headphones"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.accessories" defaultMessage="Accessories"/></Link>
          </li>
          <li className='footer__item'>
            <Link to="/shop" className='footer__link'><FormattedMessage id="app.laptops" defaultMessage="Laptops"/></Link>
          </li>
        </div>

        <div className='footer__social'>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={iconFacebok} alt="facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src={iconInstagram} alt="instagram" />
          </a>
        </div>
      </ul>

      <div className="footer__subfooter">
        <Link to="/" className='politics'><FormattedMessage id="app.privacy" defaultMessage="Privacy Policy"/></Link>
        <Link to="/" className='book'>🕮 <FormattedMessage id="app.complaint" defaultMessage="Complaints Book"/></Link>
        <p className="copyright">&copy; <FormattedMessage id="app.rights" defaultMessage="2022 ElectroShop. All Rights Reserved"/></p>
        <Link to="/" className='payment'>
          <img src={iconMercadoPago} alt="mercado pago" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer

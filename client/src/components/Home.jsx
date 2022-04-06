import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishlist, getVisitedProducts } from '../redux/actions';
import FrecuentlyVisited from './FrecuentlyVisited';
import WishlistView from './WishlistView';
import useUser from './Login/hooks/useUser';
import WhatsApp from './WhatsApp';
import ChatBot from "../components/Chatbot/ChatBot";
import 'react-chatbot-kit/build/main.css';
import OffersDisplay from './OffersDisplay';
import Slider from './Slider/Slider.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state) => state);
  const { isLogged } = useUser();

  useEffect(() => {
    if(isLogged) 
    dispatch(getVisitedProducts(user?.id))
    dispatch(getUserWishlist(user?.id))
  }, []); //eslint-disable-line

  return (
    <div className="shop">
      <Slider />
      <OffersDisplay/>
      {!isLogged ? false : 
        <div>
          <FrecuentlyVisited />
          <WishlistView />
        </div>}
        <WhatsApp />
        <ChatBot />
      </div>)
};

export default Home;

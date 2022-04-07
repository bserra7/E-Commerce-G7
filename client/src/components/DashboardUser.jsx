import React, { useEffect } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import useUser from './Login/hooks/useUser';
import UserAccount from './UserAccount';
import { FormattedMessage } from 'react-intl';

export function DashboardUser() {

    const history = useHistory()
    const { isLogged } = useUser();

    useEffect(() => {
        if (!localStorage.getItem('jwt') && !sessionStorage.getItem('jwt')) history.push("/")
        axios.post('/authenticate', { token: localStorage.getItem('jwt') })
            .then()
            .catch(res => {
                axios.post('/authenticate', { token: sessionStorage.getItem('jwt') })
                    .then()
                    .catch(res => history.push("/"))
            })
    }, [isLogged])

    return (
        <>
            <nav className='dashboardUser'>
                <div className='container'>
                    <li className='dashboardUser__item'>
                        <NavLink to="/user/account/profile"
                            activeClassName='active'
                            className="dashboardUser__link"><FormattedMessage id="app.profile" defaultMessage="Profile" /></NavLink>
                    </li>
                    <li className='dashboardUser__item'>
                        <NavLink to="/user/account/orders"
                            activeClassName='active' className="dashboardUser__link"> <FormattedMessage id="app.view-order" defaultMessage="View Orders" /></NavLink>
                    </li>
                    <li className='dashboardUser__item'>
                        <NavLink to='/user/account/reset-password'
                            activeClassName='active' className="dashboardUser__link"><FormattedMessage id="app.change-password" defaultMessage="Change Password" /></NavLink>
                    </li>
                    <li className='dashboardUser__item'>
                        <NavLink to='/user/account/wishlist'
                            activeClassName='active' className="dashboardUser__link"><FormattedMessage id="app.wishlist" defaultMessage="My Wishlist" /></NavLink>
                    </li>
                </div>
            </nav>
            {history.location.pathname === "/user/account" && <UserAccount />}
        </>
    )
}
export default DashboardUser;
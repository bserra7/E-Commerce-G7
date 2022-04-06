import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateProduct from '../components/UpdateProduct';
import AdminDashboard from './AdminDashboard';
import AdminEditUser from './AdminEditUser';
import AdminOrdersList from './AdminOrdersList';
import AdminProductsList from './AdminProductsList';
import AdminSideBar from './AdminSideBar';
import AdminUsersList from './AdminUsersList';
import AdminEditRole from './AdminEditRole';
import CreateProduct from '../components/CreateProduct';
import OrderDetail from '../components/OrderDetail';
import AdminStoresList from './AdminStoresList';
import AdminCreateStore from './AdminCreateStore';
import AdminEditStore from './AdminEditStore';
import AdminSetDiscounts from './AdminSetDiscounts';
import AdminDiscountsList from './AdminDiscountsList';
import AdminPaymentsList from './AdminPaymentsList';
import AdminPaymentDetail from './AdminPaymentDetail';

export default function AdminPanel() {
    const history = useHistory();
    const [show, setShow] = useState('dashboard')
    const [id, setId] = useState(null);
    const user = useSelector(state => state?.user);

    const showComponent = (component) => {
        setShow(component);
        window.scrollTo(0, 0)
    }

    const getId = (id) => {
        setId(id);
    }

    useEffect(() => {
        if (sessionStorage.getItem('jwt')) {
            axios.post('/admin/authenticate', { token: sessionStorage.getItem('jwt') })
                .then(res => {
                    if (res.data.user.roleId === 1 || res.data.user.roleId === 2) sessionStorage.setItem('session', "authenticated")
                    else history.push('/')
                })
                .catch(err => {
                    sessionStorage.removeItem('session')
                    history.push('/')
                })
        }
        else if (localStorage.getItem('jwt')) {
            axios.post('/admin/authenticate', { token: localStorage.getItem('jwt') })
                .then(res => {
                    if (res.data.user.roleId === 1 || res.data.user.roleId === 2) localStorage.setItem('session', "authenticated")
                    else history.push('/')
                })
                .catch(err => {
                    sessionStorage.removeItem('session')
                    history.push('/')
                })
        }
        else history.push('/');
    }, [])

    return (
        <div>
            {user?.roleId < 3 &&
                <div>
                    <AdminSideBar showComponent={showComponent} />
                    <div className='adminContainer'>
                        {show === 'dashboard' && <AdminDashboard />}
                        {show === 'users' && <AdminUsersList getId={getId} showComponent={showComponent} />}
                        {show === 'orders' && <AdminOrdersList getId={getId} showComponent={showComponent} />}
                        {show === 'details' && <OrderDetail id={id} showComponent={showComponent} />}
                        {show === 'products' && <AdminProductsList getId={getId} showComponent={showComponent} />}
                        {show === 'addProduct' && <CreateProduct showComponent={showComponent} />}
                        {show === 'updateProduct' && <UpdateProduct id={id} showComponent={showComponent} />}
                        {show === 'editUser' && <AdminEditUser id={id} showComponent={showComponent} />}
                        {show === 'editRole' && <AdminEditRole showComponent={showComponent} />}
                        {show === 'stores' && <AdminStoresList getId={getId} showComponent={showComponent} />}
                        {show === 'createStore' && <AdminCreateStore showComponent={showComponent} />}
                        {show === 'updateStore' && <AdminEditStore id={id} showComponent={showComponent} />}
                        {show === 'discounts' && <AdminDiscountsList showComponent={showComponent} />}
                        {show === 'setDiscounts' && <AdminSetDiscounts showComponent={showComponent} />}
                        {show === 'payments' && <AdminPaymentsList getId={getId} showComponent={showComponent} />}
                        {show === 'paymentDetail' && <AdminPaymentDetail meliId={id.meli_id} idOrder={id.orderId} showComponent={showComponent} />}
                    </div>
                </div>}
        </div>
    )
}

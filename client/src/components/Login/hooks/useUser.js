import { useContext, useCallback, useState } from 'react';
import Context from '../context/userContext';
import loginService from '../services/login';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout } from '../../../redux/actions';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function useUser(){
    const dispatch = useDispatch();
    const { jwt, setJwt } = useContext(Context);
    const [ state, setState ] = useState({
        loading: false,
        error: false
    });
    const logged = useSelector(state => state.user);

    const login = useCallback((user) => {
        setState({ loading: true, error: false })
        loginService(user)
        .then(data => {
            setState({ loading: false, error: false })
            setJwt(data.token);
            dispatch(userLogin(data.user))
        })
        .catch(err => {
            setState({ loading: false, error: true })
            console.error(err)
        })
    }, [setJwt]) //eslint-disable-line

    const logout = async () => {
        await axios.put('/twofa', {action: 'logout', userId: logged?.id, two_fa: false})
        localStorage.removeItem('jwt');
        sessionStorage.removeItem('jwt');
        Cookies.remove('jwt', { path: '/' })
        setJwt(null);
        dispatch(userLogout());
    } //eslint-disable-line

    return {
        isLogged: Boolean(logged),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }
}

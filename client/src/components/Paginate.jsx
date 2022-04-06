import React from 'react';
import { FormattedMessage } from 'react-intl'
import { useDispatch } from "react-redux"
import { currentPag } from "../redux/actions"

export function Paginate({ productsAmount, productsPerPage, currentPage, top }) {
    const lastPage = Math.ceil(productsAmount / productsPerPage);
    const dispatch = useDispatch()

    const handleNext = () => {
        dispatch(currentPag(+1))
        window.scrollTo({
            top: top.current.offsetTop
        })
    }

    const handlePrev = () => {
        dispatch(currentPag(-1))
        window.scrollTo({
            top: top.current.offsetTop
        })
    }

    return (
        <nav className='paginate'>
            {currentPage !== 1 && <button className='paginate__button' onClick={handlePrev} disabled={currentPage === 1}><FormattedMessage id="app.button-prev" defaultMessage="Prev" /></button>}
            {currentPage !== lastPage && <button className='paginate__button' onClick={handleNext} disabled={currentPage === lastPage}><FormattedMessage id="app.button-next" defaultMessage="Next" /></button>}
        </nav>
    )
}

export default Paginate;

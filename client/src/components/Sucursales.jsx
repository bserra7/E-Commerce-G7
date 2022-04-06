import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllStores } from "../redux/actions"
import Map from './Map'
import { FormattedMessage } from 'react-intl'
import pin from '../assets/images/pin.png'

const Sucursales = () => {
    const dispatch = useDispatch()
    const { stores } = useSelector(s => s)
    const _default = {
        lat: -38.476998,
        lng: -66.831531,
        zoom: 4,
    }

    const [select, setSelect] = useState({ ..._default })

    useEffect(() => {
        dispatch(getAllStores())
    }, [])

    const handleClick = (id) => {
        if (id === "all") {
            return !select.name ? null : setSelect({ ..._default })
        }
        if (id === select.id) return
        const store = stores.filter(l => l.id === id)[0]
        const format = { ...store, location: { lat: store.lat, lng: store.lng } }
        setSelect(format)
    }

    return (
        <div className='sucursales'>
            <div className="container">
                <h1 className='register__title'><FormattedMessage id="app.stores" defaultMessage="Stores"/></h1>
                <button className='sucursales__button' onClick={() => handleClick("all")}>
                <FormattedMessage id="app.see-stores" defaultMessage="See all stores"/>
                </button>
                <div className='sucursales__wrapper'>
                    <Map center={select} markers={stores} />
                    <div className='sucursales__buttons'>
                        {stores?.map(location => {
                                return (
                                        <button type='button' key={location.id} onClick={() => handleClick(location.id)}>
                                            <figure>
                                                <img src={pin} alt="pin" />
                                            </figure>
                                            <div>
                                                <h2>{location.name}</h2>
                                                <p>{location.address}</p>
                                                <span>{location.city}</span>
                                            </div>
                                        </button>
                                )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sucursales
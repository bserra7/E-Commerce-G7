import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { FormattedMessage } from 'react-intl';
const API_KEY = "AIzaSyBXDnxAg_a40ale9Hb5Hm8uejsM17qdKs4";

const Map = ({ center, markers }) => {
    const [show, setShow] = useState({})

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY || API_KEY
    })

    const containerStyle = {
        minWidth: '75%',
        height: '70vh',
        backgroundColor: "red"
    };

    const infoStyle = {
        //estilo de la ventana de informacion
    }

    const handleShow = (id) => {
        setShow({ ...show, [id]: !show[id] })
    }

    return (
        <div>

            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center.location || center}
                    zoom={center.zoom || 16}
                >

                    {!center.location && markers?.map(l => {
                        const coords = { lat: l.lat, lng: l.lng }
                        return (
                            <div key={l.id + Math.random()}>
                                <Marker
                                    position={coords}
                                    onClick={() => handleShow(l.id)}
                                    options={{
                                        title: l.name
                                    }} />
                                {show[l.id] && !center.location && <InfoWindow position={coords} onCloseClick={() => handleShow(l.id)} >
                                    <div style={infoStyle}>
                                        <h3>{l.name}</h3>
                                        <p>{l.address}</p>
                                        <p>{l.city}</p>
                                    </div>
                                </InfoWindow>}
                            </div>
                        )
                    })}

                    {center.location &&
                        <>
                            <Marker
                                position={center.location}
                                onClick={() => handleShow(center.id)}
                                options={{ title: center.name }}
                            />
                            {show[center.id] &&
                                <InfoWindow position={center.location} onCloseClick={() => handleShow(center.id)}>
                                    <div style={infoStyle}>
                                        <h2>{center.name}</h2>
                                        <p>{center.address}</p>
                                        <p>{center.city}</p>
                                        <p>{center.state}</p>
                                        <br />
                                        <hr />
                                        <small><FormattedMessage id="app.date-hour" defaultMessage="Monday to Friday from 8AM - 1PM and 5PM - 8PM."/></small>
                                    </div>
                                </InfoWindow>
                            }
                        </>
                    }

                </GoogleMap>
            ) : <div>Loading...</div>}

        </div>
    )
}

export default React.memo(Map)
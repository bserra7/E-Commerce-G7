import React from 'react'

const WhatsApp = ({ numero, mensaje }) => {
    const borrarEsto = {
        height: "50px",
        width: "50px",
        borderRadius: "100%",
        position: "sticky",
        left: "100%",
        bottom: "0px",
        margin: "5px",
        backgroundColor: "#25D366",
    }

    const estoTambien = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        color: "white"
    }

    const format = (value) => {
        value = value.split(' ').join("+")
        return value
    }

    numero = numero ? numero : "3804850845"
    mensaje = mensaje ? format(mensaje) : "Hi!+I+need+help+with+my+purchase"
    const link = `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}`

    return (
        <div style={borrarEsto} >
            {/* poner icono de whatsapp */}
            <a style={estoTambien} href={link} target='blank'>W</a>
        </div>
    )
}

export default WhatsApp
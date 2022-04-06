import React from 'react'
import whatsapp from '../assets/images/whatsapp.png'

const WhatsApp = ({ numero, mensaje }) => {
    const styles = {
        height: "50px",
        width: "50px",
        borderRadius: "100%",
        position: "fixed",
        right: "1.5rem",
        bottom: "2rem",
        margin: "5px",
    }

    const format = (value) => {
        value = value.split(' ').join("+")
        return value
    }

    numero = numero ? numero : "3804850845"
    mensaje = mensaje ? format(mensaje) : "Hi!+I+need+help+with+my+purchase"
    const link = `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}`

    return (
        <div style={styles} >
            <a href={link} target='blank'>
                <img src={whatsapp} alt="whatsapp" />
            </a>
        </div>
    )
}

export default WhatsApp
import React from 'react';
import { useIntl } from 'react-intl';

const Options = (props) => {
    const intl = useIntl();
    const options = [{
                text: intl.formatMessage({id: "chatbot-register-option"}),
                handler: props.actionProvider.register, id:1
            },
            {
                text: intl.formatMessage({id: "chatbot-buy-option"}),
                handler: props.actionProvider.buyProduct, id:2
            },
            {   
                text: intl.formatMessage({id: "chatbot-orders-option"}),
                handler: props.actionProvider.showOrders, id:3
            },
            {   
                text: intl.formatMessage({id: "chatbot-profile-option"}),
                handler: props.actionProvider.viewProfile, id:4
            }
        ]
    
    const buttonsMarkUp = options.map(option => (
            <button className="option-button" key={option.id} onClick={option.handler}>{option.text}</button>
    ))
    return (
        <div className="options-container">
            {buttonsMarkUp}
        </div>
    )
}
export default Options;
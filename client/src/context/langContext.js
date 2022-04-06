import React, { useState } from "react";
import MessageEnglish from './../lang/en-UK.json'
import MensajeEspañol from './../lang/es-ES.json'
import { IntlProvider } from 'react-intl'


const langContext = React.createContext();


function LangProvider({children}){
    let localeDefault;
    let messagesDefault;

    const lang = localStorage.getItem('lang')

    if(lang) {
        localeDefault = lang

        if(lang === 'en-UK') {
            messagesDefault = MessageEnglish;
        } else if (lang === 'es-ES') {
            messagesDefault = MensajeEspañol
        } else {
            localeDefault = 'en-UK'
            messagesDefault = MessageEnglish;
        }
    }

    const [locale, setLocale ] = useState(localeDefault);
    const [messages, setMessages ] = useState(messagesDefault)

    const setLanguage = (language) =>{
        switch (language) {
            case 'en-UK':
                setLocale('en-UK')
                setMessages(MessageEnglish)
                localStorage.setItem('lang', 'en-UK')
                break;
            case 'es-ES':
                setLocale('es-ES')
                setMessages(MensajeEspañol)
                localStorage.setItem('lang', 'es-ES')
                break;
            default:
                setLocale('en-UK')
                setMessages(MessageEnglish)
                localStorage.setItem('lang', 'en-UK')
        }
    }

    return (
        <langContext.Provider value={{setLanguage: setLanguage}}>
            <IntlProvider locale={locale} messages={messages}>
                {children}
            </IntlProvider>
        </langContext.Provider>
    );
}

export {LangProvider, langContext}
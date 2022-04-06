import { createIntl, createIntlCache  } from 'react-intl'
import MessageEnglish from '../../../lang/en-UK.json'
import MensajeEspañol from '../../../lang/es-ES.json'


const cache = createIntlCache();
    
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
    const intl = createIntl({ locale: localeDefault, messages: messagesDefault, }, cache);

export default function validate(user) {
    let errors = {};
  
    if (!user.username){
      errors.username = intl.formatMessage({id: "validation-enter-username"});
    }else if(!user.password) {
      errors.password = intl.formatMessage({id: "validation-your-password"});
    }
    return errors;
}
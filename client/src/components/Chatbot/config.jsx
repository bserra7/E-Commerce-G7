// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options  from "./Options";
import IconBotAvatar from "./IconBotAvatar";
import CustomChatMessage from "./CustomChatMessage";
import Register from "./Register";
import Product from "./Product";
import Orders from "./Orders";
import MercadoPago from "./MercadoPago";
import ViewProfile from "./ViewProfile";
import { createIntl, createIntlCache } from 'react-intl';
import MessageEnglish from '../../lang/en-UK.json';
import MessageSpanish from '../../lang/es-ES.json';

const cache = createIntlCache();
let localDefault;
let messagesDefault;
const lang = localStorage.getItem('lang');

if (lang){
  localDefault = lang;
  if(lang === 'es-ES') messagesDefault = MessageSpanish
  else messagesDefault = MessageEnglish
}

const intl = createIntl({locale: localDefault, messages: messagesDefault}, cache);

const config = {
    botName: "Electro",       
    initialMessages: [
        createChatBotMessage(intl.formatMessage({id: 'chatbot-initialmsg'}),{
            withAvatar: true,
            widget: "options",
            delay: 1000,
        }), 
    ],    
    widgets: [
        {
            widgetName: "options",
            widgetFunc:(props) => <Options {...props} />,
        },
        {
            widgetName: 'payments',
            widgetFunc: (props) => <MercadoPago {...props} /> ,
            mapStateToProps: ["payments"],
        },
        {
            widgetName: 'profile',
            widgetFunc: (props) => <ViewProfile {...props} /> ,
            mapStateToProps: ["profile"],
        },
        {
            widgetName: 'register',
            widgetFunc: (props) => <Register {...props} /> ,
        },
        {
            widgetName: 'products',
            widgetFunc: (props) => <Product {...props} /> ,
            mapStateToProps: ["products"],
        },
        {
            widgetName: 'orders',
            widgetFunc: (props) => <Orders {...props} /> ,
            
        },

    ],
    customComponents: { 
        botAvatar: (props) => <IconBotAvatar  {...props} />,
        customChatMessage: (props) => <CustomChatMessage {...props} />,
        header: (props) => <div className="react-chatbot-kit-chat-header">{intl.formatMessage({id: "chatbot-header"})}</div>
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: "hsl(26, 100%, 55%)",
            borderRadius: "10px",
            height: "100px",
        },
        chatButton: {
            backgroundColor: "hsl(26, 100%, 55%)",
            borderRadius: "5px",
        },        
    },
    state: {
        offers: []
    },
};

export default config

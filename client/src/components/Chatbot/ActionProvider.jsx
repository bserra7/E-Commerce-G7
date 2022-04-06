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

// ActionProvider starter code
class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }

  greet = () => {
      const message = this.createChatBotMessage(intl.formatMessage({id: "chatbot-greeting"}), {
        widget: "options",
        delay: 1000,
        });
      this.addMessageToState(message);
    };

  register = () => {
      const message = this.createChatBotMessage(
        intl.formatMessage({id: "chatbot-register"}), {
        widget: "register",
        delay: 1000,
        });
      this.addMessageToState(message);
    };

  buyProduct = () => {
      const message = this.createChatBotMessage(
        intl.formatMessage({id: "chatbot-buy"}), {
        widget: "products",
        delay: 1000,
        });
      this.addMessageToState(message);
    };

  showOrders = () => {
      const message = this.createChatBotMessage(
        intl.formatMessage({id: "chatbot-orders"}), {
        widget: "orders",
        delay: 1000,
        });
      this.addMessageToState(message);
    };

  payments = () => {
    const message = this.createChatBotMessage(
      intl.formatMessage({id: "chatbot-payments"}), {
      widget: "payments",
      delay: 1000,
      });
    this.addMessageToState(message);
  };

  viewProfile = () => {
    const message = this.createChatBotMessage(
      intl.formatMessage({id: "chatbot-profile"}), {
      widget: "profile",
      delay: 1000,
      });
    this.addMessageToState(message);
    };

    //// SPANISH

  saludo = () => {
    const message = this.createChatBotMessage("Hola! como puedo ayudarte?", {
      widget: "opciones",
      delay: 1000,
      });
    this.addMessageToState(message);
    };

  registrar = () => {
      const message = this.createChatBotMessage(
        "Para registrarte en nuestro sitio, revisa el menú de navegación justo en la parte superior y clickea 'Registrarse', ése link te redireccionará a un formulario de registro, complétalo y envía tus datos para crear tu cuenta", {
        widget: "register",
        delay: 1000,
        });
      this.addMessageToState(message);
    };

  comprarProducto = () => {
      const message = this.createChatBotMessage(
        "Para comprar un producto, visita nuestra tienda y selecciona el producto que desees, luego agregalo al carrito, ésto abrirá tu carrito para que puedas proceder a finalizar la compra", {
        widget: "products",
        delay: 1000,
        });
      this.addMessageToState(message);
    };

  verOrdenes = () => {
      const message = this.createChatBotMessage(
        "Para poder ver tus órdenes, porfavor verifica primero que hayas iniciado sesión, luego ve a al perfil de tu cuenta y haz click en Mis Órdenes", {
        widget: "orders",
        delay: 1000,
        });
      this.addMessageToState(message);
    };

  pagar = () => {
    const message = this.createChatBotMessage(
      "Puedes pagar tus órdenes en efectivo, con tarjetas de crédito o débito de VISA, MasterCard, o American Express usando la plataforma de Mercado Pago", {
      widget: "payments",
      delay: 1000,
      });
    this.addMessageToState(message);
  };

  verPerfil = () => {
    const message = this.createChatBotMessage(
      "Debes haber iniciado sesión para poder ver tu perfil, para hacerlo puedes hacer click en tu avatar en la parte superior derecha del sitio", {
      widget: "profile",
      delay: 1000,
      });
    this.addMessageToState(message);
    };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
        ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}
 
 export default ActionProvider;
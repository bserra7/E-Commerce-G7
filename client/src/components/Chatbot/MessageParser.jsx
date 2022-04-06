// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
      this.lang = localStorage.getItem('lang');
    }
  
    parse(message) {
        const lowerCaseMessage = message.toLowerCase();
        const options = {
            withAvatar: true,
            widget: "options",
            delay: 1000,
        };
        const delay = {
            withAvatar: true,
            delay: 1000,
        };
        if (lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hello")) return(this.actionProvider.greet());
        if (lowerCaseMessage.includes("hola")) return (this.actionProvider.saludo());
        if (lowerCaseMessage.includes("help")) {
            message = this.actionProvider.createChatBotMessage("How can I help you?", options);
            return this.actionProvider.addMessageToState(message); 
        }
        if (lowerCaseMessage.includes("ayuda")) {
            message = this.actionProvider.createChatBotMessage("Como puedo ayudarte?", options);
            return this.actionProvider.addMessageToState(message); 
        }
        if (lowerCaseMessage.includes("register")) return (this.actionProvider.register());
        if (lowerCaseMessage.includes("sign")) return (this.actionProvider.register());
        if (lowerCaseMessage.includes("registro")) return (this.actionProvider.registrar());
        if (lowerCaseMessage.includes("registrar")) return (this.actionProvider.registrar());
        if (lowerCaseMessage.includes("registrarme")) return (this.actionProvider.registrar());
        if (lowerCaseMessage.includes("buy")) return (this.actionProvider.buyProduct());
        if (lowerCaseMessage.includes("comprar")) return (this.actionProvider.producto());
        if (lowerCaseMessage.includes("orders")) return (this.actionProvider.viewOrders());
        if (lowerCaseMessage.includes("ordenes")) return (this.actionProvider.verOrdenes());
        if (lowerCaseMessage.includes("orden")) return (this.actionProvider.verOrdenes());
        if (lowerCaseMessage.includes("compra")) return (this.actionProvider.verOrdenes());
        if (lowerCaseMessage.includes("compras")) return (this.actionProvider.verOrdenes());
        if (lowerCaseMessage.includes("profile")) return (this.actionProvider.viewProfile());
        if (lowerCaseMessage.includes("account")) return (this.actionProvider.viewProfile());
        if (lowerCaseMessage.includes("perfil")) return (this.actionProvider.verPerfil());
        if (lowerCaseMessage.includes("cuenta")) return (this.actionProvider.verPerfil());
        if (lowerCaseMessage.includes("product")) return (this.actionProvider.buyProduct());
        if (lowerCaseMessage.includes("store")) return (this.actionProvider.buyProduct());
        if (lowerCaseMessage.includes("producto")) return (this.actionProvider.comprarProducto()); 
        if (lowerCaseMessage.includes("productos")) return (this.actionProvider.comprarProducto()); 
        if (lowerCaseMessage.includes("tienda")) return (this.actionProvider.comprarProducto());
        if (lowerCaseMessage.includes("payments")) return this.actionProvider.payments();
        if (lowerCaseMessage.includes("pay")) return this.actionProvider.payments();
        if (lowerCaseMessage.includes("credit cards")) return this.actionProvider.payments();
        if (lowerCaseMessage.includes("cash")) return this.actionProvider.payments();
        if (lowerCaseMessage.includes("card")) return this.actionProvider.payments();
        if (lowerCaseMessage.includes("pagos")) return this.actionProvider.pagar();
        if (lowerCaseMessage.includes("pagar")) return this.actionProvider.pagar();
        if (lowerCaseMessage.includes("tarjeta")) return this.actionProvider.pagar();
        if (lowerCaseMessage.includes("crédito")) return this.actionProvider.pagar();
        if (lowerCaseMessage.includes("mercado")) return this.actionProvider.pagar();
        if (lowerCaseMessage.includes("pago")) return this.actionProvider.pagar();
        if (lowerCaseMessage.includes("thanks")){
            message = this.actionProvider.createChatBotMessage("You are welcome!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        if (lowerCaseMessage.includes("gracias")){
            message = this.actionProvider.createChatBotMessage("Un placer poder ayudar!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        if (lowerCaseMessage.includes("bye")){
            message = this.actionProvider.createChatBotMessage("Goodbye!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        if (lowerCaseMessage.includes("adios")){
            message = this.actionProvider.createChatBotMessage("Adiós, gracias por tu visita!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        if (lowerCaseMessage.includes("chau")){
            message = this.actionProvider.createChatBotMessage("Adiós, gracias por tu visita!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        if (lowerCaseMessage.includes("goodbye")){
            message = this.actionProvider.createChatBotMessage("Goodbye!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        if (lowerCaseMessage.includes("thank")){
            message = this.actionProvider.createChatBotMessage("You are welcome!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        if (lowerCaseMessage.includes("sorry")){
            message = this.actionProvider.createChatBotMessage("It's alright, never mind!", delay);
            return this.actionProvider.addMessageToState(message);
        } 
        else{
            if(this.lang === 'es-ES'){
                message = this.actionProvider.createChatBotMessage("Perdón, no entiendo, puedes reformular la pregunta? o seleccionar una de las opciones",
                options);
            }else{
                message=this.actionProvider.createChatBotMessage("Sorry, i don't understand, can you ask again? or select one option", options);
            }
            return this.actionProvider.addMessageToState(message);
        }  
        }
    }
    
  
  export default MessageParser;
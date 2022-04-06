import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from './ActionProvider';
import chatIcon from "../../assets/images/chatIconOK.png";
import { useIntl } from "react-intl";

export default function ChatBot () {
    const [show, setShow] = useState(false);
    const intl = useIntl()
    return (   
       <div className="chatIcon">
           <span onClick={e => setShow(!show)}><img src={chatIcon} alt="chat bot" /></span>
            {show && <Chatbot placeholderText={intl.formatMessage({id: "chatbot-placeholder"})} config={config} actionProvider={ActionProvider} messageParser={MessageParser} />}
        </div>
    );
}

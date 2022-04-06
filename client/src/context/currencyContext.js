import { createContext, useContext, useState } from "react";

const currContext = createContext({});

export const useCurrencyContext = () => useContext(currContext);

export function CurrencyProvider({children}) {

    const [curr, setCurr] = useState('USD');
    const [multiplier, setMultiplier] = useState(1);

    const contextValue = {
        curr, 
        multiplier,
        setCurr,
        setMultiplier
    };

    return <currContext.Provider value={contextValue}>{children}</currContext.Provider>
}

export default currContext
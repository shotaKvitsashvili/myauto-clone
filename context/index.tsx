import { CurrencyEnums } from '@/enums/filters';
import React, { createContext, useState } from 'react';

interface MyContextType {
    currency: number;
    updateCurrency: (newValue: number) => void;
}

const defaultContextValue: MyContextType = {
    currency: CurrencyEnums.lari,
    updateCurrency: () => { }
}

const Context = createContext<MyContextType>(defaultContextValue);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState<number>(CurrencyEnums.lari);

    const updateCurrency = (newCurrency: number) => {
        setCurrency(newCurrency);
    }

    return (
        <Context.Provider value={{ currency, updateCurrency }}>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider }
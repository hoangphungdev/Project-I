import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    return (
        <UIContext.Provider value={{ userId, setUserId }}>
            {children}
        </UIContext.Provider>
    );
};
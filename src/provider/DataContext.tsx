'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface DataContextType {
    activePage: number;
    setActivePage: (value: number) => void;
    network: string;
    setNetwork: (value: 'devnet' | 'testnet') => void;
}

// Create the context with a default value
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
export const DataProvider = ({ children, initNetwork }: { children: ReactNode, initNetwork: string }) => {
    const [activePage, setActivePage] = useState<number>(0);
    const [network, setNetwork] = useState<'devnet'|'testnet' >('testnet')
    return (
        <DataContext.Provider value={{ activePage, setActivePage, network, setNetwork }}>
            {children}
        </DataContext.Provider>
    );
};

// Custom hook to use the DataContext
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
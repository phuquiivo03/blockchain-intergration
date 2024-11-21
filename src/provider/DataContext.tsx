'use client'

import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface DataContextType {
    activePage: number;
    setActivePage: (value: number) => void;
    network: string;
    setNetwork: (value: 'devnet' | 'testnet') => void;
    client: SuiClient;
}

// Create the context with a default value
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
export const DataProvider = ({ children }: { children: ReactNode, initNetwork: string }) => {
    const [activePage, setActivePage] = useState<number>(0);
    const [network, setNetwork] = useState<'devnet'|'testnet' >('testnet')
    const rpcUrl = getFullnodeUrl(network == 'devnet' || network == 'testnet'? network : 'devnet');
    const client = new SuiClient({ url: rpcUrl });

    return (
        <DataContext.Provider value={{ activePage, setActivePage, network, setNetwork, client }}>
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
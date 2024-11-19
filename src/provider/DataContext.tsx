'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface DataContextType {
    activePage: number;
    setActivePage: (value: number) => void;
}

// Create the context with a default value
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [activePage, setActivePage] = useState<number>(0);

    return (
        <DataContext.Provider value={{ activePage, setActivePage }}>
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
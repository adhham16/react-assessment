import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DataContext.Provider value={{ users, setUsers, products, setProducts, pageSize, setPageSize, searchTerm, setSearchTerm }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(DataContext);
};

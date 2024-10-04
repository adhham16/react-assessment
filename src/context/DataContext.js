import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DataContext.Provider value={{ users, setUsers, products, setProducts, searchTerm, setSearchTerm,rowsPerPage, setRowsPerPage }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(DataContext);
};

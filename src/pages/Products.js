import React from 'react';
import DataTable from '../components/DataTable';
import { useDataContext } from '../context/DataContext';

const Products = () => {
    const { pageSize, setPageSize } = useDataContext();

    return (
        <div style={{ fontFamily: 'Neutra Text' }}>
            <h1><a href='/' class='home-link'>Home</a>/Products</h1>
            <DataTable type="products" />
        </div>
    );
};

export default Products;

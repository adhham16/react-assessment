import React from 'react';
import DataTable from '../components/DataTable';
import { useDataContext } from '../context/DataContext';

const Users = () => {
    const { rowsPerPage, setRowsPerPage } = useDataContext();

    return (
        <div style={{ fontFamily: 'Neutra Text' }}>
            <h1><a href='/' class='home-link'>Home</a> / Users</h1>
            <DataTable type="users" />
        </div>
    );
};

export default Users;

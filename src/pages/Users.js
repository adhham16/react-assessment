import React from 'react';
import DataTable from '../components/DataTable';
import { useDataContext } from '../context/DataContext';

const Users = () => {
    const { pageSize, setPageSize } = useDataContext();

    return (
        <div style={{ fontFamily: 'Neutra Text' }}>
            <h1>Users</h1>
            <label>
                Page Size:
                <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </label>
            <DataTable type="users" />
        </div>
    );
};

export default Users;

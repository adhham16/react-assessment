import React, { useEffect } from 'react';
import axios from 'axios';
import { useDataContext } from '../context/DataContext';

const DataTable = ({ type }) => {
    const { users, setUsers, products, setProducts, pageSize, searchTerm, setSearchTerm } = useDataContext();
    
    useEffect(() => {
        const fetchData = async () => {
            const url = type === 'users' ? `https://dummyjson.com/users?limit=${pageSize}` : `https://dummyjson.com/products?limit=${pageSize}`;
            const response = await axios.get(url);
            if (type === 'users') {
                setUsers(response.data.users);
            } else {
                setProducts(response.data.products);
            }
        };
        fetchData();
    }, [pageSize, type, setUsers, setProducts]);

    const dataToDisplay = type === 'users' ? users : products;
    const filteredData = dataToDisplay.filter(item => {
        if (type === 'users') {
            return item.username.includes(searchTerm);
        } else {
            return item.title.includes(searchTerm);
        }
    });

    return (
        <div>
            <input
                type="text"
                placeholder={`Search ${type}`}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        {type === 'users' ? (
                            <>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                {/* Add more user fields as needed */}
                            </>
                        ) : (
                            <>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Brand</th>
                                {/* Add more product fields as needed */}
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.id}>
                            {type === 'users' ? (
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    {/* Add more user fields as needed */}
                                </>
                            ) : (
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.brand}</td>
                                    {/* Add more product fields as needed */}
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

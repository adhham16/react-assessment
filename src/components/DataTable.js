import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataContext } from '../context/DataContext';
import { FaSearch } from 'react-icons/fa'; 
import './DataTable.css';
import Pagination from './Pagination';

const DataTable = ({ type }) => {
    const { users, setUsers, products, setProducts, rowsPerPage, setRowsPerPage } = useDataContext();
    const [filteredAllData, setFilteredAllData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState('ALL');
    // const [rowsPerPage, setRowsPerPage] = 5;

    useEffect(() => {
        const fetchData = async () => {
            const url = type === 'users' ? `https://dummyjson.com/users` : `https://dummyjson.com/products`;
            const response = await axios.get(url);
            if (type === 'users') {
                setUsers(response.data.users);
            } else {
                setProducts(response.data.products);
            }
        };
        fetchData();
    }, [type, setUsers, setProducts]);

    useEffect(() => {
        const filteredAllData = () => {
            let data;
            if (type === 'users') {
                data = users;
                if (filters.name) {
                    data = data.filter(user => user.firstName.toLowerCase().includes(filters.name.toLowerCase()));
                }
                if (filters.email) {
                    data = data.filter(user => user.email.toLowerCase().includes(filters.email.toLowerCase()));
                }
                if (filters.birthDate) {
                    data = data.filter(user => user.birthDate.includes(filters.birthDate));
                }
                if (filters.gender) {
                    data = data.filter(user => user.gender.toLowerCase() === filters.gender.toLowerCase());
                }
                if (searchTerm) {
                    const searchTermLower = searchTerm.toLowerCase();
                    data = data.filter(user =>
                        user.firstName.toLowerCase().includes(searchTermLower) ||
                        user.lastName.toLowerCase().includes(searchTermLower) ||
                        user.maidenName.toLowerCase().includes(searchTermLower) ||
                        user.phone.toLowerCase().includes(searchTermLower) ||
                        user.email.toLowerCase().includes(searchTermLower) ||
                        user.gender.toLowerCase().includes(searchTermLower) ||
                        user.age.toString().includes(searchTermLower)
                    );
                }
            }else{
                data = products;
                if (selectedTab === 'Laptops') {
                    data = data.filter(products => products.category === 'Laptops');
                }
                if (filters.title) {
                    data = data.filter(products => products.title.toLowerCase().includes(filters.title.toLowerCase()));
                }
                if (filters.category) {
                    data = data.filter(products => products.category && products.category.toLowerCase().includes(filters.category.toLowerCase()));
                }
                if (filters.brand) {
                    data = data.filter(products => products.brand && products.brand.toLowerCase().includes(filters.brand.toLowerCase()));
                }
                if (searchTerm) {
                    const searchTermLower = searchTerm.toLowerCase();
                    data = data.filter(products =>
                        products.title.toLowerCase().includes(searchTermLower) ||
                        products.category.toLowerCase().includes(searchTermLower)||
                        products.sku.toLowerCase().includes(searchTermLower)
                    );
                }
            }
        
            setFilteredAllData(data);

        };
        filteredAllData();
    }, [filters, users,products,selectedTab]);


    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredAllData.slice(indexOfFirstRow, indexOfLastRow);
    
    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
        let input;
        if(type === 'users'){
            input = {
                name: '',
                email: '',
                gender: '',
            }
        }else{
            input = {
                title: '',
                brand: '',
                category: '',
            }
        }
       
        setFilters(input);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            <div className="search-filter-bar">
                <div className="search-input filters">
                    <label>
                        Page Size:
                        <select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                </div>

                <div className="separator"></div>

                <div className="search-input">
                    <input
                        type="text"
                        placeholder={`Search ${type}`}
                        value={searchTerm}
                        onChange={handleSearchInput}
                    />
                    <FaSearch className="search-icon" />
                </div>

                {type === 'users' && (
                    <>
                        <div className="separator"></div>

                        <div className="filters">
                            <input
                                type="text"
                                placeholder="Filter by Name"
                                value={filters.name}
                                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Email"
                                value={filters.email}
                                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                            />
                            <input
                                type="date"
                                placeholder="Filter by Birth Date"
                                value={filters.birthDate}
                                onChange={(e) => setFilters({ ...filters, birthDate: e.target.value })}
                            />
                            <select
                                value={filters.gender}
                                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                            >
                                <option value="">Filter by Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </>
                )}
                {type === 'products' && (
                    <>
                        <div className="separator"></div>

                        <div className="filters">
                           
                            <input
                                type="text"
                                placeholder="Filter by Title"
                                value={filters.title}
                                onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Brand"
                                value={filters.brand}
                                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Filter by Category"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            />
                        </div>
                        <div className="tabs">
                            <button
                                className={selectedTab === 'ALL' ? 'active' : ''}
                                onClick={(e) => {
                                    setSelectedTab('ALL'); 
                                    setFilters(...selectedTab, e.target.value); 
                                }}
                            >
                                ALL
                            </button>
                            <button
                                className={selectedTab === 'Laptops' ? 'active' : ''}
                                onClick={(e) => {
                                    setSelectedTab('Laptops'); 
                                    setFilters(...selectedTab, e.target.value); 
                                }}
                            >
                                Laptops
                            </button>
                        </div>
                    </>
                )}

            </div>

            <table>
                <thead>
                    <tr>
                        {type === 'users' ? (
                            <>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Maiden Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Username</th>
                                <th>Blood Group</th>
                                <th>Eye Color</th>
                                <th>Height</th>
                                <th>Weight</th>
                            </>
                        ) : (
                            <>
                                <th>ID</th>
                                <th>SKU</th>
                                <th>Title</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Discount Percentage</th>
                                <th>Weight</th>
                                <th>Height</th>
                                <th>Stock</th>
                                <th>Minimum Order Quantity</th>
                                <th>Rating</th>
                                
                             
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map(item => (
                        <tr key={item.id}>
                            {type === 'users' ? (
                                <>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.maidenName}</td>
                                    <td>{item.age}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.username}</td>
                                    <td>{item.bloodGroup}</td>
                                    <td>{item.eyeColor}</td>
                                    <td>{item.height}</td>
                                    <td>{item.weight}</td>
                                </>
                            ) : (
                                <>
                                    <td>{item.id}</td>
                                    <td>{item.sku}</td>
                                    <td>{item.title}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.discountPercentage}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.dimensions.height}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.minimumOrderQuantity}</td>
                                    <td>{item.rating}</td>
                                  
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                rowsPerPage={rowsPerPage}
                totalItems={filteredAllData.length}
            />
        </div>
    );
};

export default DataTable;

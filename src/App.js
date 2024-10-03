import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Users from './pages/Users';
import Products from './pages/Products';

const App = () => {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </Router>
        </DataProvider>
    );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Users from './pages/Users';
import Products from './pages/Products';
import HomePage from './pages/Home';

const App = () => {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} /> 
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </Router>
        </DataProvider>
    );
};

export default App;

import React from 'react';
import './Home.css';

const HomePage = () => {
    return (
        <div className="app-container">
            <div className="section-buttons">
            <button 
                onClick={() => {
                    window.location.href = '/users'; // Navigate to /users
                }}
            >
                Users
            </button>
            <button 
                onClick={() => {
                    window.location.href = '/products'; // Navigate to /products
                }}
            >
                Products
            </button>
            </div>
        </div>
    );
};

export default HomePage;

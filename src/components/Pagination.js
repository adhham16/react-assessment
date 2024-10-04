import React from 'react';
import './Pagination.css';
import { FaArrowRight,FaArrowLeft } from 'react-icons/fa'; 


const Pagination = ({ currentPage, setCurrentPage, rowsPerPage, totalItems }) => {
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <FaArrowLeft className="arrow-left-icon" />
            </button>
            {renderPageNumbers()}
            <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <FaArrowRight className="arrow-right-icon" />
            </button>
        </div>
    );
};

export default Pagination;

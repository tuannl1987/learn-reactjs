import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import { Box } from '@mui/material';
import DetailPage from './pages/DetailPage';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    return (
        <Box pt={4}>
            <Routes>
                <Route path="/" Component={ListPage} />
                <Route path="/*" Component={ListPage} />
                <Route path="/:productId" Component={DetailPage} />
            </Routes>
        </Box>
    );
}

export default ProductFeature;
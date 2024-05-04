import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import { Box } from '@mui/material';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    return (
        <Box pt={4}>
            <Routes>
                <Route path="/" Component={ListPage} />
            </Routes>
        </Box>
    );
}

export default ProductFeature;
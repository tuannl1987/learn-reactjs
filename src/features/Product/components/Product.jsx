import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

Product.propTypes = {
    product: PropTypes.object,
};

function Product(props) {
    const { product } = props;
    return (
        <Box padding={1}>
            <Skeleton variant="rectangular" width="100%" height={118} />
            <Typography variant='body2'>{product.name}</Typography>
            <Typography variant='body2'>{product.salePrice} - {product.promotionPercent}</Typography>
        </Box>
    );
}

export default Product;
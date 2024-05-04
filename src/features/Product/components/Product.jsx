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
            <Box padding={1}>
                <img
                    src='https://api.ezfrontend.com/uploads/9ff7d29c2ebad4fd802685eb770d9452_417240087a.jpg'
                    alt={product.name}
                    width='100%'
                />
            </Box>

            <Typography variant='body2'>{product.name}</Typography>
            <Typography variant='body2'>{product.salePrice} - {product.promotionPercent}</Typography>
        </Box>
    );
}

export default Product;
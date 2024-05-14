import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import {STATIC_HOST, THUMBNAIL_PLACEHOLDER} from '../../../constants/index';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils';

Product.propTypes = {
    product: PropTypes.object,
};

function Product(props) {
    const { product } = props;
    const navigate = useNavigate();

    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_PLACEHOLDER}`;

    const handleClick = () => {
        // Navigate to product detail page
        navigate(`/products/${product.id}`);
    };

    return (
        <Box padding={1} onClick={handleClick} >
            <Box padding={1}>
                <img
                    src={thumbnailUrl}
                    alt={product.name}
                    width='100%'
                />
            </Box>

            <Typography variant='body2'>{product.name}</Typography>
            <Typography variant='body2'>
                <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
                    {formatPrice(product.salePrice)}
                </Box>

                {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    );
}

export default Product;
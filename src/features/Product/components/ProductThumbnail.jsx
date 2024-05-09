import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail(props) {
    const {product} = props;
    const thumbnailUrl = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail?.url}`
        : `${THUMBNAIL_PLACEHOLDER}`;
    
    return (
        <Box padding={1}>
            <img
                src={thumbnailUrl}
                alt={product.name}
                width='100%'
            />
        </Box>
    );
}

export default ProductThumbnail;
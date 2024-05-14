import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
    product: PropTypes.object.isRequired,
};

function ProductDescription({ product = {} }) {
    const safeDescription = DOMPurify.sanitize(product.description);
    return (
        <Paper elevation={0} className='p-4'>
            <div dangerouslySetInnerHTML={{__html: safeDescription}}></div>
        </Paper>
    );
}

export default ProductDescription;
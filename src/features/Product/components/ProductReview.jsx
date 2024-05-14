import React from 'react';
import PropTypes from 'prop-types';

ProductReview.propTypes = {
    product: PropTypes.object.isRequired,
};

function ProductReview(props) {
    return (
        <div>
            ProductReview
        </div>
    );
}

export default ProductReview;
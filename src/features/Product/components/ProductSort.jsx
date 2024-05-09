import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

ProductSort.defaultProps = {
    onChange: null,
};

function ProductSort(props) {
    const {currentSort, onChange} = props;

    const handleSortChange = (event, newValue) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <Tabs
            value={currentSort}
            indicatorColor='primary'
            textColor='primary'
            onChange={handleSortChange}
            aria-label=''
        >
            <Tab label="Giá thấp tới cao" value="salePrice:ASC"></Tab>
            <Tab label="Giá cao tới thấp" value="salePrice:DESC"></Tab>
        </Tabs>
    );
}

export default ProductSort;
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters(props) {
    const {filters,onChange} = props;

    const handleCategoryChange = (newCategoryId, newCategoryName) => {
        const newFilters = {
            "category.id": newCategoryId,
            "category.name": newCategoryName,
        };
        if (onChange) {
            onChange(newFilters);
        }
    };

    const handleChange = (values) => {
        if (onChange) {
            onChange(values);
        }
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    );
}

export default ProductFilters;
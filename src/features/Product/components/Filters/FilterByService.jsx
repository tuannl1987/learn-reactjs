import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

FilterByService.defaultProps = {
    filters: {},
    onChange: null,
};

function FilterByService(props) {
    const {filters, onChange} = props;

    const handleChange = (e) => {
        if(!onChange) return;
        const {name, checked} = e.target;
        onChange({ [name]: checked });
    };

    return (
        <Box className='p-4 border-t border-solid border-gray-300'>
            <Typography variant='subtitle2'>DỊCH VỤ</Typography>

            <ul className='p-0 m-0'>
                {[
                    {   
                        value: 'isPromotion', 
                        label: 'Khuyến mãi',
                    }, 
                    {   
                        value: 'isFreeShip', 
                        label: 'Miễn phí giao hàng',
                    },].map(service => (
                    <li
                        key={service.value}
                        className='mt-2'
                    >
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                    color='primary'
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByService;
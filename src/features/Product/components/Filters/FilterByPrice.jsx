import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
};

function FilterByPrice(props) {
    const {onChange} = props;

    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if(onChange) {
            if(Number(values.salePrice_lte) > 0 && Number(values.salePrice_gte) > 0) {
                onChange(values);
                setValues({
                    salePrice_gte: 0,
                    salePrice_lte: 0,
                });
            }
        }
    };

    return (
        <Box className='p-4 border-t border-solid border-gray-300'>
            <Typography variant='subtitle2'>CHỌN KHOẢNG GIÁ</Typography>

            <Box className='mt-2 mb-2 flex flex-row flex-nowrap items-center'>
                <TextField 
                    name='salePrice_gte' value={values.salePrice_gte} onChange={handleChange}
                    
                />
                <span className='ml-2 mr-2'>-</span>
                <TextField 
                    name='salePrice_lte' value={values.salePrice_lte} onChange={handleChange} 
                    
                />
            </Box>

            <Button variant='outlined' color='primary' size='small' onClick={handleSubmit}>Áp dụng</Button>
        </Box>
    );
}

export default FilterByPrice;
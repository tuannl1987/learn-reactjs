import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { formatPrice } from '../../../utils';

ProductInfo.propTypes = {
    product: PropTypes.object
};

function ProductInfo({product = {}}) {
    const { name, shortDescription, salePrice, originalPrice, promotionPercent, isPromotion } = product;
    return (
        <Box className='pb-2 border-b border-solid border-gray-200'>
            <Typography component='h1' variant='h4'>
                {name}
            </Typography>

            <Typography variant='body2' className='m-2'>{shortDescription}</Typography>

            <Box className='bg-gray-100 p-2'>
                <Box component='span' className='text-2xl font-bold mr-6'>
                    {formatPrice(salePrice)}
                </Box>
                {isPromotion && (
                    <>
                        <Box component='span' className='mr-6 line-through'>
                            {formatPrice(originalPrice)}
                        </Box>
                        <Box component='span' className=''>
                            {`-${promotionPercent}%`}
                        </Box>
                    </>
                )}
                
            </Box>
        </Box>
    );
}

export default ProductInfo;
import { Box, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

DetailPage.propTypes = {
    
};

function DetailPage(props) {
    const params = useParams();
    const { productId } = params;
    const {product, loading} = useProductDetail(productId); //use custom hook

    if(loading) {
        return (
            <Box>Loading</Box>
        )
    }

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container >
                        <Grid item className='w-96 p-3 border-r border-solid border-gray-300'>
                            <ProductThumbnail product={product} />
                        </Grid>

                        <Grid item className='flex-1 p-3'>
                            Product info
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
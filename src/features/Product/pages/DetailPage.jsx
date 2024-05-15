import { Box, Container, Grid, LinearProgress, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useParams, Route, Routes } from 'react-router-dom';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
import ProductInfo from '../components/ProductInfo';
import AddToCartForm from '../components/AddToCartForm';
import ProductMenu from '../components/ProductMenu';
import ProductDescription from '../components/ProductDescription';
import ProductAdditional from '../components/ProductAdditional';
import ProductReview from '../components/ProductReview';

DetailPage.propTypes = {
    
};

function DetailPage(props) {
    const params = useParams();
    const { productId } = params;
    const {product, loading} = useProductDetail(productId); //use custom hook

    const [pathname, setPathname] = useState(useLocation().pathname);
    // check pathname include /additional or /review
    if (pathname.includes('/additional')) {
        var newPathName = pathname.replace('/additional', '');
        setPathname(newPathName);
    } else if (pathname.includes('/review')) {
        newPathName = pathname.replace('/review', '');
        setPathname(newPathName);
    }


    if(loading) {
        return (
            <Box className='fixed top-0 left-0 w-full'>
                <LinearProgress />
            </Box>
        )
    };

    const handleAddToCartSubmit = (formValues) => {
        console.log("handleAddToCartSubmit", formValues);
    };

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container >
                        <Grid item className='w-96 p-3 border-r border-solid border-gray-300'>
                            <ProductThumbnail product={product} />
                        </Grid>

                        <Grid item className='flex-1 p-3'>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmit} />
                            
                        </Grid>
                    </Grid>
                </Paper>
            

                <ProductMenu />

                
                <Routes>
                    <Route path={`/`} element={<ProductDescription product={product} />} />
                    <Route path={`/additional`} element={<ProductAdditional product={product} />} />
                    <Route path={`/review`} element={<ProductReview product={product} />} />
                </Routes>

            </Container>
        </Box>
    );
}

export default DetailPage;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper } from '@mui/material';
import productApi from '../../../api/productApi';
import ProductListSkeleton from '../components/ProductListSkeleton';
import ProductList from '../components/ProductList';

ListPage.propTypes = {
    
};

function ListPage(props) {
    const classes = {
        root: {

        },

        left: {
            width: '250px',
        },

        right: {
            flex: '1 1 0',
        }
    };

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await productApi.getAll({_page: 1, _limit: 10});
                setProductList(data);
            } catch (error) {
                console.log("Fetch productList fail!", error);
            }

            setLoading(false);            
        })();
    }, []);

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sx={classes.left}>
                        <Paper elevation={0}>Left</Paper>
                    </Grid>

                    <Grid item sx={classes.right}>
                        <Paper elevation={0}>
                            {loading ? <ProductListSkeleton /> : <><ProductList data={productList} /></>}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
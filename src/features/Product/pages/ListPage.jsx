import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import productApi from '../../../api/productApi';
import ProductListSkeleton from '../components/ProductListSkeleton';
import ProductList from '../components/ProductList';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/Filters/FilterViewer';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

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
        },

        pagination: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            marginTop: '20px',
            paddingBottom: '10px',
        },
    };

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params =  queryString.parse(location.search);

        return {
            ...params,
            _page: Number.parseInt(params._page) || 1, 
            _limit: Number.parseInt(params._limit) || 9,
            _sort: params._sort || 'salePrice:ASC' ,
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        }
    }, [location.search]);

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
        limit: 9,
        total: 10,
        page: 1,
    });
    const [loading, setLoading] = useState(true);

    // const [filters, setFilters] = useState({
    //         ...queryParams,
    //         _page: Number.parseInt(queryParams._page) || 1, 
    //         _limit: Number.parseInt(queryParams._limit) || 9,
    //         _sort: queryParams._sort || 'salePrice:ASC' ,
    // });

    // useEffect(() => {
    //     // TODO sync filters to URL
    //     navigate('?' + queryString.stringify(filters));
    // }, [filters]);

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams);
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log("Fetch productList fail!", error);
            }

            setLoading(false);            
        })();
    }, [queryParams]);

    const handlePageChange = (e, page) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page,
        // }));

        const filters = {
            ...queryParams,
            _page: page,
        }

        navigate('?' + queryString.stringify(filters));
    };

    const handleSortChange = (newSortValue) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _sort: newSortValue,
        // }));

        const filters = {
            ...queryParams,
            _sort: newSortValue,
        }

        navigate('?' + queryString.stringify(filters));
    };

    const handleFiltersChange = (newFilters) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters,
        // }));

        const filters = {
            ...queryParams,
            ...newFilters,
        }

        navigate('?' + queryString.stringify(filters));
    };

    const handleViewerChange = (newFilters) => {
        // setFilters(newFilters);

        const filters = {
            ...newFilters,
        }

        navigate('?' + queryString.stringify(newFilters));
    };

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sx={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>

                    <Grid item sx={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />

                            <FilterViewer filters={queryParams} onChange={handleViewerChange}/>

                            {loading ? <ProductListSkeleton length={9} /> : <><ProductList data={productList} /></>}

                            <Box sx={classes.pagination}>
                                <Pagination 
                                    color='primary' 
                                    count={Math.ceil(pagination.total / pagination.limit)} 
                                    page={pagination.page}
                                    onChange={handlePageChange}
                                />
                            </Box>
                            
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
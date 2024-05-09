import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import categoryApi from '../../../../api/categoryApi';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

function FilterByCategory(props) {
    const {onChange} = props;

    const classes = {
        root: {
            padding: '1rem',
            'ul li': {
                marginTop: '0.5rem',
                transition: 'all .25s',
            },
            'ul li:hover': {
                cursor: 'pointer',
                color: 'rgb(30 64 175)',
            },
        },
        menu: {
            padding: 0,
            margin: 0,
            listStyleType: 'none',
        },
    };

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
      (async () => {
        try {
            const list = await categoryApi.getAll();
            setCategoryList(list.map( x => ({
                id: x.id,
                name: x.name,
            })))
        } catch (error) {
            console.log("Fetch categoryList fail!", error);
        }
      })();
    }, [])

    const handleCategoryClick = (category) => {
        if(onChange) {
            onChange(category.id, category.name);
        }
    };

    return (
        <Box sx={classes.root}>
            <Typography variant='subtitle2'>DANH MỤC SẢN PHẨM</Typography>

            <ul className={classes.menu}>
                {categoryList.map((category) => (
                    <li
                        key={category.id}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <Typography variant='body2'>{category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;
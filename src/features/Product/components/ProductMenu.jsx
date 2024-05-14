import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Link } from '@mui/material';
import { NavLink, useLocation} from 'react-router-dom';

ProductMenu.propTypes = {
    
};

function ProductMenu(props) {
    const [pathname, setPathname] = useState(useLocation().pathname);
    // check pathname include /additional or /review
    if (pathname.includes('/additional')) {
        var newPathName = pathname.replace('/additional', '');
        setPathname(newPathName);
    } else if (pathname.includes('/review')) {
        var newPathName = pathname.replace('/review', '');
        setPathname(newPathName);
    }
    

    return (
        <Box 
            component="ul" 
            className='flex flex-row flex-nowrap items-center justify-center p-0 m-0 list-none'
        >
            <li className='px-2 py-1 mx-4 my-2'>
                <Link component={NavLink} to={`${pathname}`}
                    className='text-gray-700 no-underline'
                >
                    Description
                </Link>
            </li>
            <li className='px-2 py-1 mx-4 my-2'>
                <Link component={NavLink} to={`${pathname}/additional`}
                    className='text-gray-700 no-underline'
                >
                    Additional Informations
                </Link>
            </li>
            <li className='px-2 py-1 mx-4 my-2'>
                <Link component={NavLink} to={`${pathname}/review`}
                    className='text-gray-700 no-underline'
                >
                    Reviews
                </Link>
            </li>
        </Box>
    );
}

export default ProductMenu;
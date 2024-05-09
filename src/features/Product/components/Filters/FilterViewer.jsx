import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip } from '@mui/material';
import categoryApi from '../../../../api/categoryApi';

const FILTER_LIST = [
    {
        id: 1,
        getLable: (filters) => 'Miễn phí giao hàng',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle:(filters) => {
            const newFilters = {...filters};
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }
            return newFilters;
        },
    },
    {
        id: 2,
        getLable: () => 'Khuyễn mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: null,
    },
    {
        id: 3,
        getLable: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) => {
            if (Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte')) {
                if (Number(filters.salePrice_lte) > 0 && Number(filters.salePrice_gte) > 0)
                    return true;
            }
            return false;
        },
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
        },
        onToggle: null,
    },
    {
        id: 4,
        getLable: (filters) => {
            const newFilters = {...filters};
            return newFilters['category.name'];
        },
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('category.name'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = {...filters};
            delete newFilters['category.id'];
            delete newFilters['category.name'];
            return newFilters;
        },
        onToggle: null,
    },
];

FilterViewer.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {

    const visibleFilters = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters));
    }, [filters]);

    return (
        <Box component="ul" className='flex flex-row flex-nowrap items-center p-0 m-2 list-none'>
            {visibleFilters.map(x => (
                <li
                    className='m-0 p-1'
                    key={x.id}
                >
                    <Chip
                        label={x.getLable(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        size='small'
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            if (!onChange) return;
                            const newFilters = x.onToggle(filters);
                            onChange(newFilters);
                        }}

                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilters = x.onRemove(filters);
                            onChange(newFilters);
                        } : null}
                    
                    />
                </li>
            ))}
        </Box>
    );
}

export default FilterViewer;
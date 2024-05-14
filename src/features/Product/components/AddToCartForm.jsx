import PropTypes from 'prop-types';
import React from 'react';

import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '@mui/material';
import * as yup from "yup";
import QuantityField from '../../../components/form-controls/QuantityField';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func
};

function AddToCartForm({ onSubmit = null }) {
    const schema = yup
                .object().shape({
                    quantity: yup.number()
                                .min(1, 'Minimum value is 1.')
                                .required('Please enter quantity.')
                                .typeError('Please enter a number'),
                })

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if(onSubmit) {
           await onSubmit(values);
        }
    };

    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <QuantityField name="quantity" label="Quantity" form={form} />
                <Button variant="contained" color="primary"  type="submit" className='max-w-64 mt-1 mb-1'>
                    Add to cart
                </Button>
            </form>
        </div>
    );
}

export default AddToCartForm;
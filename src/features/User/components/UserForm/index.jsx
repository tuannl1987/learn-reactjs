import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

UserForm.propTypes = {
    onSubmit: PropTypes.func,
};

function UserForm(props) {
    const schema = yup.object().shape({
        name: yup.string().required("Please enter your name."),
        email: yup.string().required("Please enter your email.").email("Please enter a valid email."),
    });

    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        const { onSubmit } = props;
        if(onSubmit) {
            onSubmit(values);
        }
        form.reset();
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            User Form
            <InputField name="name" label="Name" form={form} />
            <InputField name="email" label="Email" form={form} />
            <Button variant="contained" color="primary"  type="submit" sx={{ mt: 3, mb: 2 }} fullWidth>
                Add
            </Button>
        </form>
    );
}

export default UserForm;
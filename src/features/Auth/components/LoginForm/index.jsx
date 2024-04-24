import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import PasswordField from '../../../../components/form-controls/PasswordField';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const schema = yup
                .object().shape({
                    identifier: yup.string().required("Please enter your email.")
                            .email("Please enter a valid email."),

                    password: yup.string().required("Please enter your password.")
                    
                })

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        const { onSubmit } = props;
        if(onSubmit) {
           await onSubmit(values);
        }
    };

    const { isSubmitting } = form.formState;

    return (
        <div>
            { isSubmitting && <LinearProgress /> }

            <Avatar sx={{margin: '0 auto', bgcolor: 'secondary.main'}}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography component="h3" variant="h5" sx={{textAlign: 'center'}} >
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="identifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <Button disabled={isSubmitting} variant="contained" color="primary"  type="submit" sx={{ mt: 3, mb: 2 }} fullWidth>
                    Sign in
                </Button>
            </form>
        </div>
    );
}

export default LoginForm;
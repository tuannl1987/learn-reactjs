import React from 'react';
import PropTypes from 'prop-types';

import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import PasswordField from '../../../../components/form-controls/PasswordField';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const schema = yup
                .object().shape({
                    fullName: yup.string().required("Please enter your full name.")
                            .test("should have at least two words", "Please enter at least two words", (value) => {
                                return value.split(' ').length >=2;
                            }),
                    
                    email: yup.string().required("Please enter your email.")
                            .email("Please enter a valid email."),

                    password: yup.string().required("Please enter your password.")
                            .min(6, "Please enter at least 6 characters."),
                            
                    retypePassword: yup.string().required("Please retype your password.")
                            .oneOf([yup.ref('password')], 'Password does not match')
                            .min(6, "Please enter at least 6 characters."),
                    
                })

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
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
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form} />
                <InputField name="email" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <PasswordField name="retypePassword" label="Retype Password" form={form} />
                <Button disabled={isSubmitting} variant="contained" color="primary"  type="submit" sx={{ mt: 3, mb: 2 }} fullWidth>
                    Create an account
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

function LoginForm(props) {
    const schema = yup
                .object({
                    userName: yup.string()
                                .matches(/^[a-zA-Z0-9]+$/, 'Only letters (either case), numbers, and the underscore')
                                .required('Please enter your username'),
                    password: yup.string()
                                .required('Please enter your password'),
                })

    const form = useForm({
        defaultValues: {
            userName: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        console.log("Login Form", values);
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            Login Form
            <InputField name="userName" label="UserName" form={form} />
            <InputField name="password" label="Password" form={form} />
            <input type="submit" />
        </form>
    );
}

export default LoginForm;
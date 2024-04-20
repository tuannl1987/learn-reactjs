import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { login, register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            // auto set username = email
            values.username = values.email;

            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // close dialog
            const {closeDialog} = props;
            if(closeDialog) {
                closeDialog();
            }

            // enqueueSnackbar("Login success", {variant: "success"});
        } catch (error) {
            console.log("Fail to login.", error);
            enqueueSnackbar(error.message, {variant: "error"});
        }
    };
    
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;
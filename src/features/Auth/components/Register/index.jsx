import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            // auto set username = email
            values.username = values.email;

            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // close dialog
            const {closeDialog} = props;
            if(closeDialog) {
                closeDialog();
            }

            console.log("New user", user);
            enqueueSnackbar("Register success", {variant: "success"});
        } catch (error) {
            console.log("Fail to register", error);
            enqueueSnackbar(error.message, {variant: "error"});
        }
    };
    
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;
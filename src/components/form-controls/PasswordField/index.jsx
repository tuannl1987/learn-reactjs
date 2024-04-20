import React from 'react';
import PropTypes from 'prop-types';
import TextField  from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useState } from 'react';
import { FormHelperText } from '@mui/material';

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function PasswordField(props) {
    const {form, name, label, disabled} = props;
    // const { clearErrors } = form;
    // const hasError = clearErrors[name];

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(x => !x);
    };

    return (
        <FormControl sx={{mt: 2, mb: 2}} variant="outlined" fullWidth>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller 
                name={name}
                variant="outlined"
                control={form.control}
                render={({ field, fieldState: { error } }) => (
                    <>
                    <OutlinedInput
                        {...field}
                        id={name}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label={label}
                        error={!!error}
                    />
                    <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </>
                )}

                disabled={disabled}
            />

            
        </FormControl>
    );
}

export default PasswordField;
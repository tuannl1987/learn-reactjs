import React from 'react';
import PropTypes from 'prop-types';
import TextField  from '@mui/material/TextField';
import { Controller } from 'react-hook-form';


InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const {form, name, label, disabled} = props;
    // const { clearErrors } = form;
    // const hasError = clearErrors[name];

    return (
        
        <Controller 
            name={name}
            variant="outlined"
            control={form.control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={label}
                  error={!!error}
                  helperText={error ? error?.message : ''}
                fullWidth
                sx={{mt: 2, mb: 2}}
                
                />
              )}

            disabled={disabled}
        />
    );
}

export default InputField;
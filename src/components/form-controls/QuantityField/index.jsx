import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, FormHelperText, Typography } from '@mui/material';

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function QuantityField(props) {
    const {form, name, label, disabled} = props;
    const { errors, setValue } = form;
    // const hasError = !!errors[name];

    const handleButtonClick = (name, value) => {
        console.log(form);
        console.log({name, value});
        // setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
        setValue("quantity", Number.parseInt(1));
    };
    
    return (
        <FormControl sx={{mt: 2, mb: 2}} variant="outlined" fullWidth size='small'>
            <Typography>{label}</Typography>
            <Controller 
                name={name}
                control={form.control}
                render={({field, fieldState: { error }, onChange, onBlur}) => (
                    <Box className="flex flex-col flex-nowrap">
                        <Box className="max-w-52 flex flex-row flex-nowrap items-center">
                            <IconButton onClick={() => setValue(field.name, Number.parseInt(field.value) ? Number.parseInt(field.value) - 1 : 1)} >
                                <RemoveCircleOutline />
                            </IconButton>

                            <OutlinedInput
                                id={field.name}
                                type='number'
                                disabled={disabled}
                                value={field.value}
                                onChange={onChange}
                                onBlur={onBlur}
                                error={!!error}
                            />

                            <IconButton onClick={() => setValue(field.name, Number.parseInt(field.value) ? Number.parseInt(field.value) + 1 : 1)}>
                                <AddCircleOutline  />
                            </IconButton>
                        </Box>
                        <FormHelperText error={!!error}>{error?.message}</FormHelperText>
                    </Box>
                )}
            />
        </FormControl>
    );
}

export default QuantityField;
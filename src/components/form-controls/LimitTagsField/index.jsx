import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';

LimitTagsField.propTypes = {
    onChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.array,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

function LimitTagsField(props) {
    const {form, name, options, defaultValue, label, placeholder, disabled, onChange} = props;

    const handleChange = (event, values) => {
        onChange(values);
    };

    return (
        <>
        <Autocomplete
            name={name}
            control={form.control}

            multiple
            limitTags={2}
            id="multiple-limit-tags"
            onChange={handleChange}
            options={options}
            getOptionLabel={(option) => option.name}
            defaultValue={defaultValue}
            renderInput={(params) => (
                <TextField
                    {...params} 
                    label={label}
                    placeholder={placeholder}
                    fullWidth
                />
            )}
            sx={{ width: '500px' }}
        />
        </>
    );
}

export default LimitTagsField;
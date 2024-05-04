import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import LimitTagsField from '../../../../components/form-controls/LimitTagsField';
import TagsDropDown from '../../../../components/form-controls/TagsDropDown';

UserTagsForm.propTypes = {
    onSubmit: PropTypes.func,
    userList: PropTypes.array,
};

function UserTagsForm(props) {
    const { userList } = props;
    const [userTagsList, setUserTagsList] = useState([]);

    const schema = yup.object().shape({
    });

    const form = useForm({
        defaultValues: {
            name: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = () => {
        const { onSubmit } = props;
        if(onSubmit) {
            onSubmit(userTagsList);
        }
    };

    const handleOnChange = (values) => {
        setUserTagsList(values);
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            User Tags Form
            <LimitTagsField name="name" options={userList} label="Name" placeholder="User Name" form={form} onChange={handleOnChange} />
            
            <Button variant="contained" color="primary"  type="submit" sx={{ mt: 3, mb: 2 }} fullWidth>
                Search
            </Button>
        </form>
    );
}

export default UserTagsForm;
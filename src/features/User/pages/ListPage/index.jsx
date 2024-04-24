import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import UserList from '../../components/UserList';
import { useState, useEffect } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import UserForm from '../../components/UserForm';
import UserTagsForm from '../../components/UserTagsForm';

ListPage.propTypes = {
    
};

function ListPage(props) {
    const initUserList = [
        {
            id: 1,
            name: "username001",
            email: "username001@gmail.com",
            status: "new",
        },
        {
            id: 2,
            name: "username002",
            email: "username002@gmail.com",
            status: "removed",
        },
        {
            id: 3,
            name: "username003",
            email: "username003@gmail.com",
            status: "new",
        },
    ];

    const location = useLocation();
    const navigate = useNavigate();
    const [userList, setUserList] = useState(initUserList);
    const [filteredStatus, setFilteredStatus] = useState(() => {
        const params = queryString.parse(location.search);
        return params.status || 'all';
    });

    useEffect(() => {
        const params = queryString.parse(location.search);
        setFilteredStatus(params.status || 'all');
    }, [location.search])
    
    // const renderedUserList = useMemo(() => {
    //     return userList.filter(user => filteredStatus === 'all' || filteredStatus === user.status);
    // }, [userList, filteredStatus])

    const renderedUserList = userList.filter(user => filteredStatus === 'all' || filteredStatus === user.status);

    const handleItemClick = (item, index) => {
        // console.log(item, index);
        // clone current array to new one
        const newUserList = [...userList];

        // toggle state
        const newUser = {
            ...newUserList[index],
            status: newUserList[index].status === 'new' ? 'removed' : 'new',
        };
        newUserList[index] = newUser;

        // update user List
        setUserList(newUserList);
    };

    const handleShowAllClick = () => {
        // setFilteredStatus('all');
        navigate({
            pathname: location.pathname, 
            search: createSearchParams({
                status: 'all'
            }).toString(),
        });
    };

    const handleShowRemovedClick = () => {
        // setFilteredStatus('removed');
        navigate({
            pathname: location.pathname, 
            search: createSearchParams({
                status: 'removed'
            }).toString(),
        });
    };

    const handleShowNewClick = () => {
        // setFilteredStatus('new');
        navigate({
            pathname: location.pathname, 
            search: createSearchParams({
                status: 'new'
            }).toString(),
        });
    };

    // User Form
    const handleUserFormSubmit = (values) => {
        const newUser = {
            id: userList.length + 1,
            name: values.name,
            email: values.email,
            status: 'new',
        };

        const newUserList = [...userList, newUser];

        setUserList(newUserList);
    };

    // User Tags Form
    const handleUserTagsFormSubmit = (values) => {
        // console.log("handleUserTagsFormSubmit", values);
        if(values.length > 0) {
            setUserList(values);
        } else {
            setUserList(initUserList);
        }
    };


    return (
        <div>
            <h3>Add User</h3>
            <UserForm onSubmit={handleUserFormSubmit} />


            <h3 className="text-3xl font-bold underline">Search User</h3>
            <UserTagsForm userList={renderedUserList} onSubmit={handleUserTagsFormSubmit} />

            <h1 className="text-3xl font-bold underline">
                User List
            </h1>
            <UserList userList={renderedUserList} onUserClick={handleItemClick} />

            {/* <div>
                <button onClick={handleShowAllClick}>Show All</button>
                <button onClick={handleShowRemovedClick}>Show Removed</button>
                <button onClick={handleShowNewClick}>Show New</button>
            </div> */}
        </div>
    );
}

export default ListPage;
import React from 'react';
import PropTypes from 'prop-types';
import "./style.scss";
import classnames from 'classnames';
import DeleteIcon from '@mui/icons-material/Delete';

UserList.propTypes = {
    userList: PropTypes.array,
    onUserClick: PropTypes.func,
};

UserList.defaultProps = {
    userList: [],
    onUserClick: null,
};

function UserList(props) {
    const { userList, onUserClick } = props;

    const handleUserClick = (user, index) => {
        if(!onUserClick) return;

        onUserClick(user, index);
    };

    return (
        <>
        <table className="table-auto border-collapse border border-slate-400">
            <thead>
                <tr>
                    <th className='border border-slate-300'>ID</th>
                    <th className='border border-slate-300'>Name</th>
                    <th className='border border-slate-300'>Email</th>
                    <th className='border border-slate-300'>Status</th>
                    <th className='border border-slate-300'>Action</th>
                </tr>
            </thead>
            <tbody>
                {userList.map((user, index) => (
                    <tr key={user.id}>
                        <td className='border border-slate-300'>{user.id}</td>
                        <td className='border border-slate-300'>{user.name}</td>
                        <td className='border border-slate-300'>{user.email}</td>
                        <td className='border border-slate-300'>{user.status}</td>
                        <td className='border border-slate-300'><DeleteIcon onClick={() => handleUserClick(user, index)} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default UserList;
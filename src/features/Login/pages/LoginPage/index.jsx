import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm';

LoginPage.propTypes = {
    
};

function LoginPage(props) {
    
    const handleLoginFormSubmit = (values) => {
        console.log("handleLoginFormSubmit", values);
    };

    return (
        <div>
            <h3>Login Page</h3>
            <LoginForm onSubmit={handleLoginFormSubmit} />
        </div>
    );
}

export default LoginPage;
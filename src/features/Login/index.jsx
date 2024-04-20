import React from 'react';
import PropTypes from 'prop-types';
import LoginPage from './pages/LoginPage';

LoginFeature.propTypes = {
    
};

function LoginFeature(props) {
    return (
        <div>
            <h3>Login Feature</h3>
            <LoginPage />
        </div>
    );
}

export default LoginFeature;
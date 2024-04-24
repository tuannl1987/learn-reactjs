import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import NotFound from '../../components/NotFound';

UserFeature.propTypes = {
    
};

function UserFeature(props) {
    return (
        <div>
            <Routes>
                <Route path='/' Component={ListPage} />
                <Route path=':userId' Component={DetailPage}/>
                <Route path='/*' Component={NotFound} />
            </Routes>
        </div>
    );
}

export default UserFeature;
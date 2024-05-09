import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';

import { Link, NavLink } from 'react-router-dom';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Register from '../../features/Auth/components/Register';
import { IconButton } from '@mui/material';
import { AccountCircle, Close } from '@mui/icons-material';
import Login from '../../features/Auth/components/Login';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../features/Auth/userSlice';

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
}

export default function Header() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const loggedInUser = useSelector(state => state.user.current);
    const isLoggedIn = !!loggedInUser.id;

    // menu
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
        setAnchorEl(null);
    };

    // dialog click
    const handleClickOpen = () => {
        setOpen(true);
    };
    // dialog close
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <CodeIcon sx={{marginRight: 0.5}} />
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to="/">Something new</Link>
                        </Typography>

                        <NavLink to="/users" className="m-1 p-1">Users</NavLink>
                        <NavLink to="/products" className="m-1 p-1">Products</NavLink>

                        {!isLoggedIn && (
                            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
                        )}
                        {isLoggedIn && (
                            <IconButton color="inherit" onClick={handleMenuClick}>
                                <AccountCircle />
                            </IconButton>
                        )}
                    </Toolbar>
                </AppBar>

                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Menu>

            </Box>

            <Dialog
                disableEscapeKeyDown={true}
                open={open}
                onClose={handleClose}
            >
                <IconButton onClick={handleClose} sx={{position: 'absolute', top: '1px', right: '1px', color: 'gray'}}>
                    <Close />
                </IconButton>

                <DialogContent>
                    { mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here.
                                </Button>
                            </Box>
                        </>
                    )}

                    { mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account. Register here.
                                </Button>
                            </Box>
                        </>
                    )}
                    
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}

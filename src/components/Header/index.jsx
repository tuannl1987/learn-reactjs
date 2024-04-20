import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';

import { Link } from 'react-router-dom';

import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Register from '../../features/Auth/components/Register';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import Login from '../../features/Auth/components/Login';

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
}

export default function Header() {

    const [open, setOpen] = useState(false);

    const [mode, setMode] = useState(MODE.LOGIN);

    const handleClickOpen = () => {
        setOpen(true);
    };

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
                    Something new
                </Typography>
                <Button color="inherit" onClick={handleClickOpen}>Register</Button>
                </Toolbar>
            </AppBar>
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

import React from 'react';
import { CircularProgress, Paper  } from '@material-ui/core';



function OnlineUsers({onlineUsers}) {

    return (
        <Paper style={{ width: '100px', padding: '8px', display: 'flex', justifyContent: 'center'}} > {
            onlineUsers >= 0 ? onlineUsers : <CircularProgress size='20px' color="secondary" />
        } </Paper>
    );
}

export default OnlineUsers;
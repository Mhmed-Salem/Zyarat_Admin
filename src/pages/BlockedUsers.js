import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlockedTable from './../components/BlockedTable';
import Modal from './../shared/Modal';
import { Typography, Grid, Box, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { ToastContainer, toast } from 'react-toastify';


function BlockedUsers() {
    
    const [showModal, setShowModal] = useState(false);
    const [visit, setVisit] = useState({});
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [page, setPage] = useState(1);


    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = "blocked users"
        
        const fetchCount = () => {
            axios.get('/api/rep/countunactive')    
                 .then(res => setCount(res.data))
        }
        fetchCount();
    }, [])

    useEffect(() => {
        const fetchUsers = () => {
            axios.get(`/api/rep/GetUnActiveUsers?pageNumber=${page}&pageSize=15`)    
                 .then(res => setBlockedUsers(res.data))
        }
        fetchUsers();
        
    }, [page])
    

        const handleChange = (event, value) => {
            setPage(value);
        };

        const handleActivation = async (row) => {
            await axios.put(`/api/rep/active/${row.id}`)    
                 .then(res => {
                    toast.success(`${row.fName} ${row.lName} reactivated successfully.`, {
                        position: toast.POSITION.TOP_LEFT
                      });
                 })
                 .catch(err => {
                    toast.error(`Activation of ${row.fName} failed!`, {
                        position: toast.POSITION.TOP_LEFT
                      });
                 });
        }

        const handleDelete = async (row) => {
            await axios.delete(`/api/rep/${row.id}`)    
                 .then(res => {
                    toast.success(`${row.fName} ${row.lName} deleted successfully.`, {
                        position: toast.POSITION.TOP_LEFT
                      });
                      window.location.reload();
  
                 })
                 .catch(err => {
                    toast.error(`Deletion of ${row.fName} failed!`, {
                        position: toast.POSITION.TOP_LEFT
                      });
                      console.log(err)
                 });
        }
    return (
        <div>
            <ToastContainer />
       
            { blockedUsers && (<div> { blockedUsers.length !== 0 ? <BlockedTable onDelete={handleDelete} reActivate={handleActivation} 
            rows={blockedUsers} showVisit={(visit) => {
                setVisit(visit);
                setShowModal(true)
            }} /> : <h3 style={{marginLeft: '546px'}}> There are no blocked users </h3>}
            <Grid container justify="center">
                <Grid item>
                    <Box style={{
                        marginTop: '16px'
                    }}>
                        <Pagination count={count} page={page} onChange={handleChange} color="primary" />
                    </Box>
                </Grid>
            </Grid> </div>) }
        <Modal show={showModal} handleClose={() => setShowModal(false)}>  
            <Typography> { visit.content } </Typography>
        </Modal> 
        </div>
    )
}

export default BlockedUsers;

import React, { useState, useEffect } from 'react';

import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button, Avatar } from '@material-ui/core';
import WinnersTable from '../components/WinnersTable';
import Modal from '../shared/Modal';
import FormikControl from './../shared/form/FormikControl';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import  SendIcon  from '@material-ui/icons/Send';
import axios from 'axios';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#141823'
    },

    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      },


}))
const Winners = () => {

    const [showModal, setShowModal] = useState(false)

    const [selectedDate, handleDateChange] = useState(new Date());

    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [winner, setWinner] = useState(null);
    const [winners, setWinners] = useState(null);
    

    useEffect(() => {
        document.title = "Winners";
      }, []);
   

    const handleClick = (winner) => {
        setShowModal(true);
        setWinner(winner)

    }

  

    //Fetching data...
    const getDailyWinners = () => {
        let d = new Date(selectedDate);  // i assume your date as 01-11-1933
        let day = d.getDate(); // 11
        let month = d.getMonth() + 1; // 0  month is like array so you have to do +1 for correct month
        let year = d.getFullYear(); // 1933
        
        try {
            const { data } = axios.get(`/api/Competition/GetDailyFinalResult?year=${year}&month=${month}&day=${day}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            setWinners(data)
        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                alert('the competition is not exist!')
            }
            alert('something went wrong when trying to fetch winners!')
        }
        
    }

    //monthly =============
    const getMonthlyCompetition = () => {
        let d = new Date(selectedMonth);  // i assume your date as 01-11-1933
        let month = d.getMonth() + 1; // 0  month is like array so you have to do +1 for correct month
        let year = d.getFullYear(); //
        try {
            const { data } = axios.get(`/api/Competition/GetMonthlyFinalResult?year=${year}&month=${month}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
            setWinners(data)
        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                alert('the competition is not exist!')
            }
            alert('something went wrong when trying to fetch winners!')
        }
        
    }
    
    const initialValues = {
        message: ''
    };

    const validationSchema = Yup.object({
        message: Yup.string().min(5, 'must be 10 characters at least').required("Required.")
    });

    const onSubmit = async (values) => {
        try {
            await axios.post(`/api/message/AddMessage/${winner.id}/${values.message}`)
            
        } catch (error) {
            toast.error("something went wrong while sending message")
        }
    }

    const classes = useStyles()
    return (<div>
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                    <Typography display='inline' variant='h5'>
                        Enter the date of the daily competition:</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker label="Year, Month and Day" value={selectedDate} clearable
                        onChange={date => handleDateChange(date)} maxDate={new Date()}
                        format="d/M/yyyy"/>
                    </MuiPickersUtilsProvider>
                    <Button variant="contained" color="primary" onClick={getDailyWinners} >Search</Button>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                    <Typography variant='h5'>Enter the date of monthly competition:</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            views={["year", "month"]}
                            label="Year and Month" clearable
                            value={selectedMonth}
                            onChange={date => setSelectedMonth(date)}
                            maxDate={new Date()}
                        />
                    </MuiPickersUtilsProvider>
                    <Button onClick={getMonthlyCompetition} variant="contained" color="primary" >Search</Button>
                </Paper>
            </Grid>

            <Grid item md={8} >
                { winners && <WinnersTable rows={winners} onClick={handleClick} /> }
                <Modal show={showModal} handleClose={() => setShowModal(false)}>
                    <Typography m={1}> Send message to: { winner }  </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit} >
                        {
                            formik => (
                                <Form>
                                    <Grid direction='row' container justify='center' spacing={3}>
                                        <Grid item xs={11}>
                                            <FormikControl
                                                label="Write message..." type='textarea' multiline control='input' name='message'
                                                id='roles' fullWidth variant="outlined"
                                                error={Boolean(formik.errors.roles && formik.touched.roles)}
                                                helperText={formik.errors.roles &&
                                                    formik.touched.roles &&
                                                    String(formik.errors.roles)} />
                                        </Grid>

                                        <Grid item>
                                            <Button variant="contained" color="secondary" endIcon={<SendIcon>send</SendIcon>}
                                                type="submit" >Send message</Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )
                        }

                    </Formik>
                </Modal>
            </Grid>
        </Grid>
                        


    </div>);
}

export default Winners;





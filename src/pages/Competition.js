import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { Grid, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper, Box } from '@material-ui/core';
import NextCompetition from '../components/nextCompetition';
import { getNextDailyCompetition, getNextMonthlyCompetition } from '../services/competitionService';
import CompetitionForm from '../components/competitionForm';
import SendIcon from '@material-ui/icons/Send';
import FormikControl from '../shared/form/FormikControl';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    alert: {
      margin: theme.spacing(4),
    },

    paper: {
      padding: theme.spacing(4),
      marginBottom: theme.spacing(2),
      position: 'relative' //for title styling
    },

    label: {
        padding: '10px',
        fontSize: '18px',
        textAlign: 'center',
        position: 'absolute',
        top: '-25px',
        color: '#fff',
        borderRadius: '3px',
        backgroundColor: 'rgb(153, 153, 153);',
        backgroundImage: 'linear-gradient(60deg, rgb(102, 187, 106), rgb(67, 160, 71))',
        boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14)',
        boxShadow:  '0 7px 10px -5px rgba(76, 175, 80,.4)'
        
    },

    msg: {
      padding: theme.spacing(3)
    }
  }));

const Competition = () => {

    const [dailyCompetition, setDailyCompetition] = useState(null);
    const [monthlyCompetition, setMonthlyCompetition] = useState(null)

    useEffect(() => {
     
     async function getDailyCompetition() {
      try {
        const res = await getNextDailyCompetition();
        setDailyCompetition(res.data)
      } catch (ex) {
        if(ex.response && ex.response.status === 400) {
        setDailyCompetition(null)
        }
      }
     }

     getDailyCompetition();

     async function getMonthlyCompetition() {
      try {
        const res = await getNextMonthlyCompetition();
        setMonthlyCompetition(res.data);
        
      } catch (ex) {
        if(ex.response && ex.response.status === 400) {
        setMonthlyCompetition(null)
        }
      }

     }
     getMonthlyCompetition();

    }, []);

    

    const initialValues = {
      message: ''
    };

    const validationSchema = Yup.object({
      message: Yup.string().min(5, 'must be 5 characters at least')
    });

    const onSubmit = async (values) => {
      console.log('values', values)
        axios.post(`/api/message/AddGlobalMessage/${values.message}`)
        .then(res => {
          toast.success("Message sent successfully");
        }).catch(err => console.log(err))
    };

    const classes = useStyles();
    
    return (  
       <Grid className={classes.root} container spacing={3} >
         <ToastContainer />
           <Grid item  xs={12} md={6}>
            <Paper className={classes.paper}>
              <Box style={{width: '81.6px'}} className={classes.label}>Daily</Box>
            {dailyCompetition ? <NextCompetition minUsers={dailyCompetition.minUniqueUsers}
              roles={dailyCompetition.roles}  minVisits={dailyCompetition.minUniqueVisits} /> : 
            <Alert variant="outlined" className={classes.alert} severity="warning">
              You haven't set the next <strong>daily</strong> competition yet!</Alert>
            }
            </Paper>

           </Grid>
           <Grid item  xs={12} md={6}>
           <Paper className={classes.paper}>
           <Box className={classes.label}>Monthly</Box>
           {monthlyCompetition ? <NextCompetition  roles={monthlyCompetition.roles} 
            minVisits={monthlyCompetition.minUniqueVisits}
            roles={monthlyCompetition.roles} /> : 
           <Alert variant="outlined" className={classes.alert} severity="warning">
             You haven't set the next <strong>monthly</strong> competition yet!</Alert>
             }
           </Paper>
           </Grid>

           <Grid item xs={12}>
              <CompetitionForm />
          </Grid>  

           <Grid item xs={12}>
          <Paper className={classes.msg}>
            <Typography style={{marginBottom: '12px'}}>Send a global message for all users:</Typography>
          <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit} >
        {
            formik => (
                <Form>
                  <Grid container direction='column' spacing={2}>
                  <Grid item xs={6}>
                  <FormikControl
                      label="Write message..." type='textarea' multiline control='input' name='message'
                      id='message' fullWidth variant="outlined" rows='4'
                      error={Boolean(formik.errors.message && formik.touched.message)}
                      helperText={formik.errors.message &&
                      formik.touched.message &&
                      String(formik.errors.message)} />

                  </Grid>
                  <Grid item xs={3}>
                  <Button
                  variant="contained" 
                  color="secondary" disabled={!formik.isValid}
                   type="submit"     
                  className={classes.button}
                  endIcon={<SendIcon>send</SendIcon>}
                >
                  Send 
                </Button>
                         </Grid>
                         </Grid>
                </Form>
            )
        }
    </Formik>
          </Paper>
          </Grid>  
       </Grid>
   );
}
 
export default Competition;



import React from 'react';
import { Formik, Form,  useField } from 'formik';
import * as Yup from 'yup';
import {
  Grid, Paper, Box, Button, FormControl, FormLabel,
  FormControlLabel, RadioGroup, Radio
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormikControl from '../shared/form/FormikControl';
import axios from 'axios';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    position: 'relative',
    marginTop: theme.spacing(4)
  },
  btn: {
    marginTop: theme.spacing(2)
  },

  label: {
    padding: '10px',
    fontSize: '18px',
    position: 'absolute',
    top: '-25px',
    color: '#fff',
    borderRadius: '3px',
    backgroundColor: 'rgb(153, 153, 153)',
    backgroundImage: 'linear-gradient(60deg, rgb(38, 198, 218), rgb(0, 172, 193))',
    boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14)',
    boxShadow: '0 7px 10px -5px rgba(0, 172, 193,.4)'

  },

  radio: {
    marginTop: theme.spacing(1),
    marginLeft: '16px'
  }
}))






const CompetitionForm = (props) => {

  const classes = useStyles();


  const MyRadio = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
      <FormControlLabel {...field} control={<Radio color="primary" />} label={label} />
    )
  }

  const initialValues = {
    roles: '',
    minUniqueVisits: 0,
    minUniqueUsers: 0,
    competition: 'daily'
  }

  const validationSchema = Yup.object({
    roles: Yup.string().max(100, "Roles must be less than 100 characters").required("Required")
      .min(5, 'Roles must be at least 5 characters').required("Required"),
    minUniqueVisits: Yup.number().positive("this must be a positive number").required("Required"),
    minUniqueUsers: Yup.number().positive("this must be a positive number").required("Required")
  });

  const onSubmit = async (values) => {
    
    try {
      const res = await axios.post(`/api/Competition/${values.competition}`, JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json'
        }
      })
      toast.success("Competion successfuly submitted.")
      console.log('response from the server' ,res.data);
    } catch (error) {
      toast.error("failed to submit a competiotn!")
      console.log(error.message)
    }

  }
  return (<Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit} >
    {
      formik => (

        <Paper className={classes.paper}>
          <Box className={classes.label} >Submit your next competition rules</Box>
          <Form autoComplete="off">
            <Grid container >
              <Grid item xs={12} md={6}>
                <Box margin={2}>
                  <FormikControl
                    label="Enter competition roles" type='textarea' multiline control='input' name='roles'
                    id='roles' fullWidth variant="outlined"
                    error={Boolean(formik.errors.roles && formik.touched.roles)}
                    helperText={formik.errors.roles &&
                      formik.touched.roles &&
                      String(formik.errors.roles)} />
                </Box>
              </Grid>

              <Grid item xs={6} md={3}>
                <Box margin={2}>
                  <FormikControl
                    control="input" type='number' fullWidth name='minUniqueVisits' variant='outlined'
                    label="minimum visits" error={Boolean(formik.errors.minUniqueVisits && formik.touched.minUniqueVisits)}
                    helperText={formik.errors.minUniqueVisits &&
                      formik.touched.minUniqueVisits &&
                      String(formik.errors.minUniqueVisits)} />

                </Box>
              </Grid>

              <Grid item xs={6} md={3}>
                <Box margin={2}>
                <FormikControl
                    control="input" type='number' fullWidth name='minUniqueUsers' variant='outlined'
                    label="minimum visits" error={Boolean(formik.errors.minUniqueUsers && formik.touched.minUniqueUsers)}
                    helperText={formik.errors.minUniqueUsers &&
                      formik.touched.minUniqueUsers &&
                      String(formik.errors.minUniqueUsers)} />
                </Box>
              </Grid>
              <Grid item>
               
              <FormControl className={classes.radio} component="fieldset">
                <FormLabel component="legend">Compeition type</FormLabel>
                  <RadioGroup row>
                     <MyRadio name='competition' type='radio' value='daily' label="Daily" />
                     <MyRadio name='competition' type='radio' value='monthly' label="Monthly" />

                  </RadioGroup>
              </FormControl>

              </Grid>

            </Grid>


            <Box margin={1}>
              <Button variant="contained" color="secondary"   disabled={!(formik.isValid && formik.dirty)}
                type="submit" >Add Competition</Button>
            </Box>
          </Form>
        </Paper>
      )
    }


  </Formik>
  );
}

export default CompetitionForm;



import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from '../shared/form/FormikControl';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { login } from '../services/authService';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 export default function Login(props) {

  useEffect(() => {
    document.title = "Login";
  }, []);


  const [error, setError] = useState(null)
   
  const initialValues = {
            email: '',
            password: ''
        };
        // const validationSchema = Yup.object({
        //     email: Yup.string().email("Invalid email").required('Required'),
        //     password: Yup.string().required("Required")
        // });

        const validationSchema = Yup.object({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
        })

        const onSubmit =  async (values) => {

           try {
              const res = await login(JSON.stringify(values));
              console.log('res, res')
              window.location = "/"
          } catch (ex) {
            setError(ex.response.data)
            console.log(ex.response.data)
            if(ex.response && ex.response.status === 400) {
              console.log('Bad request!!!')
            }
          }
                    
        }
    

  const classes = useStyles();

// if(getCurrentUser()) return <Redirect to="/" />
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik  initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={onSubmit}>
            {
                formik => (
                    <Form className={classes.form}>
                        <FormikControl autoFocus fullWidth margin="normal" variant="outlined"
                         control='input' type='email' name="email" label="Email"  id="email"
                         error={Boolean(formik.errors.email && formik.touched.email)}
                      helperText={formik.errors.email &&
                      formik.touched.email &&
                      String(formik.errors.email)}
                         />

                        <FormikControl fullWidth margin="normal" variant="outlined" id="password"
                        control='input' type='password' name="password" label="Password" 
                        error={Boolean(error)}
                      helperText={error}
                        />
                        <Button fullWidth variant="contained" color="primary" className={classes.submit} type="submit" >Login</Button>
                    </Form>
                )
            }
         </Formik>
        
       
      </div>
      
    </Container>
  );
}


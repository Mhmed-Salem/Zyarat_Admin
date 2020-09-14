import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography, Paper, Divider} from '@material-ui/core';
import bg from '../assets/bg.jpg';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles((theme) => ({
    root: {
        background: `url(${bg})`,
        borderRadius: '12px',
        height: '100vh',
        overflowX: 'hidden',
        padding: theme.spacing(8)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100%'
    },

}))


function RepInfo(props) {

    console.log('props here:', props)
    const {fName, lName, email, phone, profileUrl ,city, medicalRepPosition, workedOnCompany, 
        likeCount, visitsCount, uniqueUsers, disLikeCount, active } = props;

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={8} justify="center" >
                <Grid item md={4}>
                    <Paper className={classes.paper}>
                        <img src={profileUrl} alt="Photo" style={{width: '120px', height: '100px'}} />
                        <Typography paragraph> {`${fName} ${lName}` } </Typography>
                        <Typography paragraph> { email } </Typography>
                        <Typography paragraph> { phone } </Typography>
                        <Typography paragraph> { city.cityName } </Typography>
                        <Divider />
                        <Typography> { active ? <VerifiedUserIcon color="primary" /> : "UnActive"} </Typography>
                    </Paper>
                </Grid>
                <Grid item md={6} container direction='column'>
                    <Grid item xs={8}>
                        <Paper style={{ textAlign: 'left'}} className={classes.paper}>
                            <Typography paragraph>{ !!medicalRepPosition ? medicalRepPosition.title : 'no position provided!'} </Typography>
                            <Divider />
                            <Typography paragraph>at { workedOnCompany } </Typography>
                            <Divider />
                            <Typography paragraph>number of likes: { likeCount } </Typography>
                            <Divider />
                            <Typography paragraph>number of visits: { visitsCount } </Typography>
                            <Divider />
                            <Typography paragraph>number of unique users: { uniqueUsers } </Typography>
                            <Divider />
                            <Typography paragraph>number of dislikes: { disLikeCount } </Typography>
                            <Divider />
                        </Paper>
                    </Grid>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default RepInfo

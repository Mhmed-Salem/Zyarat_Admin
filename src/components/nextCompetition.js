import React from 'react'
import { Grid, Typography, Divider, Box  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   
    paper: {
      padding: theme.spacing(2),
      fontFamily: 'Roboto',
      margin: theme.spacing(2),
    },

    box: {
        color: '#EC5C42',
        marginRight: '8px'
    }

    
  }));
const NextCompetition = ({roles, minUsers, minVisits}) => {
     
    const classes = useStyles();
    return (  <div>
        <Grid container spacing={3} >
            <Grid item xs={12}>
                <Typography paragraph style={{marginTop: '16px'}} className={classes.typography} variant='body1'>
                     <Box component="span"className={classes.box}> Roles:  </Box> { roles }  </Typography>
                     <Divider />
            </Grid>
            
            <Grid item container>
                <Grid item xs={6}>
                <Typography variant='body1'> <Box component="span" className={classes.box}> Minimum unique users: </Box> { minUsers } </Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography variant='body1'> <Box component="span"  className={classes.box}>  Minimum unique visits: </Box> { minVisits } </Typography>
                </Grid>
            </Grid>
        </Grid>
    </div>);
}
 
export default NextCompetition;


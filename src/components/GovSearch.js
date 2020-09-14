import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  
    papper: {
      padding: '24px'
    }
      
  });

function GovSearch(props) {

  const { onChoosingCity, govs, onChoosingGov } = props;
 
     


    const [gov, setGov] = useState(null);
    const [city, setCity] = useState(null);
 

    const classes = useStyles();

    return (
        <Paper className={classes.papper}>
        <Grid container alignItems='center' spacing={2}>
          <Grid item xs={12}> <Typography variant='h6'>Choose the government and city of the doctor you search for</Typography>  </Grid>
          <Grid item>
            <Autocomplete
              id="gov"
              style={{ width: 300 }}
              options={govs}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionLabel={(option) => option.gov}
              
              value={gov}
              onChange={(event, newValue) => {
                setGov(newValue);
                onChoosingGov(newValue)
              }}

              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose the government"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>

          <Grid item>
            {gov && <Autocomplete
              id="city"
              style={{ width: 300 }}
              options={gov.cities}
              classes={{
                option: classes.option,
              }}
              autoHighlight
              getOptionLabel={(option) => option.cityName}
        
              value={city}
              onChange={(event, newValue) => {
                onChoosingCity(newValue.id)
              }}

              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose the city"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />}
          </Grid>
        </Grid>
      </Paper>
    )
}

export default GovSearch

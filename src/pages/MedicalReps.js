import React, { useState } from 'react';
import { Grid, Box, TextField, Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import RepsTable from '../components/RepsTable'
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { paginate } from './../utils/paginate';
import SearchIcon from '@material-ui/icons/Search';

const MedicalReps = (props) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [reps, setReps] = useState([])

    
    const fetchReps = async () => {
        try {
            const { data } = await axios.get(`/api/rep/search?query=${searchTerm}`);
            setReps(data)
        } catch (error) {
            alert("write at minimum 4 characters.", error.message)
        }
    }

    const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
};
const paginatedReps = paginate(reps, page, 2)
const finalCount = Math.ceil(reps.length / 2)

    return (<div>
        <Grid container justify='center' spacing={4}>
            <Grid item xs={6}>
            <TextField
                id="filled-name"
                value={searchTerm}
                onChange={(e, newValue) => {
                    setSearchTerm(e.target.value);
                  }}
                variant="outlined"
                fullWidth
                /> 
                {/* <SearchBar
                    placeholder='Enter full name of the user'
                    value={searchTerm}
                    onChange={(newValue) => setSearchTerm(newValue)}
                    onRequestSearch={searchTerm.length < 4 ? () => setError(true)  : fetchReps}
                /> */}
            </Grid>
            <Grid item>
            { searchTerm.length >= 4 &&
                <Button
                variant="contained"
                onClick={fetchReps}
                color="primary" 
                style={{
                    padding: '14px'
                }}
                 type="submit"     
                endIcon={<SearchIcon>search</SearchIcon>}
              >
                Search
              </Button>
            }
            </Grid>
            <Grid item xs={12} md={12}>
                { reps.length > 1 && <RepsTable rows={paginatedReps} />}
            </Grid>
            {reps.length > 1 &&  <Grid container justify="center">
                <Grid item>
                    <Box style={{
                        marginTop: '16px'
                    }}>
                        <Pagination count={finalCount} page={page} onChange={handleChange} color="primary" />
                    </Box>
                </Grid>
            </Grid> }
        </Grid>
    </div>);
}

export default MedicalReps;
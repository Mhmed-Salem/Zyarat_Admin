import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import  Grid  from '@material-ui/core/Grid';

import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import InfoIcon from '@material-ui/icons/Info';
import { renderDate } from './../utils/renderDate';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },

  name: {
      marginLeft: theme.spacing(1)
  },

  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

  dislikeIcon: {
   
  },
  

}));
//id, fName, lName, workedOnCompany, visitsCount, likeCount, disLikeCount
export default function BlockedTable(props) {
    const { reActivate, onDelete, showVisit , rows } = {...props};



  

  renderDate('2020-08-28T10:32:48.5137331')
    
    const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left" >NAME</StyledTableCell>
            <StyledTableCell align="left">COMPANY</StyledTableCell>
            <StyledTableCell align="center">VISITS </StyledTableCell>
            <StyledTableCell align="center">LIKES</StyledTableCell>
            <StyledTableCell align="left">REASON</StyledTableCell>
            <StyledTableCell align="center">DATE</StyledTableCell>
            <StyledTableCell align="left">ACTIVATE</StyledTableCell>
            <StyledTableCell align="left">DELETE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows && rows.map((row) => (
            <StyledTableRow key={row.rep.id}>
                
                <StyledTableCell align="left"> 
                        { row.rep.fName + " " + row.rep.lName }      
                </StyledTableCell>
                <StyledTableCell align="left">
                    { row.rep.workedOnCompany }
                </StyledTableCell>
                <StyledTableCell align="center" >
                    {  row.rep.visitsCount }
                </StyledTableCell>
                <StyledTableCell align="center">
                    {  row.rep.likeCount }
                </StyledTableCell>
                <StyledTableCell align="center">
    
                  {
                    !!(row.visit) ? (<Grid container spacing={2}>
                       <Grid item xs={6} className={classes.help}>
                      <IconButton onClick={() => showVisit(row.visit)}>
                    <InfoIcon style={{color: '#19BCDB'}} />
                </IconButton>
                    </Grid >
                    </Grid> ) : (<Grid container>
                  <Grid item xs={4}>
                  <ThumbDownIcon className={classes.dislikeIcon} />
                  </Grid>
                  <Grid item xs={2}> { row.rep.disLikeCount} </Grid>
                </Grid>)
                  }
                </StyledTableCell>
                <StyledTableCell align="center" >
                  { renderDate(row.deActiveDate) }
                </StyledTableCell>
                <StyledTableCell>
                    <IconButton onClick={() => reActivate(row.rep)}>
                        <FlipCameraAndroidIcon style={{color: '#0D9CF6'}} />
                    </IconButton>
                </StyledTableCell>

                <StyledTableCell>
                    <IconButton onClick={() => onDelete(row.rep)} >
                         <DeleteForeverIcon  style={{color: '#F73D52'}} />
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

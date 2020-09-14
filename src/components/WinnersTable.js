import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';
import  Grid  from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core';



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
}));

export default function WinnersTable({ rows, onClick }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" >RANK</StyledTableCell>
            <StyledTableCell align="left">NAME</StyledTableCell>
            <StyledTableCell align="left">MOBILE</StyledTableCell>
            <StyledTableCell align="left">ACTIONS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center"  component="th" scope="row">
              {row.rank}
              </StyledTableCell>
              <StyledTableCell align="left"> 
                    <Grid container alignItems='center' >
                        <Grid item >
                            <Avatar className={classes.small} src={row.imageUrl} /> 
                        </Grid>
                        <Grid item>
                            <Box className={classes.name}> <Typography varitant='h6'> {row.name} </Typography> </Box>
                        </Grid>
                    </Grid>
                    
                    </StyledTableCell>
              <StyledTableCell align="left">{row.phone}</StyledTableCell>
              <StyledTableCell align="left">
                  <IconButton onClick={() => onClick(row)} > <MessageIcon /> </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

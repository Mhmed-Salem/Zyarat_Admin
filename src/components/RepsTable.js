import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';



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

export default function WinnersTable({ rows }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left" >NAME</StyledTableCell>
            <StyledTableCell align="left">GOVERNMENT</StyledTableCell>
            <StyledTableCell align="left">CITY</StyledTableCell>
            <StyledTableCell align="left">STATUS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="left"  component={Link} to={`/profiles/${row.id}`}
               scope="row">
              {row.name} 
              </StyledTableCell>
              <StyledTableCell align="left"> 
                    {row.gov}
                    </StyledTableCell>
              <StyledTableCell align="left">{row.city}</StyledTableCell>
              <StyledTableCell align="left">
                  {row.active ? 'TRUE' : 'FALSE'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

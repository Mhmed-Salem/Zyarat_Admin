import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { renderDate } from './../utils/renderDate';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';



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

export default function WinnersTable({ rows, markRevised, onModify, onDelete  }) {
  const [date, setDate] = useState(new Date)
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" >STATUS</StyledTableCell>
            <StyledTableCell align="left">NAME</StyledTableCell>
            <StyledTableCell align="left">SPECIALITY</StyledTableCell>
            <StyledTableCell align="left">WHO ADDED</StyledTableCell>
            <StyledTableCell align="left">DATE OF ADDITION</StyledTableCell>
            <StyledTableCell align="left">MODIFY</StyledTableCell>
            <StyledTableCell align="left">DELETE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => (
            <StyledTableRow key={row.id}>
                <StyledTableCell align="center"   scope="row">
                {row.revised  ? <DoneIcon style={{color: '#28A745'}} /> : (<IconButton onClick={() => markRevised(row)}> <CheckCircleIcon style={{color: '#FFCC00'}} /> </IconButton>) }
                </StyledTableCell>
                <StyledTableCell align="left"> 
                        { row.fName + " " + row.lName }      
                </StyledTableCell>
                <StyledTableCell align="left">{row.medicalSpecialized.type}</StyledTableCell>
                <StyledTableCell align="left">
                    { row.adderMedicalRep.fName + " " +  row.adderMedicalRep.lName}
                </StyledTableCell>
                <StyledTableCell>
                    { renderDate(row.addingDate) }
                </StyledTableCell>
                <StyledTableCell>
                    <IconButton onClick={() => onModify(row)}>
                        <BorderColorIcon style={{color: '#0D9CF6'}} />
                    </IconButton>
                </StyledTableCell>

                <StyledTableCell>
                    <IconButton onClick={() => onDelete(row)} >
                         <DeleteIcon  style={{color: '#F73D52'}} />
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

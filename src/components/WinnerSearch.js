import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,} from '@material-ui/pickers';




function WinnerSearch() {

    const [selectedDate, handleDateChange] = useState(new Date());

   

    const getDateAttributes = () => {
        let d = new Date(selectedDate);  // i assume your date as 01-11-1933
        let day = d.getDate(); // 11
        let month = d.getMonth(); // 0  month is like array so you have to do +1 for correct month
        let year = d.getFullYear(); // 1933
    
        return {day, month, year}
    }
    
    let { day, month, year } = { ...getDateAttributes()}
    
    return (
        <div>
            <Typography>Choose the date of the competition:</Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <DatePicker value={selectedDate} onChange={handleDateChange} />
                 </MuiPickersUtilsProvider>
        </div>
    )
}

export default WinnerSearch

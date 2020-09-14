import React from 'react';
import {MenuItem, Select , TextField} from '@material-ui/core';
import { Field } from 'formik';


function SelectList({ label, name,options, ...rest }) {

    return (<Field
              as={TextField}
              type="text"
              name="select"
              label={label}
              select
              variant="standard"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              {...rest}
            >
              {options.map(option => (
                <MenuItem key={option.id} value={option.type}>
                  {option.type}
                </MenuItem>
              ))}
            </Field>
    )
}

export default Select

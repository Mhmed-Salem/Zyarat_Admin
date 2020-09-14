import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import BlockIcon from '@material-ui/icons/Block';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { Link } from 'react-router-dom';


export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon color="primary"/>
      </ListItemIcon>
      <ListItemText  primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/winners">
      <ListItemIcon>
        <FaceRoundedIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Winners" />
    </ListItem>
    <ListItem  button component={Link} to="/medical-reps">
      <ListItemIcon>
        <PeopleIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Medical reps" />
    </ListItem>
    <ListItem button component={Link} to="/doctors">
      <ListItemIcon>
        <LocalHospitalRoundedIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Doctors" />
    </ListItem>
    <ListItem button component={Link} to="/blocked">
      <ListItemIcon>
        <BlockIcon color="primary"/>
      </ListItemIcon>
      <ListItemText primary="Blocked users" />
    </ListItem>
    <ListItem button component={Link} to="/upload_data">
      <ListItemIcon>
        <SystemUpdateAltIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary="Upload data" />
    </ListItem>
  </div>
);


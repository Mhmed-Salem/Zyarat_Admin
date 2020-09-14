import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Competition from './Competition';
import Winners from './Winners';
import MedicalReps from './MedicalReps';
import Login from './Login';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { mainListItems } from './../components/mainListItems';
import ToggleCardContext from './../context/toggleCard';
import GroupIcon from '@material-ui/icons/Group';
import OnlineUsers from './../components/onlineUsers';
import Profile from './Profile';
import { getCurrentUser } from '../services/authService';
import Logout from './../components/Logout';
import Doctors from './Doctors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlockedUsers from './BlockedUsers';
import SliderAbout from './SliderAbout';
import NotFound from './../components/NotFound';
import ProtectedRoute from '../shared/protectedRoutes';
import axios from 'axios';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },

  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  title: {
    flexGrow: 1,
    textTransform: 'uppercase'
  },

  link: {
    textDecoration: 'none',
    color: '#fff',
    padding: theme.spacing(1),
    fontWeight: '500',
    fontSize: '16px'
  }
}));

function Dashboard(props) {

  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchCurrentUser = () => {
      setUser(getCurrentUser());

    }

    fetchCurrentUser()
  }, []);


  const [isCardOpen, setIsCardOpen] = useState(false);
  const handleToggleCard = () => {
    setIsCardOpen(!isCardOpen);
  }

  //=========Drawer==================  
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      <List>
        {mainListItems}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const [onlineUsers, setOnlineUsers] = useState("No users!");
  useEffect(() => {
    async function fetchCurrentUsers() {
        if(isCardOpen) {
           const { data } = await axios.get('/api/rep/CountOnlineUsers')
          setOnlineUsers(data);
        } else {
          return null
        }
    }
    fetchCurrentUsers();
   
    
}, [isCardOpen]);

  return (
    <ToggleCardContext.Provider value={{
      isCardOpen: isCardOpen,
      toggleCard: handleToggleCard
    }}>
      <div className={classes.root}>
        <ToastContainer />
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Zyarat Medical
          </Typography>
            {isCardOpen && <OnlineUsers onlineUsers={onlineUsers} className={classes.usersCount} />}

            <IconButton>
              <GroupIcon variant="h6" onMouseEnter={() => setIsCardOpen(!isCardOpen)}
                onMouseLeave={() => setIsCardOpen(!isCardOpen)} />
            </IconButton>
            {user && <NavLink className={classes.link} to="/logout">
              Logout
          </NavLink>}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <ProtectedRoute exact path="/winners" component={Winners} />
            <ProtectedRoute path='/medical-reps' component={MedicalReps} />
            <Route path='/login' component={Login} />
            <ProtectedRoute exact path="/" component={Competition} />
            <ProtectedRoute path='/profiles/:id' component={Profile} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path='/doctors' component={Doctors} />
            <ProtectedRoute path='/not-found' component={NotFound} />
            <ProtectedRoute path='/blocked' component={BlockedUsers} />
            <ProtectedRoute path='/upload_data' component={SliderAbout} />
            <Redirect to="/not-found" />

          </Switch>

        </main>
      </div>
    </ToggleCardContext.Provider>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;

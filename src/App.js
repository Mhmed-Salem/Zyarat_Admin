// import React, { useState, useEffect, useContext } from 'react';
// import { Route, Switch } from "react-router-dom";
// import Competition from './pages/Competition';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import {CssBaseline, Drawer, Box, AppBar, Toolbar, List, Typography, Divider, IconButton,
//     Badge, Container, Link, Grid} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import { mainListItems } from './components/mainListItems';
// import Winners from './pages/Winners';
// import OnlineUsers from './components/onlineUsers';

// import ToggleCardContext from './context/toggleCard';
// import { getCurrentUser } from './services/authService';
// import MedicalReps from './pages/MedicalReps';
// import Login from './pages/Login';

// const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },
//   toolbarIcon: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: '0 8px',
//     ...theme.mixins.toolbar,
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: 36,
//   },
//   menuButtonHidden: {
//     display: 'none',
//   },
//   title: {
//     flexGrow: 1,
//   },
//   drawerPaper: {
//     position: 'relative',
//     whiteSpace: 'nowrap',
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerPaperClose: {
//     overflowX: 'hidden',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     width: theme.spacing(7),
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9),
//     },
//   },
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(2),
//     position: 'relative' //to render our card online users
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'auto',
//     flexDirection: 'column',
//   },
//   fixedHeight: {
//     height: 240,
//   },


// }));


// const App = () => {

//   const [user, setUser] = useState(null);
  
//   useEffect(() => {
//     const fetchCurrentUser = () => {
//       setUser(getCurrentUser());
//     }

//     fetchCurrentUser()
//   }, [])

//   console.log(user);

  
//   const [isCardOpen, setIsCardOpen] = useState(false);
//   const handleToggleCard = () => {
//     setIsCardOpen(!isCardOpen);

//   }

//   const cardContext = useContext(ToggleCardContext);


//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  
//   return ( 
//   <ToggleCardContext.Provider  value={{
//     isCardOpen: isCardOpen,
//     toggleCard: handleToggleCard
//   }}>
//   <div className={classes.root}>
      
//       <CssBaseline />
//       <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
//         <Toolbar className={classes.toolbar}>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
//             ZYARAT MEDICAL
//           </Typography>
//           <div onMouseEnter={() => setOpen(!isCardOpen)} onMouseLeave={() => setOpen()} >
//             <Typography variant="h6" >current users</Typography>
//           </div>
          
//         </Toolbar>
//       </AppBar>
      
      
//       <Drawer
//         variant="permanent"
//         classes={{
//           paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
//         }}
//         open={open}
//       >
//         <div className={classes.toolbarIcon}>
//           <IconButton onClick={handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </div>
//         <Divider />
//         <List>{mainListItems}</List>
//       </Drawer>
//       <main className={classes.content}>
//       <Box style={{zIndex: '100', marginRight: '20px'}}>
//        {isCardOpen && <OnlineUsers /> }
//        </Box>
//         <div className={classes.appBarSpacer} />
        
//         <Container maxWidth="lg" className={classes.container}>

     
//          <Switch>
//          <Route exact path="/winners" component={Winners} /> 
//          <Route path='/medical-reps' component={MedicalReps}/>         
//          <Route path='/login' component={Login}/>
//          <Route exact path="/" component={Competition} />  
//          </Switch>
//         </Container>
//       </main>
      
      
//     </div>
//   </ToggleCardContext.Provider> );
// }
 
// export default App;


import React from 'react';
import ReactDOM from 'react-dom';
import Login from './pages/Login';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';
import Dashboard from './pages/Dashboard';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
        <Dashboard />
    </BrowserRouter> 
  </ThemeProvider>
  ,
  document.getElementById('root')
);


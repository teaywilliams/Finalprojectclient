import React from 'react'
import ReactDOM from 'react-dom'
import "./index.css"
import App from './App'

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
const theme = createTheme({
  palette: {
     primary: {
        light: 'rgb(227,223, 255)',
        main: 'rgb(6,167, 125)',
        dark: 'rgb(101,83,47)'
        // dark: 'rgb(188,172,155)'
     },
     secondary: {
       light: 'rgb(247,208,138)',
       main: 'rgb(34,124,157)',
       dark: 'rgb(11,19,43)'
     },     
  }
  
});


ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
    <App /></MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

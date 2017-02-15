import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

ReactDOM.render(
  <MuiThemeProvider><App /></MuiThemeProvider>,
  document.getElementById('root')
);

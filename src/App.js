import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Kalenteri from './components/Kalenteri'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Simpletabs from './components/Ylapalkki'


function App() {



  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            TRAINEEEER
          </Typography>
        </Toolbar>
      
      </AppBar>
       <Simpletabs />
    </div>
  );
}


export default App;


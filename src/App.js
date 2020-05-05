import React from 'react';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Simpletabs from './components/Ylapalkki'
import Chartit from './components/Chartteja'


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
      <Chartit />
       <Simpletabs />
    </div>
  );
}


export default App;

